<template>
  <el-container class="post">
    <el-aside class="author" width="150px">
      <router-link
        :to="{ name: 'User', params: { userId: post.userId}}"
        :title="post.userId"
        id="user"
      >
        <el-avatar shape="square" :size="50">{{ post.nickname[0] }}</el-avatar>
        <div>{{ post.nickname }}</div>
      </router-link>
    </el-aside>
    <el-container>
      <el-main>
        <span v-html="post.content" class="content"></span>
        <el-button
          v-if="myPost(post.userId)"
          type="text"
          icon="el-icon-edit-outline"
          class="edit"
          @click="toEdit(-1, post.id)"
        >编辑</el-button>
        <el-collapse style="flex: 1">
          <el-collapse-item>
            <div>
              <Editor ref="rootEditor" style="padding: 0"></Editor>
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
        <el-container v-for="(reply, i) in post.reply" :key="i" class="reply">
          <el-aside class="author" width="100px">
            <router-link
              :to="{ name: 'User', params: { userId: reply.userId }}"
              :title="reply.userId"
              id="user"
            >
              <el-avatar shape="square" :size="50">{{ reply.nickname[0] }}</el-avatar>
              <div>{{ reply.nickname }}</div>
            </router-link>
          </el-aside>
          <el-main>
            <div class="content-container">
              <span v-if="reply.repliedUser !== ''" class="quote">
                对
                <router-link
                  :to="{ name: 'User', params: { userId: reply.repliedUserId }}"
                  :title="reply.repliedUserId"
                  id="user"
                >{{reply.repliedUser}}</router-link>&nbsp;说:&nbsp;
              </span>
              <span v-html="reply.content" class="content"></span>
              <el-button
                v-if="myPost(reply.userId)"
                type="text"
                icon="el-icon-edit-outline"
                class="edit"
                @click="toEdit(i, reply.id)"
              >编辑</el-button>
            </div>
            <el-collapse>
              <el-collapse-item>
                <div>
                  <Editor ref="childEditor" style="padding: 0"></Editor>
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
      <Editor ref="editEditor" style="padding: 0"></Editor>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Editor from '@/components/Editor.vue'

export default {
  props: ['post'],
  components: {
    Editor
  },
  data () {
    return {
      dialogEditVisible: false,
      editId: -1,
      editTitle: ''
    }
  },
  // inject: ['reload'],
  methods: {
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
          })
      }
    },

    toReply (editorId, replyId) {
      let content = ''
      if (editorId === -1) {
        content = this.$refs.rootEditor.content
      } else {
        content = this.$refs.childEditor[editorId].content
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
        })
    }
  }
}
</script>

<style scoped>
.editor {
  height: auto;
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
  background-color: #d3dce6;
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
