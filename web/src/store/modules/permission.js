import { asyncRouterMap } from '../../router';
import Layout from '../../views/layout/Layout'
const _import = require('../../router/_import_' + process.env.NODE_ENV)
const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/register', component: _import('register/index'), hidden: true },
  { path: '/search', component: _import('search/search'), hidden: true },
  { path: '/searchList', component: _import('search/searchList'), hidden: true },
  { path: '/word', name: 'word', component: _import('word/word'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  /*  {
      path: '/',
       redirect: '/introduction/index',
      component: Layout,
      name: '首页',
      hidden: true,
      children: [{ path: 'dashboard', component: _import('dashboard/index') }]
    },*/
  /*  {
      path: '/introduction',
      component: Layout,
      redirect: '/introduction/index',
      icon: 'people',
      noDropdown: true,
      children: [{ path: 'index', component: _import('introduction/index'), name: '简述' }]
    },*/
  {
    path: '/wordAdd',
    component: Layout,
    meta: { role: ['guest'] },
    noDropdown: true,
    icon: 'table',
    children: [{
      path: 'index',
      component: _import('word/wordAdd'),
      name: '添加词汇',
      meta: { role: ['guest'] }
    }]
  },

  {
    path: '/wordAudit',
    component: Layout,
    meta: { role: ['admin'] },
    noDropdown: true,
    icon: 'table',
    children: [{ path: 'index', component: _import('word/wordAudit'), name: '词汇审核', meta: { role: ['admin'] } }]
  },
  {
    path: '/account',
    component: Layout,
    meta: { role: ['guest'] },
    noDropdown: true,
    icon: 'table',
    children: [{
      path: 'index',
      component: _import('account/index'),
      name: '账号管理',
      meta: { role: ['guest'] }
    }]
  },
  {
    path: '/wordEdit',
    component: Layout,
    hidden: true,
    children: [{ path: 'index', component: _import('word/wordEdit') }]
  }
]
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
