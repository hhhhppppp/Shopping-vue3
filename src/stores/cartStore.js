// 购物车数据
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginAPI } from '@/api/user'
import { useUserStore } from './user'
import { delCartAPI, findNewCartListAPI, innerCartAPI } from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])

    // 更新购物车列表
  const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.data.result
  }
  // 添加购物车
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value){
      // 登录之后的 加入购物车逻辑
      await innerCartAPI({ skuId, count })
      updateNewList()
    } else {
    // 添加购物车操作
    // 1、已添加过 - count + 1
    // 2、没有添加过 - 直接 push
    // 思路： 通过 匹配传递过来的商品对象中的 skuId 能不能在 cartList 中找到，找到了就是添加过的
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
    }

  }

  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车
      await delCartAPI([skuId])
      updateNewList()
    } else {
    // 思路
    // 1、找到要删除项的下标值 = splice
    // 2、使用数组的过滤方法 - filter
    const index = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(index, 1)

    // cartList.value.filter((item) => item.skuId === skuId)
    }
  }

  // 清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过 skuID 找到 要修改的哪一项，然后把它的 selected 修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把 cartList 中的每一项的 selected 都设置为当前的全选框状态
    cartList.value.forEach((item) => item.selected = selected)
  }

  // 计算属性
  // 1、总的数量  所有的 count 之和
  const allCount = computed(() => cartList.value.reduce((res, item) => res + item.count, 0))
  // 2、总价
  const allPrice = computed(() => cartList.value.reduce((res, item) => res + (item.count * item.price), 0))

  // 3、已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((res, item) => res + item.count, 0))
  // 4、已选择商品价格合计
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((res, item) => res + (item.count * item.price), 0))
  // 是否全选
  const isAll = computed(()=> cartList.value.every((item) => item.selected))

  return { cartList, addCart, delCart, allCount, allPrice,singleCheck, isAll, allCheck, selectedCount, selectedPrice, clearCart, updateNewList  }
}, {
  persist: true
})
