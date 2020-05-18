<template>
  <div class="tip">
    欢迎登录兔子博客管理系统
  </div>
</template>

<script>
export default {
  name:'index',
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {},
}
</script>
<style lang='scss' scoped>
.tip {
  width: 100%;
  background-image: linear-gradient(to right, #0eb8dc, #6b44b8);
  color:transparent;
  background-clip: text;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 100px;
  font-weight: bold;
  letter-spacing: 10px;
}
</style>