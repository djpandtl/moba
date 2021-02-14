<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}广告位</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">

    <el-form-item label="名称">
      <el-input v-model="model.name"></el-input>
    </el-form-item>

    <el-form-item label="广告">
      <!-- <el-input v-model="model.name"></el-input> -->
       <el-form-item>
          <el-button type="text"  @click="addAdItems"
            ><i class="el-icon-plus" ></i>添加广告</el-button>
        </el-form-item>

       <el-row style="display: flex; flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="(res) => {$set(item, 'image', res.url)}"
                :headers="getAuthHeaders()"
                >
                <img v-if="item.image" :src="item.image" class="avatar" 
                  style="margin-top: 0.7rem">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
             <el-form-item>
              <el-button type="danger" style="margin-bottom: 1rem;text-align:center"  @click="deleteAdItems(i)">删除</el-button>
             </el-form-item>
          </el-col>
        </el-row>
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
        items: []
      },
      
    }
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        console.log('id---', this.model)
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
       res = await this.$http.post('rest/ads', this.model)
      }

      this.model = res.data
      console.log('res mode', this.model)

      this.$router.push('/ads/list')

      // 提示信息
      this.$message({
        message: `${this.id ? '修改成功' : '保存成功'}`,
        type: 'success'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = res.data

      console.log('获取单个分类', this.model)
    },
    addAdItems() {
      // this.model.items.push({})
      this.$set(this.model.items, this.model.items.length, {})
    },
    deleteAdItems(i) {
      this.model.items.splice(i, 1)
    }
  },
  created() {
    // this.model = {}
    // 当存在 id 也就是编辑分类时才发送请求
    this.id && this.fetch()
  }
}
</script>