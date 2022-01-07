import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import SucessRegister from '../views/SucessRegister.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'
import config from '../config/Config'

//função para realizar a autenticação de usuário do tipo admin
function AdminAuth(to, from, next){
  if(localStorage.getItem('token')!=undefined){

    var req = {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem('token')
      }
    }

    axios.post(config.hostApi+'validate',{},req).then(res=>{
      console.log(res);
      next()
    }).catch(err=>{
      console.log(err.response.data);
      next('/');
    });
  }else{
    next('/login');
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/SucessRegister',
    name: 'SucessRegister',
    component: SucessRegister
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
