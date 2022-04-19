<template>
  <div id="app">
    <Sidebar />
    <div class="wrapper">
      <Header />
      <main class="main" :class="!isAUTHORISED ? 'no-auth' : ''">
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
    ...mapActions(["GET_isAUTHORISED", "GET_USER_ACCOUNT"]),

    async connect() {
      try {
        await accountPromise.then((account) => {
          this.GET_USER_ACCOUNT(account);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapGetters(["isAUTHORISED"]),
  },
  created() {
    if (this.isAUTHORISED) this.connect();
  },
};
</script>
