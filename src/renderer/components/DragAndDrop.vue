<template>
<div class="main_drag_and_drop_overlay">

    <div class="close">
        <el-button size="mini" icon="el-icon-close" @click="$emit('close')"> Close </el-button>
    </div>

    <div class="inner">
        <div class="big mb-2">  {{ title }} </div>

        <div class="space">
            Files will be added to the <b class="text-success">Process Center</b>

            <el-row class="space" v-if="isDragged">
                <el-button type="success active" size="medium" icon="el-icon-document-add" @click="addFiles"> Yes, add all files </el-button>
                <el-button size="medium" icon="el-icon-close" @click="$emit('close')"> Nope, just cancel </el-button>
            </el-row>
        </div>

        <div class="icon" style="margin-bottom: 30px" v-if="!isDragged">
            <i class="el-icon-box" />
        </div>

        <div class="scrollarea">
            <table class="table files" v-if="files && files.length">
                <thead>
                    <tr>
                        <th class="text-bold text-left"> Name </th>
                        <th style="width: 40px" />
                        <th class="text-bold text-right"> Size </th>
                        <th style="width: 40px" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="f in files">
                        <td class="text-left">{{ $fs.getFileName(f) }} </td>
                        <td></td>
                        <td class="text-right">{{ $fs.getFileSize(f) }} </td>                
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <pre v-if="false">{{ files }}</pre>
    </div>
</div>    
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
    name: 'DragAndDrop',

    data(){ return {

    }},

    props: {
        files: {}
    },

    computed: {
        draggedFiles: get('server/draggedFiles'),
        isDragged(){
            return this.files && this.files.length 
        },
        title(){
            if( this.isDragged )
                return "Select Files to add"

            return "Drag and Drop files"
        },   
    },

    methods: {
        addFiles(){
            let filesAsItems = this.files.map( file => this.$fs.createItemFromDraggedFile(file) )
            // console.log(filesAsItems)
            this.$store.dispatch('server/setDraggedFiles', filesAsItems)
            this.$root.serverTab = 'dragged'
            this.$emit('close')
        },     
    }
}
</script>

<style lang="scss" scoped>
.main_drag_and_drop_overlay {
    position: fixed; z-index: 20;  
    top: 0px; left: 0px; right: 0px; bottom: 0px;

    height: 100%; 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;

    padding: 50px;
    background: rgba(0,0,0,.8);

    .close {
        position: absolute; z-index: 25;
        top: 100px; right: 200px;
        display: block;
    }

    .inner {
        .big {
            font-size: 38px;
            font-weight: 100;
        }

        .space {
            margin-top: 10px;
        }

        .icon {
            font-size: 80px;
            margin-top: 30px;
        }
    }

    .table {
        width: 100%;
        // background: transparent !important;

        // tr, td, th {
        //     background: transparent !important;
        // }
    }

    .scrollarea {
        height: auto;
        min-width: 1000px;
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
    }

}

</style>
