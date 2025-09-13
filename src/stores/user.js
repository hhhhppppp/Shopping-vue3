// 管理用户数据
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginAPI } from '@/api/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/api/cart.js'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  // const doubleCount = computed(() => count.value * 2)
  const getUserInfo = async ({ account, password }) => {
  const res = await LoginAPI({ account, password })
    console.log(res)
    userInfo.value = res.data.result

    // 合并购物车的操作
    await mergeCartAPI(useCartStore().cartList.map((item) => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    useCartStore().updateNewList()
  }
  const removeUserInfo = () => {
    userInfo.value = {}
    // 执行 清除购物车的逻辑
    useCartStore().clearCart()
  }

  return { userInfo, getUserInfo, removeUserInfo }
}, {
  persist: true
})
