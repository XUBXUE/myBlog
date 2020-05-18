<template>
  <div class="container">
    <div class="stars">
      <div class="star" v-for="(item,index) in starCount" :key="index" ref="star"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'stars',
  props: {
    starCount: { //星星数量
      type: Number,
      default: 800
    },
    distance: { //间距
      type: Number,
      default: 800
    }
  },
  data () {
    return {
    };
  },
  mounted() {
    let _this = this
    let starArr = _this.$refs.star
    console.log(starArr)
    starArr.forEach(item => {
      let speed = 0.2 + (Math.random() * 1);
      let thisDistance = _this.distance + (Math.random() * 300);
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`
    })
  },
  methods: {}
}

</script>
<style lang='scss' scoped>
.container{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: radial-gradient(220% 105% at top center,#1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
  background-attachment: fixed;
}
@keyframes rotate{
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100%{
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars{
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 0;
  .star{
    width: 2px;
    height: 2px;
    background: #f7f7b8;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
  }
}
</style>