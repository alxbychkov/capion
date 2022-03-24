<template>
  <div id="app">
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { Header, Footer },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GET_isAUTHORISED"]),
  },
  computed: {
    ...mapGetters(["isAUTHORISED"]),
  },
  created() {},
};
</script>
