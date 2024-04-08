import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

if (process.env.NODE_ENV === 'development') {
    import('vant/lib/index.css');
}

createApp(App).use(router).mount('#app')
