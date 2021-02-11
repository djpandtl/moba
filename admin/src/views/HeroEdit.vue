<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}英雄</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!-- <el-input v-model="model.img"></el-input> -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          >
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
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
      model: {
        name: '',
        avatar: ''
      },
    }
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        console.log('id---', this.model)
        res = await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/heros', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/heros/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
    afterUpload(res) {
      console.log('img upload', res)
      
      // this.model.avatar = res.url
      this.$set(this.model, 'avatar', res.url)
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