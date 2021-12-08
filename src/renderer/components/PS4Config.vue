<template>
<div id='server_config'>

  <el-form :inline="true" label-width="150px" size="mini" label-position="left">
      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="PS4 IP">
                <el-input v-model="server.ip"></el-input>
              </el-form-item>
          </el-col>
      </el-row>
  </el-form>

</div>
</template>

<script>
export default {
    name: 'PS4Config',

    data(){ return {
        server: {
            ip: 'n/a',
            port: 'n/a',
        }
    }}
}
</script>

<style lang="css" scoped>
</style>
