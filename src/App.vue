<template>
  <div id="app">
    <Sidebar v-if="USER_ACCOUNT" />
    <div class="wrapper">
      <Header />
      <main
        class="main"
        :class="!isAUTHORISED || !USER_ACCOUNT ? 'no-auth' : ''"
      >
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
      <Footer />
    </div>
  </div>
</template>
<script>
import "./index.css";
import Footer from "./components/basic/Footer.vue";
import Header from "./components/basic/Header.vue";
import Sidebar from "./components/basic/Sidebar.vue";
import { mapGetters, mapActions } from "vuex";
import { accountPromise } from "./core/metamask";

export default {
  name: "App",
  components: { Header, Footer, Sidebar },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "GET_isAUTHORISED",
      "GET_USER_ACCOUNT",
      "GET_USER_STRATEGIES",
    ]),

    async connect() {
      try {
        await accountPromise.then((account) => {
          this.GET_USER_ACCOUNT(account);
        });
      } catch (e) {
        this.$router.push("login");
        console.error(e);
      }
    },
  },
  computed: {
    ...mapGetters(["isAUTHORISED", "USER_ACCOUNT"]),
  },
  created() {
    if (this.isAUTHORISED) {
      this.connect().then(() =>
        this.GET_USER_STRATEGIES({ account: this.USER_ACCOUNT })
      );
    }
    if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") === "light"
    )
      document.documentElement.classList.remove("dark-theme");
  },
  mounted() {},
};
</script>
