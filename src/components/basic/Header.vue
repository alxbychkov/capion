<template>
  <header class="header">
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a :href="href" class="project-logo" @click="navigate"><ProjectLogo /></a>
    </router-link>
    <div class="header-login">
      <a
        v-if="isAUTHORISED && USER_ACCOUNT"
        href="#"
        class="user-info"
        :title="USER_ACCOUNT"
      >
        <p class="user-name">Account:</p>
        <p v-if="USER_ACCOUNT" class="user-address">
          {{ USER_ACCOUNT }}
        </p>
      </a>
      <a
        href="#"
        v-if="!isAUTHORISED"
        class="contact-us-btn"
        @click="isShowModal = true"
        >Contact us</a
      >
      <a href="#" class="login-icon"><LoginIcon /></a>
    </div>
    <contact-us-modal
      v-if="!isAUTHORISED"
      :isShow="isShowModal"
      @close="isShowModal = false"
    />
  </header>
</template>
<script>
import { mapGetters } from "vuex";
import ProjectLogo from "./Logo.vue";
import LoginIcon from "./LoginIcon.vue";
import ContactUsModal from "../Modals/ContactUsModal.vue";

export default {
  name: "Header",
  components: { ProjectLogo, LoginIcon, ContactUsModal },
  data() {
    return {
      isShowModal: false,
    };
  },
  computed: {
    ...mapGetters(["isAUTHORISED", "USER_ACCOUNT"]),
  },
  mounted() {},
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
  border: 1px solid var(--text-color);
  color: var(--text-color);
  max-width: 150px;
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
  overflow: hidden;
  text-overflow: ellipsis;
}

.login-icon {
  margin-left: 44px;
}

.contact-us-btn {
  background: var(--green-color-col);
  box-shadow: 0px 0px 10px var(--green-color-col);
  border-radius: 15px;
  padding: 12px 51px;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  color: var(--text-color);
  display: block;
}
</style>
