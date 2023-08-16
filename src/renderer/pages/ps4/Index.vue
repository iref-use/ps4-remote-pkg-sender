<template>
<div>
    <h2>PS4 API Logs </h2>

    <div class="mb-md">
        <el-button size="mini" icon="refresh" @click="reset"> Reset Logs </el-button>
        <el-button size="mini" icon="eye" @click="showData = !showData"> Toggle Data </el-button>
    </div>

    <div v-for="(log,i) in logs" :key="i">
        <div v-if="showData" style="margin-bottom: 20px;">
            {{ log.time }} <br>
            <el-tag size="small" type="info">{{ log.msg }} </el-tag> <br>
            <pre>{{ log.data }}</pre>
        </div>

        <div v-if="!showData">
             {{ log.time }} | {{ log.msg }}
        </div>
    </div>
</div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
    name: 'PS4',

    data(){ return {
        showData: false,
        logs: [],
    }},

    mounted(){
        this.registerChannel()
    },

    methods: {
        registerChannel(){
            ipcRenderer.on('ps4', (event, { time, msg, data, type }) => {
                this.logs.unshift({ time, msg, data, type })
            })
        },

        reset(){
            this.logs = []
        },

    }
}
</script>

<style lang="scss" scoped>
pre {
  font-size: 13px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgba(125,125,125,.5);
}
</style>
