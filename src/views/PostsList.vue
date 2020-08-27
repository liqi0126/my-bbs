<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
      <div>
        <!-- <PostHead v-for="post in posts" :key="post.id" :post="post"></PostHead> -->
        <PostsTable :posts="posts"></PostsTable>
        <el-pagination
          ref="pagination"
          :total="total"
          :current-page.sync="page"
          @current-change="changePage"
          :page-size.sync="pageSize"
          style="margin-top:20px"
        ></el-pagination>
      </div>
      <el-divider class="divider">快来发表自己的帖子吧~</el-divider>
      <div id="to-post">
        <div class="row">
          <span class="hint">标题:&nbsp;</span>
          <el-input placeholder="建议不超过24个字" v-model="title" clearable class="title-input"></el-input>
        </div>
        <Editor ref="editor" style="width:60%"></Editor>
        <el-button type="success" icon="el-icon-upload" class="submit" @click="submit">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import PostHead from '@/components/PostHead.vue'
import PostsTable from '@/components/PostsTable.vue'
import Editor from '@/components/wangEditor.vue'

export default {
  data () {
    return {
      title: '',
      page: (this.$route.name === 'Home') ? 1 : parseInt(this.$route.params.page),
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
      } else {
        this.$http({
          url: '/api/v1/post',
          method: 'get',
          params: {
            page: this.page,
            size: this.pageSize
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
          }
        })
        .catch(error => {
          console.log(error)
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

.submit {
  margin-top: 20px;
}
</style>
