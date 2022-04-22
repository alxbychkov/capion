<template>
  <div v-if="strategy.name" class="monitoring-section border-shadow">
    <div class="section-header">
      <div class="section__title">{{ strategy.name }}</div>
      <div class="strategy-actions">
        <button class="st-actions-btn yellow">Pause</button>
        <button
          class="st-actions-btn red"
          :disabled="ALL_STRATEGIES[0].totalInvestment === 0"
          @click="actionBtnClickHandler('withdraw')"
        >
          Emergent withdraw
        </button>
      </div>
    </div>
    <div class="strategy-info">
      <div class="strategy-info-item">
        <p class="info-text">50%</p>
        <p class="info-text">Leveraged strategy Aave on InstaDapp</p>
        <ul class="info-list">
          <li>6X USDC Collateral/ 5X USDC Loan</li>
          <li>84% collateral factor</li>
          <li>AAVE farming rewards (staking 10d cool-off)</li>
          <li>INST farming rewards</li>
          <li>Volatility only of farming rewards</li>
        </ul>
      </div>
      <div class="strategy-info-item">
        <p class="info-text">25%</p>
        <p class="info-text">Market-Making on Uniswap v3</p>
        <ul class="info-list">
          <li>DAI/ETH Liquidity pool</li>
          <li>Interval (+30%/-30%)</li>
          <li>Periodical rebalancing</li>
          <li>Commissions in DAI/ETH</li>
        </ul>
      </div>
      <div class="strategy-info-item">
        <p class="info-text">25%</p>
        <p class="info-text">Market-Making on Sushiswap</p>
        <ul class="info-list">
          <li>YYDAI/ETH Liquidity pool</li>
          <li>YYDAI Yearn+Curve asset</li>
          <li>SUSHI farming rewards</li>
          <li>Trading commissions</li>
        </ul>
      </div>
    </div>
    <button class="rebalance-btn" @click="actionBtnClickHandler('rebalance')">
      Rebalance share
    </button>
    <div class="strategy-assets">
      <div class="asset-row">
        <div class="asset-row__name">APY</div>
        <div class="asset-row__number">{{ ALL_STRATEGIES[0].apy }}%</div>
      </div>
      <div class="asset-row double-row">
        <div class="asset-row__name">Risk Factor</div>
        <div class="asset-row__number">
          {{ ALL_STRATEGIES[0].risk_factor }}
        </div>
      </div>
      <div class="asset-row">
        <div class="asset-row__name">Total investments</div>
        <div class="asset-row__number">
          ${{ ALL_STRATEGIES[0].totalInvestment }}
        </div>
      </div>
    </div>
    <div class="strategy-bottom">
      <p class="strategy-bottom-text">Status: Paused</p>
      <p class="strategy-bottom-text">Recent activity</p>
      <div class="strategy-bottom-grid">
        <span class="st-grid-title">Assets</span>
        <span class="st-grid-title">Discription</span>
        <span class="st-grid-title align-end">Balance</span>
        <span class="st-grid-span">USDT</span>
        <span class="st-grid-span">Deposit</span>
        <span class="st-grid-span color-green align-end">$123,232.23</span>
        <span class="st-grid-span">ETH</span>
        <span class="st-grid-span">Withdraw</span>
        <span class="st-grid-span color-red align-end">$100.23</span>
      </div>
    </div>
    <monitoring-modal
      v-if="isShowModal"
      :isShow="isShowModal"
      :modalAction="modalAction"
      @close="closeModal"
      @actionButtonMethod="this.modalAction.strategy.method"
    />
  </div>
