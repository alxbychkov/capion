<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body" @click.stop>
      <div class="modal-header">
        <p class="modal-title">{{ modalAction.type.title }}</p>
        <p v-if="modalAction.strategy.total" class="modal-title">
          {{ modalAction.strategy.total }}
        </p>
      </div>
      <div
        v-if="modalAction.type.action !== 'Rebalance'"
        class="modal-header small"
      >
        <input
          type="number"
          class="modal-grid-input small"
          v-model="valueForAction"
        />
        <button
          class="modal-small-btn"
          @click="modalActionBtnClickHandler(valueForAction)"
          :disabled="!valueForAction"
        >
          {{ modalAction.type.action }}
        </button>
      </div>
      <div class="modal-grid">
        <div class="modal-grid-row">
          <span class="modal-grid-header">{{
            modalAction.type["header-1"]
          }}</span>
          <span class="modal-grid-header">{{
            modalAction.type["header-2"]
          }}</span>
          <span class="modal-grid-header">{{
            modalAction.type["header-3"]
          }}</span>
        </div>
        <div
          v-for="(row, index) in modalAction.strategy.rows"
          class="modal-grid-row"
          :key="index"
        >
          <span class="modal-grid-span">{{ row["0"] }}</span>
          <span class="modal-grid-span">{{ row["1"] }}</span>
          <input
            v-if="modalAction.type.action !== 'Rebalance'"
            type="number"
            class="modal-grid-input"
            disabled
            v-model="valueForAction"
          />
          <input
            v-else
            type="number"
            class="modal-grid-input"
            v-model="rebalceValues[row['2']]"
          />
        </div>
      </div>
      <div class="modal-body-bottom">
        <button
          v-if="modalAction.type.action !== 'Rebalance'"
          class="modal-btn"
          @click="modalActionBtnClickHandler(valueForAction)"
          :disabled="!valueForAction"
        >
          {{ modalAction.type.action }}
        </button>
        <button
          v-else
          class="modal-btn"
          @click="modalActionBtnClickHandler(rebalceValues)"
          :disabled="isBtnActive"
        >
          {{ modalAction.type.action }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActionModal",
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    modalAction: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      valueForAction: "",
      totalValueForAction: "",
      rebalceValues: {
        aaveShare: "",
        sushiShare: "",
        uniShare: "",
      },
    };
  },
  computed: {
    isBtnActive() {
      let result = false;
      if (this.modalAction.strategy.rows) {
        result = true;
        if (
          this.rebalceValues.aaveShare &&
          this.rebalceValues.sushiShare &&
          this.rebalceValues.uniShare
        )
          result = false;
      }
      return result;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },

    keydownHandle(e) {
      if (this.isShow && e.key === "Escape") {
        this.close();
      }
    },

    modalActionBtnClickHandler(value) {
      this.$emit("actionButtonMethod", value, this.modalAction.strategy.id);
    },
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandle);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownHandle);
  },
};
</script>
<style scoped>
.modal-btn {
  background: var(--green-color);
  box-shadow: 0px 0px 10px var(--green-color);
  border-radius: 15px;
  padding: 10px 46px;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: var(--text-color);
  border: none;
  outline: none;
  margin-top: 50px;
  cursor: pointer;
}

.modal-grid {
  color: var(--text-color);
}

.modal-grid-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 50px;
  margin-bottom: 28px;
}

.modal-grid-header {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.modal-grid-span {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}

.modal-grid-input {
  background: var(--background-color);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  color: var(--text-color);
  padding: 5px;
}
.modal-grid-input[type="number"]::-webkit-outer-spin-button,
.modal-grid-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.modal-grid-input[type="number"] {
  -moz-appearance: textfield;
}
.modal-grid-input[type="number"]:hover,
.modal-grid-input[type="number"]:focus {
  -moz-appearance: number-input;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header.small {
  margin: 10px 0 20px;
  justify-content: flex-start;
}

.modal-small-btn {
  background: var(--green-color);
  box-shadow: 0px 0px 10px var(--green-color);
  border-radius: 15px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: var(--text-color);
  padding: 7px 21px;
  outline: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
}

.modal-grid-input.small {
  height: 35px;
  padding: 5px 10px;
}

.modal-grid-input:disabled {
  opacity: 0.5;
}

.modal-small-btn:disabled,
.modal-btn:disabled {
  cursor: default;
  opacity: 0.5;
}
</style>
