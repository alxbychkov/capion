<template>
  <no-login-form v-if="!isAuthorised" />
  <portfolio v-else />
</template>
<script>
import Portfolio from "../../components/Portfolio.vue";
import NoLoginForm from "../../components/NoLoginForm.vue";

export default {
  name: "Home",
  components: { Portfolio, NoLoginForm },
  data() {
    return {
      isAuthorised: true,
    };
  },
};
</script>
