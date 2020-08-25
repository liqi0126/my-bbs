<template>
  <div id="app">
    <el-container direction="vertical">
      <my-header></my-header>
      <el-main>
        <router-view :key="$route.fullPath" />
        <!-- <router-view /> -->
      </el-main>
    </el-container>
    <bookMark></bookMark>
    <history></history>
  </div>
</template>

<script>
import myHeader from './components/Header'
import bookMark from './components/Bookmark'
import history from './components/History'

export default {
  name: 'app',
  components: {
    myHeader,
    bookMark,
    history
  }
}
</script>

<style lang="scss">
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-header #header {
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body,
div,
span,
a,
p,
ul,
li {
  margin: 0;
  padding: 0;
}
</style>
