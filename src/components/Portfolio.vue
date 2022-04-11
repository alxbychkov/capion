<template>
  <div>
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
          <p class="portfoli-body__title">{{ strategy.name }}</p>
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
              :to="{ name: 'Monitoring', params: { id: strategy.id } }"
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
          <button class="action-btn" @click="testEth">Reinvest</button>
          <button class="action-btn" @click="actionBtnClickHandler('withdraw')">
            Withdraw money
          </button>
          <button
            class="action-btn"
            @click="actionBtnClickHandler('rebalance')"
            :disabled="+USER_STRATEGIES[0].totalInvestment"
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
import { mapGetters, mapActions } from "vuex";
import ActionModal from "./ActionModal.vue";
import { MODAL_TYPES } from "../helpers/modalTypes";
import {
  firstStrategyDeposit,
  rebalanceShare,
  strategyAllWithdraw,
  strategyDeposit,
  strategyWithdraw,
} from "../core/api";
import Chart from "./elements/Chart.vue";
// eslint-disable-next-line no-unused-vars
import { ethers } from "ethers";

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
    ...mapActions(["GET_USER_STRATEGIES"]),

    actionBtnClickHandler(action) {
      switch (action) {
        case "deposit":
          this.modalAction = {
            type: MODAL_TYPES.DEPOSIT,
            strategy: {
              id: this.USER_STRATEGIES[0].id,
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
              id: this.USER_STRATEGIES[0].id,
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
              id: this.USER_STRATEGIES[0].id,
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
      if (+this.USER_STRATEGIES[0].totalInvestment === 0) {
        console.log(`1. Total ${id} investment 0. Deposit: `, value);
        await firstStrategyDeposit(id, value);
      } else {
        console.log(
          `2. Total investment ${this.USER_STRATEGIES[0].totalInvestment}. Deposit: `,
          value
        );
        await strategyDeposit(id, value);
      }
    },

    async withdraw(value, id) {
      if (+this.USER_STRATEGIES[0].totalInvestment === +value) {
        console.log(`1. Withdraw all ${id}. `, value);
        await strategyAllWithdraw(id, value);
      } else {
        console.log(`2. Withdraw ${id}. `, value);
        await strategyWithdraw(id, value);
      }
    },

    async rebalance(values) {
      console.log(
        `Rebalance share ${values["aaveShare"]} ${values["sushiShare"]} ${values["uniShare"]}`
      );
      await rebalanceShare(this.$route.params.id, values);
    },

    closeModal() {
      this.modalAction = "";
      this.isShowModal = false;
    },

    async testEth() {
      const transactionParameters = {
        nonce: "0x00", // ignored by MetaMask
        gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
        gas: "", // customizable by user during MetaMask confirmation.
        to: "0x7ba0682BBBc7D31836967D99fCcCaFE53CecB316", // Required except during contract publications.
        from: this.USER_ACCOUNT, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: "0x44882b95", // Optional, but used for defining smart contract creation and interaction.
        chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      // window.ethereum
      //   .request({
      //     method: "eth_sendTransaction",
      //     params: [transactionParameters],
      //   })
      //   .then((txHash) => console.log(txHash))
      //   .catch((error) => console.error(error));

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(this.USER_ACCOUNT);
      const tx = await signer.sendTransaction(transactionParameters);
      console.log(tx);
    },
  },
  computed: {
    ...mapGetters(["USER_STRATEGIES", "USER_ACCOUNT"]),

    allTotalInvestment: function () {
      return this.USER_STRATEGIES.reduce((acc, red) => {
        return acc + +red.totalInvestment;
      }, 0);
    },
  },
  created() {
    this.GET_USER_STRATEGIES();
  },
  mounted() {},
};
</script>
<style scoped>
.graph-section {
  margin: 20px 0 30px;
}

.portfolio {
  margin-bottom: 35px;
}

.portfolio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
  color: #fff;
}

.portfolio-header__title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.portfolio-header__total {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
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

.portfoli-body__title {
  color: #fff;
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
  color: #fff;
}

.coll__title {
  margin-bottom: 5px;
}

.coll__price {
  color: #92df95;
}

.button-link {
  background: #6fc872;
  box-shadow: 0px 0px 10px #6fc872;
  border-radius: 15px;
  color: #fff;
  padding: 5px 40px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  display: inline-block;
}

.portfolio-section {
  padding-bottom: 30px;
  min-height: 345px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.portfolio-section-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
}

.action-btn {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 8px 16px;
  background: #323030;
  outline: none;
  border: none;
  min-width: 200px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
}

.action-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.portfolio-grid-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 2fr 1.5fr 1fr 22px;
  column-gap: 20px;
  margin-bottom: 28px;
}

.settings::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMTMyMDkgMTIuNjI5OEMwLjk1MjcxNSAxMS41NTA1IDAuOTUyNzE1IDEwLjQ0OSAxLjEzMjA5IDkuMzY5NzdDMi4yMzQwOSA5LjM5NTc3IDMuMjI0MDkgOC44Njc3NyAzLjYwOTA5IDcuOTM4NzdDMy45OTQwOSA3LjAwODc3IDMuNjY3MDkgNS45MzQ3NyAyLjg2OTA5IDUuMTc1NzdDMy41MDU1IDQuMjg1MDUgNC4yODQ2NSAzLjUwNTU3IDUuMTc1MDkgMi44Njg3N0M1LjkzNTA5IDMuNjY2NzcgNy4wMDkwOSAzLjk5Mzc3IDcuOTM5MDkgMy42MDg3N0M4Ljg2OTA5IDMuMjIzNzcgOS4zOTYwOSAyLjIzMjc3IDkuMzY5MDkgMS4xMzE3N0MxMC40NDkgMC45NTIxNzIgMTEuNTUxMiAwLjk1MjE3MiAxMi42MzExIDEuMTMxNzdDMTIuNjA0MSAyLjIzMzc3IDEzLjEzMjEgMy4yMjM3NyAxNC4wNjExIDMuNjA4NzdDMTQuOTkxMSAzLjk5Mzc3IDE2LjA2NTEgMy42NjY3NyAxNi44MjQxIDIuODY4NzdDMTcuNzE0OCAzLjUwNTE4IDE4LjQ5NDMgNC4yODQzMyAxOS4xMzExIDUuMTc0NzdDMTguMzMzMSA1LjkzNDc3IDE4LjAwNjEgNy4wMDg3NyAxOC4zOTExIDcuOTM4NzdDMTguNzc2MSA4Ljg2ODc3IDE5Ljc2NzEgOS4zOTU3NyAyMC44NjgxIDkuMzY4NzdDMjEuMDQ3NyAxMC40NDg3IDIxLjA0NzcgMTEuNTUwOCAyMC44NjgxIDEyLjYzMDhDMTkuNzY2MSAxMi42MDM4IDE4Ljc3NjEgMTMuMTMxOCAxOC4zOTExIDE0LjA2MDhDMTguMDA2MSAxNC45OTA4IDE4LjMzMzEgMTYuMDY0OCAxOS4xMzExIDE2LjgyMzhDMTguNDk0NyAxNy43MTQ1IDE3LjcxNTUgMTguNDk0IDE2LjgyNTEgMTkuMTMwOEMxNi4wNjUxIDE4LjMzMjggMTQuOTkxMSAxOC4wMDU4IDE0LjA2MTEgMTguMzkwOEMxMy4xMzExIDE4Ljc3NTggMTIuNjA0MSAxOS43NjY4IDEyLjYzMTEgMjAuODY3OEMxMS41NTEyIDIxLjA0NzQgMTAuNDQ5IDIxLjA0NzQgOS4zNjkwOSAyMC44Njc4QzkuMzk2MDkgMTkuNzY1OCA4Ljg2ODA5IDE4Ljc3NTggNy45MzkwOSAxOC4zOTA4QzcuMDA5MDkgMTguMDA1OCA1LjkzNTA5IDE4LjMzMjggNS4xNzYwOSAxOS4xMzA4QzQuMjg1MzggMTguNDk0NCAzLjUwNTg5IDE3LjcxNTIgMi44NjkwOSAxNi44MjQ4QzMuNjY3MDkgMTYuMDY0OCAzLjk5NDA5IDE0Ljk5MDggMy42MDkwOSAxNC4wNjA4QzMuMjI0MDkgMTMuMTMwOCAyLjIzMzA5IDEyLjYwMzggMS4xMzIwOSAxMi42MzA4VjEyLjYyOThaTTExLjAwMDEgMTMuOTk5OEMxMS43OTU3IDEzLjk5OTggMTIuNTU4OCAxMy42ODM3IDEzLjEyMTQgMTMuMTIxMUMxMy42ODQgMTIuNTU4NSAxNC4wMDAxIDExLjc5NTQgMTQuMDAwMSAxMC45OTk4QzE0LjAwMDEgMTAuMjA0MSAxMy42ODQgOS40NDEwNiAxMy4xMjE0IDguODc4NDVDMTIuNTU4OCA4LjMxNTg0IDExLjc5NTcgNy45OTk3NyAxMS4wMDAxIDcuOTk5NzdDMTAuMjA0NCA3Ljk5OTc3IDkuNDQxMzggOC4zMTU4NCA4Ljg3ODc3IDguODc4NDVDOC4zMTYxNiA5LjQ0MTA2IDguMDAwMDkgMTAuMjA0MSA4LjAwMDA5IDEwLjk5OThDOC4wMDAwOSAxMS43OTU0IDguMzE2MTYgMTIuNTU4NSA4Ljg3ODc3IDEzLjEyMTFDOS40NDEzOCAxMy42ODM3IDEwLjIwNDQgMTMuOTk5OCAxMS4wMDAxIDEzLjk5OThaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);
  cursor: pointer;
}
</style>
