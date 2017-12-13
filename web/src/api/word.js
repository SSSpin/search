import fetch from '@/utils/fetch';

export function wordEdit(data) {
  return fetch({
    url: '/word',
    method: 'put',
    data: data
  })
}
export function wordAdd(data) {
  return fetch({
    url: '/word',
    method: 'post',
    data: data
  })
}
