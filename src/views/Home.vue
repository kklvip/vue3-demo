<template>
  <div>
        <el-carousel indicator-position="" height="500px" :class="{ 'phoneClass': store.state.phoneFlag,'pc':!store.state.phoneFlag }">
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <img :src="imgHost+item.pic" @click="doClick(item.url)" />
            </el-carousel-item>
        </el-carousel>
        <div class="html">
            <pre>
当你成功了，你的故事就是传奇！

当你失败了，你的故事就是笑话！

当你放弃了，

你的故事只是一个案例！

当你拒绝了，

你的故事只是一片空白！

当你全力以赴了，

你的故事将会是一段美好回忆！

人生只要你用心做了，

输和赢都是精彩！
            </pre>
        </div>
    </div>
</template>

<script>
import {list} from "@/api/banner"
import { useStore } from "vuex"
import {useRouter} from "vue-router"
import { reactive,onBeforeMount,onMounted,nextTick} from 'vue'
import {imgHost} from "@/utils/config"
export default {
    name: '',
    components: {

    },
    setup() {
      const data = reactive({

      });
      const router = useRouter()
      const store = useStore();
      let bannerList = reactive([]);
      onBeforeMount(() => {
      })
      onMounted(() => {
        getBanner();
      });
      function doClick(val){
        if(val){
          if(val.indexOf('https') != -1 || val.indexOf('http') != -1){
            window.open(val,'+target')
          }else{
            router.push(val)
          }
        }
      }
      function getBanner (){
        list().then(res=>{
          if(res.data.code=='200'){
            bannerList.push(...res.data.data) 
            nextTick(()=>{

            })
          }
        }).catch(error=>{
            console.log(error)
        })
      }
      return {
          data  ,
          getBanner,
          bannerList,
          imgHost,
          store,
          doClick
      }
    }
  };
</script>
<style scoped lang="scss">
.html{
    padding: 50px 0 30px;
    text-align: center;
    font-size: 26px;
}
.el-carousel{
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.phoneClass{
  height: 200px;
}
.pc{
  height: 500px;
  .el-carousel__container {
    height:auto;
    overflow: hidden;
  }
  &>div{
    height:auto;
    overflow: hidden;
  }
}
.el-carousel__container img{
  width: 100%;
  height: 100%;
}

@media (max-width: 570px) {
  .el-carousel__container {
    height: 200px;
  }
}
</style>
