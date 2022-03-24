<template>
  <div>
    <div class="strategy-section">
      <div class="section-header">
        <div class="section__title">Strategy addition</div>
      </div>
      <div class="strategy-grid border-shadow">
        <span class="grid-header">Strategies</span>
        <span class="grid-header">Risk Factor</span>
        <span class="grid-header">APY</span>
        <span class="grid-header">Type</span>
        <span class="grid-header"></span>
        <span class="grid-span">Flex</span>
        <span class="grid-span color-green">1/5</span>
        <span class="grid-span">1.23%</span>
        <span class="grid-span">Cascade</span>
        <span class="grid-span add">Add</span>
      </div>
    </div>
    <div class="button-section">
      <button class="big-btn">Construct strategy</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "StrategyAddition",
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
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 70px;
  row-gap: 28px;
  column-gap: 20px;
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
</style>
