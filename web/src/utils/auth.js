import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const Storage = window.localStorage;

export function getToken() {
  if (Storage) {
    return Storage.getItem(TokenKey)
  } else {
    return Cookies.get(TokenKey)
  }
}

export function setToken(token) {
  if (Storage) {
    return Storage.setItem(TokenKey, token)
  } else {
    return storage.set(TokenKey, token)
  }

}

export function removeToken() {
  if (Storage) {
    return Storage.removeItem(TokenKey)
  } else {
    return Cookies.remove(TokenKey)
  }
}
