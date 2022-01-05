<template>
<div class='full'>

    <div class='message'>#Error | 404 </div>

    <div style='height: 50px' />

    <el-button @click="$router.push({ name: 'home' })"> Restart Application View </el-button>
</div>
</template>

<script>
export default {
  name: 'Error404',
}
</script>

<style lang="scss" scoped>
.full {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 100vh;
  width: 100%;
  text-align: center;

  border: 0px solid red;

  .message {
      font-size: 60px;
      color: #ddd;
  }
}
</style>
