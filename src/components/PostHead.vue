
<template>
  <div id="card" shadow="hover">
    <div slot="header" id="header">
      <router-link
        :to="{ name: 'Blog', params: { id: post.id, userId: post.userId } }"
        :title="post.id"
        id="title"
      >{{ post.title | formatTitle }}</router-link>
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
      <span
        @click="handleFigure($event)"
        v-html="$options.filters.formatEmoji(post.content)"
        class="content"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    handleFigure (e) {
      if (e.target.tagName === 'IMG') {
        if (e.target.style.maxWidth === '500px' || e.target.style.maxWidth === '') {
          e.target.style.maxWidth = '99999px'
        } else {
          e.target.style.maxWidth = '500px'
        }
        if (e.target.style.maxHeight === '500px' || e.target.style.maxHeight === '') {
          e.target.style.maxHeight = '99999px'
        } else {
          e.target.style.maxHeight = '500px'
        }
      }
    }
  }
}
</script>

<style scoped>
.content >>> img {
  max-width: 500px;
  max-height: 500px;
  cursor: pointer;
}
</style>

<style scoped lang="scss">
#card {
  // line-height: 1.5;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: auto;
  border: 1px solid #bbbbbb;
  transition: 0.3s;
  margin: 0px 10px 30px 10px;
  background-color: #edf7fc;
  color: #303030;

  #header {
    min-height: 40px;
    border-bottom: 1px solid #d6d6d6;
    // border-bottom: 2px solid #ffffff;
    box-sizing: border-box;
    #title {
      top: 0;
      font-size: 25px;
    }
  }
}

#card:hover {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
}

#content {
  padding: 15px;
  text-align: left;
}

#body {
  position: relative;
  padding: 5px;
}

#user {
  font-size: 20px;
}

.time {
  color: #5e5e5e;
  font-size: 12px;
}
</style>
