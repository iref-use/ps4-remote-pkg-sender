<template>
<div>

  <ServerConfig />

  <PS4Config />

  <el-divider />

  <el-button size="mini" @click="save" v-if="false">Save Configuration </el-button>

  <el-button size="mini" @click="reset">Reset Configuration</el-button>

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
            // this.$store.dispatch('app/setServer', this.server)
            this.$store.dispatch('app/save')
        },

        reset(){
          this.$confirm('This will set all config values to their initial values. Server will be stopped.', 'Reset Configuration',
                {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  type: 'warning',
                  center: true,
                })
                .then(() => {
                    console.log("Reset Local Server Configuration")
                    this.$store.dispatch('app/reset')
                    this.$root.sendServer('stop')
                    this.$message({
                      type: 'success',
                      message: 'Configuration has been resetted'
                    });
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'Reset action canceled'
                    // });
                });
        }
    }
}
</script>
