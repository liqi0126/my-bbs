<template>
  <el-container class="post">
    <el-aside class="author" width="150px">
      <div v-if="post.authorId === post.userId" class="post-author">楼主</div>
      <router-link
        :to="{ name: 'User', params: { userId: post.userId}}"
        :title="post.userId"
        id="user"
      >
        <el-avatar shape="circle" :size="80" class="fig">{{ post.nickname[0] }}</el-avatar>
        <div class="author-name">{{ post.nickname }}</div>
      </router-link>
    </el-aside>
    <el-container>
      <el-main>
        <div class="main-content">
          <div class="content-header">
            <div style="float:left">{{id}} 楼</div>
            <div
              style="float:right"
            >创建于{{post.created | formatTime}}, 更新于{{post.updated | formatTime }}</div>
          </div>
          <span
            @click="handleFigure($event)"
            v-html="$options.filters.formatEmoji(post.content)"
            class="content"
          ></span>
        </div>
        <el-button
          v-if="myPost(post.userId)"
          type="text"
          icon="el-icon-edit-outline"
          class="edit"
          @click="toEdit(-1, post.id)"
        >编辑</el-button>
        <el-collapse @change="toRenderRootEditor = true" style="margin-top:20px">
          <el-collapse-item>
            <div v-if="toRenderRootEditor">
              <Editor :id="`postEditor${post.id}`" ref="rootEditor"></Editor>
              <el-button
                type="success"
                icon="el-icon-upload"
                class="submit"
                style="margin-top: 10px"
                @click="toReply(-1, post.id)"
              >发表</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-footer height="post.reply.length * 100" style="padding: 0">
        <el-container v-for="(reply, i) in post.reply" :key="reply.id" class="reply">
          <el-aside class="author" width="100px">
            <div v-if="reply.authorId === reply.userId" class="post-author" style="top:0;right:0">楼主</div>
            <router-link
              :to="{ name: 'User', params: { userId: reply.userId }}"
              :title="reply.userId"
              id="user"
            >
              <el-avatar shape="circle" :size="60" class="reply-fig">{{ reply.nickname[0] }}</el-avatar>
              <div class="reply-author-name">{{ reply.nickname }}</div>
            </router-link>
          </el-aside>
          <el-main>
            <div class="content-container">
              <div class="main-content">
                <div class="content-header">
                  <div
                    style="float:right"
                  >创建于{{ reply.created | formatTime}}, 更新于{{ reply.updated | formatTime }}</div>
                </div>
                <span v-if="reply.repliedUser !== ''" class="quote">
                  对
                  <router-link
                    :to="{ name: 'User', params: { userId: reply.repliedUserId }}"
                    :title="reply.repliedUserId"
                    id="user"
                  >{{reply.repliedUser}}</router-link>&nbsp;说:&nbsp;
                </span>
                <span
                  @click="handleFigure($event)"
                  v-html="$options.filters.formatEmoji(reply.content)"
                  class="content"
                ></span>
              </div>
              <el-button
                v-if="myPost(reply.userId)"
                type="text"
                icon="el-icon-edit-outline"
                class="edit"
                @click="toEdit(i, reply.id)"
              >编辑</el-button>
            </div>
            <el-collapse @change="$set(toRenderSubPostEditor, i-1, true)">
              <el-collapse-item>
                <div :key="reply.id" v-if="toRenderSubPostEditor[i-1]">
                  <Editor
                    :id="`subPostEditor${reply.id}`"
                    :ref="`childEditor${i}`"
                    style="padding: 0"
                  ></Editor>
                  <el-button
                    type="success"
                    icon="el-icon-upload"
                    class="submit"
                    style="margin-top: 10px"
                    @click="toReply(i, reply.id)"
                  >发表</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-main>
        </el-container>
      </el-footer>
    </el-container>

    <el-dialog title="编辑" :visible.sync="dialogEditVisible" custom-class="dialog">
      <div v-if="post.id === 0" class="row">
        <span class="hint">标题:&nbsp;</span>
        <el-input
          ref="titleEditor"
          placeholder="编辑题目"
          v-model="editTitle"
          clearable
          class="title-input"
        ></el-input>
      </div>
      <Editor
        :id="`editEditor${post.id}`"
        ref="editEditor"
        style="padding:0px"
        :visible.sync="dialogEditVisible"
      ></Editor>
      <div slot="footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片" :visible.sync="dialogImgVisible" custom-class="dialog" style="width=100%">
      <img :src="imgSrc" style="max-width:100%" />
    </el-dialog>
  </el-container>
</template>

<script>
import Editor from '@/components/QuillEditor.vue'
import Vue from 'vue'

