// 封装 Banner 业务相关代码

import { getBannerAPI } from '@/api/category'
import { ref, onMounted } from 'vue'

export function useBanner () {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.data.result
  }
  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}