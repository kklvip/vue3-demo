<template>
  <div class="admin-main">
    <navbar></navbar>
    <sidebar></sidebar>
    <webmain></webmain>
  </div>

</template>

<script>
  import navbar from "./navbar"
  import sidebar from "./sidebar"
  import webmain from "./main"
  export default{
    name:'layout',
    components:{navbar,sidebar,webmain},
    setup(){
      
    }
  }
</script>

<style>
</style>
