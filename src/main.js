import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import mitt from 'mitt'

const emitter = mitt()
const app = createApp(App) // Create the Vue instance
app.use(router)
app.config.globalProperties.emitter = emitter // Use the config object to set global properties
app.mount('#app') 