<template>
  <div id="app">
    <div class="wrapper">
      <Header :isAuthorised="isAuthorised" />
      <main class="main" :class="!isAuthorised ? 'no-auth' : ''">
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

export default {
  name: "App",
  components: { Header, Footer },
  data() {
    return {
      isAuthorised: true,
    };
  },
};
</script>
