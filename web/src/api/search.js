import fetch from '@/utils/fetch';

export function search(keyword) {
  return fetch({
    url: '/search',
    method: 'post',
    data:keyword
  })
}
