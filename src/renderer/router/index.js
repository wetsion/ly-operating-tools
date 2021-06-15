import Vue from 'vue'
import Router from 'vue-router'
// import Calculator from '@/views/calculator/Calculator'
import Main from '@/views/main/main'
import About from '@/views/about/about'
import Dashboard from '@/views/dashboard/dashboard'
import WeekCharts from '@/views/week-charts/weekcharts'
import Contrast from '@/views/lastweek-contrast/contrast'
import Commercial from '@/views/commercial/commercial'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'week',
          name: 'week',
          component: WeekCharts
        },
        {
          path: 'contrast',
          name: 'contrast',
          component: Contrast
        },
        {
          path: 'commercial',
          name: 'commercial',
          component: Commercial
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
