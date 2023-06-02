<template>
  <div class="navbar" v-if="!store.state.phoneFlag">
        <div class="navMenu">
          <el-menu :default-active="activeName" class="el-menu-demo" mode="horizontal" router background-color="#202020" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item v-for="(item,index) in data" :key="index" :index="item.url">{{item.title}}</el-menu-item>			  
          </el-menu>
        </div>
        <div class="userInfo">
          <span>欢迎您，{{userInfo.nickname?userInfo.nickname:userInfo.username}}</span>
          <span style="cursor: pointer;" class="enter" @click="goAdmin()" v-if="userInfo.roles=='0'">进入后台</span>
          <span style="cursor: pointer;" class="logout" @click="logout()">退出</span>
        </div>
    </div>
    <div v-else class="menu_m">
      <span v-if="!openFlag" @click="menu_click()">三</span>
      <div class="box" v-else>
        <ul>
          <li v-for="(item,index) in data" :key="index">
            <router-link :to="item.url" @click="menu_click()" >{{item.title}} </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { reactive,onMounted,getCurrentInstance,ref,watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { userRoles } from "@/api/public"
import { listweb } from "@/api/menu"
import { imgHost } from "@/utils/config"
export default {
  name: '',
  computed:{
    
  },
  setup() {
    const data = reactive([{title:"首页",url:"/home"},{title:"博客",url:"/blog"},{title:"软件",url:"/soft"},{title:"笔记",url:"/note"},{title:"电影",url:"/movie"}])
    const store = useStore();
    const router = useRouter();
    let userInfo = store.getters.userInfo;
    const {ctx} = getCurrentInstance();
    let openFlag = ref(false)
    let activeName = ref("");
    watch(()=>router.currentRoute.value,(newVal)=>{
      if((newVal.path.split("/").length-1)>1){
        let index = newVal.path.lastIndexOf("/")
        let str =newVal.path.substring(0,index);
        activeName.value =str;
      }else{
        activeName.value = router.currentRoute.value.path
      }
    })
    const logout=()=>{
      localStorage.removeItem("vuex");
      store.dispatch('LogOut').then(() => {
        router.push("/login")
      })
    };
    const goAdmin=()=>{
      userRoles().then(res=>{
        if(res.data.code=="200"){
          router.push("/customer/list")
        }else{
          ctx.$message.warning("对不起，你不是管理员")
        }
      })
    };
    function menu_click(){
      openFlag.value = !openFlag.value
    }
    onMounted(()=>{ 
      if(router.currentRoute.value.path){
        if((router.currentRoute.value.path.split("/").length-1)>1){
          let index = router.currentRoute.value.path.lastIndexOf("/")
          let str =router.currentRoute.value.path.substring(0,index);
          activeName.value =str;
        }else{
          activeName.value = router.currentRoute.value.path
        }
      }
      listweb().then(res=>{
        if(res.data.code=="200"){
          data.length=0;
          data.push(...res.data.data)
        }else{
          console.log(res.data)
        }
      })
    })
    return {
      data,
      store,
      logout,
      goAdmin,
      userInfo,
      router,
      openFlag,
      menu_click,
      imgHost,
      activeName
    }
  }
};
</script>
<style scoped lang="scss">
.menu_m{
  position: absolute;
  top: 2px;
  right: 2px;
  width: 30px;
  height: 30px;
  z-index: 999;
}
.navbar{
    width: 100%;
    height: 60px;
    background-color:#202020;
    
}
.navMenu{
      float: left;
      margin-left: 10%;
      line-height: 60px;
    }
.router-link-active{
  color: red;
}
.userInfo{
  padding-right: 200px;
  line-height: 60px;
  float: right;
}
.userInfo span{
  color: #fff;
  padding-right: 20px;
}
.logout:hover,.enter:hover{
  color: #ffd04b;
}
.box{
  position: absolute;
  top: 10px;
  right: 3px;
  width: 70px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  overflow: hidden;
  ul{
    text-align: center;
    li{
      line-height: 20px;
      padding: 2px;
    }
  }
}
</style>