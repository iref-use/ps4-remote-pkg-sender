<template>
<div class='queue'>
    <el-divider content-position="left">Files in Queue</el-divider>

    <div v-for="i in 10" :key="i">
        Queue item {{ i }}
    </div>
</div>
</template>

<script>
import  { get, sync } from 'vuex-pathify'

export default {
    name: 'Queue',

    data(){ return {
        
    }},

    computed: {

    },

    methods: {

    }
}
</script>

<style lang="css" scoped>
</style>
