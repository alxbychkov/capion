<template>
  <div class="section-no-login border-shadow">
    <p class="no-login-row"></p>
    <p class="no-login-row">Page not found: 404</p>
    <router-link to="/" custom v-slot="{ href, navigate }">
      <a :href="href" class="log-in-btn" @click="navigate">Home</a>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "NotFoundPage",
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
  background: #92df95;
  box-shadow: 0px 0px 10px #92df95;
  border-radius: 15px;
  padding: 13px 67px;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}
</style>
