<template>
  <el-drawer title="浏览历史" direction="ltr" :visible.sync="$store.state.showHistory">
    <el-table :data="$store.getters.getHistory" stripe style="width: 100%">
      <el-table-column label="文章题目">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'Blog', params: scope.row }"
            :title="scope.row.id"
          >{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="作者">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'User', params: scope.row }"
            :title="scope.row.userId"
          >{{ scope.row.nickname }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="访问日期">
        <template slot-scope="scope">{{ scope.row.visitTime | formatTime }}</template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
export default {
  filters: {

  }
}
</script>
