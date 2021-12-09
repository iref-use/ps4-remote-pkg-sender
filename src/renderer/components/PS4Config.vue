<template>
<div id='server_config'>


  <el-divider content-position="left">PS4 Configuration</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left">
      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="PS4 IP">
                <el-input v-model="server.ip"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="10">
              <el-button size="mini" icon="el-icon-search" :disabled="true">Search for PlayStation in Network</el-button>
          </el-col>
      </el-row>
  </el-form>
  </div>

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
