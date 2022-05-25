<template>
  <div v-if="USER_ACCOUNT">
    <div class="strategy-section">
      <div class="section-header">
        <div class="section__title">Strategy addition</div>
      </div>
      <div class="strategy-grid border-shadow">
        <div class="strategy-grid-row grid-row-header">
          <p class="grid-header question">Strategies</p>
          <p class="grid-header question">Risk Factor</p>
          <p class="grid-header question">APY</p>
          <p class="grid-header question">Type</p>
          <p class="grid-header"></p>
        </div>
        <div
          class="strategy-grid-row"
          v-for="strategy in allStrategies"
          :key="strategy.name"
        >
          <span class="grid-span">{{ strategy.name }}</span>
          <span class="grid-span color-green">{{ strategy.risk_factor }}</span>
          <span class="grid-span">{{ strategy.apy }}%</span>
          <span class="grid-span">{{ strategy.type }}</span>
          <button
            class="grid-span add"
            :disabled="userStrategies.includes(strategy.name)"
            :data-id="strategy.name"
            ref="addStrategyBtn"
            @click="addStrategyHandler(strategy.name)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <div class="button-section">
      <button class="big-btn" @click="prepareCoins">Construct strategy</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from "vuex";
import {
  checkETHBalance,
  createStrategy,
  deployStrategy,
  getStrategyProxyAddress,
  preTestSetup,
  putOperation,
  putStrategy,
} from "../../core/api";
import router from "../../router";
import { isGoBalanceZero, prepareCoins, sendDeployProxy } from "../../core/eth";

export default {
  name: "StrategyAddition",
  data() {
    return {
      allStrategies: [],
    };
  },
  methods: {
    ...mapActions(["GET_ALL_STRATEGIES", "GET_USER_STRATEGIES"]),

    async addStrategyHandler(id) {
      if (!id) return;

      let userStrategy = this.USER_STRATEGIES.find((s) => s.name === id);

      if (userStrategy === undefined || userStrategy.pendingProxy) {
        console.info("Start to create strategy.");

        let newStrategyId = "";

        if (userStrategy === undefined) {
          const newStrategy = await createStrategy(this.USER_ACCOUNT);

          if (!newStrategy) {
            console.error("Couldn't create strategy. Try again later.");
            return false;
          }

          newStrategyId = newStrategy["_id"];
          userStrategy = newStrategy;
          console.info(`Strategy created id : ${newStrategyId}.`);
        } else {
          newStrategyId = userStrategy._id;
        }

        // check balance
        const ETHBalance = await checkETHBalance(newStrategyId);

        if (ETHBalance !== undefined && +ETHBalance === 0) {
          if (await preTestSetup(newStrategyId, this.USER_ACCOUNT)) {
            console.info("Added coins to your Wallet.");
          } else {
            console.error(
              "Couldn't add coins to your wallet. Try again later."
            );
          }
        } else if (ETHBalance === undefined) {
          console.error("Could not check balance. Try again later.");
          return false;
        }

        const isStrategyDeployed = userStrategy.operations.find(
          (o) => o.action === "deployProxy" && o.txStatus === "sent"
        );

        const { tx, operationId } = await deployStrategy(newStrategyId);

        if (tx && isStrategyDeployed !== undefined) {
          console.info("Strategy deployed, ready to send transaction.");
        } else if (!tx) {
          console.error("Strategy didn't deployed. Try again later.");
          return false;
        }

        // check transaction
        if (isStrategyDeployed === undefined) {
          const txResponse = await this.sendDeployProxyTransaction(tx);

          if (txResponse.status) {
            await putOperation(newStrategyId, txResponse, operationId);
            console.info("Transaction sent. Operation added.");
          } else {
            console.error("Transaction deployProxy failed.");
            return false;
          }
        }

        const proxyAddress = await getStrategyProxyAddress(newStrategyId);

        if (proxyAddress) {
          console.info(`Proxy address: ${proxyAddress.data.proxyAddress}.`);

          const deployedStrategy = await putStrategy(
            newStrategyId,
            proxyAddress.data.proxyAddress
          );

          if (deployedStrategy) {
            console.info("Updated strategy with proxy address.");
          } else {
            console.error(
              "Couldn't updated strategy with proxy address. Try again later."
            );
            return false;
          }

          this.GET_USER_STRATEGIES({ strategy: deployedStrategy });

          this.deactivateAddButton(id);

          await this.prepareCoins(newStrategyId).then(
            router.push("/portfolio")
          );
        } else {
          console.error(`Couldn't get proxyAddress. Try again later.`);
          return false;
        }
      } else if (!userStrategy.pendingProxy) {
        await this.prepareCoins(userStrategy._id);
      }
    },

    async prepareCoins(id) {
      try {
        const preResponse = await preTestSetup(id);

        if (preResponse) {
          console.info(
            "New strategy ready. Start to convert coins for other operations.",
            preResponse
          );

          const coins = prepareCoins(preResponse);

          for await (let value of coins) {
            console.log(value.message);
          }

          router.push("/portfolio");
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    deactivateAddButton(id) {
      for (const [key, btn] of [...this.$refs.addStrategyBtn].entries()) {
        if (btn.dataset.id === id.toString())
          this.$refs.addStrategyBtn[key].disabled = true;
      }
    },

    isUserHaveStrategy(id) {
      return this.userStrategies.includes(id);
    },

    async sendDeployProxyTransaction(tx) {
      try {
        const txResponse = await sendDeployProxy(tx);
        return txResponse;
      } catch (e) {
        console.log("Problems with send transaction deployProxy: ", e);
        return {};
      }
    },
  },
  computed: {
    ...mapGetters(["ALL_STRATEGIES", "USER_STRATEGIES", "USER_ACCOUNT"]),

    userStrategies: function () {
      const strategies = [];
      this.USER_STRATEGIES.forEach((s) => {
        if (!s.pendingProxy) strategies.push(s.name);
      });
      return strategies;
    },
  },
  created() {
    // this.GET_USER_STRATEGIES().then((res) => {
    //   res.forEach((s) => {
    //     this.userStrategies.push(s.name);
    //   });
    // });
    // this.USER_STRATEGIES.forEach((s) => {
    //   this.userStrategies.push(s.name);
    // });
    this.GET_ALL_STRATEGIES().then((res) => (this.allStrategies = [...res]));
  },
  mounted() {},
};
</script>
<style scoped>
.strategy-section {
  margin-top: 30px;
  margin-bottom: 60px;
}

.strategy-grid {
  margin-top: 20px;
  padding: 24px 60px 70px;
}

.strategy-grid-row {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 70px;
  column-gap: 20px;
  margin-bottom: 28px;
}

.grid-span.add {
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 15px;
  text-align: center;
  padding: 2px 18px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

button.grid-span {
  outline: none;
  border: none;
}

button.grid-span:disabled {
  opacity: 0.4;
  cursor: default;
}

.big-btn {
  width: 100%;
  max-width: 520px;
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 15px;
  padding: 10px 50px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: var(--text-color);
  cursor: pointer;
  margin-bottom: 50px;
}

.question::after {
  content: "?";
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: var(--text-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 50%;
  cursor: pointer;
  margin-left: 7px;
  display: inline-block;
  width: 17px;
  height: 17px;
  text-align: center;
  transform: translateY(-2px);
}
</style>
