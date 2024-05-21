<template>
<div class="WindowLoader">

    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="bg logo">
        <img :src="$root.getImage('assets/rpsV2.png')" style="width: 180px; margin: 0 auto; margin-top: 200px" />
    </div>

    <div class="header text-center">
        <el-button round @click="close"> Close Downloading Window <i class="el-icon-close" /> </el-button>

        <div class="url" style="text-align: left; margin-top: 30px;">
          <div style="margin-bottom: 10px; display:block; font-weight:bold;">Downloading </div>
          <div v-if="true">{{ url }}</div>
        </div>
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
          else {
            alert("No Query parameter given.")
            this.close()
          }
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
    height: calc(100vh - 60px);

    padding: 0px;
    top:0px; left: 0px; right: 0px; bottom: 0px;
    border: 10px solid maroon;  
    overflow: hidden;
}

.inlineWebView {
    position: relative;
    height: auto;
    width: auto;
}

.header {
  position: relative; z-index: 10;
  border: 0px solid red;
  margin-top: 20px;
  width: calc(100vw - 50px);

  .url {
      padding: 20px;
      white-space: normal;
      word-break: break-all;
      text-align: left;
      max-width: 600px;
  }
}

.bg {
  position: absolute; z-index: 1;
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, rgba(20,20,20,.2) 50%, rgba(50,0,0,.5) 50%);
  bottom:0;
  left:-50%;
  opacity:1;
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
    transform:translateX(3%);
  }
  100% {
    transform:translateX(30%);
  }
}
</style>
