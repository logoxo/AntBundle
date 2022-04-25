import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/tailwind.css'
import './assets/scss/main.scss'

const app = createApp(App)



app.use(store);
app.use(router);
router.app = app
router.store = store
app.use(VueAxios, axios)
app.mount('#app');
