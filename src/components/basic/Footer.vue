<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <div class="footer-left">
        <router-link to="/" custom v-slot="{ href, navigate }">
          <a :href="href" class="project-logo" @click="navigate"
            ><ProjectLogo
          /></a>
        </router-link>
        <div class="footer-description">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            autem distinctio sit debitis. Vero, quas molestiae fugit modi quod
            molestias.
          </p>
        </div>
      </div>
      <div class="footer-right">
        <div class="nav-links">
          <p class="links-title">Quick links</p>
          <div class="nav-list">
            <a href="#" class="nav-link">Request Feutures</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Blog</a>
            <a href="#" class="nav-link">Docs</a>
            <a href="#" class="nav-link">Info</a>
          </div>
        </div>
        <div class="nav-links">
          <p class="links-title">Recources</p>
          <div class="nav-list">
            <a href="#" class="nav-link">Legal Privacy</a>
            <a href="#" class="nav-link">Contact us</a>
            <a href="#" class="nav-link">Cookies</a>
            <a href="#" class="nav-link">Terms</a>
          </div>
        </div>
        <div class="nav-links">
          <p class="links-title">Join the converstation</p>
          <div class="nav-socials">
            <a href="#" class="social-link"
              ><img src="../../assets/images/github.png" alt="github"
            /></a>
            <a href="#" class="social-link"
              ><img src="../../assets/images/discord.png" alt="discord"
            /></a>
            <a href="#" class="social-link"
              ><img src="../../assets/images/telegram.png" alt="telegram"
            /></a>
            <a href="#" class="social-link"
              ><img src="../../assets/images/in.png" alt="linkedin"
            /></a>
            <a href="#" class="social-link"
              ><img src="../../assets/images/twitter.png" alt="twitter"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import ProjectLogo from "./Logo.vue";

export default {
  name: "Footer",
  components: { ProjectLogo },
};
</script>
<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: auto;
}

.footer-wrapper {
  box-shadow: 0px 0px 10px var(--dark-shadow);
  padding: 30px 15px;
  display: flex;
  justify-content: space-between;
}

.footer-left {
  width: 48%;
}

.footer-right {
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-description {
  margin-top: 20px;
  color: var(--text-color);
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.nav-links {
  color: var(--text-color);
}

.links-title {
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 15px;
}

.nav-list {
  display: flex;
  flex-direction: column;
}

.nav-link {
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: var(--text-color);
  opacity: 0.6;
  margin-bottom: 5px;
}

.nav-socials {
  display: flex;
  flex-wrap: wrap;
}

.social-link {
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
