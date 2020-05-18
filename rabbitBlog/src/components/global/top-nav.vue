<template>
  <div class="container">
    <header class="header">
      <div class="blogName"><i class="iconfont icon-tuzi fl"></i>兔子博客</div>
      <i class="iconfont icon-gengduo fr" @click="showMenu"></i>
      <transition name="menu">
      <ul class="menu-list" v-if="isShowMenu">
        <li><router-link :to="{path: '/'}" @click.native="hideMenu">首页</router-link></li>
        <li><router-link :to="{path: '/about'}" @click.native="hideMenu">关于</router-link></li>
      </ul>
      </transition>
    </header>
  </div>
</template>

<script>

  export default {
    name:'top-nav',
    props:[''],
    data () {
      return {
        isShowMenu: false
      };
    },
    methods: {
      showMenu: function() {
        this.isShowMenu = !this.isShowMenu
      },
      hideMenu: function() {
        this.isShowMenu = false
      }
    }
  }

</script>
<style lang='scss' scoped>
.container{
  position: fixed;
  width: 100%;
  z-index: 100;
  .header {
    height: $topnavHeight;
    background-color: #1e9fff;
    position: relative;
    line-height: 0.6rem;
    color: #FFF;
    font-size: 0.2rem;
    .blogName {
      display: inline-block;
      margin-left: .20rem;
      i {
        font-size: 0.2rem;
        margin-right: 0.05rem;
        font-weight: bold;
      }
    }
    >i {
      font-size: 0.2rem;
      margin-right: .2rem;
      font-weight: bold;
    }
    .menu-list {
      width: 1rem;
      position: absolute;
      top: 0.7rem;
      right: 0.1rem;
      border-radius: 0.1rem;
      background-color: #1e9fff;
      color: #FFF;
      text-align: center;
      font-size: 0.16rem;
      z-index: 100;
      transform-origin: 1rem 0;
      li {
        line-height: 0.4rem;
        letter-spacing: 0.03rem;
        a {
          color: #FFF;
        }
      }
      li:first-child{
        border-bottom: 1px solid #00adff;
      }
    }
    .menu-list::after {
      content: '';
      width: 0;
      height: 0;
      border-width: 0.1rem;
      border-style: solid;
      border-color: transparent transparent #1e9fff transparent;
      position: absolute;
      top: -0.15rem;
      right: 0.1rem;
    }
  }
}
.menu-enter {
  transform: scale(0);
}
.menu-enter-active, .menu-leave-active {
  transition: transform .1s;
}
.menu-enter-to {
  transform: scale(1);
}
.menu-leave {
  transform: scale(1);
}
.menu-leave-to {
  transform: scale(0);
}
</style>