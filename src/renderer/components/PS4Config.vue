<template>
<div id='server_config'>


  <el-divider content-position="left">PS4 Configuration</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left">
      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="PS4 IP">
                <el-input v-model="ps4.ip"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="10">
              <el-button size="mini" icon="el-icon-search" :disabled="true">Search for PlayStation in Network</el-button>
          </el-col>
      </el-row>

      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="Request Timeout" style="margin-bottom: 0px;">
                  <el-slider v-model="ps4.timeout" :format-tooltip="(val) => val + 'ms'"
                            :step="100" :min="2000" :max="8000" style="width:160px; display: inline-block"></el-slider> <br>
              </el-form-item>
          </el-col>

          <el-col :span="10">
              <el-form-item label="Update Interval" style="margin-bottom: 0px;">
                  <el-slider v-model="ps4.update" :format-tooltip="(val) => val + 'ms'"
                            :step="100" :min="1000" :max="5000" style="width:160px; display: inline-block"></el-slider>
              </el-form-item>
          </el-col>
      </el-row>

      <el-row :gutter="20">
          <el-col :span="10">
              <p style="font-style: italic; font-size: 13px; color: #888">
                Set a higher Request Timeout if you get timeout errors and you are sure that everything else is setup correctly.
              </p>
          </el-col>

          <el-col :span="12">
              <p style="font-style: italic; font-size: 13px; color: #888">
                Update Interval affects the interval to update the progress on a task. Higher value means more delay between updates. <br>
              </p>
          </el-col>
      </el-row>

  </el-form>
  </div>

</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
    name: 'PS4Config',

    data(){ return {

    }},

    computed: {
        ps4: sync('app/ps4'),
    },

    watch: {
        'ps4.ip'(){ this.save() },
        'ps4.timeout'(){ this.save() },
        'ps4.updateInterval'(){ this.save() },
    },

    methods: {
        save(){
            console.log("Save PS4 Configuration")
            this.$store.dispatch('app/setPs4', this.ps4)
        },
    }
}
</script>

<style lang="css" scoped>
</style>
