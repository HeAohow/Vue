import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../pages/Todo.vue'
// import App from '../App.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/todo', component: Todo, name: 'Todo' },
  // { path: '/home', component: App, name: 'App' },
  { path: '*', redirect: { name: 'Todo' } }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
