<template>
<div>

  <h2>Downloads</h2>

  <el-row>
    <el-col style="width: 240px;">
        <img :src="$root.getImage('assets/rpi.png')" class="icon0" />
    </el-col>
    <el-col :span="12">
        <b>Remote Package Installer</b> by flatZ <br>
        <br>
        The first Remote Package Installer of the scene made by flatZ. <br>
        It has been build in 2019 and have no latest updates yet. <br>
        It is known as the legacy default way to install PKG's through Netowrk. <br>
        <br>
        Any troubles are addressed in the Troubleshooting Guide. <br>
        <br>
        <el-button @click="$root.open(links.ps4_rpi)"> Download </el-button>
        <el-button @click="$root.open(links.ps4_rpi_github)"> GitHub </el-button>
    </el-col>
  </el-row>

  <div style="height: 40px" />

  <el-row>
    <el-col style="width: 240px;">
        <img :src="$root.getImage('assets/rpioop.png')" class="icon0" />
    </el-col>
    <el-col :span="12">
        <b>Remote Package Installer [Open Orbis Port]</b> by njzydark <br>
        <br>
        Fork of the RPI OOP by Njzydark with latest updates. <br>
        Check GitHub repositories to compare the updates. <br>
        <br>
        <el-button @click="$root.open(links.ps4_rpioop_njzydark)"> Download </el-button>
        <el-button @click="$root.open(links.ps4_rpioop_github_njzydark)"> GitHub </el-button>
    </el-col>
  </el-row>

  <div style="height: 40px" />

  <el-row>
    <el-col style="width: 240px;">
        <img :src="$root.getImage('assets/rpioop.png')" class="icon0" />
    </el-col>
    <el-col :span="12">
        <b>Remote Package Installer [Open Orbis Port]</b> by backporter<br>
        <br>
        Backporter is working on a new version of the Remote Package Installer <br>
        porting it from flatZ version to a new one with the Open Orbis SDK. <br>
        <br>
        Below you can find the direct version 1.0 and the GitHub repo. <br>
        <br>
        <el-button @click="$root.open(links.ps4_rpioop)"> Download </el-button>
        <el-button @click="$root.open(links.ps4_rpioop_github)"> GitHub </el-button>
    </el-col>
  </el-row>

  <div style="height: 40px" />

  <el-row>
    <el-col style="width: 240px;">
        <img :src="$root.getImage('assets/hb.png')" class="icon0" />
    </el-col>
    <el-col :span="12">
        <b>HB-Store R2</b> by LightningMods <br>
        <br>
        The official Homebrew App Store build by Darksoftware LLC. <br>
        <br>
        Thanks to LightningMods I am permitted to use the API in the app. <br>
        This means, you can Download and Install HB-Store Apps directly. <br>
        <br>
        <el-button @click="$root.open(links.ps4_hbstore)"> Download </el-button>
        <el-button @click="$root.open(links.pkgzone)" > Visit PKG-Zone.com </el-button>
    </el-col>
  </el-row>

  <div style="height: 40px" />  

  <el-row>
    <el-col style="width: 240px;">
        <img :src="$root.getImage('assets/hb-store-cdn-server.jpeg')" class="icon0" />
    </el-col>
    <el-col :span="12">
        <b>HB-Store CDN Server</b> by Gkiokan <br>
        <br>
        With the CDN Server you can host all your local PKG files with <br>
        an ease to the HB-Store. It supports name fixing and sub directory scans <br>
        based on a base Path, and is also cross plattform available.<br>
        <br>
        There is also a CLI-Version that is even used officially on RetroNAS!<br>
        <br>
        <el-button @click="$root.open(links.hb_store_cdn_server_latest)"> Download </el-button>
        <el-button @click="$root.open(links.hb_store_cdn_server_repo)" > CDN Server </el-button>
        <el-button @click="$root.open(links.hb_store_cdn_server_cli_repo)" > CDN Server CLI Version </el-button>
    </el-col>
  </el-row>

  <div style="height: 40px" />

  <el-row>
    <el-col style="width: 240px;">
        &nbsp;
    </el-col>
    <el-col :span="12">
        <b>Your App here?</b> <br>
        <br>
        If you would like to add your Homebrew App to the Downloads Area <br>
        message me on Discord at <el-tag size="mini">Gkiokan#0735</el-tag> <small style="font-size: 13px">(legacy)</small> or <el-tag size="mini">gkiokan</el-tag><br>

    </el-col>
  </el-row>

  <div style="height: 40px" />
</div>
</template>

<script>
import links from '@/../config/links'

export default {
    name: 'Download',

    data(){ return {
        links,
    }},

    methods: {

    }
}
</script>

<style lang="scss" scoped>
b {
  font-weight: bold;
}

.icon0 {
  display: block;
  width: 200px; height: 200px;
  border-radius: 4px;
}
</style>
