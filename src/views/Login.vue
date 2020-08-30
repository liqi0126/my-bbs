<template>
  <div id="login">
    <h2>欢迎来到清软论坛</h2>
    <div class="field">
      <el-input v-model="username" placeholder="用户名" />
    </div>
    <div class="field">
      <el-input v-model="passward" placeholder="密码" show-password />
    </div>
    <el-button type="primary" @click="login()">登录</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      passward: '',
      userId: '',
      nickName: '',
      jwt: ''
    }
  },
  methods: {
    login () {
      this.$http({
        url: '/api/v1/login',
        method: 'patch',
        data: {
          username: this.username,
          password: this.passward
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.jwt = response.data.jwt
            this.userId = response.data.userId
            this.nickName = response.data.nickName
            this.$store.commit('login', { token: this.jwt, userId: this.userId })
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/')
            }
          }
        })
        .catch((error) => {
          window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
          this.passward = ''
        })
    }
  }
}
</script>

<style scoped>
#login {
  top: 200px;
  left: 650px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  width: 464px;
  height: 304px;
}

.field {
  float: left;
  margin-bottom: 16px;
  width: 100%;
}
</style>
