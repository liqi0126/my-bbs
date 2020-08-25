
<template>
  <div id="card" shadow="hover">
    <div slot="header" id="header">
      <router-link
        :to="{ name: 'Blog', params: { id: post.id, userId: post.userId } }"
        :title="post.id"
        id="title"
      >{{ post.title }}</router-link>
    </div>
    <div id="body">
      <router-link
        :to="{ name: 'User', params: { userId: post.userId } }"
        :title="post.userId"
        id="user"
      >
        <i class="el-icon-user"></i>
        {{ post.nickname }}
      </router-link>
      <div class="time">
        <span>创建于: {{ post.created | formatTime }} 更新于: {{ post.updated | formatTime }}</span>
      </div>
      <div v-html="post.content" id="content">{{ post.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style scoped lang="scss">
#card {
  line-height: 1.5;
  text-align: center;
  box-sizing: border-box;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  // margin: 30px 100px 30px 100px;
  margin: 30px 0 30px 0;
  height: 200px;

  #header {
    height: 60px;
    padding: 5px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    #title {
      top: 0;
      font-size: 32px;
    }
  }
}

#card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#content {
  padding: 15px;
  text-align: left;
}

#body {
  position: relative;
  padding: 5px;
  height: 140px;
}

#user {
  font-size: 20px;
}

.time {
  color: #5e5e5e;
  font-size: 12px;
}
</style>
