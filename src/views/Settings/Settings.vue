<template>
  <div class="settings border-shadow">
    <div class="setings-title">Settings</div>
    <div class="settings-body">
      <div class="settings-body-row">
        <div class="setting-body-title">Theme</div>
        <div class="theme-wrapper">
          <div class="theme-item" @click="changeThemeHandler('light')">
            <div
              class="theme-input"
              :class="{ checked: currentTheme === 'light' }"
            ></div>
            <div class="theme-name">Light</div>
          </div>
          <div class="theme-item" @click="changeThemeHandler('dark')">
            <div
              class="theme-input"
              :class="{ checked: currentTheme === 'dark' }"
            ></div>
            <div class="theme-name">Dark</div>
          </div>
        </div>
      </div>
      <div class="settings-body-row">
        <div class="setting-body-title">Choose name</div>
        <input type="text" name="name" class="settings-input" />
      </div>
    </div>
    <button class="settings-btn" @click="saveUserSetingHandler">Save</button>
  </div>
</template>
<script>
export default {
  name: "Settings",
  data() {
    return {
      currentTheme: "dark",
    };
  },
  methods: {
    changeThemeHandler(value) {
      this.currentTheme = value;
    },

    getUserTheme() {
      if (localStorage.getItem("theme")) {
        this.currentTheme = localStorage.getItem("theme");
      }
    },

    saveUserSetingHandler() {
      localStorage.setItem("theme", this.currentTheme);
    },
  },
  created() {
    this.getUserTheme();
  },
};
</script>
<style scoped>
.settings {
  padding: 30px 60px;
  color: #fff;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}
.setings-title {
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;
  margin-bottom: 20px;
}
.settings-input {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  border: none;
  outline: none;
  background: transparent;
  width: 175px;
  height: 50px;
  padding: 10px 20px;
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}
.setting-body-title {
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 15px;
}
.settings-btn {
  margin: auto 0 0 auto;
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 15px;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  padding: 13px 62px;
  cursor: pointer;
}
.settings-body-row {
  margin-bottom: 20px;
}
.theme-item,
.theme-wrapper {
  display: flex;
  align-items: center;
}
.theme-item {
  margin-right: 35px;
  cursor: pointer;
}
.theme-name {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.theme-input {
  width: 23px;
  height: 23px;
  background: #323030;
  border: 1px solid #fff;
  border-radius: 100%;
  margin-right: 10px;
  position: relative;
}
.theme-input.checked::after {
  content: "";
  width: 17px;
  height: 17px;
  border-radius: 100%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
