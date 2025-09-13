// 封装分类数据业务相关代码

import { getTopCategoryAPI } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 导入 onBeforeRouterUpdate
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory () {
  const categoryList = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id || route.params.id)
    // console.log(res)
    categoryList.value = res.data.result
    // console.log(res.data.result)
  }
  onMounted(() => {
    getCategory()
  })

  // 路由缓存问题
  // 2、目标 路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // console.log('路由变化了')
    // 存在问题： 使用最新的路由参数请求最新的分类数据
    // console.log(to)
    getCategory(to.params.id)
  })
  return {
    categoryList
  }
}

