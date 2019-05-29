<template>
  <div class="users">
    <h1 class="ui header">
      <i
        aria-hidden="true"
        class="mail outline icon"
      >
      </i>
      Users
    </h1>
    <div
      v-if="failed"
      class="ui error message"
    >
      <div class="content">
        <div class="header">API Request Failed.</div>
      </div>
    </div>

    <div v-if="users.length">
      <table class="ui table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="index"
            :id="'user-' + index"
          >
            <td>{{user.id}}</td>
            <td>{{user.login}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  data () {
    return {
      failed: false,
      users: []
    }
  },
  async created () {
    try {
      const accessToken = await this.$auth.getAccessToken()
      const response = await axios.get(
        '/unidemo/public/users',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const users = response.data.map((user) => {
        let index = 1
        return {
          id: user.id,
          login: user.profile.login,
          index: index++
        }
      })
      this.users = users
    } catch (e) {
      this.failed = true
    }
  }
}
</script>
