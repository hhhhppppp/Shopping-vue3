// 封装所有和用户相关的接口

import request from '@/utils/request'

export const LoginAPI = ({account, password}) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

// 获取猜你喜欢接口
export const getLikeListAPI = ({ limit = 4}) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
