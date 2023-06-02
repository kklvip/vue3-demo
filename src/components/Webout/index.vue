<template>
  <div>
    <headbar></headbar>
        <div class="main" ref="main">
          <div class="pageWin" ref="pageWin">
            <router-view :key="key"></router-view>
          </div>
          
        </div>
    <div ref="footerRef" class="footerRef">
      <footbar ></footbar>
    </div>    
  </div>
</template>

<script>
    import { onMounted,watch,ref} from 'vue'
    import { useRouter } from 'vue-router'
    import headbar from "./header"
    import footbar from "./footer"
    export default{
      name: 'webindex',
      components:{headbar,footbar},
      computed:{
        key() {
          return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        }
      },
      setup() {
        let winH = ref(0);
        let mainH = ref(0);
        let pcH = ref(0);
        const footerRef = ref()
        const pageWin = ref()
        const router = useRouter();
        watch(()=>router.currentRoute.value,()=>{
          setTimeout(()=>{
              winH.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              mainH.value = pageWin.value.offsetHeight;
              pcH.value = winH.value-mainH.value-220;
              if(pcH.value>0){
                footerRef.value.style.position = "fixed"
                footerRef.value.style.bottom = "0px"
              }else{
                footerRef.value.style.position = "relative"
                footerRef.value.style.bottom = ""
              }
          },500)
          
        })
        onMounted(() => {
          setTimeout(()=>{
              winH.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              mainH.value = pageWin.value.offsetHeight;
              pcH.value = winH.value-mainH.value-220;
              if(pcH.value>0){
                footerRef.value.style.position = "fixed"
                footerRef.value.style.bottom = "0px"
              }else{
                footerRef.value.style.position = "relative"
                footerRef.value.style.bottom = ""
              }
          },500)
        })
        return {
          pageWin,
          footerRef
        }
      }
  };
</script>
<style scoped>
  .main{
    display: block;
    position: relative;
  }
  .pageWin{
    display: block;
  }
  .footerRef{
    width: 100%;
  }


</style>