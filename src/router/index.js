import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Launch from '../views/Launch.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    beforeEnter(to, from, next){
      console.log("push it or not")
      if (router.store.getters.auth){
         next()
       }else{
        next('/launch');
      }
    },

  },
  {
    path: '/user',
    name: 'User',
    component: User, 
    beforeEnter(to, from, next){
      if (router.store.getters.auth){
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
      console.log("launch")
      if (router.store.getters.auth === false){
         next()
       }else{
        next('/');
      }
    },
    component:Launch 
  },
  {
    path: '/search/:id',
    name: 'Search',
    component: Search,
    props: true,

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
