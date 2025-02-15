import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
