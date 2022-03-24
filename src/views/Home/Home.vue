<template>
  <no-login-form v-if="!isAUTHORISED" />
  <portfolio v-else />
</template>
<script>
import { mapGetters } from "vuex";
import Portfolio from "../../components/Portfolio.vue";
import NoLoginForm from "../../components/NoLoginForm.vue";

export default {
  name: "Home",
  components: { Portfolio, NoLoginForm },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAUTHORISED"]),
  },
};
</script>
