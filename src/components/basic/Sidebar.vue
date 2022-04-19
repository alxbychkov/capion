<template>
  <div v-if="isShowSidebar" class="sidebar border-shadow">
    <div class="sidebar-header">
      <img
        src="../../assets/images/dashboard.png"
        alt="dashboard"
        class="sidebar-icon"
      />
      <p class="sidebar-title">Dashboard</p>
    </div>
    <div class="sidebar-body">
      <div class="sidebar-body-title">Total investments:</div>
      <div class="sidebar-body-total">${{ totalInvestment }}</div>
      <div class="sidebar-body-grid">
        <p class="sidebar-grid-header">PNL%</p>
        <p class="sidebar-grid-header">PNL</p>
        <p class="sidebar-grid-col">+1,34%</p>
        <p class="sidebar-grid-col fill">+32,234.05</p>
      </div>
    </div>
    <div class="sidebar-nav">
      <router-link to="/discover" custom v-slot="{ href, navigate }">
        <a :href="href" class="sidebar-link" @click="navigate">Discover</a>
      </router-link>
      <router-link to="/settings" custom v-slot="{ href, navigate }">
        <a :href="href" class="sidebar-link" @click="navigate">Settings</a>
      </router-link>
      <router-link to="/create" custom v-slot="{ href, navigate }">
        <a :href="href" class="sidebar-link" @click="navigate"
          >Create Strategy</a
        >
      </router-link>
      <router-link to="/tutuorial" custom v-slot="{ href, navigate }">
        <a :href="href" class="sidebar-link" @click="navigate">Tutuorial</a>
      </router-link>
      <router-link to="/docs" custom v-slot="{ href, navigate }">
        <a :href="href" class="sidebar-link" @click="navigate">Docs</a>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["USER_STRATEGIES"]),
    isShowSidebar: function () {
      return this.$route.meta.sidebar;
    },
    totalInvestment: function () {
      return this.USER_STRATEGIES.reduce((acc, red) => {
        return acc + +red.totalInvestment;
      }, 0);
    },
  },
  created() {},
};
</script>
<style scoped>
.sidebar {
  margin: 30px;
  padding: 23px 30px;
  max-height: 636px;
  color: #fff;
}
.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.sidebar-icon {
  margin-right: 10px;
}
.sidebar-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.sidebar-grid-header,
.sidebar-body-title {
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
}
.sidebar-body-total {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin: 5px 0;
}
.sidebar-body-grid {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  row-gap: 5px;
}
.sidebar-grid-col {
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #00ff66;
}
.sidebar-grid-col.fill {
  padding: 4px 11px;
  background: #3a945e;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.sidebar-link {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  margin-bottom: 13px;
}
</style>
