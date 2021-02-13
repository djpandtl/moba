<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220">
      </el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类">
      </el-table-column> -->
      <el-table-column prop="title" label="文章标题">
      </el-table-column>
      <!-- <el-table-column label="图片">
        <template slot-scope="scope">
         <img :src="scope.row.icon" style="height: 3rem;">
        </template>
      </el-table-column> -->

      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="remove(scope)" type="text" size="small">删除</el-button>
        <el-button 
          type="text" size="small"
          @click="edit(scope)"
        >编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('rest/articles')
        this.items = res.data
      },
      // 跳转到编辑页
      edit(scope) {
        console.log('scope row', scope.$index)
        this.$router.push(`/articles/edit/${scope.row._id}`)
      },
      async remove(scope) {
        // 弹框
        this.$confirm(`此操作将永久删除文章 "${scope.row.title}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res =  await this.$http.delete(`rest/articles/${scope.row._id}`)
          if (res.data.status) {
            this.showMessage('删除成功!', 'success')

             // 删除成功则在 items 中移除该项
            this.items.splice(scope.$index, 1)
          } else {
            this.showMessage('删除失败', 'error')
          }
        }).catch(() => {

          this.showMessage('已取消删除!', 'info')        
        });
       
      
      },
      // 多个地方用到消息提示，提取出来
      showMessage(msg, type) {
        this.$message({
            type: type,
            message: msg
          });          
      }
    }
  };
</script>