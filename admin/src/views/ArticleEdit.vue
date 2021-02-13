<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}文章</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">

      <el-form-item label="所属分类">
      <!-- <el-input v-model="model.name"></el-input> -->
       <el-select v-model="model.categories" multiple placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
     </el-form-item> 

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor v-model="model.body"
          useCustomImageHandler @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    // id 属性来自于 动态路由的 id 参数，类似于 router.params.id
    // 为什么是个对象接收
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        console.log('id---', this.model)
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/articles', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/articles/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
    afterUpload(res) {
      console.log('img upload', res)
      
      // this.model.icon =  res.url // 非响应式
      this.$set(this.model, 'icon', res.url)
    },
    async fetchCategories() {
      const res = await  this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    // 上传富文本编辑器里面的图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

      // 不借助 el-upload 上传图片
      const formData = new FormData();
      formData.append("file", file);
 
      const res = await this.$http.post('/upload', formData)
      
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

    },
  },
  created() {
    // this.model = {}
    this.fetchCategories()
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