export default {
  props: ['post', 'id'],
  components: {
    Editor
  },
  data () {
    return {
      dialogEditVisible: false,
      dialogImgVisible: false,
      imgSrc: '',
      editId: -1,
      editTitle: '',
      openCollapse: false,
      toRenderRootEditor: false,
      toRenderSubPostEditor: [],
    }
  },
  beforeMount () {
    for (let i in this.post.reply) {
      this.toRenderSubPostEditor.push(false)
    }
  },
  watch: {
    openCollapse: function () {
      console.log(val)
    }
  },
  // inject: ['reload'],
  methods: {
    toShowSubPostEditor (id) {
      return this.toRenderSubPostEditor[id]
    },

    handleFigure (e) {
      if (e.target.tagName === "IMG") {
        this.imgSrc = e.target.src
        this.dialogImgVisible = true
      }
      // if (e.target.tagName === 'IMG') {
      //   if (e.target.style.maxWidth === '500px' || e.target.style.maxWidth === '') {
      //     e.target.style.maxWidth = '99999px'
      //   } else {
      //     e.target.style.maxWidth = '500px'
      //   }
      //   if (e.target.style.maxHeight === '500px' || e.target.style.maxHeight === '') {
      //     e.target.style.maxHeight = '99999px'
      //   } else {
      //     e.target.style.maxHeight = '500px'
      //   }
      // }
    },

    myPost (id) {
      return this.$store.getters.getUserId === id.toString()
    },

    toEdit (editorId, editId) {
      this.dialogEditVisible = true
      this.editId = editId
      this.$nextTick(() => {
        if (editorId === -1) {
          this.$refs.editEditor.content = this.post.content
        } else {
          this.$refs.editEditor.content = this.post.reply[editorId].content
        }
        if (editId === 0) {
          this.editTitle = this.post.title
        }
      }
      )
    },

    submitEdit () {
      if (this.$refs.editEditor.content === '') {
        this.$alert('说点东西再提交吧~')
        return
      }
      this.dialogEditVisible = false
      if (this.editId === 0) {
        if (this.editTitle === '') {
          this.$alert('标题不能为空哦')
          return
        }
        this.$http({
          url: `/api/v1/post/${this.post.postId}`,
          method: 'put',
          data: {
            title: this.editTitle,
            content: this.$refs.editEditor.content
          },
          headers: {
            Authorization: this.$store.getters.getToken
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.$emit('reflesh')
            }
          })
      } else {
        this.$http({
          url: `/api/v1/post/${this.post.postId}/reply/${this.editId}`,
          method: 'put',
          data: {
            content: this.$refs.editEditor.content
          },
          headers: {
            Authorization: this.$store.getters.getToken
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.$emit('reflesh')
            }
          })
          .catch(error => {
            console.log(error)
            if (error.response) {
              window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
            }
          })
      }
    },

    toReply (editorId, replyId) {
      let content = ''
      if (editorId === -1) {
        content = this.$refs.rootEditor.content
      } else {
        content = this.$refs[`childEditor${editorId}`][0].content
      }

      this.$http({
        url: `/api/v1/post/${this.post.postId}/reply`,
        method: 'post',
        data: {
          content: content,
          replyId: replyId
        },
        headers: {
          Authorization: this.$store.getters.getToken
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.$emit('reflesh')
          }
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            window.alert(`错误代码: ${error.response.status}\n错误信息: ` + error.response.data.message)
          }
        })
    }
  }
}
</script>


<style scoped>
.box::-webkit-scrollbar {
  display: none;
}

.post-author {
  text-align: center;
  line-height: normal;
  position: absolute;
  right: 20px;
  top: 15px;
  padding: 0 4px;
  background-color: #f8efef;
  display: inline-block;
  border-radius: 3px;
  font-size: 12px;
  color: #e97c62;
}

.content >>> img {
  max-width: 500px;
  max-height: 500px;
  cursor: pointer;
}

.content-header {
  font-size: 13px;
  color: #838383;
  display: block;
  line-height: normal;
  margin-bottom: 30px;
}

.editor {
  height: auto;
}

.fig {
  font-size: 50px;
  border: auto;
  background-color: #4e707a;
  margin-top: 20px;
}

.main-content {
  max-height: 600px;
  overflow: scroll;
}

.main-content::-webkit-scrollbar {
  display: none;
}

.reply-fig {
  font-size: 40px;
  border: auto;
  background-color: #4e707a;
}

.author-name {
  font-size: 16px;
  color: #000000;
}

.reply-author-name {
  font-size: 14px;
  color: #000000;
}

.post {
  border: 1px solid #e5e5e5;
  width: 1000px;
  margin: auto;
}

.author {
  width: 130px;
  text-align: center;
  padding: 15px;
  background-color: #efeff0;
  position: relative;
}

.reply {
  border: 1px solid #e5e5e5;
  margin: 0;
  padding: 0;
}

.el-main {
  position: relative;
}

.quote {
  float: left;
}

.content {
  /* padding-bottom: 20px; */
  text-align: left;
}

.el-collapse {
  border: 0px;
  /* margin-top: 60px; */
  clear: both;
}

.el-collapse-item__header {
  border-bottom: 0px;
}

#el-collapse-head-3928 {
  border-bottom: 0;
}

.edit {
  float: right;
}

.submit {
  margin-top: 45px;
}

.content-container {
  margin-bottom: 20px;
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
