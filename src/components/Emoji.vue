<template>
  <el-popover ref="popover" placement="top" width="400" v-model="emojiShow">
    <el-button type="text" class="emoji" slot="reference">
      <svg viewBox="0 0 18 18">
        <circle class="ql-fill" cx="7" cy="7" r="1" />
        <circle class="ql-fill" cx="11" cy="7" r="1" />
        <path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z" />
        <circle class="ql-stroke" cx="9" cy="9" r="6" />
      </svg>
    </el-button>
    <div class="emotion-list">
      <el-button
        type="text"
        v-for="(value, key) in $store.state.emoji"
        :key="key"
        @click="addEmoji(key)"
        class="button"
      >
        <div v-if="!key.endsWith(']')">{{ value }}</div>
        <img v-else :src="value" />
      </el-button>
    </div>
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      emojiShow: false
    }
  },
  methods: {
    addEmoji (emoji) {
      this.$emit('addEmoji', emoji)
      this.emojiShow = false
    }
  }
}
</script>

<style scoped>
.emotion-list {
  max-height: 300px;
  overflow: auto;
}

.button {
  font-size: 24px;
  height: 30px;
}

.el-button + .el-button {
  margin: 0px;
}
</style>
