import fetch from '@/utils/fetch';
const AUDIT_LEVEL = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2
}
export function getAccountList() {
  return fetch({
    url: '/user',
    method: 'get'
  })
}

export function upgrade(data) {

  return fetch({
    url: '/user',
    method: 'put',
    data: data
  });
}
export function downgrade(data) {

  return fetch({
    url: '/user',
    method: 'put',
    data: data
  });
}
