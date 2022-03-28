import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('../views/Home/Home.vue'),
    meta: {auth: true}
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('../views/Login/Login.vue'),
    meta: {auth: false}
  },
  { path: '/addition',
    name: 'StrategyAddition', 
    component: () => import('../views/StrategyAddition/StrategyAddition.vue'),
    meta: {auth: true}
  },
  { 
    path: '/monitoring/:id', 
    name: 'Monitoring', 
    component: () => import('../views/Monitoring/Monitoring.vue'),
    meta: {auth: true}
  },
  { 
    path: '*', 
    name: 'NotFoundPage', 
    component: () => import('../views/404/404.vue'),
    meta: {auth: false}
  },
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('isAuthorised') ? localStorage.getItem('isAuthorised') : false;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
