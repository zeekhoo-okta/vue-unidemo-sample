<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import '@okta/okta-signin-widget/dist/css/okta-theme.css'
import authConfig from '../.config.js'


export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      this.widget = new OktaSignIn({
        baseUrl: authConfig.oidc.issuer.split('/oauth2')[0],
        clientId: authConfig.oidc.client_id,
        redirectUri: authConfig.oidc.redirect_uri,
        authParams: {
          responseType: ['id_token', 'token'],
          issuer: authConfig.oidc.issuer,
          scopes: authConfig.oidc.scope.split(' '),
          display: 'page'
        }
      })

      this.widget.renderEl(
        { el: '#okta-signin-container' },
        () => {

        },
        (err) => {
          throw err
        }
      )
    })
  },
  destroyed () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>