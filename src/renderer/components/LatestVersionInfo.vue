<template>
<el-dialog title="Latest Version Info" :visible.sync="show">

    You are currently on Version <b>{{ current }}</b> <br>
    Latest Release Version is <b>{{ version }}</b> <br>
    <br>

    <el-tag type="info" v-if="compare >= 0"> <i class="el-icon-check mr-md" />
        You are already on the latest version
    </el-tag>
    <el-tag type="success" class="cursor-pointer" v-if="compare == -1" @click="goToLatestRelease"> <i class="el-icon-download mr-md" />
        New Version is available for you. Checkout on GitHub Releases.
    </el-tag>

    <div v-if="compare == -1">
        <table class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="margin-top: 20px;">
            <thead>
              <tr>
                  <td class="el-table__cell">Name</td>
                  <td class="el-table__cell text-right">Size</td>
                  <td class="el-table__cell text-center" style="width: 50px">DL</td>
              </tr>
            </thead>
            <tbody>
              <tr class="el-table__row" v-for="(asset,i) in assets">
                  <td class="el-table__cell">{{ asset.name }}</td>
                  <td class="el-table__cell text-right">{{ $helper.formatBytes(asset.size) }}</td>
                  <td class="el-table__cell text-center">
                      <el-button circle icon="el-icon-download" @click="$root.openWithAutoclose(asset.browser_download_url)" />
                  </td>
              </tr>
            </tbody>
        </table>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="hide">Ok</el-button>
    </span>

</el-dialog>
</template>

<script>
export default {
    name: 'LatestVersionInfo',

    data(){ return {
        show: false,
        item: null,
        current: 'n/a',
        version: 'n/a',
        compare: 0,
    }},

    computed:{
        assets(){
            if(!this.item) return []

            return this.item.assets
        }
    },

    methods: {
        open(item, version='n/a'){
            this.show = true
            this.item = item
            this.version = version

            this.current = this.$root.versions.app
            this.version = this.$git.getVersion(item)
            this.compare = this.$git.compareVersion(this.current, this.version) // -1 new version available
        },
        hide(){
            this.show = false
            this.item = null
            this.version = 'n/a'
            this.compare = 0
        },
        toggle(){ this.show = !this.show },

        goToLatestRelease(){
            if(!this.item) return

            this.$root.open(this.item.html_url)
        },


    }
}
</script>

<style lang="scss" scoped>
.el-dialog {
    width: 550px;
}

.el-dialog__body {
    padding: 0 20px;
}

.el-form-item {
    margin-bottom: 10px;
}

.el-table__cell {
  padding: 8px 12px;
}
</style>
