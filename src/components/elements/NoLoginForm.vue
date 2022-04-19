<template>
  <div class="section-no-login border-shadow">
    <p class="no-login-row"></p>
    <p class="no-login-row">Please log in to see your portfolio</p>
    <button class="log-in-btn" @click="isShowModal = true">Log in</button>
    <login-modal :isShow="isShowModal" @close="isShowModal = false" />
  </div>
</template>
<script>
import LoginModal from "../Modals/LoginModal.vue";

export default {
  components: { LoginModal },
  name: "NoLoginForm",
  data() {
    return {
      isShowModal: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
.section-no-login {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.no-login-row {
  margin: 20px 0 30px;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;
}

.log-in-btn {
  background: var(--green-color);
  box-shadow: 0px 0px 10px var(--green-color);
  border-radius: 15px;
  padding: 13px 67px;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: var(--text-color);
  outline: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}
</style>
