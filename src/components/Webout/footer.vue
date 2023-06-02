<template>
  <div class="footer">
      <div class="box">
          <div class="left">
              <img src="../../assets/img/qr.jpg" alt="">
              <span>扫码加我微信</span>
          </div>
          <div class="right">
            <ol>
              <li>邮件地址：{{pubInfo.email?pubInfo.email:'kklvip@163.com'}}</li>
              <li>联系电话：{{pubInfo.tel?pubInfo.tel:'19938069175'}}</li>
              <li>收件地址：{{pubInfo.address?pubInfo.address:'成都市双流区中和大道锦江帆影'}}</li>
            </ol>
          </div>
      </div>

    </div>
</template>

<script>
import { reactive,onMounted,ref} from 'vue'
import { publicInfo } from "@/api/public"
export default {
    name: '',
      setup() {
          const data = reactive({

          });
          let pubInfo  = ref({});
          onMounted(() => {
            getInfo()
          });
          
          function getInfo(){
            publicInfo().then(res=>{
                if(res.data.code==200){
                    pubInfo.value = res.data.data
                }else{
                    console.log(res)
                }
            }).catch(()=>{
                console.log("error")
            })
          }
          return {
              data,
              pubInfo,
              getInfo  
          }

      }
  };
</script>
<style scoped lang="scss">
.footer{
    width: 100%;
    height: 160px;
    background-color: #202020;
}
.box{
  width: 1200px;
  margin: 0 auto;
}
.left{
    float: left;
    width:120px;
    height:160px;
    &>img{
      padding-left: 20px;
      padding-top: 30px;
      width: 100px;
      float: left;
    }
    &>span{
      float: left;
      padding-left: 20px;
      margin-top: 5px;
      color: #fff;
    }
}
.right{
  float: right;
  width: 500px;
  height: 160px;
  &>ol{
    padding-top:16px;
    &>li{
      line-height: 32px;
      color: #fff;
    }
  }
}
</style>