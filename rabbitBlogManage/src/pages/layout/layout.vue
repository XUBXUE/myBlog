<template>
  <div>
    <div class="topNav">
      <top-nav></top-nav>
    </div>
    <div :class="['leftNav',$store.state.showMenu?'navWidth200':'navWidth60']">
      <left-nav backgroundColor="#338ace" textColor="#FFFFFF" :menuList="menuList"></left-nav>
    </div>
    <div :class="['container',$store.state.showMenu?'containerLeft200':'containerLeft60']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name:'layout',
  props:[''],
  components: {
  },
  data () {
    return {
      menuList: [
        {
          id: '0001',
          path: '/home',
          name: '首页',
          iconClass: 'el-icon-s-home'
        },
        {
          id: '0002',
          path: '/home/list',
          name: '文章列表',
          iconClass: 'el-icon-folder'
        }
      ]
    };
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.topNav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: $topNavHeight;
}
.leftNav {
  // width: $leftNavWidth;
  position: fixed;
  top: $topNavHeight;
  bottom: 0;
  z-index: 999;
}
.container {
  position: absolute;
  top: $topNavHeight;
  bottom: 0;
  right: 0  ;
  // left: $leftNavWidth;
  overflow-x: hidden;
  overflow-y: auto;
  transition: left 0.5s;
}
</style>