<template>
  <div id="app">
    <top-nav></top-nav>
    <div class="container-pd">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container-pd{
  padding-top: $topnavHeight;
}
</style>