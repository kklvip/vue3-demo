<template>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
          <el-button type="danger" @click="handleDelete(deleteItem)" >批量删除</el-button>
          <el-button type="primary" @click="handleAdd()">添加</el-button>
          <span class="key">关键词：</span>
          <el-input clearable  @keyup.enter="handleFilter()" style="width:180px;margin:0 15px 10px;" class="filter-item" v-model="listQuery.keyword" placeholder="标题"></el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      </div>
      <el-table @selection-change="collectId" :data="movieData" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column property="title" label="标题" />
        <el-table-column property="summary" label="摘要" />
        <el-table-column property="tag" label="分类" align="center"/>
        <el-table-column property="ctime" label="创建时间" align="center"/>
        <el-table-column property="utime" label="修改时间" align="center"/>
        <el-table-column property="views" label="浏览量" align="center"/>
        <el-table-column  label="状态" align="center">
            <template #default="scope">
            <el-switch v-model="scope.row.status" @change="change(scope.row.id,scope.row.status)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <template #default="scope">
              <el-button type="success" size="mini" @click="handleInfo(scope.row.content)">查看</el-button>
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
      <div class="pagination-container" v-if="total > 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
      </div>
      <el-dialog v-model="dialogVisibleStatus" title="内容详情" width="60%" center>
        <span v-html="html"></span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisibleStatus = false">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  <script>
  import {reactive,onMounted, ref} from 'vue'
  import {listadmin,changeStatus,deleteMovie} from "@/api/movie"
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { ElMessage,ElMessageBox } from 'element-plus'
  export default {
    name:'adminNote',
    setup(){
      let movieData = reactive([])
      let listQuery = reactive({
          page:1,
          size:10,
          keyword:""
      })
      let listLoading = ref(false)
      let dialogVisibleStatus = ref(false)
      let deleteItem = reactive([])
      let total = ref()
      let html = ref()
      const router = useRouter()
      const store = useStore() 
      function getList(){
        listLoading.value = true
        listadmin(listQuery).then(res=>{
          if(res.data.code=="200"){
            movieData.length = 0;
              listLoading.value = false;
              total.value = res.data.data.total
              movieData.push(...res.data.data.list)
          }else{
            listLoading.value = false;
          }
        }).catch(error=>{
          listLoading.value = false;
          console.log(error)
        })
      }
      function handleInfo(val){
        html.value =  val;
        dialogVisibleStatus.value = true;
      }
      function handleAdd(){
        store.state.movieId = '';
        router.push("/movie/add")
      }
      function handleEdit(id){
        if(id){
          store.state.movieId = id;
          router.push("/movie/edit")
        }
      }
      function handleDelete(id){
        ElMessageBox.confirm('确认要删除吗?','提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
        ).then(() => {
          if(id){
            deleteMovie(id).then(res=>{
              if(res.data.code=="200"){
                getList()
                ElMessage({message:res.data.msg,type: 'success'})
              }else{
                ElMessage({message: res.data.msg,type: 'warning'})
              }
            })
          }
        })
      }
      function handleSizeChange(){
  
      }
      function handleCurrentChange(){
  
      }
      function change(id,status){
        changeStatus(id,status).then(res=>{
            if(res.data.code=="200"){
                ElMessage({type:"success",message:res.data.msg})
            }
        }).catch(error=>{
            console.log(error)
        })
      }
      function handleFilter(){
  
      }
      function collectId(val){
        deleteItem = val.map(function(item){
          return item.id
        }).join(',')
      }
      onMounted(()=>{
          getList()
      })
      return{
        movieData,
          listQuery,
          listLoading,
          deleteItem,
          total,
          dialogVisibleStatus,
          html,
          getList,
          handleInfo,
          handleEdit,
          handleDelete,
          handleSizeChange,
          handleCurrentChange,
          handleFilter,
          change,
          handleAdd,
          collectId
      }
    }
  }
  </script>
  <style scoped>
    .htmlBox{
      margin-bottom: 20px;
    }
    .el-pagination{
      text-align: center;
    }
  </style>