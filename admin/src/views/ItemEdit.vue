<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}物品</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- <el-input v-model="model.img"></el-input> -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers="getAuthHeaders()"
          >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    // id 属性来自于 动态路由的 id 参数，类似于 router.params.id
    // 为什么是个对象接收
    id: {}
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        console.log('id---', this.model)
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/items', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/items/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
    afterUpload(res) {
      console.log('img upload', res)
      
      // this.model.icon =  res.url // 非响应式
      this.$set(this.model, 'icon', res.url)
    },
  },
  created() {
    this.model = {}
    // 当存在 id 也就是编辑分类时才发送请求
    this.id && this.fetch()
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>