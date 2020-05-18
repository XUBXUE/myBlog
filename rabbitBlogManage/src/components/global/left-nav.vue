<template>
  <div class="menu">
    <!-- <div class="menu-item">
      <span>首页</span>
    </div> -->
    <el-menu :router='true' class="el-menu-vertical-demo" :default-active="$route.path" :collapse="!$store.state.showMenu" :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
      <el-menu-item v-for="item of menuList" :key="item.id" :index="item.path">
        <i :class="item.iconClass"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "left-nav",
  props: {
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    textColor: {
      type: String,
      default: '#303133'
    },
    menuList: {
      type: Array,
      required: true
    },
    activeTextColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.menu{
  height: 100%;
  .menu-item {
    height: 40px;
    line-height: 40px;
    padding: 10x 20px;
    cursor: pointer;
    span {
      position: relative;
      top: -5px;
      left: 20px;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-size: 14px;
    }
  }
  .menu-item:hover {
    background-color: #259bd3;
  }
}
.el-menu-vertical-demo {
  min-height: 100%;
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: $leftNavWidth;
// }
</style>