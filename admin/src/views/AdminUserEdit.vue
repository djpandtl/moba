<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}管理员</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">
    <el-form-item label="用户名">
      <el-input v-model="model.username"></el-input>
    </el-form-item>
   
    <el-form-item label="密码">
      <el-input  v-model="model.password"></el-input>
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
        res = await this.$http.put(`rest/adminUsers/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/adminUsers', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/admin_user/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/adminUsers/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
   
  },
  created() {
    // this.model = {}
    // 当存在 id 也就是编辑分类时才发送请求
    this.id && this.fetch()
  }
}
</script>