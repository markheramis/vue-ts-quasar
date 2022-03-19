import { api as request } from 'boot/axios'

type loginParams = {
  username: string
  password: string
}

export const login = (params: loginParams) =>
  request({
    url: '/auth/login',
    method: 'post',
    data: params,
  })

export const getUserInfo = () =>
  request({
    url: '/auth/me',
    method: 'get',
  })
