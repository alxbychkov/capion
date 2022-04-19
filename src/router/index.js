import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('../views/Home/Home.vue'),
    meta: {auth: true, sidebar: true}
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('../views/Login/Login.vue'),
    meta: {auth: false, sidebar: false}
  },
  { path: '/addition',
    name: 'StrategyAddition', 
    component: () => import('../views/StrategyAddition/StrategyAddition.vue'),
    meta: {auth: true, sidebar: true}
  },
  { 
    path: '/monitoring/:id', 
    name: 'Monitoring', 
    component: () => import('../views/Monitoring/Monitoring.vue'),
    meta: {auth: true, sidebar: true}
  },
  { 
    path: '/about', 
    name: 'About', 
    component: () => import('../views/About/About.vue'),
    meta: {auth: false, sidebar: false}
  },
  { 
    path: '/discover', 
    name: 'Discover', 
    component: () => import('../views/Discover/Discover.vue'),
    meta: {auth: true, sidebar: true}
  },
  { 
    path: '/settings', 
    name: 'Settings', 
    component: () => import('../views/Settings/Settings.vue'),
    meta: {auth: true, sidebar: false}
  },
  { 
    path: '*', 
    name: 'NotFoundPage', 
    component: () => import('../views/404/404.vue'),
    meta: {auth: false, sidebar: false}
  },
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('isMetamaskConnected') ? localStorage.getItem('isMetamaskConnected') : false;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
