import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import useTheme from '@/utils/theme'
import mLibs from './libs'
import mDirectives from './derectives'
// 注册 svg-icon
import 'virtual:svg-icons-register'
import './permission'

useREM()
useTheme()

createApp(App).use(router).use(store).use(mLibs).use(mDirectives).mount('#app')
