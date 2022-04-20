<template>
  <div>
    <div class="portfolio">
      <div class="portfolio-header">
        <p class="portfolio-header__title">My awesome portfolio</p>
        <p class="portfolio-header__total">
          <span>12.34%</span> <span>$1,004,533</span>
        </p>
      </div>
      <div class="portfolio-section section border-shadow">
        <div class="portfolio-grid grid">
          <div class="portfolio-account">Account: Admin</div>
          <div class="portfolio-grid-row">
            <span class="grid-header">Assets</span>
            <span class="grid-header align-end">Portfolio share</span>
            <span class="grid-header">Status</span>
            <span class="grid-header">Total investment</span>
            <span class="grid-header">Risk Factor</span>
            <span class="grid-header">APY</span>
          </div>
          <div
            class="portfolio-grid-row"
            v-for="strategy in ALL_STRATEGIES"
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
          </div>
        </div>
        <router-link to="/addition" custom v-slot="{ href, navigate }">
          <a :href="href" class="button-link" @click="navigate"
            >Add new strategy</a
          >
        </router-link>
      </div>
    </div>
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a :href="href" class="button-link transparent" @click="navigate"
        >Add another portfolio</a
      >
    </router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Discover",
  methods: {
    ...mapActions(["GET_USER_STRATEGIES", "GET_ALL_STRATEGIES"]),
  },
  computed: {
    ...mapGetters(["USER_STRATEGIES", "USER_ACCOUNT", "ALL_STRATEGIES"]),
  },
  created() {
    this.GET_USER_STRATEGIES();
    this.GET_ALL_STRATEGIES();
  },
};
</script>
<style scoped>
.button-link {
  width: max-content;
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-shadow);
}
.button-link.transparent {
  background: transparent;
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
}
.portfolio-header__total span:not(:last-of-type) {
  margin-right: 25px;
}
.portfolio-account {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: var(--text-color);
  margin-bottom: 18px;
}
</style>
