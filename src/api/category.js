import request from '@/utils/request'

// 获取 分类数据
export function getTopCategoryAPI(id) {
  return request({
    url: '/category',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取轮播图
export function getBannerAPI ( params = {} ) {
  const { distributionSite = '1' } = params
  return request({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取 二级分类数据
/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

//  获取导航数据
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}