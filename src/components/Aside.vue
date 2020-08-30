<template>
  <div class="aside">
    <div v-if="loading">loading</div>
    <div v-else>
      <router-link class="welcome" to="/" style="letter-spacing:10px">清软论坛</router-link>
      <div class="user" style="line-height:30px">
        <router-link :to="{ name: 'User', params: {userId: my.id}}" :title="my.userId" id="user">
          <el-avatar shape="circle" :size="120" class="fig">{{ lastName }}</el-avatar>
        </router-link>
        <el-dropdown>
          <span style="font-size:14px">
            ID: {{ my.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>识别身份的用户ID</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider></el-divider>
        <div>昵称: {{ my.nickname }}</div>
        <div>发帖: {{ myPosts.total }} 篇</div>
        <div>创建时间: {{ my.created | formatTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      my: {},
      myPosts: {},
      myBrowse: [],
      myBookmark: [],
      lastName: ''
    }
  },
  methods: {
    loadData () {
      if (this.$store.getters.getToken) {
        this.$http({
          method: 'get',
          url: '/api/v1/user',
          headers: {
            Authorization: this.$store.getters.getToken
          }
        })
          .then(response => {
            this.my = response.data
            this.lastName = response.data.nickname[0]
          })
          .catch(error => {
            console.log(error)
            if (error.response) {
              window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
            }
          })

        this.$http({
          method: 'get',
          url: 'api/v1/post',
          params: {
            userId: this.$store.getters.getUserId,
            size: 0x7fffff
          },
          headers: {
            Authorization: this.$store.getters.getToken
          }
        })
          .then(response => {
            this.myPosts = response.data
          })
          .catch(error => {
            console.log(error)
            if (error.response) {
              window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
            }
          })
      }
      this.myBrowse = this.$store.getters.getHistory
      this.myBookmark = this.$store.getters.getBookmark

      this.loading = false
    }
  },
  beforeMount () {
    this.loading = true
    this.loadData()
  },
  watch: {
    $route: function (to, from) {
      if (from.name === 'Login') {
        this.loading = true
        this.loadData()
      }
    }
  }
}
</script>

<style scoped>
.el-dropdown {
  display: block;
  color: #ffffff;
}

.aside {
  position: fixed;
  background-color: #292c30;
  height: 100%;
  width: 15%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.welcome {
  font-size: 35px;
}

.user {
  position: absolute;
  /* background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px; */
  background-color: #3c4955;
  top: 62px;
  width: 100%;
  height: 400px;
  font-size: 16px;
  color: #ffffff;
}

.fig {
  margin-top: 60px;
  border: auto;
  font-size: 70px;
  background-color: #00ccff;
}

a {
  text-decoration: none;
  color: #ffffff;
}

a:visited {
  color: #ffffff;
}

a:hover {
  color: #ffffff;
}

.el-divider {
  margin: auto;
  margin-top: 3px;
  margin-bottom: 3px;
  width: 60%;
}
</style>
