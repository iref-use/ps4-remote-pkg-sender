<template>
    <div class="alternative_title_bar draggable">
        <div class="title"> Remote Package Sender v2 </div>

        <div class='linux' v-if="platform == 'linux'">
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

export default {
    name: 'TitleBar',

    data(){ return {
        platform: ''
    }},

    mounted(){
        this.platform = os.platform() == 'darwin' ? 'linux' : 'win'
    },

    methods: {
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
