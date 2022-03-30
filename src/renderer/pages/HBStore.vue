<template>
<div class='hb_store'>

  <h2>HB-Store R2 (legacy)</h2>

  <div v-if="view == 'table'">
      <el-table :data="packages" class="file">
          <el-table-column type="expand">
              <template slot-scope="scope">
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Review Stars: {{ scope.row.data.ReviewStars }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Author: {{ scope.row.data.Author }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px" :type="$helper.getAppStoreType(scope.row.data.apptype)"> Type: {{ scope.row.data.apptype }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> PV: {{ scope.row.data.pv }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Release Date: {{ scope.row.data.releaseddate }} </el-tag>
                  <br>

                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Name: {{ scope.row.data.name }} </el-tag> <br>
                  <div class="el-tag el-tag--info el-tag--small" style="height: auto; margin-bottom: 3px;">
                      <div style='display: flex;'>
                          <div style="margin-right: 5px; ">Description: </div>
                          <div>
                            <div v-if="scope.row.data.desc_1">{{ scope.row.data.desc_1 }} </div>
                            <div v-if="scope.row.data.desc_2">{{ scope.row.data.desc_2 }} </div>
                          </div>
                      </div>
                  </div>
                  <br>

                  <el-tag size="small" type="info" style="margin-bottom: 5px"> URL: {{ scope.row.url }} </el-tag> <br>
                  <pre v-if="debug">{{ scope.row }}</pre>
              </template>
          </el-table-column>

          <el-table-column label="Cover" width="100">
              <template slot-scope="scope">
                  <div class='image' :style="{ backgroundImage: 'url('+scope.row.data.image+')' }" />
              </template>
          </el-table-column>

          <el-table-column prop="name" label="Name">
              <template slot-scope="scope">
                  {{ scope.row.name }} <small>(v{{ scope.row.data.version}})</small>
                  <el-tag size="small" :type="$helper.getAppStoreType(scope.row.data.apptype)" style="margin-bottom: 3px;">{{ scope.row.data.apptype }}</el-tag>
                  <br>
                  <el-divider style="margin: 3px 0px" />
                  {{ scope.row.data.desc }} <br>
              </template>
          </el-table-column>

          <el-table-column prop="cusa" label="CUSA" width="110" align="center">
              <template slot-scope="scope">
                  <small style="font-size:12px">{{ scope.row.cusa }}</small>
              </template>
          </el-table-column>

          <el-table-column prop="status" label="Type" width="120" align="center">
            <template slot-scope="scope">
                <el-tag size="small" plain :type="$helper.getFileStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="size" label="Size" width="120" align="right">
            <template slot-scope="scope">
                <el-tag size="small" plain :type="$helper.getFileSizeType(scope.row.size)">{{ scope.row.size }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Operation" width="150" align="right">
              <template slot-scope="scope">
                  <el-button circle size="small" icon="fa fa-minus" @click="removeFromQueue(scope.row)" v-if="scope.row.status == 'in queue'" />
                  <el-button circle size="small" icon="el-icon-plus" @click="addToQueue(scope.row)" v-if="scope.row.status != 'in queue'" />
                  <el-button circle size="small" icon="fa fa-cloud-download-alt" @click="check(scope.row.url)" />
                  <el-button circle size="small" icon="fab fa-playstation" @click="isInstalled(scope.row)" />
              </template>
          </el-table-column>
      </el-table>

      <el-pagination layout="prev, pager, next" background
                  :current-page.sync="page" :total="total"
                  :page-size="perPage" />
  </div>

  <el-row :gutter="20" v-if="view == 'box'">
      <el-col :span="4" v-for="(file,i) in packages" :key="'_package_'+i">
        <div class='file border'>
            <div class='title'>{{ file.name }} </div>
            <div class='image' :style="{ backgroundImage: 'url('+file.data.image+')' }" />
        </div>
      </el-col>
  </el-row>


  <template v-if="debug">
      <pre>{{ packages }}</pre>
      <pre>{{ data }}</pre>
      <pre>{{ config }}</pre>
  </template>

</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
    name: 'HBStore',

    data(){ return {
        debug: false,
        view: 'table',
        page: 1,
        total: 0,
        perPage: 15,
        data: null,
    }},

    watch: {
        page(p){
            this.load(p)
        },
    },

    computed: {
        config: get('app/config'),
        packages(){
            let p = this.data ? this.data.packages : []
            let a = []

            // map hb-store package to item object
            p.map(i => a.push(this.$fs.createItemFromHB(i, this.config.useHBRoot)) )

            // check if item is in queue
            a.map(file => {
                let fileInQueue = this.$store.getters['queue/isInQueue'](file)
                if(fileInQueue)
                  file.status = fileInQueue.status
            })

            return a
        },

        pages(){
            return this.total ? this.total / this.perPage : 1
        }
    },

    mounted(){
        this.getCount()
        this.load()
    },

    methods: {
        getCount(){
            this.$axios.get(this.config.useHBRoot + 'api.php?count=true')
                .then( ({ data }) => {
                    this.total = parseInt(data.number_rows)
                })
                .catch( e => console.log(e) )
        },

        load(page=1){
            this.$axios.get(this.config.useHBRoot + 'api.php?page='+this.page)
                .then( ({ data }) => {
                    console.log(data)
                    this.data = data
                })
                .catch( e => console.log(e) )
        },

        addToQueue(file){
            let find = this.$store.getters['queue/isInQueue'](file)

            if(!find){
                file.status = 'in queue'
                this.$store.dispatch('queue/addToQueue', file)
            }
            else{
                if(file.status == 'remote')
                  file.status = 'in queue'

                this.$message({
                    message: file.name + ' is already in Queue',
                    type: 'warning'
                })
            }
        },

        removeFromQueue(file){
            if(file.status == 'in queue'){
                this.$store.dispatch('queue/removeFromQueue', file)
            }
            else {
                this.$message({
                    message: "Can't remove " + file.name + " from queue because it's in another state",
                    type: 'warning'
                })
            }
        },

        isInstalled(file){
            this.$ps4.isInstalled(file)
                    .then( ({ data }) => {
                        if(data.exists == true)
                          file.status = 'installed'

                        let { exists, size, type } = data
                        this.log(data.message, { exists, size, type })
                        this.$message({ message: data.message, type: data.type })
                    })
                    .catch( e => {
                        console.log(e)
                    })
        },

        check(url){
            this.$root.openWithAutoclose(url)
            // window.open(url)
        },

    },
}
</script>

<style lang="scss" scoped>
.el-divider {
    margin: 3px 0px;
}

small {
    font-size: 80%;
}

.file {
    position: relative;
    display: block;
    margin-bottom: 20px;

    &.border {
        border: 1px solid gray;
    }

    .title {
        display: block;
        min-height: 60px;
    }

    .image {
        display: block;
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        background: center center no-repeat;
        background-size: cover;
    }
}
</style>
