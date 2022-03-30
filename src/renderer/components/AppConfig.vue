<template>
<div id='server_config'>

  <el-divider content-position="left">Application Settings</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left" @submit.native.prevent>
      <el-row>
        <el-col :span="8">
            <el-form-item label="Language">
              <el-select v-model="config.lang" placeholder="Language" default-first-option>
                  <el-option :label="lang.value" :value="lang.key" :disabled="lang.disabled" v-for="lang in languages" :key="lang.key" />
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="16">
            <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px">
              *Preparation only. If anyone want to contribute, just open a new Issue with [feature/language].
            </p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
            <el-form-item label="Style">
              <el-select v-model="config.style" placeholder="Style" default-first-option>
                  <el-option label="Light Mode" value="light" />
                  <el-option label="Dark Mode" value="dark" />
                  <el-option label="Pure Black" value="pureblack" />
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="16">
            <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px">
              Want to have a specific coloring Schema? Create a new Issue with [feature/style]
            </p>
        </el-col>
      </el-row>
  </el-form>
  </div>


  <el-divider content-position="left">Feature List</el-divider>
  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left" @submit.native.prevent>
      <el-row>
        <el-col :span="8">
            <el-form-item label="External Links">
                <el-checkbox v-model="config.enableExternalLinks"> Enable adding external Links </el-checkbox>
            </el-form-item>
        </el-col>
        <el-col :span="16">
            <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px">
              Add PKG's to your Processing Center from a external URL (experimental)
            </p>
        </el-col>
      </el-row>

      <el-row>
          <el-col :span="8">
              <el-form-item label="HB-Store">
                  <el-checkbox v-model="config.useHB"> Activate HB-Store Tab</el-checkbox>
              </el-form-item>
          </el-col>
          <el-col :span="16">
              <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px">
                Access to the official HB-Store from pkg-zone.com directly
              </p>
          </el-col>
      </el-row>

      <el-row v-if="config.useHB">
          <el-col :span="8">
              <el-form-item label="HB-Store Mode">
                  <el-select v-model="config.useHBMode" placeholder="Mode" default-first-option>
                      <el-option :label="mode.value" :value="mode.key" :disabled="mode.disabled" v-for="mode in HBModes" :key="mode.key" />
                  </el-select>
              </el-form-item>
          </el-col>

          <el-col :span="16">
              <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px" v-if="config.useHBMode == 'legacy'">
                  <b>Legacy Mode</b> is for the current working HB-Store API <br>
              </p>
              <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px" v-if="config.useHBMode == 'refactored'">
                  <b>Refactored</b> one allows you to search and see your favorite apps <br>
              </p>
              <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px" v-if="config.useHBMode == 'custom'">
                  <b>Custom</b> allows you to gather information from your own cdn store hosting <br>
              </p>
          </el-col>
      </el-row>

      <el-row v-if="config.useHB && config.useHBMode == 'custom'">
          <el-col :span="8">
              <el-form-item label="HB-Store CDN" class="full-width full-width-150">
                  <el-input v-model="config.useHBRoot" style="width: 100%;"> </el-input>
              </el-form-item>
          </el-col>

          <el-col :span="16">
              <p style="font-style: italic; font-size: 13px; color: #888; padding-top: 5px; padding-left: 30px;">
                  Must end with slash (e.g. domain.com<b>/</b>)
              </p>
          </el-col>
      </el-row>

      <div style="height: 30px" />

      <div>
          <el-form-item label="Show Configuration Object" label-width="300px">
              <el-checkbox v-model="config.showConfigObject"> Show my full Settings Object </el-checkbox>
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

        HBModes: [
            { key: 'legacy', value: 'Legacy', disabled: false },
            { key: 'refactored', value: 'Refactored', disabled: true },
            { key: 'custom', value: 'Custom CDN', disabled: false },
        ]
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
        'config.useHBMode'(){ this.save() },
        'config.useHBRoot'(){ this.save() },
        'config.showConfigObject'(){ this.save() },
        'config.enableExternalLinks'(){ this.save() },
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
