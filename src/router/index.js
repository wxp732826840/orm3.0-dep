import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: () => import('views/oes/Loading')
  },
  {
    path: '/examList',
    name: 'ExamList',
    component: () => import('views/oes/ExamList')
  },
  {
    path: '/exam/:type',
    name: 'Exam',
    component: () => import('views/oes/Exam')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: '/orm/',
  routes
})

router.beforeEach((to, from, next) => {
  console.info(from);
  console.info(to);
  if(to.path === '/'){
   store.commit('setPath',"来源路径"+from.path);
  }
  next();
}); 

export default router
