<template>
  <div>
    <div class="intro-section">
      <div class="intro-top">
        <div class="intro-top-item">
          <div class="intro-title">Manage your assets corectly</div>
          <div class="intro-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and
          </div>
          <div class="intro-top-row">
            <router-link to="/portfolio" custom v-slot="{ href, navigate }">
              <a :href="href" class="intro-link" @click="navigate">Go to App</a>
            </router-link>
            <div class="intro-socials">
              <a href="#" class="intro-social-link"
                ><img src="../../assets/images/in.png" alt="linkedin"
              /></a>
              <a href="#" class="intro-social-link"
                ><img src="../../assets/images/twitter.png" alt="twitter"
              /></a>
              <a href="#" class="intro-social-link"
                ><img src="../../assets/images/telegram.png" alt="telegram"
              /></a>
            </div>
          </div>
        </div>
        <div class="intro-top-graphs">
          <img
            src="../../assets/images/graph-1.png"
            alt="graph"
            class="graph-1"
          />
          <img
            src="../../assets/images/graph-2.png"
            alt="graph"
            class="graph-2"
          />
        </div>
      </div>
      <div class="intro-body border-shadow">
        <div class="intro-body-col">Managed Value</div>
        <div class="intro-body-col">Total Trading Volume</div>
        <div class="intro-body-col color-green">$19,008,556</div>
        <div class="intro-body-col color-green">$1,006,558,047</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
<style scoped>
.intro-section {
  color: #fff;
  margin-top: 160px;
}
.intro-body {
  padding: 64px 151px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  margin-bottom: 212px;
}
.intro-body-col {
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;
}
.intro-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 154px;
}
.intro-top-graphs,
.intro-top-item {
  width: 47%;
}
.intro-top-graphs {
  display: flex;
  margin-top: -35px;
}
.intro-title {
  font-weight: 700;
  font-size: 60px;
  line-height: 73px;
  margin-bottom: 5px;
}
.intro-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 28px;
}
.intro-link {
  background: #92df95;
  border-radius: 15px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  padding: 12px 38px;
  filter: drop-shadow(0px 0px 10px #92df95);
  margin-right: 30px;
}
.intro-socials,
.intro-top-row {
  display: flex;
  align-items: center;
}
.intro-social-link {
  display: flex;
}
.intro-social-link:not(:last-of-type) {
  margin-right: 25px;
}

.intro-social-link img {
  width: 35px;
  max-width: 100%;
  height: auto;
}

.graph-2 {
  transform: translateY(-100px);
}
</style>
