<template>
  <div>
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
  createStrategy,
  deployStrategy,
  getStrategy,
  getStrategyProxyAddress,
  preTestSetup,
  putOperation,
  putStrategy,
} from "../../core/api";
import router from "../../router";
import { prepareCoins, sendDeployProxy, signOperation } from "../../core/eth";
import { STRATEGIES } from "../../core/config";

export default {
  name: "StrategyAddition",
  data() {
    return {
      allStrategies: [],
      // userStrategies: [],
    };
  },
  methods: {
    ...mapActions(["GET_ALL_STRATEGIES", "GET_USER_STRATEGIES"]),

    async addStrategyHandler(id) {
      if (!id) return;

      console.info("Start to create strategy.");

      const newStrategy = await createStrategy(this.USER_ACCOUNT);
      const newStrategyId = newStrategy["_id"];
      console.info(`Strategy created id : ${newStrategyId}.`);

      this.deactivateAddButton(id);

      await preTestSetup(newStrategyId);
      console.info("Added coins  to your Wallet.");

      const txRequest = await deployStrategy(newStrategyId);
      console.info("Strategy deployed, ready to send transaction.");

      const txResponse = await this.sendDeployProxyTransaction(txRequest.tx);
      const proxyAddress = await getStrategyProxyAddress(newStrategyId);
      console.info(
        `Transaction sent. Proxy address: ${proxyAddress.data.proxyAddress}.`
      );

      await putOperation(newStrategyId, txResponse, txRequest.id);
      console.info("Operation added.");

      const deployedStrategy = await putStrategy(
        newStrategyId,
        proxyAddress.data.proxyAddress
      );
      console.info("Updated strategy with proxy address.");

      const preResponse = await preTestSetup(newStrategyId);
      console.info(
        "New strategy ready. Start to convert coins for other operations."
      );
      deployedStrategy.preTestSetup = preResponse;

      localStorage.setItem("preTestSetup", JSON.stringify(preResponse));

      this.GET_USER_STRATEGIES({ strategy: deployedStrategy });
      this.userStrategies.push(newStrategy.name);

      await this.prepareCoins();

      router.push("/portfolio");
    },

    async prepareCoins() {
      try {
        const preTestSetup = this.USER_STRATEGIES[0].preTestSetup
          ? this.USER_STRATEGIES[0].preTestSetup
          : localStorage.getItem("preTestSetup")
          ? JSON.parse(localStorage.getItem("preTestSetup"))
          : {};

        const coins = prepareCoins(preTestSetup);

        for await (let value of coins) {
          console.log(value.message);
        }

        localStorage.removeItem("preTestSetup");
      } catch (e) {
        console.error(e);
        return;
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
      return this.USER_STRATEGIES.map((a) => a.name);
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
