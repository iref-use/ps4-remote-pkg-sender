<template>
<div>
    <h2>Information</h2>
    <br>
    app: {{ $root.versions.app }} <br>
    electron: {{ $root.versions.electron }} <br>
    electron-webpack: {{ $root.versions.electronWebpack }} <br>
    <br>
    <br>
    Thanks to everyone that makes this community great. <br>
    <br>
    Special thanks to.
</div>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style lang="css" scoped>
</style>
