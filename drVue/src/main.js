// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(Vuex)

//路由守卫  登录认证
router.beforeEach((to, from, next) => {
  //没有session则去login
  // console.log(store.state.userName)
  if (to.path == '/login') {
    next()
  } else {
    console.log(to.path, store.state.userName)
    if (!store.state.userName) {
      next({ path: '/login' })
    } else {
      next()
    }

  }
  // if (to == '/login') {
  //   next()
  // } else {
  //   let s = sessionStorage.getItem('userName')
  //   console.log(s,store.state.userName)
  //   if (s==null){
  //     next({path: '/index'})
  //   }else{
  //     next()
  //   }

  // }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
