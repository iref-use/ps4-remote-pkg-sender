<template>
<div>
    Type: {{ type }} | {{ files.length }} Items
    <div style="white-space: pre" v-html="$helper.prettyPrint(files)">{{ files }}</div>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Debug',

  props: {
      type: {
          default: 'server'
      }
  },

  computed: {
      draggedFiles: get('server/draggedFiles'),
      draggedServingFiles: get('server/draggedServingFiles'),
      serverFiles: get('server/serverFiles'),
      servingFiles: get('server/servingFiles'),
      files(){
          if( this.type == 'server')
            return this.servingFiles

          if( this.type == 'dragged')
            return this.draggedServingFiles

          return {
            info: "No Type selected for Files Component."
          }
      }
  }
}
</script>

<style lang="css" scoped>
</style>
