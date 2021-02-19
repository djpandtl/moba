<template>
  <div>
    <h1>{{ id ? "编辑" : '新建'}}英雄</h1>
    <el-form ref="form" :model="model" 
     label-width="80px" @submit.prevent.native="save">

     <el-tabs type="border-card">
      <el-tab-pane label="基础信息">
        <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="称号">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="model.categories" multiple  placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="afterUpload"
            :headers="getAuthHeaders()"
            >
            <img v-if="model.avatar" :src="model.avatar" class="avatar" style="width: 100%">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="难度">
          <el-rate :max='10' show-score
            v-model="model.scores.difficult" style="margin-top: 0.7rem">
          </el-rate>
        </el-form-item>
        <el-form-item label="技能">
          <el-rate :max='10' show-score
            v-model="model.scores.skills" style="margin-top: 0.7rem">
          </el-rate>
        </el-form-item>
        <el-form-item label="攻击">
          <el-rate :max='10' show-score
            v-model="model.scores.attack" style="margin-top: 0.7rem">
          </el-rate>
        </el-form-item>
        <el-form-item label="生存">
          <el-rate :max='10' show-score
            v-model="model.scores.survive" style="margin-top: 0.7rem">
          </el-rate>
        </el-form-item>
        
        <el-form-item label="顺风出装">
          <el-select v-model="model.items1" multiple  placeholder="请选择">
            <el-option
              v-for="item in items"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="逆风出装">
          <el-select v-model="model.items2" multiple  placeholder="请选择">
            <el-option
              v-for="item in items"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="使用技巧">
          <el-input v-model="model.usageTips" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="对战技巧">
          <el-input v-model="model.battleTips" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="团战技巧">
          <el-input v-model="model.teamTips" type="textarea"></el-input>
        </el-form-item>

      </el-tab-pane>
      <el-tab-pane label="技能" >
        <el-form-item>
          <el-button type="small"  @click="addSkills"
            ><i class="el-icon-plus" ></i>添加技能</el-button>
        </el-form-item>

        <el-row style="display: flex; flex-wrap: wrap">
          <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
            <el-form-item label="名称">
              <el-input v-model="item.name"></el-input>
            </el-form-item>

            <el-form-item label="图标">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="(res) => {$set(item, 'icon', res.url)}"
                :headers="getAuthHeaders()"
                >
                <img v-if="item.icon" :src="item.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="描述">
            <el-input type="textarea" v-model="item.description"></el-input>
            </el-form-item>
            <el-form-item label="小提示">
            <el-input v-model="item.tips"></el-input>
            </el-form-item>
             <el-form-item>
              <el-button type="danger"  @click="deleteSkills(i)">删除</el-button>
             </el-form-item>
          </el-col>
        </el-row>
       
      </el-tab-pane>
    </el-tabs>

     

      <el-form-item>
        <el-button type="primary" native-type='submit' style="margin-top: 1rem">保存</el-button>
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
        avatar: '',
        scores: { difficult: 0 },
        skills: []
      },
      categories: [],
      items: []
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

      // this.model = res.data // model.scores.difficult 会报错
      this.model = Object.assign({}, this.model, res.data)

      console.log('获取单个分类', this.model)
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data

    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data

    },
    afterUpload(res) { // 这是英雄头像上传
      console.log('img upload', res)
      
      // this.model.avatar = res.url
      this.$set(this.model, 'avatar', res.url)
    },
    addSkills() {
      this.model.skills.push({})
      console.log('addSkills', this.model.skills)
    },
    deleteSkills(i) {
      this.model.skills.splice(i, 1)
    },
    // (res) => {}(res, file) { // 这是技能图片上传
    //    this.$set(this.model.skills, 'icon', res.url)
    // }
  },
  created() {
    // this.model = {}
    console.log('this model', this.model)

    this.fetchCategories()
    this.fetchItems()
    // 当存在 id 也就是编辑分类时才发送请求
    this.id && this.fetch()
  }
}
</script>