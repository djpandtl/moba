<template>
  <div class="card mt-3 p-2 mb-3 bg-white">
    <div class="card-header  d-flex js-around ai-center">
      <span class="iconfont" :class="icon"></span>
      <div class="flex-1 fs-xl d-flex ml-2">{{ title }}</div>
      <span class="iconfont icon-zu3649 fs-xl text-dark"></span>   
    </div>
    <slot></slot>
 </div>
</template>
<script>
export default {
  props: {
    title: { type: String },
    icon: { type: String }
  }
}
</script>
<style lang="scss" scoped>
.card {
  .card-header {
    height: 3.0769rem;
    border-bottom: 1px solid #f1f1f1;
  }
}

</style>