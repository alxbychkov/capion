<template>
  <div v-if="USER_ACCOUNT">
    <div
      v-if="USER_STRATEGIES.length"
      class="graph-section section border-shadow"
    >
      <div class="section-header">
        <div class="section__title">My portfolio</div>
      </div>
      <div class="graph-body">
        <div
          v-for="strategy in USER_STRATEGIES"
          :key="strategy.id"
          class="portfolio-body__item border-shadow"
        >
          <p class="portfolio-body__title">{{ strategy.name }}</p>
          <div class="portfolio-body__graph">
            <Chart />
          </div>
          <div class="portfolio-body__bottom">
            <div class="portfolio-bottom-coll">
              <p class="coll__title">Total assets</p>
              <p class="coll__price">${{ strategy.totalInvestment }}</p>
            </div>
            <div class="portfolio-bottom-coll">
              <p class="coll__title">APY</p>
              <p class="coll__price">{{ strategy.apy }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolio">
      <div class="portfolio-header">
        <p class="portfolio-header__title">Portfolio</p>
        <p class="portfolio-header__total">${{ allTotalInvestment }}</p>
      </div>
      <div class="portfolio-section section border-shadow">
        <div class="portfolio-grid grid">
          <div class="portfolio-grid-row">
            <span class="grid-header">Assets</span>
            <span class="grid-header align-end">Portfolio share</span>
            <span class="grid-header">Status</span>
            <span class="grid-header">Total investment</span>
            <span class="grid-header">Risk Factor</span>
            <span class="grid-header">APY</span>
            <span class="grid-header"></span>
          </div>
          <div
            class="portfolio-grid-row"
            v-for="strategy in USER_STRATEGIES"
            :key="strategy.id"
          >
            <span class="grid-span">{{ strategy.name }}</span>
            <span class="grid-span align-end"
              >{{ strategy.portfolioShare }}%</span
            >
            <span class="grid-span">{{
              strategy.isActive ? "Active" : "Inactive"
            }}</span>
            <span class="grid-span">${{ strategy.totalInvestment }}</span>
            <span class="grid-span color-green">{{
              strategy.risk_factor
            }}</span>
            <span class="grid-span">{{ strategy.apy }}%</span>
            <router-link
              :to="{ name: 'Monitoring', params: { id: strategy._id } }"
              custom
              v-slot="{ href, navigate }"
            >
              <a :href="href" class="grid-span settings" @click="navigate"></a>
            </router-link>
          </div>
        </div>
        <div v-if="USER_STRATEGIES.length" class="portfolio-section-bottom">
          <button class="action-btn" @click="actionBtnClickHandler('deposit')">
            Deposit
          </button>
          <button class="action-btn" @click="preTest" disabled>Reinvest</button>
          <button
            class="action-btn"
            @click="actionBtnClickHandler('withdraw')"
            :disabled="+USER_STRATEGIES[0].totalInvestment"
          >
            Withdraw money
          </button>
          <button
            class="action-btn"
            @click="actionBtnClickHandler('rebalance')"
          >
            Rebalance assets
          </button>
        </div>
      </div>
    </div>
    <router-link to="/addition" custom v-slot="{ href, navigate }">
      <a :href="href" class="button-link" @click="navigate">Add new strategy</a>
    </router-link>
    <action-modal
      v-if="isShowModal"
      :isShow="isShowModal"
      :modalAction="modalAction"
      @close="closeModal"
      @actionButtonMethod="this.modalAction.strategy.method"
    />
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from "vuex";
import ActionModal from "../../components/Modals/ActionModal.vue";
import { MODAL_TYPES } from "../../helpers/modalTypes";
import {
  firstStrategyDeposit,
  putOperation,
  rebalanceShare,
  strategyAllWithdraw,
  strategyDeposit,
  strategyWithdraw,
} from "../../core/api";
import Chart from "../../components/elements/Chart.vue";
import { signDataWithWeb3, signOperation } from "../../core/eth";

export default {
  name: "Portfolio",
  components: { ActionModal, Chart },
  data() {
    return {
      isShowModal: false,
      modalAction: "",
    };
  },
  methods: {
    ...mapActions(["GET_USER_STRATEGIES", "GET_ALL_STRATEGIES"]),

    actionBtnClickHandler(action) {
      switch (action) {
        case "deposit":
          this.modalAction = {
            type: MODAL_TYPES.DEPOSIT,
            strategy: {
              id: this.USER_STRATEGIES[0]._id,
              total: this.USER_STRATEGIES[0].totalInvestment,
              name: this.USER_STRATEGIES[0].name,
              number: `${this.USER_STRATEGIES[0].portfolioShare}%`,
              rows: [
                {
                  0: this.USER_STRATEGIES[0].name,
                  1: `${this.USER_STRATEGIES[0].portfolioShare}%`,
                },
              ],
              method: this.deposit,
            },
          };
          break;
        case "withdraw":
          this.modalAction = {
            type: MODAL_TYPES.WITHDRAW,
            strategy: {
              id: this.USER_STRATEGIES[0]._id,
              total: "",
              name: this.USER_STRATEGIES[0].name,
              number: `$${this.USER_STRATEGIES[0].totalInvestment}`,
              rows: [
                {
                  0: this.USER_STRATEGIES[0].name,
                  1: `$${this.USER_STRATEGIES[0].totalInvestment}`,
                },
              ],
              method: this.withdraw,
            },
          };
          break;
        case "rebalance":
          this.modalAction = {
            type: MODAL_TYPES.REBALANCE,
            strategy: {
              id: this.USER_STRATEGIES[0]._id,
              rows: [
                {
                  0: "AAVE",
                  1: `${this.USER_STRATEGIES[0].config.split["aaveShare"]}%`,
                  2: "aaveShare",
                },
                {
                  0: "Uniswap v3",
                  1: `${this.USER_STRATEGIES[0].config.split["sushiShare"]}%`,
                  2: "sushiShare",
                },
                {
                  0: "Sushiswap",
                  1: `${this.USER_STRATEGIES[0].config.split["uniShare"]}%`,
                  2: "uniShare",
                },
              ],
              method: this.rebalance,
            },
          };
          break;
      }

      this.isShowModal = true;
    },

    async deposit(value, id) {
      if (this.USER_STRATEGIES[0].position === undefined) {
        console.log(`1. Total ${id} investment 0. Deposit: `, value);
        try {
          const { tx, operationId } = await firstStrategyDeposit(id, value);
          const txResponse = await signOperation(tx);
          console.log(txResponse);
          await putOperation(id, txResponse, operationId);
          await this.updateUserStrategiesData();
        } catch (e) {
          console.log("First deposit error:", e);
        }
      } else {
        console.log(
          `2. Total investment ${this.USER_STRATEGIES[0].totalInvestment}. Deposit: `,
          value
        );
        try {
          const { tx, operationId } = await strategyDeposit(id, value);
          const txResponse = await signOperation(tx);
          console.log(txResponse);
          await putOperation(id, txResponse, operationId);
        } catch (e) {
          console.log("Deposit error:", e);
        }
      }
    },

    async withdraw(value, id) {
      if (+this.USER_STRATEGIES[0].totalInvestment === +value) {
        console.log(`1. Withdraw all ${id}. `, value);
        await strategyAllWithdraw(id, value);
      } else {
        console.log(`2. Withdraw ${id}. `, value);
        const { tx, operationId } = await strategyWithdraw(id, value);
        console.log(tx, operationId);
        const txResponse = await signOperation(tx);
        console.log(txResponse);
        await putOperation(id, txResponse, operationId);
      }
    },

    async rebalance(values, id) {
      console.log(
        `Rebalance share ${values["aaveShare"]} ${values["sushiShare"]} ${values["uniShare"]}`
      );
      const { tx, operationId } = await rebalanceShare(id, values);
      console.log(tx, operationId);
      const txResponse = await signOperation(tx);
      console.log(txResponse);
    },

    async preTest() {
      return;
    },

    async updateUserStrategiesData() {
      await this.GET_USER_STRATEGIES();
      this.closeModal();
      this.$forceUpdate();
    },

    closeModal() {
      this.modalAction = "";
      this.isShowModal = false;
    },
  },
  computed: {
    ...mapGetters(["USER_STRATEGIES", "USER_ACCOUNT", "ALL_STRATEGIES"]),

    allTotalInvestment: function () {
      return this.USER_STRATEGIES.reduce((acc, red) => {
        return acc + +red.totalInvestment;
      }, 0);
    },
  },
  created() {
    this.GET_ALL_STRATEGIES();
  },
  mounted() {},
};
</script>
<style scoped>
.graph-section {
  margin: 20px 0 30px;
}

.graph-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.portfolio-body__item {
  width: 49%;
  padding: 12px 30px;
}

.portfolio-body__title {
  color: var(--text-color);
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 25px;
}

.portfolio-body__bottom {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.portfolio-bottom-coll {
  width: 49%;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: var(--text-color);
}

.coll__title {
  margin-bottom: 5px;
}

.coll__price {
  color: var(--green-color-col);
}

.portfolio-section-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
}

.action-btn {
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 15px;
  padding: 8px 16px;
  background: var(--background-color);
  outline: none;
  border: none;
  min-width: 200px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: var(--text-color);
  cursor: pointer;
}

.action-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.settings::after {
  content: var(--settings-icon-url);
  cursor: pointer;
}
</style>
