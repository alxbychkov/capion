<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body" @click.stop>
      <div class="modal-header">
        <p class="modal-title">{{ modalAction.type.title }}</p>
      </div>
      <div v-if="modalAction.type['header-1']" class="modal-grid">
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
          <span class="modal-grid-span">{{ row["1"] }}%</span>
          <input
            type="number"
            class="modal-grid-input"
            v-model="rebalceValues[row['2']]"
          />
        </div>
      </div>
      <div v-if="modalAction.type['text-1']" class="modal-text">
        {{ modalAction.type["text-1"] }}
      </div>
      <div class="modal-body-bottom">
        <button
          class="modal-btn"
          :class="
            modalAction.type.title === 'Emergent withdraw' ? 'color-red' : ''
          "
          :disabled="isBtnActive"
          @click="modalActionBtnClickHandler(rebalceValues)"
        >
          {{ modalAction.type.action }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MonitoringModal",
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
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 15px;
  padding: 10px 46px;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #fff;
  border: none;
  outline: none;
  margin-top: 50px;
  cursor: pointer;
  width: 100%;
  max-width: 570px;
}

.modal-btn.color-red {
  background: #ff1414;
}

.modal-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  margin-top: 50px;
}

.modal-grid {
  color: #fff;
  margin-top: 30px;
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
  background: #323030;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  color: #fff;
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
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 15px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
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

.modal-body-bottom {
  justify-content: center;
}
</style>
