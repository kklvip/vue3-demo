<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <div class="info">
      
      <el-popover
        placement="bottom-start"
        :title="userInfo.nickname?userInfo.nickname:userInfo.username"
        width="100"
        trigger="hover"
        content=""
      >
        <template #reference>
          <template>
            <img :src="imgHost+userInfo.headImg" alt="">
          </template>
          
        </template>
        <div class="box">
          <ul>
            <li @click="goInfo()">我的信息</li>
            <li @click="goWeb()">返回前台</li>
            <li @click="logout()">退出</li>
          </ul>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
  import { useStore } from "vuex"
  import { useRouter } from 'vue-router';
  import { onMounted,computed } from "vue"
  import { imgHost } from "@/utils/config"
  export default{
    name:'navbar',
    setup(){
      const defaultHead = "head/default_head.png";
      let store = useStore();
      let userInfo = computed(()=>store.getters.userInfo)
     
      const router = useRouter();

      function logout(){
        localStorage.removeItem("vuex")
        store.dispatch('LogOut').then(() => {
          router.push("/login")
        })
      }
      function goWeb(){
          router.push("/home")
      }
      function goInfo(){
        router.push("/person/info")
      }

      onMounted(()=>{ 
        // if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|WebOS|Symbian|Windows Phone|Phone)/i))) {
        //         phoneFlag.value = true;
        //     }else{
        //         phoneFlag.value = false; 
        //     }
      })

      return{
        defaultHead,
        imgHost,
        logout,
        goWeb,
        goInfo,
        router,
        userInfo
      }
    }
  }
</script>

<style scoped>
  .navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 50px;
    background-color: #222;
  }
  .logo{
    float: left;
    padding-left: 200px;
    height: 100%;
  }

  .logo img{
      margin-top: 7px;
      width: 150px;
      height: 35px;
  }
  .info{
    position: relative;
    float: right;
    width: 120px;
    color: #fff;
    line-height: 45px;
    margin-right: 200px;
  }
  .info img{
      width: 35px;
      height: 35px;
      margin-top: 7px;
      border-radius: 17.5px;
      float: left;
      margin-right: 10px;
    }
  .info span{
      float: left;
      cursor: pointer;
    
  }
.box{
      padding: 5px 0;
}
.box ul li{
  padding: 8px 0 8px 10px;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #f4f4f4;
}
.box ul li:hover{
    background-color: #f2f2f1;
    -webkit-transition: .3s;   
}
</style>
