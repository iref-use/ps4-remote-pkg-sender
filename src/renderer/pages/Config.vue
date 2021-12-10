<template>
<div>

  <ServerConfig />

  <PS4Config />

  <el-divider />

  <el-button size="mini" @click="save">Save Configuration </el-button>

</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
    name: 'Config',

    computed: {
        app: get('app'),
        server: get('app/server'),
    },

    methods: {
        save(){
            console.log("Saving Local Server Configuration")
            this.$store.dispatch('app/setServer', this.server)
        }
    }
}
</script>
