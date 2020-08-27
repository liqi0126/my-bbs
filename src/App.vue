<template>
  <div id="app">
    <el-container>
      <el-aside width="15%">
        <my-aside></my-aside>
      </el-aside>
      <el-main style="padding:0">
        <el-container>
          <el-header style="padding:0">
            <my-header></my-header>
          </el-header>
          <el-main>
            <!-- <router-view :key="$route.fullPath" /> -->
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <bookMark></bookMark>
    <history></history>
  </div>
</template>

<script>
import myHeader from './components/Header'
import myAside from './components/Aside'
import bookMark from './components/Bookmark'
import history from './components/History'

export default {
  name: 'app',
  components: {
    myHeader,
    myAside,
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

.el-drawer.ltr {
  overflow: scroll;
  background-color: rgb(247, 247, 247);
}

.el-header {
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffffff;
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
