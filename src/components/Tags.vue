<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in getTagsByPostId(post.id)"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <div v-if="ableToEdit" style="display:inline">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'ableToEdit'],
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    getTagsByPostId () {
      return (postId) => {
        const tagsByPostId = this.$store.getters.getTagsByPostIdDict
        return tagsByPostId[postId]
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.$store.commit('removeTag', { tag: tag, postId: this.post.id })
      // localStorage.removeItem('tagsByPostId')
      // localStorage.removeItem('postsByTag')
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.$store.commit('addTag', { tag: inputValue, post: this.post })
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 5px 10px 5px 10px;
}

.el-input {
  margin-left: 10px;
  height: 32px;
  width: 90px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.el-button--small {
  width: 90px;
  margin-top: 5px;
  margin-bottom: 5px;
  /* margin-left: 10px; */
  vertical-align: bottom;
}
</style>
