import fetch from '@/utils/fetch'
import '../utils/md6';
export function loginByUsername(username, pwd) {
  let password = hex_md5(pwd);
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
