<template>
  <div class="container">
    <stars :starCount="100" :distance="500">
      <div class="login-wrapper">
        <div class="header">Login</div>
        <div class="form-wrapper">
          <input type="text" name="username" placeholder="username" class="input-item" v-model="userInfo.userName">
          <input type="password" name="password" placeholder="password" class="input-item" @keyup.enter="login" v-model="userInfo.password">
          <div class="btn" @click="login">Login</div>
        </div>
        <div class="msg">
          Don't have account? <a href="">Sign up</a>
        </div>
      </div>
    </stars>
  </div>
</template>

<script>
import stars from '@/components/stars/stars.vue'
export default {
  name:'login',
  data () {
    return {
      userInfo: {
        userName: '',
        password: ''
      }
    };
  },
  components: { stars },
  computed: {},
  methods: {
    login: function() {
      let _this = this
      this.$fetch.post('api/user/login',_this.userInfo).then(function(data) {
        if(data.code == 200) {
          _this.$cookies.set("token", data.data.data.token)
          localStorage.setItem('token', data.data.data.token)
          localStorage.setItem('userName', data.data.data.userName)
          _this.$router.push({path: '/home'})
        }
      })
    }
  },
}
</script>
<style lang='scss' scoped>
.login-wrapper {
  background-color: #FFF;
  width: 250px;
  height: 500px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  letter-spacing: 0.05em;
  .header {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
  }
  .form-wrapper {
    .input-item {
      display: block;
      width: 100%;
      margin-bottom: 20px;
      border: 0;
      padding: 10px;
      border-bottom: 2px solid rgb(128, 125, 125);
      font-size: 15px;
      box-sizing: border-box;
      outline: none;
    }
    .input-item::placeholder {
      text-transform: uppercase;
    }
    .btn {
      text-align: center;
      padding: 10px;
      width: 100%;
      border-radius: 10px;
      margin-top: 40px;
      background-image: linear-gradient(to right, #75517d, #e96f92, #f7f7b6);
      color: #FFF;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .msg {
    text-align: center;
    line-height: 80px;
    a {
      color: #e96f92;
    }
  }
}
</style>