</template>
<script>
import {
  getStrategy,
  rebalanceShare,
  strategyAllWithdraw,
} from "../../core/api.js";
import MonitoringModal from "../../components/Modals/MonitoringModal.vue";
import { MODAL_TYPES } from "../../helpers/modalTypes";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Monitoring",
  components: { MonitoringModal },
  data() {
    return {
      strategy: "",
      isShowModal: false,
      modalAction: "",
    };
  },
  computed: {
    ...mapGetters(["USER_STRATEGIES", "ALL_STRATEGIES"]),
  },
  methods: {
    ...mapActions(["GET_ALL_STRATEGIES"]),

    actionBtnClickHandler(action) {
      switch (action) {
        case "rebalance":
          this.modalAction = {
            type: MODAL_TYPES.REBALANCE,
            strategy: {
              id: this.USER_STRATEGIES[0]._id,
              rows: [
                {
                  0: "AAVE",
                  1: this.USER_STRATEGIES[0].config.split["aaveShare"],
                  2: "aaveShare",
                },
                {
                  0: "Uniswap v3",
                  1: this.USER_STRATEGIES[0].config.split["sushiShare"],
                  2: "sushiShare",
                },
                {
                  0: "Sushiswap",
                  1: this.USER_STRATEGIES[0].config.split["uniShare"],
                  2: "uniShare",
                },
              ],
              method: this.rebalance,
            },
          };
          break;
        case "withdraw":
          this.modalAction = {
            type: MODAL_TYPES.EMERGENT_WITHDRAW,
            strategy: {
              method: this.withdraw,
            },
          };
      }

      this.isShowModal = true;
    },

    async rebalance(values) {
      console.log(
        `Rebalance share ${values["aaveShare"]} ${values["sushiShare"]} ${values["uniShare"]}`
      );
      await rebalanceShare(this.$route.params.id, values);
    },

    async withdraw() {
      console.log(`All withdraw ${this.USER_STRATEGIES[0].totalInvestment}`);
      await strategyAllWithdraw(
        this.$route.params.id,
        this.USER_STRATEGIES[0].totalInvestment
      );
    },

    closeModal() {
      this.modalAction = "";
      this.isShowModal = false;
    },
  },
  created() {
    getStrategy(this.$route.params.id).then((res) => (this.strategy = res));
    this.GET_ALL_STRATEGIES();
  },
};
</script>
<style scoped>
.monitoring-section {
  padding: 30px 60px;
  margin-bottom: 50px;
}

.strategy-info {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 27px;
}

.strategy-info-item {
  width: 30%;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: var(--text-color);
}

.strategy-info-item:first-child {
  width: 40%;
}

.info-list {
  list-style: none;
}
.info-list li {
  padding-right: 5px;
}
.info-list li::before {
  content: "-";
  margin-right: 5px;
}

.rebalance-btn {
  background: var(--green-color-col);
  box-shadow: 0px 0px 10px var(--green-color-col);
  border-radius: 15px;
  padding: 6px 46px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: var(--text-color);
  border: none;
  outline: none;
  cursor: pointer;
}

.strategy-assets {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 270px;
  row-gap: 20px;
  column-gap: 60px;
}

.asset-row {
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 15px;
}

.asset-row.double-row {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  flex-direction: column;
}

.asset-row__name,
.asset-row__number {
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: var(--text-color);
}

.asset-row__number {
  color: var(--green-color-col);
}

.asset-row.double-row .asset-row__number {
  font-weight: 700;
  font-size: 70px;
  line-height: 85px;
}

.strategy-bottom {
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 15px;
  padding: 24px 30px 100px;
  margin-top: 30px;
  color: var(--text-color);
}

.strategy-bottom-text {
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 24px;
}

.strategy-bottom-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  row-gap: 23px;
}

.st-grid-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.st-grid-span {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}

.st-grid-span.color-green {
  color: var(--green-color-col);
}

.st-grid-span.color-red {
  color: var(--red-color);
}

.strategy-actions {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
}

.st-actions-btn {
  border-radius: 15px;
  padding: 2px 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: var(--text-color);
  border: none;
  outline: none;
  cursor: pointer;
}

.st-actions-btn:disabled {
  cursor: default;
  opacity: 0.5;
}

.st-actions-btn:not(:last-of-type) {
  margin-bottom: 10px;
}

.st-actions-btn.yellow {
  background: var(--yellow-color);
  box-shadow: 0px 0px 10px var(--yellow-color);
}

.st-actions-btn.red {
  background: var(--red-color);
  box-shadow: 0px 0px 10px var(--red-color);
}

.monitoring-section .section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
