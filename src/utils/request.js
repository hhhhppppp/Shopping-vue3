import axios from 'axios'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { useUserStore } from '@/stores/user'
import router from '@/router'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.userInfo.token) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res, e) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res
  },
  (err) => {
    const userStore = useUserStore()
    ElMessage({
      type: 'warning',
      message: err.response.data.message
    })
    // TODO 5. 处理401错误
    // 1、清楚本地用户数据
    // 2、跳转到路由
    if (err.response.status === 401) {
      userStore.removeUserInfo()
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
