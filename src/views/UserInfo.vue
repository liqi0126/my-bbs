<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <span class="user">{{ nickname }}</span>
      <p class="post-num">发帖数: {{ total }}</p>
      <Post v-for="post in posts" :key="post.id" :post="post"></Post>
    </div>
  </div>
</template>

<style scoped>
.user {
  font-size: 32px;
}

.post-num {
  font-size: 16px;
}
</style>

<script>
import Post from '@/components/PostHead.vue'

export default {
  data () {
    return {
      userId: 0,
      loading: false,
      total: 0,
      posts: [],
      nickname: ''
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
        })
    }
  },
  beforeMount () {
    this.userId = this.$route.params.userId
    this.loading = true
    this.loadData()
  }
}
</script>
