<template>
  <div>
    <div class="graph-section section border-shadow">
      <div class="section-header">
        <div class="section__title">My portfolio</div>
      </div>
      <div class="graph-body">
        <div class="portfolio-body__item border-shadow">
          <p class="portfoli-body__title">Flex</p>
          <div class="portfolio-body__graph"></div>
          <div class="portfolio-body__bottom">
            <div class="portfolio-bottom-coll">
              <p class="coll__title">Total assets</p>
              <p class="coll__price">$345,234.53</p>
            </div>
            <div class="portfolio-bottom-coll">
              <p class="coll__title">APY</p>
              <p class="coll__price">32.56%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolio">
      <div class="portfolio-header">
        <p class="portfolio-header__title">Portfolio</p>
        <p class="portfolio-header__total">$1,004,533</p>
      </div>
      <div class="portfolio-section section border-shadow">
        <div class="portfolio-grid grid">
          <span class="grid-header">Assets</span>
          <span class="grid-header align-end">Portfolio share</span>
          <span class="grid-header">Status</span>
          <span class="grid-header">Total investment</span>
          <span class="grid-header">Risk Factor</span>
          <span class="grid-header">APY</span>
          <span class="grid-header"></span>
          <span class="grid-span">Flex</span>
          <span class="grid-span align-end">93.23%</span>
          <span class="grid-span">Active</span>
          <span class="grid-span">$463,000,76</span>
          <span class="grid-span color-green">1/5</span>
          <span class="grid-span">13.23%</span>
          <router-link to="/monitoring" custom v-slot="{ href, navigate }">
            <a :href="href" class="grid-span settings" @click="navigate"></a>
          </router-link>
        </div>
        <div class="portfolio-section-bottom">
          <button class="action-btn">Add more assets</button>
          <button class="action-btn">Reinvest</button>
          <button class="action-btn">Withdraw money</button>
          <button class="action-btn">Rebalance assets</button>
        </div>
      </div>
    </div>
    <router-link to="/addition" custom v-slot="{ href, navigate }">
      <a :href="href" class="button-link" @click="navigate">Add new strategy</a>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Portfolio",
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

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 2fr 1.5fr 1fr 22px;
  row-gap: 28px;
  column-gap: 20px;
}

.settings::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMTMyMDkgMTIuNjI5OEMwLjk1MjcxNSAxMS41NTA1IDAuOTUyNzE1IDEwLjQ0OSAxLjEzMjA5IDkuMzY5NzdDMi4yMzQwOSA5LjM5NTc3IDMuMjI0MDkgOC44Njc3NyAzLjYwOTA5IDcuOTM4NzdDMy45OTQwOSA3LjAwODc3IDMuNjY3MDkgNS45MzQ3NyAyLjg2OTA5IDUuMTc1NzdDMy41MDU1IDQuMjg1MDUgNC4yODQ2NSAzLjUwNTU3IDUuMTc1MDkgMi44Njg3N0M1LjkzNTA5IDMuNjY2NzcgNy4wMDkwOSAzLjk5Mzc3IDcuOTM5MDkgMy42MDg3N0M4Ljg2OTA5IDMuMjIzNzcgOS4zOTYwOSAyLjIzMjc3IDkuMzY5MDkgMS4xMzE3N0MxMC40NDkgMC45NTIxNzIgMTEuNTUxMiAwLjk1MjE3MiAxMi42MzExIDEuMTMxNzdDMTIuNjA0MSAyLjIzMzc3IDEzLjEzMjEgMy4yMjM3NyAxNC4wNjExIDMuNjA4NzdDMTQuOTkxMSAzLjk5Mzc3IDE2LjA2NTEgMy42NjY3NyAxNi44MjQxIDIuODY4NzdDMTcuNzE0OCAzLjUwNTE4IDE4LjQ5NDMgNC4yODQzMyAxOS4xMzExIDUuMTc0NzdDMTguMzMzMSA1LjkzNDc3IDE4LjAwNjEgNy4wMDg3NyAxOC4zOTExIDcuOTM4NzdDMTguNzc2MSA4Ljg2ODc3IDE5Ljc2NzEgOS4zOTU3NyAyMC44NjgxIDkuMzY4NzdDMjEuMDQ3NyAxMC40NDg3IDIxLjA0NzcgMTEuNTUwOCAyMC44NjgxIDEyLjYzMDhDMTkuNzY2MSAxMi42MDM4IDE4Ljc3NjEgMTMuMTMxOCAxOC4zOTExIDE0LjA2MDhDMTguMDA2MSAxNC45OTA4IDE4LjMzMzEgMTYuMDY0OCAxOS4xMzExIDE2LjgyMzhDMTguNDk0NyAxNy43MTQ1IDE3LjcxNTUgMTguNDk0IDE2LjgyNTEgMTkuMTMwOEMxNi4wNjUxIDE4LjMzMjggMTQuOTkxMSAxOC4wMDU4IDE0LjA2MTEgMTguMzkwOEMxMy4xMzExIDE4Ljc3NTggMTIuNjA0MSAxOS43NjY4IDEyLjYzMTEgMjAuODY3OEMxMS41NTEyIDIxLjA0NzQgMTAuNDQ5IDIxLjA0NzQgOS4zNjkwOSAyMC44Njc4QzkuMzk2MDkgMTkuNzY1OCA4Ljg2ODA5IDE4Ljc3NTggNy45MzkwOSAxOC4zOTA4QzcuMDA5MDkgMTguMDA1OCA1LjkzNTA5IDE4LjMzMjggNS4xNzYwOSAxOS4xMzA4QzQuMjg1MzggMTguNDk0NCAzLjUwNTg5IDE3LjcxNTIgMi44NjkwOSAxNi44MjQ4QzMuNjY3MDkgMTYuMDY0OCAzLjk5NDA5IDE0Ljk5MDggMy42MDkwOSAxNC4wNjA4QzMuMjI0MDkgMTMuMTMwOCAyLjIzMzA5IDEyLjYwMzggMS4xMzIwOSAxMi42MzA4VjEyLjYyOThaTTExLjAwMDEgMTMuOTk5OEMxMS43OTU3IDEzLjk5OTggMTIuNTU4OCAxMy42ODM3IDEzLjEyMTQgMTMuMTIxMUMxMy42ODQgMTIuNTU4NSAxNC4wMDAxIDExLjc5NTQgMTQuMDAwMSAxMC45OTk4QzE0LjAwMDEgMTAuMjA0MSAxMy42ODQgOS40NDEwNiAxMy4xMjE0IDguODc4NDVDMTIuNTU4OCA4LjMxNTg0IDExLjc5NTcgNy45OTk3NyAxMS4wMDAxIDcuOTk5NzdDMTAuMjA0NCA3Ljk5OTc3IDkuNDQxMzggOC4zMTU4NCA4Ljg3ODc3IDguODc4NDVDOC4zMTYxNiA5LjQ0MTA2IDguMDAwMDkgMTAuMjA0MSA4LjAwMDA5IDEwLjk5OThDOC4wMDAwOSAxMS43OTU0IDguMzE2MTYgMTIuNTU4NSA4Ljg3ODc3IDEzLjEyMTFDOS40NDEzOCAxMy42ODM3IDEwLjIwNDQgMTMuOTk5OCAxMS4wMDAxIDEzLjk5OThaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);
  cursor: pointer;
}
</style>
