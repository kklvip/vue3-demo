<template>
<div class="sidebar">
  <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="activerouter"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-submenu index="1">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/customer/list">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><UserFilled /></el-icon>
            <span>角色管理</span>
          </template>
          <el-menu-item index="/roles/list">角色列表</el-menu-item>
          <el-menu-item index="/roles/menu">角色关联菜单</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span>菜单管理</span>
          </template>
          <el-menu-item index="/menus/front/list">首页菜单列表</el-menu-item>
          <el-menu-item index="/menus/admin/list">后端菜单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span>Banner管理</span>
          </template>
          <el-menu-item index="/banner/list">banner列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span>Blog管理</span>
          </template>
          <el-menu-item index="/blog/list">blog列表</el-menu-item>
          <el-menu-item index="/blog/classity">分类列表</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span>Note管理</span>
          </template>
          <el-menu-item index="/note/list">note列表</el-menu-item>
          <el-menu-item index="/note/classity">分类列表</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span >电影管理</span>
          </template>
          <el-menu-item index="/movie/list">电影列表</el-menu-item>
          <el-menu-item index="/movie/classity">电影分类</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><Tickets /></el-icon>
            <span >软件管理</span>
          </template>
          <el-menu-item index="/soft/list">软件列表</el-menu-item>
          <el-menu-item index="/soft/classity">软件分类</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
          <template #title>
            <el-icon :size="18" style="margin-right: 5px;"><User /></el-icon>
            <span >个人中心</span>
          </template>
          <el-menu-item index="/user/info">我的信息</el-menu-item>
        </el-submenu>
      </el-menu>
      
  <!-- <el-menu
        :default-active="activerouter"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template >
            <i class="el-icon-s-fold"></i>
            <span>Banner管理</span>
          </template>
          <el-menu-item index="/banner"><i class="el-icon-s-fold"></i><span> banner列表</span></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template>
            <i class="el-icon-notebook-1"></i>
            <span>Note管理</span>
          </template>
            <el-menu-item index="/note/list">note列表</el-menu-item>
            <el-menu-item index="/note/classity">note分类</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template >
            <i class="el-icon-reading"></i>
            <span >Blog管理</span>
          </template>
            <el-menu-item index="/blog/list">Blog管理</el-menu-item>
            <el-menu-item index="/blog/classity">Blog分类</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template >
            <i class="el-icon-reading"></i>
            <span >软件管理</span>
          </template>
          <el-menu-item index="/soft/list">软件管理</el-menu-item>
          <el-menu-item index="/soft/classity">软件分类</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template >
            <i class="el-icon-reading"></i>
            <span >电影管理</span>
          </template>
          <el-menu-item index="/movie/list">电影列表</el-menu-item>
          <el-menu-item index="/movie/classity">电影分类</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template >
            <i class="el-icon-reading"></i>
            <span >菜单管理</span>
          </template>
          <el-menu-item index="/menu/list">菜单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template >
            <i class="el-icon-reading"></i>
            <span >用户管理</span>
          </template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
          <template >
            <i class="el-icon-user"></i>
            <span >个人中心</span>
          </template>
            <el-menu-item index="/person/info">个人信息</el-menu-item>
        </el-submenu>
      </el-menu> -->

</div>
</template>

<script>
import {ref ,onMounted} from "vue"
import { useRouter} from "vue-router"
  export default{
    name:'sidebar',
    components: {
      // Location
      // apple
    },
    setup(){
      const activerouter = ref("1");
      const router = useRouter()
      onMounted(()=>{
        activerouter.value = router.currentRoute.value.path
      })
      function handleOpen(){

      }
      function handleClose(){

      }
      return {
        activerouter,
        handleOpen,
        handleClose,
        // apple
      }
    }
  }
</script>

<style scoped="scoped">
  .el-menu{
    border-right:none;
  }
  .sidebar{
    position: fixed;
    top: 45px;
    bottom: 0;
    z-index: 1;
    width: 220px;
    padding-top: 50px;
    left: 0;
    background-color: #545c64;
    overflow: hidden;
  }
</style>
