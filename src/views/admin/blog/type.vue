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
      <el-table-column property="tag" label="名称" align="center"/>
      <el-table-column property="createTime" label="创建时间" align="center"/>
      <el-table-column  label="状态" align="center">
          <template #default="scope">
              <el-switch v-model="scope.row.status" @change="change(scope.row.classityId,scope.row.status)"></el-switch>
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template #default="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.classityId)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <div class="pagination-container" v-if="total > 0">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
    </div>
    <el-dialog v-model="dialogVisibleStatus" title="内容" width="30%" center>
      <el-form :model="updateData" ref="actionForm" center :rules="rules">
        <el-form-item label="名称：" prop="tag">
          <el-input v-model="updateData.tag" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveData()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import {reactive,onMounted, ref} from 'vue'
  import {classityFindPage,updateClassityStatus,classitySave,deleteBlogClassity,getBlogById2} from "@/api/blog"
  import { ElMessage,ElMessageBox } from 'element-plus'
  import { rules } from "@/utils/validate"
  export default {
      name:'adminblogClassity',
      setup(){
          let blogData = reactive([])
          let listQuery = reactive({
              page:1,
              size:10,
              keyword:""
          })
          let updateData = ref({})
          let listLoading = ref(false)
          let dialogVisibleStatus = ref(false)
          let deleteItem = reactive([])
          let total = ref()
          const actionForm = ref();
          function getList(){
              listLoading.value = true
              classityFindPage(listQuery).then(res=>{
                  if(res.data.code=="200"){
                      blogData.length = 0;
                      listLoading.value = false;
                      total.value = res.data.data.total
                      blogData.push(...res.data.data.list)
                  }else{
                      listLoading.value = false;
                  }
              }).catch(error=>{
                  listLoading.value = false;
                  console.log(error)
              })
          }
          function handleInfo(){
              dialogVisibleStatus.value = true;
          }
          function handleAdd(){
              updateData.value.id = ""
              updateData.value.tag = ""
              dialogVisibleStatus.value = true
          }
          function handleEdit(row){
              if(row.tag && row.classityId){
                  updateData.value.tag = row.tag;
                  updateData.value.classityId = row.classityId                    
              }else{
                  updateData.value.tag = "";
              }
              dialogVisibleStatus.value = true
          }
          function handleDelete(id){
            getBlogById2(id).then(response=>{
                  if(response.data.code=="200" || response.data.code=="300"){
                      if(response.data.data.length>0){
                          ElMessageBox.confirm('该分类已经被博客：'+response.data.data[0].title+' 使用， 确认要删除吗?','提示',
                              {
                                  confirmButtonText: '确认',
                                  cancelButtonText: '取消',
                                  type: 'warning',
                              }
                              ).then(() => {
                                  if(id){
                                    deleteBlogClassity(id).then(res=>{
                                          if(res.data.code=="200"){
                                              ElMessage({type:"success",message:res.data.msg})
                                              getList()
                                          }else{
                                              ElMessage({type:"warning",message:res.data.msg})
                                          }
                                      }).catch(error=>{
                                          console.log(error)
                                      })
                                  }
                              }).catch(() => {
                          })
                      }else{
                          ElMessageBox.confirm('确认要删除吗?','提示',
                              {
                                  confirmButtonText: '确认',
                                  cancelButtonText: '取消',
                                  type: 'warning',
                              }
                              ).then(() => {
                                  if(id){
                                    deleteBlogClassity(id).then(res=>{
                                          if(res.data.code=="200"){
                                              ElMessage({type:"success",message:res.data.msg})
                                              getList()
                                          }else{
                                              ElMessage({type:"warning",message:res.data.msg})
                                          }
                                      }).catch(error=>{
                                          console.log(error)
                                      })
                                  }
                              }).catch(() => {
                          })
                      }
                  }
              }).catch(err=>{
                  console.log(err)
              })
              
          }
          function handleSizeChange(){
      
          }
          function handleCurrentChange(){
      
          }
          function change(id,status){
              updateClassityStatus(id,status).then(res=>{
                  if(res.data.code=="200"){
                      ElMessage({type:"success",message:res.data.msg})
                  }else{
                      ElMessage({type:"warning",message:res.data.msg})
                  }
              }).catch(error=>{
                  console.log(error)
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
          const saveData = ()=>{
              actionForm.value.validate().then(()=>{
                  classitySave(updateData.value).then(res=>{
                      if(res.data.code=="200"){
                          dialogVisibleStatus.value = false
                          getList()
                          ElMessage({type:"success",message:res.data.msg})
                      }else{
                          ElMessage({type:"warning",message:res.data.msg})
                      }
                  }).catch(error=>{
                      console.log(error)
                  })
              }).catch(error=>{
                  console.log(error)
              })
          }
          onMounted(()=>{
              getList()
          })
          return{
              blogData,
              listQuery,
              listLoading,
              deleteItem,
              total,
              rules,
              actionForm,
              dialogVisibleStatus,
              getList,
              updateData,
              handleInfo,
              handleEdit,
              handleDelete,
              handleSizeChange,
              handleCurrentChange,
              handleFilter,
              change,
              handleAdd,
              collectId,
              saveData
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