<template>
<div class="WindowLoader">

    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="bg logo">
        <img :src="$root.getImage('assets/rpsV2.png')" style="width: 180px; margin: 0 auto;" />
        <br>
        downloading...
    </div>

    <div class="header">
        <el-button round @click="close"> Close Downloading Window <i class="el-icon-close" /> </el-button>
    </div>
    <webview :src="url" v-if="url" useragent="StoreHAX" style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 5; width: 100vw; height: 100vh;" />

</div>
</template>

<script>
export default {
  name: 'WindowLoader',

  data(){ return {
      url: ''
  }},

  mounted(){
      this.init()
  },

  methods: {
      init(){
          if(this.$route.query.q)
            this.url = this.$route.query.q
      },

      close(){
          window.close()
      },
  }
}
</script>

<style lang="scss" scoped>
.WindowLoader {
  position: relative;
}

.inlineWebView {
    position: relative;
    height: 100vh;
    width: 100vw;
}

.header {
  position: relative; z-index: 5;
  border: 0px solid red;
}

.bg {
  position: absolute; z-index: 1;
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, rgba(20,20,20,.2) 50%, rgba(50,0,0,.5) 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;

  &.logo {
      position: fixed; z-index: 4;
      top: 0px; right: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:2s;
}

.bg3 {
  animation-duration:3s;
}

@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
</style>
