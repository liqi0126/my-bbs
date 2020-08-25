<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
      <div>
        <PostHead v-for="post in posts" :key="post.id" :post="post"></PostHead>
        <el-pagination ref="pagination" :total="total" :current-page.sync="page"></el-pagination>
      </div>
      <div id="to-post">
        <div class="row">
          <span class="hint">快来发表自己的帖子吧~</span>
        </div>
        <div class="row">
          <span class="hint">标题:&nbsp;</span>
          <el-input placeholder="建议不超过24个字" v-model="title" clearable class="title-input"></el-input>
        </div>
        <Editor ref="editor"></Editor>
        <el-button type="success" icon="el-icon-upload" class="submit" @click="submit">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PostHead from '@/components/PostHead.vue'
import Editor from '@/components/Editor.vue'

export default {
  data () {
    return {
      title: '',
      page: 0,
      loading: false,
      total: 0,
      posts: []
    }
  },
  components: {
    Editor,
    PostHead
  },
  methods: {
    loadData () {
      this.$http({
        url: '/api/v1/post',
        method: 'get',
        params: {
          page: (this.$route.params.page) ? this.$route.params.page : 1,
          size: 10
        },
        headers: {
          Authorization: this.$store.getters.getToken
        }
      })
        .then(response => {
          this.total = response.data.total
          this.posts = response.data.posts
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })

      this.page = this.$store.state.currentPage
    },
    submit () {
      this.$http({
        url: '/api/v1/post',
        method: 'post',
        data: {
          title: this.title,
          content: this.$refs.editor.content
        },
        headers: {
          Authorization: this.$store.getters.getToken
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.$alert('发布成功!')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    changePage () {
      console.log(this.$refs.pagination)
      return 0
    }
  },
  beforeMount () {
    this.loading = true
    this.loadData()
  },
  watch: {
    page: function (val) {
      if (this.$route.name === 'Home' && val === 1) {
        return
      }
      if (this.$route.params.page === val.toString()) {

      }
      this.$store.commit('setCurrentPage', val)
      this.$router.push(`/postslist/page=${val}`)
      this.loading = true
      this.loadData()
    }
  }
}
</script>

<style scoped>
.loading {
  height: 100%;
  width: 100%;
}

#to-post {
  margin: 50px;
}

.row {
  position: relative;
  display: block;
  line-height: 30px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #bfbfbf;
}

.hint {
  font-size: 16px;
  padding-left: 20px;
  color: #979797;
}

.title-input {
  width: 500px;
}

.submit {
  margin-top: 45px;
}
</style>
