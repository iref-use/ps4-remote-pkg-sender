<template >
<div>

    <AppConfig />

    <el-divider />

    <el-row>
      <el-col :span="8">
        <img :src="$root.getImage('assets/buymeashisha.svg')" class="cursor-pointer" @click="$root.open(links.kofi)" />
        <img :src="$root.getImage('assets/platform.svg')" class="cursor-pointer" @click="$root.open(links.github_releases)" />
        <br>
        <img :src="'https://img.shields.io/github/commits-since/gkiokan/ps4-remote-pkg-sender/v'+$root.versions.app" class="cursor-pointer" @click="$root.open(links.github_releases_latest)" />
        <img src="https://img.shields.io/github/last-commit/gkiokan/ps4-remote-pkg-sender" class="cursor-pointer" @click="$root.open(links.github_repo)" />
        <br>
        <br>
        <img :src="$root.getImage('assets/kofi.svg')" class="cursor-pointer" @click="$root.open(links.kofi)" />

      </el-col>
      <el-col :span="16">
          Thank you for using my <b>Remote Package Sender v2</b>! <br>
          <br>
          Hope you like it so far what I've build and I would really appreciate any feedback and support. <br>
          <br>
          If you want to Support me and my development, you can do this on Ko-Fi. <br>
          That high quality application development is done in my free time and takes much effort. <br>
          There are so many nice features that are on my todo (black)-list that are not done yet. <br>
          I'd like to invest more time into this Tool and provide you one of the best Tools ever. <br>

      </el-col>
    </el-row>


    <el-divider />

    <el-button size="mini" @click="$store.dispatch('app/resetConfig')"> Reset App Settings </el-button>

    <div v-if="app.config.showConfigObject">
        <div style="height: 40px" />
        <el-divider content-position="left">Your current settings object</el-divider>
        <div style="white-space: pre" v-html="prettyPrint(app)" />
    </div>

</div>
</template>

<script>
import { get } from 'vuex-pathify'
import links from '@/../config/links'

export default {
  name: "Settings",

  data(){ return {
      links,
  }},

  computed: {
      app: get('app'),
  },

  methods: {
      prettyPrint(input={}){
          var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
          var replacer = function(match, pIndent, pKey, pVal, pEnd) {
              var key = '<span class="json-key" style="color: brown">',
                  val = '<span class="json-value" style="color: gray">',
                  str = '<span class="json-string" style="color: olive">',
                  r = pIndent || '';
              if (pKey)
                  r = r + key + pKey.replace(/[: ]/g, '') + '</span>: ';
              if (pVal)
                  r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
              return r + (pEnd || '');
          };

          return JSON.stringify(input, null, 3)
                    .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(jsonLine, replacer);        
      }
  }
}
</script>

<style lang="scss" scoped>
</style>
