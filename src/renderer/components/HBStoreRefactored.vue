<template>
<div class='hb_store'>


  <el-row style="margin-bottom: 20px;" class="top">
    <el-col :span="16">
        <h2 style="margin:0; line-height: 32px;" v-if="false">HB-Store R2 (refactored)</h2>

        <el-button-group style="margin-right: auto; margin-left: 10px;">
            <el-button size="small" :type="isCategory('all')" @click="setCategory('all')"> All </el-button>
            <el-button size="small" :type="isCategory('media')" @click="setCategory('media')"> Multimedia </el-button>
            <el-button size="small" :type="isCategory('game')" @click="setCategory('game')"> HB Game </el-button>
            <el-button size="small" :type="isCategory('utility')" @click="setCategory('utility')"> Utility </el-button>
            <el-button size="small" :type="isCategory('emulator')" @click="setCategory('emulator')"> Emulator </el-button>
        </el-button-group>
    </el-col>
    <el-col :span="8">
        <div style="display: flex; ">
            <el-button-group style="margin-right: 10px; margin-left: auto;">
                <el-button size="small" :type="isOrder('')" @click="setOrder('')"> A-Z </el-button>
                <el-button size="small" :type="isOrder('created_at')" @click="setOrder('created_at')"> Latest </el-button>
                <el-button size="small" :type="isOrder('downloads')" @click="setOrder('downloads')"> Popular </el-button>
            </el-button-group>

            <el-input v-model="search" size="small" placeholder="Search" prefix-icon="fas fa-search" style="width: 200px"/>
        </div>
    </el-col>
  </el-row>


  <div v-if="view == 'table'">
      <el-table :data="packages" class="file">
          <el-table-column type="expand">
              <template slot-scope="scope">
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Review Stars: {{ scope.row.data.average_rating }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Author: {{ scope.row.data.author }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px" :type="$helper.getAppStoreType(scope.row.data.type)"> Type: {{ scope.row.data.type }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> PV: {{ scope.row.data.pv.join(', ') }} </el-tag>
                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Release Date: {{ scope.row.data.released_at }} </el-tag>
                  <br>

                  <el-tag size="small" type="info" style="margin-bottom: 5px"> Name: {{ scope.row.data.name }} </el-tag> <br>
                  <div class="el-tag el-tag--info el-tag--small" style="height: auto; margin-bottom: 5px;">
                      <div style='display: flex;'>
                          <div style="margin-right: 10px; ">Description: </div>
                          <div>
                              <div v-for="(desc,i) in scope.row.data.description" :key="'desc_' + i">{{ desc }}</div>
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
                  <el-tag size="small" :type="$helper.getAppStoreType(scope.row.data.type)" style="margin-left: 10px; margin-bottom: 3px;">{{ scope.row.data.type }}</el-tag>
                  <el-tag size="small" style="margin-left: 10px; margin-bottom: 3px; cursor: pointer;" v-if="scope.row.data.file_ps5" @click="check(scope.row.data.file_ps5)"> Download PS5 Version </el-tag>
                  <br>
                  <el-divider style="margin: 3px 0px" v-if="false" />
                  <div v-for="(desc,i) in scope.row.data.description" :key="'desc_' + i" class="text-darken">{{ desc }}</div>
              </template>
          </el-table-column>

          <el-table-column prop="cusa" label="Title ID" width="110" align="center">
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


  <DownloadItem ref="DownloadItem" />

  <template v-if="debug">
      <pre>{{ packages }}</pre>
      <pre>{{ data }}</pre>
      <pre>{{ config }}</pre>
  </template>

</div>
</template>

<script>
import { debounce } from 'debounce'
import { get } from 'vuex-pathify'

export default {
    name: 'HBStoreRefactored',

    data(){ return {
        debug: false,
        view: 'table',
        page: 1,
        perPage: 15,
        search: '',

        data: {
            current_page: 1,
            last_page: 10,
            data: [],
        },

        params: {
            category: 'all',
            orderBy: 'created_at',
        },
    }},

    watch: {
        page(p){
            this.load(p)
        },
        search(){
            debounce(this.load(this.page), 500)
        },
        params: {
            deep: true,
            handler(){
                this.load(this.page)
            }
        },
    },

    computed: {
        config: get('app/config'),
        packages(){
            let p = this.data ? this.data.data : []
            let a = []

            // map hb-store package to item object
            p.map(i => a.push(this.$fs.createItemFromHBRefactored(i, this.config.useHBRoot)) )
            //
            // // check if item is in queue
            a.map(file => {
                let fileInQueue = this.$store.getters['queue/isInQueue'](file)
                if(fileInQueue)
                  file.status = fileInQueue.status
            })

            return a
        },
        total(){
            return this.data ? this.data.total : 1
        }
    },

    mounted(){
        this.load()
    },

    methods: {
        load(page=1){
            let url = this.config.useHBRoot + "pkg/all?per_page="+this.perPage+"&page="+page+"&search="+this.search+"&category="+this.params.category+"&orderBy="+this.params.orderBy

            this.$axios.get(url)
                .then( ({ data }) => {
                    console.log(data)
                    this.data = data.items
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
            if( this.$store.getters['app/isPS5'] )
                return this.$message({ message: "'Is Installed' feature is not implemented for PS5 yet", type: "info" })                

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
            // this.$refs.DownloadItem.open(url)
        },

        hasPS5Support(item){

        },

        setCategory(c){
            this.params.category = c
        },

        setOrder(o){
            this.params.orderBy = o
        },

        isCategory(c){
            return this.params.category == c ? 'info' : ''
        },

        isOrder(o){
            return this.params.orderBy == o ? 'info' : ''
        },

    },
}
</script>
