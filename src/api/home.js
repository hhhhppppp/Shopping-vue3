import request from '@/utils/request'

// 获取 banner 
export function getBannerAPI () {
  return request({
    url: '/home/banner'
  })
}

// 获取 新鲜好物
export function getNewAPI () {
  return request({
    url: '/home/new'
  })
}

// 获取 人气推荐
export const getHotAPI = () => {
  return  request({
    url: '/home/hot'
  })
}

// 获取 所有商品
export function getGoodsAPI() {
  return request({
    url: '/home/goods'
  })
}