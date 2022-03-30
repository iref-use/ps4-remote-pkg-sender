<template>
<div class='hb_store_wrapper'>

    <HBStoreLegacy v-if="mode == 'legacy'"/>

    <HBStoreRefactored v-if="mode == 'refactored'" />

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
        api: get('app/config.useHBRoot'),
    },

}
</script>

<style lang="scss" scoped>

</style>
