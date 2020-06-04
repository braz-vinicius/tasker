import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskView from '../views/TaskView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TaskView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
