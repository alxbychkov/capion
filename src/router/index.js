import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home/Home.vue') },
  { path: '/addition', name: 'StrategyAddition', component: () => import('../views/StrategyAddition/StrategyAddition.vue') },
  { path: '/monitoring', name: 'Monitoring', component: () => import('../views/Monitoring/Monitoring.vue') },
]

const router = new VueRouter({
  routes
});

export default router;
