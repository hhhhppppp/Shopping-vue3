
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// 导入 图片懒加载插件
import { lazyPlugin } from './directives/index'
// 引入全局组件插件
import { componentsPlugin } from './components/index'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedState))
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.mount('#app')

