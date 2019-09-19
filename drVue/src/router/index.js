import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: resolve => require(['@/components/Common'], resolve),
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['@/views'], resolve),
        },
        {
          path: '/artical',
          name: 'artical',
          component: resolve => require(['@/views/artical'], resolve),
        },
        {
          path: '/banner',
          name: 'bannner',
          component: resolve => require(['@/views/banner'], resolve),
        },
        {
          path: '/recommond',
          name: 'recommond',
          component: resolve => require(['@/views/recommond'], resolve),
        },
        {
          path: '/goods',
          name: 'goods',
          component: resolve => require(['@/views/goods'], resolve),
        }, 
        {
          path: '/category',
          name: 'category',
          component: resolve => require(['@/views/category'], resolve),
        },
        {
          path: '/subCategory',
          name: 'subCategory',
          component: resolve => require(['@/views/subCategory'], resolve),
        },
        {
          path: '/subCategoryDetail',
          name: 'subCategoryDetail',
          component: resolve => require(['@/views/subCategoryDetail'], resolve),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve),
    },
  ]
})
