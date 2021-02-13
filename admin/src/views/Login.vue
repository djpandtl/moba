<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <div class="login-form">
        <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      console.log(this.model)
      const res = await this.$http.post('login', this.model)
      console.log('res data', res.data)

      localStorage.token = res.data.token

      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>