<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body login" @click.stop>
      <p class="modal-title">Choose wallet</p>
      <div class="login-form">
        <p class="error-msg" v-if="error">{{ error }}</p>
        <div class="login-form-grid">
          <div
            v-for="method in methods"
            :key="method.alt"
            class="modal-login-method"
            :class="{
              disabled: !method.enabled,
              active: activeMethod === method.alt,
            }"
            :data-method="method.alt"
            @click="methodClickHandle(method)"
          >
            <img :src="method.img" :alt="method.alt" />
            <span>{{ method.name }}</span>
          </div>
        </div>
        <input type="text" class="modal-login-input" />
        <button class="connect-btn" @click="connectWalletHandle">
          Connect wallet
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { accountPromise, connectMetamask } from "../../core/metamask";

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
      activeMethod: "",
      methods: [
        {
          name: "MetaMask",
          img: require("../../assets/images/metamask.png"),
          alt: "metamask",
          enabled: true,
        },
        {
          name: "CoinBase",
          img: require("../../assets/images/coinbase.png"),
          alt: "coinbase",
          enabled: false,
        },
        {
          name: "Trust",
          img: require("../../assets/images/trust.png"),
          alt: "trust",
          enabled: false,
        },
        {
          name: "Portis",
          img: require("../../assets/images/portis.png"),
          alt: "portis",
          enabled: false,
        },
        {
          name: "FortMatic",
          img: require("../../assets/images/fortmatic.png"),
          alt: "fortmatic",
          enabled: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions(["GET_isAUTHORISED", "GET_USER_ACCOUNT"]),

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

    async connectWalletHandle() {
      try {
        await connectMetamask();
        await accountPromise.then((account) => {
          this.GET_isAUTHORISED(true);
          this.GET_USER_ACCOUNT(account);
          this.$router.push("/portfolio");
        });
      } catch (e) {
        this.error = e;
        this.GET_isAUTHORISED(false);
      }
    },

    methodClickHandle(value) {
      if (value.enabled && this.activeMethod !== value.alt) {
        this.activeMethod = value.alt;
        this.error = "";
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandle);

    if (this.methods.filter((m) => m.enabled).length === 1) {
      this.activeMethod = this.methods.filter((m) => m.enabled)[0].alt;
    }
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

.login-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
}

.modal-login-method,
.modal-login-input {
  background: #323030;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 6px 10px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  height: 36px;
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}

.login-form-grid .modal-login-input {
  max-width: 150px;
}

.modal-login-method {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 150px;
  position: relative;
  cursor: pointer;
  padding: 0 10px;
  user-select: none;
}

.modal-login-method.active {
  box-shadow: 0px 0px 10px #92df95;
}

.modal-login-method.disabled {
  opacity: 0.5;
  cursor: default;
}

.modal-login-method span {
  margin-left: 10px;
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
