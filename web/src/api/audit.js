import fetch from '@/utils/fetch';
const AUDIT_LEVEL = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2
}
export function getAuditList(data) {
  return fetch({
    url: '/audit',
    method: 'get'
  })
}

export function acceptAudit(data) {

  return fetch({
    url: '/audit',
    method: 'put',
    data: data
  })
}
export function refuseAudit(data) {

  return fetch({
    url: '/audit',
    method: 'put',
    data: data
  })
}
