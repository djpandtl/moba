<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}分类</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">
    <el-form-item label="上级分类">
      <!-- <el-input v-model="model.name"></el-input> -->
       <el-select v-model="model.parent" @change="testSelect" placeholder="请选择">
        <el-option
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
    </el-form-item> 
    <el-form-item label="名称">
      <el-input v-model="model.name"></el-input>
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
      parents: [],
    }
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        console.log('id---', this.model)
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/categories', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/categories/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
    // 获取所有上级分类
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data 
      console.log('上级分类', this.parents)
    },
    testSelect() {
      console.log('这是select选择框绑定的值', this.model.parent)
    }
  },
  created() {
    // this.model = {}
    this.fetchParents()
    // 当存在 id 也就是编辑分类时才发送请求
    this.id && this.fetch()
  }
}
</script>