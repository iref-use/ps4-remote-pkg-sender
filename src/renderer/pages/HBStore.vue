<template>
<div class='hb_store_wrapper'>

    <HBStoreLegacy v-if="mode == 'legacy' && false"/>

    <HBStoreRefactored _v-if="mode == 'refactored'" />

</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
    name: 'HBStore',

    data(){ return {

    }},

    computed: {
        app: get('app'),
        mode: get('app/config.useHBMode'),
        hb_root: get('app/config.useHBRoot'),
        hb_custom: get('app/config.useHBCustomRoot'),
        api(){
            if( this.mode == 'custom' )
                return this.hb_custom 
                
            return this.hb_root
        },
    },

}
</script>

<style lang="scss" scoped>

</style>
