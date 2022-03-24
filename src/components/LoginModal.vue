<template>
  <div class="modal-window">
    <div class="modal-overlay"></div>
    <div class="modal-body login">
      <p class="modal-title">Choose wallet</p>
      <div class="login-form">
        <input type="text" class="modal-login-input" placeholder="User" />
        <input
          type="password"
          class="modal-login-input"
          placeholder="Password"
        />
        <button class="connect-btn">Connect wallet</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginModal",
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
