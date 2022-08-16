<template>
<div class="titleBar">
    <div class="alternative_title_bar draggable">
        <div class="title"> Remote Package Sender v2 </div>
    </div>

    <div class='mac' :class="{ 'chromatic' : platform == 'mac-chromatic' }" v-if="platform == 'mac' || platform =='mac-chromatic'">
        <div class="" @click="close"></div>
        <div class="" @click="min"></div>
        <div class="" @click="max"></div>
    </div>

    <div class='win' v-if="platform == 'win'">
        <div class="" @click="min"> <i class="far fa-window-minimize" /> </div>
        <div class="" @click="max"> <i class="far fa-window-maximize" /> </div>
        <div class="" @click="close"> <i class="fas fa-times" /> </div>
    </div>
</div>
</template>

<script>
import os from 'os'
import { remote } from 'electron'
import { get } from 'vuex-pathify'

export default {
    name: 'TitleBar',

    data(){ return {
        platform: '',
    }},

    computed: {
        style: get('app/config.titleBar'),
    },

    watch:{
        style(){ this.getChoosenStyle() }
    },

    mounted(){
        this.getChoosenStyle()
    },

    methods: {
        getChoosenStyle(){
            if(this.style == 'default')
              this.platform = os.platform() == 'darwin' ? 'mac' : 'win'
            else
              this.platform = this.style
        },

        getWindow(){
            return remote.getCurrentWindow()
        },

        close(){
            this.getWindow().close()
        },

        min(){
            this.getWindow().minimize()
        },

        max(){
            var window = this.getWindow()


            if (!window.isMaximized())
               window.maximize()
            else
               window.unmaximize()

            return

            if(!window.isFullScreen())
              window.setFullScreen(true)
            else
              window.setFullScreen(false)
        },

    }
}
</script>

<style lang="css" scoped>
</style>
