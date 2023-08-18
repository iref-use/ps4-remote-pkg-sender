<template >
<div>
    <h2>Upcoming User Feature and more in 2.10.x</h2>
    <el-divider content-position="left" v-if="false"> Upcoming User Feature and more in 2.10.x </el-divider>

    Hello Ladies and Gentlemen! <br>
    <br>
    It has been a long journey so far, and you have done well! <br>
    With 53k Download as of August 2023, that's quite impressive. <br>
    Thank you for using the Application. Any Support is appreciated and don't forget to check out my channels. <br>
    <br>
    I will talk about a couple big changes that will come soon or later, depending on your support. <br>
    This particular update (v2.9.1) has been delayed almost over one year (last update August 2022). <br>
    I've put a <el-tag size="mini" type="danger" class="cursor-pointer" @click="$root.open('https://ko-fi.com/gkiokan/goal?g=0')" target="_blank">Ko-Fi Goal</el-tag> out there, so anyone who wants to donate are welcome! <br>
    The faster the Goal hits, the more time I can spend on the updates - choice is yours :) <br>
    <br>
    Note: This View will became the User Profile Center after the update<br>
    
    <el-divider />

    <h2 style="font-size: 20px"> What is coming up? </h2>

    <b>1) Application Serial Numbers </b><br>
    Every Application in version 2.9.0+ will have it's own Serial number now. <br>
    This will be required for later encryption and decryption of messages and data for the features. <br>
    
    <div class="space-50" />

    <b>2) RPSV2 API Service </b> <br>
    With the RPSV2 API Service we will be able to handle dynamic configurations in the future. <br>
    I've created a first configuration api and will benchmark in version 2.9.1 on how good this goes for <br>
    all the users. This brings us many benefits like expanding Themes or Languages without the need <br>
    of new Release Builds, connecting the Chrome Extension or Mobile app (later on, once it's build and deployed). <br>
    <br>
    This includes also a User Management, to connect all App users together for different purposes. <br>
    Means you can register and login into your Account and Manage a bunch of stuff out of the App. <br>
    
    <div class="space-50" />

    <b>3) Translation </b> <br>
    So long requested and still not here. The reason beeing I wasn't happy about a native implementation <br>
    of the translation files. But based on the RPSV2 API Service this will be done quite soon. <br>

    <div class="space-50" />

    <b>4) Files from Remote Hosts </b> <br>
    This will be really huge. Users can share their PKG files between Users. <br>
    This feature will be possible because of Point 1 and 2. The RPSV2 API Service will handle all the <br>
    configuration and communication where as the Serial numbers will act as a handshake encryption <br>
    between the Users. On Top of all there will be a secure tunnel. Thats at least what is planed. <br>
    <br>
    Just imagine you create your own PKG Host and share that as a Service to your friends! <br>
    They wouldn't need to download and install files, they could do it directly over the Service. <br>

    <div class="space-50" />

    <b>5) Integrated FTP Client </b> <br>
    As the name says, the Integrated FTP Client will allow you to navigate directly to your PS4 <br>
    and allow you to move files arround. This may be interesting for the IPI Installation method <br>
    or as an alternative to manage files from/to/on the PS4. <br>
    
    <div class="space-50" />

    <b>6) GoldHEN Cheats Manager </b> <br>
    Not sure who needs that, but it should be pretty simple to build that based on Point 4 and extend <br>
    the functionality by syncing up with the GoldHEN Cheats Repository on GitHub. Cute enough as a Bonus. <br>

    <div class="space-30" /> 


    <el-divider />

    <el-row>
      <el-col :span="8">
        <div>
          <img :src="$root.getImage('assets/rpsV2.svg')" style="width: 230px; margin-bottom: 20px;" />
        </div>      
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

</div>
</template>

<script>
import { get } from 'vuex-pathify'
import links from '@/../config/links'

export default {
  name: "User",

  data(){ return {
      links,
  }},

  computed: {
      app: get('app'),
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
