<template>
  <div class="container">
    <div class="tip">404，未找到该页面</div>
  </div>
</template>

<script>
export default {
  name:'notFound',
  props:[''],
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.container {
  padding: 0.2rem;
  .tip {
    font-size: 0.2rem;
    color: #888;
  }
}
</style>