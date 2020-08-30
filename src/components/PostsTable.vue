/* eslint-disable vue/no-unused-vars */

<template>
  <div>
    <el-table
      :data="posts.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      stripe
      @sort-change="sortChanged"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="编号" prop="id" width="80px"></el-table-column>
      <el-table-column width="500px">
        <template slot="header" slot-scope="scope">
          <div v-if="false">{{scope}}</div>
          <el-input v-model="search" placeholder="输入关键词搜索" />
        </template>
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'Blog', params: scope.row }"
            :title="scope.row.id"
          >{{ scope.row.title | formatTitle }}</router-link>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="作者" fixed="right">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'User', params: scope.row }"
            :title="scope.row.userId"
          >{{ scope.row.nickname }}</router-link>
        </template>
      </el-table-column>
      <el-table-column width="50px" align="center" label="收藏" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="inBookmark(scope.row.id)"
            icon="el-icon-star-on"
            type="text"
            @click="$store.commit('removeBookMark', scope.row.id)"
          ></el-button>
          <el-button
            v-else
            icon="el-icon-star-off"
            type="text"
            @click="$store.commit('addBookMark', scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" fixed="right" label="标签">
        <template slot="header" slot-scope="scope">
          <div v-if="false">{{scope}}</div>
          <el-select v-model="tags" multiple placeholder="选择标签">
            <el-option v-for="item in $store.getters.getTagsList" :key="item" :value="item"></el-option>
          </el-select>
        </template>
        <template slot-scope="scope">
          <Tags :ableToEdit="false" :post="scope.row"></Tags>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" fixed="right" sortable label="最近更新">
        <template slot-scope="scope">{{ scope.row.updated | formatTime }}</template>
      </el-table-column>
      <el-table-column width="120px" align="center" fixed="right" sortable label="最近回复">
        <template slot-scope="scope">{{ scope.row.lastRepliedTime | formatTime }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Tags from '@/components/Tags.vue'

// :sort-method="sortByRepliedTime"

export default {
  props: ['posts'],
  components: {
    Tags
  },
  data () {
    return {
      search: '',
      tags: this.$store.getters.getCurrentTags
    }
  },
  computed: {
    inBookmark () {
      return (id) => {
        const bookmarks = this.$store.getters.getBookmark
        return id in bookmarks
      }
    }
  },
  methods: {
    sortByUpdatedTime (obj1, obj2) {
      const time1 = new Date(obj1.updated)
      const time2 = new Date(obj2.updated)
      return time1.getTime() - time2.getTime()
    },
    sortByRepliedTime (obj1, obj2) {
      const time1 = new Date(obj1.lastRepliedTime)
      const time2 = new Date(obj2.lastRepliedTime)
      return time1.getTime() - time2.getTime()
    },
    sortChanged ({ column, prop, order }) {
      this.$emit('sortChanged', column.label, order)
    }
  },
  watch: {
    search: function (val) {
      this.$emit('keywordChanged', val)
    },
    tags: function (val) {
      this.$store.commit('updateCurrentTags', val)
      this.$emit('tagsChanged', val)
    }
  }
}
</script>
