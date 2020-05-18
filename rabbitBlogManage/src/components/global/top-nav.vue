<template>
    <div class="top">
      <i class="el-icon-menu menuBtn" @click="changeMenuStatus"></i>
      <span>兔子博客</span>
      <div class="exit" @click="exit">[退出登录]</div>
      <div class="login-box">欢迎<span class="userName">{{userName}}</span></div>
    </div>
</template>
<script>
export default {
  name: "top-nav",
  data() {
    return {
      userName: ""
    }
  },
  created() {
    if(localStorage.getItem('userName')){
      this.userName = localStorage.getItem('userName')
    } else {
      this.userName = 'admin'
    }
  },
  methods: {
    changeMenuStatus: function() {
      this.$store.commit('changeShowMenu')
    },
    //退出登录
    exit: function() {
      localStorage.setItem('userName','')
      localStorage.setItem('token','')
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  background-image: linear-gradient(to right, #0eb8dc, #6b44b8);
  box-shadow: 0 -10px 20px 5px #000;
  line-height: $topNavHeight;
  color: #fff;
  padding-left: 20px;
  font-size: 22px;
  .menuBtn {
    cursor: pointer;
    margin-right: 12px;
  }
  .menuBtn:hover {
    color: #338ace;
  }
  .login-box {
    float:right;
    margin-right: 10px;
    font-size: 15px;
    .userName {
      padding: 0 5px;
    }
  }
  .exit {
    float: right;
    font-size: 15px;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>