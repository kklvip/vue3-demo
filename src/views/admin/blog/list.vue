<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
        <el-button type="danger" @click="handleDelete(deleteItem)" >批量删除</el-button>
        <el-button type="primary" @click="handleAdd()">添加</el-button>
        <span class="key">关键词：</span>
        <el-input clearable  @keyup.enter="handleFilter()" style="width:180px;margin:0 15px 10px;" class="filter-item" v-model="listQuery.keyword" placeholder="标题"></el-input>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">查询</el-button>
    </div>
    <el-table @selection-change="collectId" :data="blogData" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%">
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
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="summary" label="摘要" />
      <el-table-column prop="tag" label="分类" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column prop="views" label="浏览量" />
      <el-table-column  label="状态" >
          <template  #default="scope">
          <el-switch v-model="scope.row.status" @change="changeblogStatus(scope.row)"></el-switch>
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template #default="scope">
            <el-button type="success" size="mini" @click="handleInfo(scope.row.content)">查看</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <div class="pagination-container" v-if="total > 0">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
    </div>
    <el-dialog v-model="dialogVisibleStatus" title="Warning" width="600px" center>
      <div v-html="html" class="htmlBox"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleStatus = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {reactive,onMounted,ref} from 'vue'
import {list,changeStatus,deleteBlog} from "@/api/blog"
import { ElMessage,ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  name:'',
  setup(){
    const router = useRouter()
    const store = useStore();
    let blogData = reactive([])
    let listQuery = reactive({
        page:1,
        size:10,
        keyword:""
    })
    let html = ref("");
    let total = ref(0)
    let listLoading = ref(false)
    let dialogVisibleStatus = ref(false)
    let deleteItem = reactive([])
    function getList(){
      listLoading.value = true
      list(listQuery).then(res=>{
        if(res.data.code=="200"){
          blogData.length = 0;
          blogData.push(...res.data.data.list) 
          listLoading.value = false
          total.value = res.data.data.total
        }
      }).catch(error=>{
          console.log(error)
      })
    }
    function handleInfo(value){
      html.value = value;
      dialogVisibleStatus.value = true
    }
    function handleAdd(){
      store.state.blogId= ""
      router.push("/blog/add")
    }
    function handleEdit(id){
      if(id){
        router.push("/blog/edit")
        store.state.blogId = id;
      }
    }
    function handleDelete(id){
      ElMessageBox.confirm('确认要删除吗?','提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
      ).then(() => {
        if(id){
          deleteBlog(id).then(res=>{
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
    function changeblogStatus(vals){
      changeStatus(vals.id,vals.status).then(res=>{
        if(res.data.code=="200"){
          ElMessage({message: '修改成功',type: 'success'})
        }else{
          vals.status = !vals.status;
        }
      })
    }
    function handleFilter(){
        getList()
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
      html,
        blogData,
        listQuery,
        deleteItem,
        listLoading,
        total,
        dialogVisibleStatus,
        collectId,
        getList,
        handleInfo,
        handleEdit,
        handleDelete,
        handleSizeChange,
        handleCurrentChange,
        handleFilter,
        changeblogStatus,
        handleAdd
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