<template>
  <header>
    <HeaderFile></HeaderFile>
  </header>
  <body>
    <router-view></router-view>
  </body>
</template>

<script>
import HeaderFile from './components/HeaderFile.vue'

export default {
  name: 'App',
  components: {
    HeaderFile,
  }
}
</script>

<style>
</style>
