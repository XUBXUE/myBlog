<template>
  <div class="container">
    <h3 class="title">关于</h3>
    <div class="about-content">兔子博客是基于Vue+Webpack手动搭建的框架，初学webpack请多指教，欢迎交流。微信：xbx2370237499。</div>
  </div>
</template>

<script>
export default {
  name:'about',
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
    .title {
      font-size: 0.25rem;
    }
    .about-content {
      font-size: 0.15rem;
      padding-top: 0.2rem;
      color: #888;
      line-height: 0.25rem;
      word-wrap: break-word;
    }
  }
</style>