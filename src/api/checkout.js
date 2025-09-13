import request from '@/utils/request'

// 获取订单详情
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}
