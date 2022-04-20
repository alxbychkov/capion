<template>
  <div class="modal-window" :class="isShow ? 'show' : ''" @click="close">
    <div class="modal-overlay"></div>
    <div class="modal-body login" @click.stop>
      <div class="coming-form">
        <div class="coming-header">Coming soon</div>
        <div class="coming-title">Describe strategy</div>
        <div class="coming-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </div>
        <button class="coming-btn">Propose strategy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComingSoon",
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
.coming-form {
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  padding: 30px 100px;
  max-width: 990px;
}

.modal-body.login {
  padding: 20px 30px;
}

.coming-text {
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  color: var(--text-color);
  margin-bottom: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 40px;
  height: 250px;
}

.coming-btn {
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 10px;
  padding: 8px 94px;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;
  color: var(--text-color);
  cursor: pointer;
}
.coming-header {
  font-weight: 700;
  font-size: 70px;
  line-height: 85px;
  text-align: center;
  margin-bottom: 71px;
}
.coming-title {
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;
  margin-bottom: 10px;
}
</style>
