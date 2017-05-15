import Vue from 'vue'
import Router from 'vue-router'
import app from '@/App'
import shoppingCart from '@/components/shoppingCart'
import buyStep from '@/components/buyStep'
import ensureAddress from '@/components/ensureAddress'
import showBook from '@/components/showBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: app
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/buyStep/',
      name: 'buyStep',
      component: buyStep,
      children: [
        {
          path: 'ensureAddress',
          name: 'ensureAddress',
          component: ensureAddress
        },
        {
          path: 'showBook',
          name: 'showBook',
          component: showBook
        }
      ]
    }
  ]
})
