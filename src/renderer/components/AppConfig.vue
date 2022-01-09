<template>
<div id='server_config'>

  <el-divider content-position="left">Application Settings</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left">

      <div>
          <el-form-item label="Language">
            <el-select v-model="config.lang" placeholder="Language" default-first-option>
                <el-option :label="lang.value" :value="lang.key" :disabled="lang.disabled" v-for="lang in languages" :key="lang.key" />
            </el-select>
          </el-form-item>
      </div>

      <div>
          <el-form-item label="Style">
            <el-select v-model="config.style" placeholder="Style" default-first-option>
                <el-option label="Light Mode" value="light" />
                <el-option label="Dark Mode" value="dark" />
            </el-select>
          </el-form-item>
      </div>

      <div>
          <el-form-item label="HB-Store">
              <el-checkbox v-model="config.useHB"> Activate HB-Store in Tab </el-checkbox>
          </el-form-item>
      </div>


  </el-form>
  </div>

  <template v-if="debug">
    <pre>Config {{ config }}</pre>
  </template>

</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
    name: 'AppConfig',

    data(){ return {
        debug: false,

        languages: [
            { key: 'en', value: 'English', disabled: false },
            { key: 'de', value: 'German', disabled: true },
            { key: 'fr', value: 'French', disabled: true },
            { key: 'sp', value: 'Spain', disabled: true },
            { key: 'tr', value: 'Turkish', disabled: true },
            { key: 'gr', value: 'Greek', disabled: true },
        ],
    }},

    mounted(){

    },

    computed: {
        config: get('app/config'),
    },

    watch: {
        'config.lang'(){ this.save() },
        'config.style'(){ this.save() },
        'config.useHB'(){ this.save() },
        'config.useHBRoot'(){ this.save() },
    },

    methods: {
        save(){
            console.log("Saving App Configuration")
            this.$store.dispatch('app/setConfig', this.config)
        },

    }
}
</script>

<style lang="scss">

</style>
