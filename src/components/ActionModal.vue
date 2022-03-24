<template>
  <div class="modal-window">
    <div class="modal-overlay"></div>
    <div class="modal-body">
      <p class="modal-title">Balanced withdraw</p>
      <div class="modal-grid">
        <span class="modal-grid-header">Assets</span>
        <span class="modal-grid-header">General balance</span>
        <span class="modal-grid-header">Withdraw sum</span>
        <span class="modal-grid-span">Flex</span>
        <span class="modal-grid-span">$123,234.923</span>
        <input type="number" class="modal-grid-input" />
      </div>
      <div class="modal-body-bottom">
        <button class="modal-btn">Withdraw</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActionModal",
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
</style>
