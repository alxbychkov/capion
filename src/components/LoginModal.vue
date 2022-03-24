<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body login" @click.stop>
      <p class="modal-title">Choose wallet</p>
      <div class="login-form">
        <p class="error-msg" v-if="error">{{ error }}</p>
        <input
          type="text"
          class="modal-login-input"
          placeholder="User"
          v-model="user"
          @input="error = ''"
        />
        <input
          type="password"
          class="modal-login-input"
          placeholder="Password"
          v-model="password"
          @input="error = ''"
        />
        <button class="connect-btn" @click="connectWalletHandle">
          Connect wallet
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

const fakeUser = {
  login: "admin",
  password: "admin",
};

export default {
  name: "LoginModal",
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      user: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["GET_isAUTHORISED"]),

    close() {
      this.user = "";
      this.password = "";
      this.error = "";
      this.$emit("close");
    },

    keydownHandle(e) {
      if (this.isShow && e.key === "Escape") {
        this.close();
      }
    },

    connectWalletHandle() {
      if (this.user === fakeUser.login && this.password === fakeUser.password) {
        this.GET_isAUTHORISED(true);
      } else {
        this.user = "";
        this.password = "";
        this.error = "Invalid login or password";
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
.login-form {
  display: flex;
  flex-direction: column;
  background: #323030;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 20px 30px;
}

.modal-body.login {
  padding: 20px 30px;
}

.login .modal-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 10px;
}

.modal-login-input {
  background: #323030;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 6px 10px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  width: 330px;
  height: 36px;
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}

.error-msg {
  background: #323030;
  box-shadow: 0px 0px 10px rgb(161 1 1);
  border-radius: 10px;
  padding: 6px 10px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
}

.connect-btn {
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 10px;
  padding: 8px 94px;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
}
</style>
