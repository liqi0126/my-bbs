<template>
  <el-drawer title="收藏" direction="ltr" :visible.sync="$store.state.showBookmark">
    <PostHead v-for="post of $store.state.bookmark" :key="post.id" :post="post"></PostHead>
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
