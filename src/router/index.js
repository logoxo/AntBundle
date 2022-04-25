import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Launch from '../views/Launch.vue'
import NotFound from '../views/404.vue'
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next){
      if (store.getters.auth){
         next()
       }else{
         console.log("go to admin")
        next('/launch');
      }
    },

  },
  {
    path: '/user',
    name: 'User',
    component: User, 
    beforeEnter(to, from, next){
      if (store.getters.auth){
         next()
       }else{
         console.log("go to admin")
        next('/launch');
      }
    },
  },
  {
    path: '/Launch',
    name: 'Launch',
    beforeEnter(to, from, next){
      if (store.getters.auth === false){
         next()
       }else{
        next('/');
      }
    },
    component:Launch 
  },
  { path: '/:catchAll(.*)', component: NotFound  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // add page name to the titel
  document.title = `${process.env.VUE_APP_TITLE} - ${ to.name }`
  next();
})

export default router
