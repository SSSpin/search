import fetch from '@/utils/fetch'
import '../utils/md6';
export function register(username, pwd,level) {
  let password = hex_md5(pwd);
  const data = {
    username,
    password,
    level
  }
  return fetch({
    url: '/register',
    method: 'post',
    data
  })

}
