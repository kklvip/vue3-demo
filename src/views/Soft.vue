<template>
    <div class="container">
    <div class="pageContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.tag" :name="item.tag" :classityId="item.classityId" v-for="(item,index) in typeList" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="listBox" v-if="total>0"> 
        <el-card :body-style="{ padding: '10px' }" shadow="hover" v-for="(item,index) in blogData" :key="index" class="block">
          <el-image :src="imgHost+item.pic" fit="fill" @click="handleInfo(item.id)">
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <el-tag size="mini" title="分类">{{item.tag?item.tag:'其他'}}</el-tag>
              <el-button type="text" class="button" @click="handleInfo(item.id)">查看</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="listBox tips" v-else>
        <span>没有软件，敬请期待</span>
      </div>
    </div>
    <div class="pagination-container" v-if="total > 0">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="listQuery.size" :current-page="listQuery.page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

  </div>
</template>

<script>
import {listweb,listclassityweb} from "@/api/soft"
import {imgHost} from "@/utils/config"
import {reactive, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router';
export default {
  name:'soft',
  setup(){
      const total = ref(0)
      const activeName =ref('全部')
      const listQuery = {
        page:1,
        size:8,
        keyword:""
      }
      const router = useRouter()
      const blogData = reactive([])
      const typeList = reactive([{classityId:"",tag:"全部"}])
    onMounted(()=>{
        getlist()
        getSoftClassityList()
    })
    function getlist() {
        listweb(listQuery).then(res=>{
          if(res.data.code=='200'){
            blogData.length = 0;
            total.value = res.data.data.size;
            blogData.push(...res.data.data.list) 
          }
        }).catch(error=>{
            console.log(error)
        })
    }
    function getSoftClassityList(){
      listclassityweb().then(res=>{
          if(res.data.code=='200'){
            typeList.push(...res.data.data) 
          }
        }).catch(error=>{
            console.log(error)
        })
    }
    function handleClick(tab){
      if(tab.paneName=="全部"){
        listQuery.page=1;
        listQuery.keyword = "";
        getlist()
      }else{
        for(var i=0;i<typeList.length;i++){
          if(tab.paneName==typeList[i].tag){
            if(typeList[i].id){
              listQuery.keyword = typeList[i].id;
              getlist()
            }
          }
        }
      }
    }
    function handleSizeChange(){

    }
    function handleCurrentChange(){

    }
    function handleInfo(id){
        sessionStorage.setItem("softId",JSON.stringify(id))
        router.push("/soft/detail");
    }
    return{
        getlist,
        blogData,
        total,
        handleClick,
        imgHost,
        listQuery,
        activeName,
        typeList,
        handleCurrentChange,
        handleSizeChange,
        handleInfo
    }
  }
}
</script>
<style scoped>
  .container{
    width: 1200px;
    padding: 20px 0 50px;
    margin: 0 auto 50px;
  }
  .el-tabs{
    margin-bottom: 50px;
  }
  .el-image{
    width: 256px;
    height: 200px;
    cursor: pointer;
  }
  .el-image:hover{
    
  }
  .pageContent{
    width: 1250px;
    overflow: hidden;
  }
  .el-card{
    width: 279px;
    float: left;
    margin-left: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
    max-height: 326px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .image-slot{
    width: 100%;
  }
  .el-pagination{
    text-align: center;
  }
  .listBox{
    overflow: hidden;
  }
  .tips{
  text-align: center;
  min-height: 500px;
  line-height: 500px;
} 
</style>