<template>
  <div class="p-3">
    Articles-- {{ id }}
    <div @click="$router.push('/home')">
      <span class="iconfont icon-menu bg-primary fs-xl"></span>
    </div>
    <div v-html="model.body" style="width: 100%"></div>

    <div class="footer mt-5">
      <router-link 
       v-for="item in model.related"
       :key="item._id"
       :to="`/article/${item._id}`"
       tag="div"
       class="mt-3"
      >
       {{ item.title }}
      </router-link>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';

export default {

  props: {
    id: { required: true }
  },
  data() {
    return {
      model: {}
    }
  },
  watch: {
    // 解决路由切换时组件复用问题 ，可用以下方法
    // id: 'fetch', 
    id() {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      // const url = 'http://127.0.0.1:8585/web/api/articles/'
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
      console.log(' this.model',  this.model)
    }
  },
   created() {
     this.fetch()
   }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>