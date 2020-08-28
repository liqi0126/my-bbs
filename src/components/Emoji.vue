<template>
  <div class="area-box">
    <el-popover ref="popover" placement="top" width="400" v-model="emojiShow">
      <el-button type="text" class="ql-emoji" slot="reference" icon="el-icon-user"></el-button>
      <div class="emotion-box">
        <div class="emotion-list">
          <el-button
            size="large"
            type="text"
            v-for="v in $store.state.emoji"
            :key="v"
            @click="addEmoji(v)"
            style="font-size:25px"
          >
            <!-- <img v-if="v.endsWith('.png')" :src="v" />
            <div v-else>{{v}}</div>-->
            <!-- <div>{{v}}</div> -->
            <img :src="v" />
          </el-button>
        </div>
      </div>
    </el-popover>
    <img src="@/assets/logo.png" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      emojiShow: false,
      emoji: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', require('@/assets/logo.png')]
    }
  },
  methods: {
    addEmoji (v) {
      console.log(v)
    }
  }
}
</script>
