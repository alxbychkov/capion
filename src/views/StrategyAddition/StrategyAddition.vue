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
          :key="strategy.id"
        >
          <span class="grid-span">{{ strategy.name }}</span>
          <span class="grid-span color-green">{{ strategy.risk_factor }}</span>
          <span class="grid-span">{{ strategy.apy }}%</span>
          <span class="grid-span">{{ strategy.type }}</span>
          <button
            class="grid-span add"
            :disabled="isUserHaveStrategy(strategy.id)"
            :data-id="strategy.id"
            ref="addStrategyBtn"
            @click="addStrategyHandler(strategy.id)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <div class="button-section">
      <button class="big-btn">Construct strategy</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from "vuex";
import {
  createStrategy,
  deployStrategy,
  preTestSetup,
  putStrategy,
} from "../../core/api";
import router from "../../router";
import { signOperation } from "../../core/eth";
import { STRATEGIES } from "../../core/config";

export default {
  name: "StrategyAddition",
  data() {
    return {
      allStrategies: [],
      userStrategies: [],
    };
  },
  methods: {
    ...mapActions(["GET_ALL_STRATEGIES", "GET_USER_STRATEGIES"]),

    async addStrategyHandler(id) {
      if (!id) return;
      // const userStrategy = this.allStrategies.find((s) => s.id === id);

      const newStrategy = await createStrategy(this.USER_ACCOUNT);

      newStrategy.risk_factor = STRATEGIES[0].risk_factor;
      newStrategy.apy = STRATEGIES[0].apy;
      newStrategy.totalInvestment = STRATEGIES[0].totalInvestment;
      newStrategy.portfolioShare = STRATEGIES[0].portfolioShare;

      // await preTestSetup(newStrategy["_id"]);

      this.GET_USER_STRATEGIES(newStrategy);
      for (const [key, btn] of [...this.$refs.addStrategyBtn].entries()) {
        if (btn.dataset.id === id.toString())
          this.$refs.addStrategyBtn[key].disabled = true;
      }

      const txRequest = await deployStrategy(newStrategy["_id"]);

      try {
        const txResponse = await signOperation(txRequest, this.USER_ACCOUNT);
        console.log(txResponse);
      } catch (e) {
        console.log("Sign deploy strategy: ", e);
      }

      // await putStrategy(newStrategy["_id"], this.USER_ACCOUNT);

      router.push("/");
    },

    isUserHaveStrategy(id) {
      return this.userStrategies.includes(id);
    },
  },
  computed: {
    ...mapGetters(["ALL_STRATEGIES", "USER_STRATEGIES", "USER_ACCOUNT"]),
  },
  created() {
    this.GET_USER_STRATEGIES().then((res) => {
      res.forEach((s) => {
        this.userStrategies.push(s.id);
      });
    });
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
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
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
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
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
  color: #fff;
  cursor: pointer;
  margin-bottom: 50px;
}

.question::after {
  content: "?";
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #fff;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
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
