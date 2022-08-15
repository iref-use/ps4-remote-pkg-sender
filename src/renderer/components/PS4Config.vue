<template>
<div id='server_config'>


  <el-divider content-position="left">PS4 Configuration</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left" @submit.native.prevent>
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
              <el-form-item label="PS4 App">
                  <el-select v-model="ps4.app" placeholder="Target App" default-first-option>
                      <el-option :label="app.value" :value="app.key" :disabled="app.disabled" v-for="app in ps4Apps" :key="app.key" />
                  </el-select>
              </el-form-item>
          </el-col>

          <el-col :span="9">
              <el-form-item label="App Port">
                  <el-input v-model="ps4.port" :disabled="ps4.app != 'rpiOOP'" style="width: 150px"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="5">
              <el-button size="small" @click="checkPS4" style="width: 100%"> <i class="el-icon-loading" v-if="testingConnection" />  Test connection</el-button>
          </el-col>
      </el-row>


      <el-divider content-position="right">Parameters</el-divider>
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
        testingConnection: false,
        ps4Apps: [
            { value: 'RPI (flatZ)', key: 'rpi', disabled: false },
            { value: 'RPI (OOP)', key: 'rpiOOP', disabled: false },
            { value: 'IPI', key: 'ipi', disabled: true },
            { value: 'HB-Store', key: 'hbstore', disabled: true },
        ]
    }},

    computed: {
        ps4: sync('app/ps4'),
    },

    watch: {
        'ps4.ip'(){ this.save() },
        'ps4.app'(val){ 
            if(val == 'rpi')
              this.ps4.port = this.ps4.port_rpi

            if(val == 'rpiOOP')
              this.ps4.port = this.ps4.port_rpiOOP

            this.save()
        },
        'ps4.port'(){ 
            if(this.ps4.app == 'rpiOOP')
              this.ps4.port_rpiOOP = this.ps4.port

            this.save()
        },
        'ps4.timeout'(){ this.save() },
        'ps4.updateInterval'(){ this.save() },
    },

    methods: {
        save(){
            console.log("Save PS4 Configuration")
            this.$store.dispatch('app/setPs4', this.ps4)
        },

        checkPS4(){
            this.testingConnection = true
            this.$ps4.checkPS4().then( (res) => {
                this.testingConnection = false
                this.$root.log("PS4 is accessible", { status: res.status, statusText: res.statusText })
                this.$message({ message: "Check Playstation: PS4 is accessible", type: 'success' })
            })
            .catch( e => {
                this.testingConnection = false
                this.$root.log("Check Playstation: PS4 is not accessible", e)
                // this.$message({ message: "PS4 is not accessible.", type: 'error' })
            })
        },

    }
}
</script>

<style lang="css" scoped>
</style>
