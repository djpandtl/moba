<template>
  <div class="mt-5">
    <h1>{{ id}}</h1>
  </div>
</template>
<script>
// import axios from 'axios';

export default {
  props: {
    id: null
  },
  data() {
    return {
      model: null
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
      console.log(' this.model',  this.model)
    }
  },
}
</script>