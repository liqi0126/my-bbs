<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <span class="user">{{ nickname }}</span>
      <p class="post-num">发帖数: {{ total }}</p>
      <Post
        class="post"
        v-for="i in (loadNum < posts.length) ? loadNum : posts.length"
        :key="posts[i-1].id"
        :post="posts[i-1]"
        style="margin: auto; margin-bottom: 20px"
      ></Post>
      <div v-if="loadNum >= posts.length">已经到底啦~</div>
      <div v-else>
        <el-button type="text" @click="loadNum += 3">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.user {
  font-size: 32px;
  margin-bottom: 10px;
}

.post-num {
  font-size: 16px;
  margin-bottom: 10px;
}

.post {
  max-width: 1000px;
  max-height: 1000px;
}
</style>

<script>
import Post from '@/components/PostHead.vue'

export default {
  data () {
    return {
      userId: this.$route.params.userId,
      loading: false,
      total: 0,
      posts: [],
      nickname: '',
      loadNum: 5
    }
  },
  components: {
    Post
  },
  methods: {
    loadData () {
      this.$http({
        url: '/api/v1/post',
        method: 'get',
        params: {
          userId: this.userId,
          size: 0x7fffff
        },
        headers: {
          Authorization: this.$store.getters.getToken
        }
      })
        .then(response => {
          this.posts = response.data.posts
          this.total = response.data.total
          this.nickname = this.posts[0].nickname
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
          }
        })
    }
  },
  beforeMount () {
    this.loading = true
    this.loadData()
  }
}
</script>
