<template>
  <el-drawer
    title="收藏"
    direction="ltr"
    :visible.sync="$store.state.showBookmark"
    style="overflow:scroll"
    id="bookmark"
  >
    <PostHead v-for="post of $store.getters.getBookmark" :key="post.id" :post="post"></PostHead>
  </el-drawer>
</template>

<script>
import PostHead from './PostHead.vue'

export default {
  components: {
    PostHead
  }
}
</script>

<style>
</style>
