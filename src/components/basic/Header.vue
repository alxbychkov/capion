<template>
  <header class="header">
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a :href="href" class="project-logo" @click="navigate"><ProjectLogo /></a>
    </router-link>
    <div class="header-login">
      <a href="#" class="user-info" v-if="isAuthorised">
        <p class="user-name">Alex</p>
        <p class="user-address">wef2sdsada24f3ds</p>
      </a>
      <a href="#" v-else class="contact-us-btn">Contact us</a>
      <a href="#" class="login-icon"><LoginIcon /></a>
    </div>
  </header>
</template>
<script>
import ProjectLogo from "./Logo.vue";
import LoginIcon from "./LoginIcon.vue";

export default {
  name: "Header",
  components: { ProjectLogo, LoginIcon },
  props: {
    isAuthorised: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    console.log("auth", this.isAuthorised);
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35px 20px;
}

.header-login {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  text-align: center;
  padding: 5px 14px;
  border: 1px solid #fff;
  color: #fff;
}

.user-name {
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
}

.user-address {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
}

.login-icon {
  margin-left: 44px;
}

.contact-us-btn {
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 15px;
  padding: 12px 51px;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  color: #fff;
  display: block;
}
</style>
