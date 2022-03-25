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
      <div class="modal-header small">
        <input
          type="number"
          class="modal-grid-input small"
          v-model="valueForAction"
        />
        <button
          class="modal-small-btn"
          @click="modalActionBtnClickHandler(valueForAction)"
        >
          {{ modalAction.type.action }}
        </button>
      </div>
      <div class="modal-grid">
        <span class="modal-grid-header">{{
          modalAction.type["header-1"]
        }}</span>
        <span class="modal-grid-header">{{
          modalAction.type["header-2"]
        }}</span>
        <span class="modal-grid-header">{{
          modalAction.type["header-3"]
        }}</span>
        <span class="modal-grid-span">{{ modalAction.strategy.name }}</span>
        <span class="modal-grid-span">{{ modalAction.strategy.number }}</span>
        <input
          type="number"
          class="modal-grid-input"
          v-model="totalValueForAction"
        />
      </div>
      <div class="modal-body-bottom">
        <button
          class="modal-btn"
          @click="modalActionBtnClickHandler(totalValueForAction)"
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
    };
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

    modalActionBtnClickHandler(value, method) {
      this.$emit("actionButtonMethod", value, method);
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
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 28px;
  column-gap: 50px;
  color: #fff;
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
</style>
