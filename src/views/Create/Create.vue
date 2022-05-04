<template>
  <div v-if="USER_ACCOUNT" class="portfolio-section section border-shadow">
    <div class="create-header">
      <div class="create-title">Create Portfolio</div>
      <div class="user-account">0x55e3160c3df7d99763af53628b1ef753fb6d056e</div>
    </div>
    <div class="create-body">
      <div class="create-body-item">
        <span>Name:</span>
        <div class="user-field" contenteditable="true"></div>
      </div>
      <div class="create-body-item c-pointer">
        <span>Account</span>
        <div class="arrow"></div>
      </div>
      <div class="create-body-item">
        <span>Default reporting</span>
        <div class="checkbox"></div>
      </div>
      <div class="create-body-item">
        <span>Custom reporting</span>
        <div class="checkbox"></div>
      </div>
      <div class="create-body-item">
        <span>Strategies</span>
        <div class="plus"></div>
      </div>
    </div>
    <button class="create-btn">Create portfolio</button>
    <coming-soon :isShow="isShowModal" @close="isShowModal = false" />
  </div>
</template>
<script>
import ComingSoon from "../../components/Modals/ComingSoon.vue";
import { mapGetters } from "vuex";

export default {
  name: "Create",
  components: { ComingSoon },
  data() {
    return {
      isShowModal: true,
    };
  },
  computed: {
    ...mapGetters(["USER_ACCOUNT"]),
  },
};
</script>
<style scoped>
.portfolio-section {
  color: var(--text-color);
}
.create-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.create-title {
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;
  margin-right: 30px;
}
.user-account {
  padding: 14px;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  border: 1px solid var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 125px;
}
.create-btn {
  color: var(--text-color);
  outline: none;
  border: none;
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 14px;
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;
  padding: 6px;
  cursor: pointer;
  margin-top: 2px;
}
.create-body-item {
  background: var(--background-color);
  box-shadow: 0px 0px 10px var(--dark-shadow);
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.create-body-item span {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
}
.arrow {
  position: relative;
  margin-right: 10px;
}

.arrow::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNSA1TDkgMSIgc3Ryb2tlPSJibGFjayIvPgo8L3N2Zz4K);
}

.dark-theme .arrow::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNSA1TDkgMSIgc3Ryb2tlPSJ3aGl0ZSIvPgo8L3N2Zz4K);
}

.checkbox {
  width: 13px;
  height: 13px;
  margin-right: 10px;
  border: 1px solid var(--text-color);
  cursor: pointer;
}
.plus {
  width: 35px;
  height: 35px;
  background: var(--button-green-background);
  box-shadow: 0px 0px 10px var(--button-green-background);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
}
.plus::after {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.plus::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjIgMTAuMkgxMC43NlYxNy40OEg4LjI0VjEwLjJIMC44VjcuODRIOC4yNFYwLjUxOTk5OUgxMC43NlY3Ljg0SDE4LjJWMTAuMloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=);
}

.dark-theme .plus::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjIgMTAuMkgxMC43NlYxNy40OEg4LjI0VjEwLjJIMC44VjcuODRIOC4yNFYwLjUxOTk5OUgxMC43NlY3Ljg0SDE4LjJWMTAuMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=);
}

.c-pointer {
  cursor: pointer;
}
.user-field {
  width: 100%;
  height: 20px;
  margin-left: 15px;
  border: none;
  outline: none;
}
</style>
