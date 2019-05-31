import Vue from 'vue'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.min.css'

import Auth from '@okta/okta-vue'

import HomeComponent from '../components/Home'
import LoginComponent from '../components/Login'
import ProfileComponent from '../components/Profile'
import UsersComponent from '../components/Users'
import PublicConfig from '../services/api/PublicConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://qdqj7xgwd9.execute-api.us-west-2.amazonaws.com/dev/'
var subdomain = window.location.host.split('.')[0]
var isRunningLocal = false
if (/^localhost:\d{4}$/.test(subdomain)) {
  isRunningLocal = true
}

import oktaAuthConfig from '../.config.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      component: UsersComponent,
      meta: {
        requiresAuth: true
      }
    }    
  ]
})

var initAuth = true
const onAuthRequired = async (from, to, next) => {
  if (initAuth) {
    initAuth = false

    if (!isRunningLocal) {
      var data = await PublicConfig.getPublicConfig(subdomain)
      if (Object.keys(data).length > 0) {
        oktaAuthConfig.oidc.issuer=data.iss
        oktaAuthConfig.oidc.client_id=data.clientId
        oktaAuthConfig.oidc.redirect_uri='https://'+subdomain+'.sample.unidemo.online/implicit/callback'
      }
    }

    Vue.use(Auth, {
      issuer: oktaAuthConfig.oidc.issuer,
      client_id: oktaAuthConfig.oidc.client_id,
      redirect_uri: oktaAuthConfig.oidc.redirect_uri,
      scope: oktaAuthConfig.oidc.scope
    })
  }

  if (from.matched.some(record => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
    next({ path: '/login' })
  } else {
    next()
  }
}

router.beforeEach(onAuthRequired)

export default router

