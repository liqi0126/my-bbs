<template>
  <div>
    <!-- <div class="loading" v-if="loading">Loading...</div> -->
    <!-- <div v-else>
    <div>-->
    <PostsTable :posts="posts" @sortChanged="changeSort" @keywordChanged="changeKeyword"></PostsTable>
    <el-pagination
      ref="pagination"
      :total="total"
      :current-page.sync="page"
      @current-change="changePage"
      :page-size.sync="pageSize"
      style="margin-top:20px"
    ></el-pagination>
    <!-- </div>
    </div>-->
    <el-divider class="divider">快来发表自己的帖子吧~</el-divider>
    <div id="to-post">
      <div class="row">
        <span class="hint">标题:&nbsp;</span>
        <el-input placeholder="建议不超过24个字" v-model="title" clearable class="title-input"></el-input>
      </div>
      <Editor id="postsListEditor" ref="editor"></Editor>
      <el-button type="success" icon="el-icon-upload" class="submit" @click="submit">发表</el-button>
    </div>
  </div>
</template>

<script>
// import PostHead from '@/components/PostHead.vue'
import PostsTable from '@/components/PostsTable.vue'
import Editor from '@/components/QuillEditor.vue'

export default {
  data () {
    return {
      title: '',
      keyword: '',
      page: (this.$route.name === 'Home') ? 1 : parseInt(this.$route.params.page),
      orderByReply: false,
      pageSize: 15,
      loading: false,
      total: 0,
      posts: []
    }
  },
  components: {
    Editor,
    // PostHead,
    PostsTable
  },
  methods: {
    changeKeyword (keyword) {
      this.keyword = keyword
      this.loadData()
    },
    changeSort (label, order) {
      if (label === '最近更新') {
        this.orderByReply = false
      } else if (label === '最近回复') {
        this.orderByReply = true
      }
      this.loadData()
    },
    loadData () {
      if (this.$route.params.tags) {
        const tags = JSON.parse(this.$route.params.tags)
        const postsByTagDict = this.$store.getters.getPostsByTagDict
        const tagCount = {}
        for (const tag of tags) {
          for (const postId in postsByTagDict[tag]) {
            if (tagCount[postId]) {
              tagCount[postId]++
            } else {
              tagCount[postId] = 1
            }
          }
        }
        this.posts = []
        for (const postId in tagCount) {
          if (tagCount[postId] === tags.length) {
            this.posts.push(postsByTagDict[tags[0]][postId])
          }
        }

        this.total = this.posts.length
        this.loading = false

      } else if (this.keyword !== '') {
        this.$http({
          url: '/api/v1/post',
          method: 'get',
          params: {
            page: 1,
            size: 0x7fffff
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
            window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
          })
      } else {
        this.$http({
          url: '/api/v1/post',
          method: 'get',
          params: {
            page: this.page,
            size: this.pageSize,
            orderByReply: this.orderByReply
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
            window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
          })
      }
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
            this.loading = true
            this.loadData()
          }
        })
        .catch(error => {
          window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
        })
    },
    changePage () {
      // if (this.$route.name === 'Home' && this.page === 1) {
      //   return
      // }
      // if (this.$route.params.page === this.page.toString()) {
      //   return
      // }
      if (this.$route.params.tags) {
        this.$router.push(`/postslist/page=${this.page}/${this.$route.params.tags}`)
      } else {
        this.$router.push(`/postslist/page=${this.page}`)
      }
    }
  },
  beforeMount () {
    this.loading = true
    this.loadData()
  },
  watch: {
    $route: function (to, from) {
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

.divider {
  margin-top: 50px;
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
</style>
