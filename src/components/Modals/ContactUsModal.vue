<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body login" @click.stop>
      <div class="send-form">
        <div class="send-text">
          Please insert your email and we’ll shortly connect to you to grant
          access to the platform
        </div>
        <input type="email" class="modal-login-input" />
        <button class="send-btn">Send</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactUsModal",
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },

    keydownHandle(e) {
      if (this.isShow && e.key === "Escape") {
        this.close();
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandle);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownHandle);
  },
};
</script>
<style scoped>
.send-form {
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 15px;
  padding: 20px 30px;
  max-width: 392px;
}

.modal-body.login {
  padding: 20px 30px;
}

.send-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: var(--text-color);
  margin-bottom: 25px;
  padding: 0 30px;
}

.modal-login-input {
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 10px;
  padding: 6px 10px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  height: 36px;
  color: var(--text-color);
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}

.send-btn {
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 10px;
  padding: 8px 94px;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: var(--text-color);
  cursor: pointer;
}
</style>
