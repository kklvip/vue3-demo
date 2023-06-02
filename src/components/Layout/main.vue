<template>
  <div class="web-main">
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
// import {computed} from "vue"
  export default{
    name:'webmain',
    computed:{
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
  }
</script>

<style scoped="scoped">
  .web-main{
    position: absolute;
    padding: 20px 10px;
    top: 45px;
    right: 0;
    left: 220px;
    overflow: hidden;
  }
</style>
