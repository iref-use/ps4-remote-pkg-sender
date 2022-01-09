<template>
<div class='hb_store'>

  <h2>HB-Store R2</h2>

  <pre>{{ data }}</pre>
  <pre>{{ config }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
    name: 'HBStore',

    data(){ return {
        page: 1,
        data: null,
    }},

    computed: {
        config: get('app/config'),
    },

    mounted(){
        this.load()
    },

    methods: {
        load(page=1){
            this.$axios.get(this.config.useHBRoot + 'api.php?page='+this.page)
                .then( ({ data }) => {
                    console.log(data)
                    this.data = data
                })
                .catch( e => console.log(e) )
        },
    },
}
</script>

<style lang="css" scoped>
</style>
