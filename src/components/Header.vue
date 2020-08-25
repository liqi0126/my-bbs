<template>
  <el-menu
    class="menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <router-link class="welcome" to="/">欢迎来到 My-BBS!</router-link>
    <el-menu-item index="3" route="about" @click="$router.push('/about')">关于</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的</template>
      <el-menu-item index="2-1" @click="$router.push(`/user/userId=${$store.getters.getUserId}`)">主页</el-menu-item>
      <el-menu-item index="2-2" @click="$store.commit('enableBookmark')">收藏</el-menu-item>
      <el-menu-item index="2-3" @click="$store.commit('enableHistory')">浏览记录</el-menu-item>
      <el-menu-item index="2-4" @click="logout">登出</el-menu-item>
    </el-submenu>
    <el-menu-item index="1">创建新帖</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
      this.$alert('退出成功!')
    },
    toEdit () {
      // TODO
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  background-color: #545c64;

  a {
    text-decoration: none;
    color: #cbc9c9;
  }

  a:hover {
    color: #ffffff;
  }
}

.Header {
  background: #5a5555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 60px;
}

img {
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}

.el-menu--horizontal > .el-submenu {
  float: right;
}

.el-menu--horizontal > .el-menu-item {
  float: right;
}

.welcome {
  float: left;
  font-size: 30px;
  margin-left: 20px;
  margin-top: 8px;
}
</style>
