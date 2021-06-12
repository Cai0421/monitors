import Vue from 'vue'
import Router from 'vue-router'

import paths from './path'


function route(path, view ,name ){
  return {
    name: name || view,
    path,
    component: (resolve) => import(
      `@/components/${view}.vue`
    ).then(resolve)
  }
}

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: paths.map(path => route(path.path, path.view, path.name))
})

export default router
