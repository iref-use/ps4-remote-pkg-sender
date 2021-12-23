<template>
<div class='queue'>
    <el-divider content-position="left">Current Tasks</el-divider>

    <div v-for="i in 3" :key="i">
        Task on PS4 Installing  {{ i }}
    </div>

</div>
</template>

<script>
import  { get, sync } from 'vuex-pathify'

export default {
    name: 'Tasks',

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
