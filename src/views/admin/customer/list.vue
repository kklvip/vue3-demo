<template>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
          <el-button type="primary" @click="handleAdd()">添加</el-button>
          <span class="key" style="padding-left:20px">关键词：</span>
          <el-input clearable  @keyup.enter="handleFilter()" style="width:180px;margin:0 15px 10px;" class="filter-item" v-model="listQuery.keyword" placeholder="标题"></el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      </div>
      <el-table @selection-change="collectId" :data="rolesData" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%">
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
        <el-table-column property="username" label="用户名" />
        <el-table-column property="nickname" label="昵称" />
        <el-table-column property="roleName" label="角色" />
        <el-table-column property="sex" label="性别" >
            <template #default="scope">
            <span>{{(scope.row.sex==0?"女":"男")}}</span>
            </template>
        </el-table-column>
        <el-table-column property="tel" label="联系方式" />
        <el-table-column  label="状态" >
            <template #default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row.id,scope.row.status)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column property="address" label="地址" />
        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" v-if="total > 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
      </div>
      <el-dialog v-model="dialogVisibleStatus" title="编辑" width="50%" center>
        <el-form :model="editData" ref="Form1" :rules="rules" label-width="95px">
            <el-form-item prop="username" label="账户名称：">
              <el-input placeholder="请输入名称" maxlength="20" v-model="editData.username" ></el-input>
            </el-form-item>
            <el-form-item prop="tel" label="联系电话：">
              <el-input placeholder="请输入联系电话" maxlength="25" v-model="editData.tel" ></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="出生日期：">
              <el-date-picker type="date" placeholder="请选择出生日期" v-model="editData.birthday" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item prop="address" label="地址：">
              <el-input placeholder="请输入用户地址" maxlength="20" v-model="editData.address" ></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别：">
              <el-select v-model="editData.sex" placeholder="请选择性别">
                <el-option
                  key="1"
                  label="男"
                  value="1"
                />
                <el-option
                  key="0"
                  label="女"
                  value="0"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="email" label="邮箱：">
              <el-input placeholder="请输入名称" maxlength="20" v-model="editData.email" @blur="emailChange()" @focus="emailfocus()" @change="emailChange()" ><template #append>
                <el-select v-model="selectAppendValue" placeholder="Select" style="width: 140px" @change="handleChange()">
                  <el-option label="@163.com" value="@163.com" />
                  <el-option label="@qq.com" value="@qq.com" />
                  <el-option label="@gmail.com" value="@gmail.com" />
                  <el-option label="@hotmail.com" value="@hotmail.com" />
                  <el-option label="其他" value="" />
                </el-select>
              </template>
            </el-input>
            </el-form-item>
            <el-form-item prop="introduction" label="简介：">
              <el-input type="textarea" placeholder="请输入用户简介" maxlength="200" v-model="editData.introduction" ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handRolesAdd()">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  <script>
  import {reactive,onMounted, ref} from 'vue'
  import { userlist,add,update } from "@/api/user"
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { ElMessageBox,ElMessage } from 'element-plus'
  import { rules } from "@/utils/validate"
  export default {
    name:'adminNote',
    setup(){
      let rolesData = reactive([])
      let listQuery = reactive({
          page:1,
          size:10,
          keyword:""
      })
      let listLoading = ref(false)
      let dialogVisibleStatus = ref(false)
      let deleteItem = reactive([])
      let total = ref()
      let selectAppendValue =ref()
      let editData = ref({});
      const Form1 = ref();
      // const rules = reactive({
      //   name: [
      //     { required: true, message: '请先输入名称', trigger: 'blur' }
      //   ]
      // })
      const router = useRouter()
      const store = useStore() 
      function getLsit(){
        listLoading.value = true
        userlist(listQuery).then(res=>{
          if(res.data.code=="200"){
            rolesData.length = 0;
            listLoading.value = false;
            total.value = res.data.data.length;
            rolesData.push(...res.data.data.list)
          }else{
            listLoading.value = false;
          }
        }).catch(error=>{
          listLoading.value = false;
          console.log(error)
        })
      }
      function handleAdd(){
        editData.value={}
        selectAppendValue.value = "@163.com"
        store.state.rolesId = '';
        dialogVisibleStatus.value = true
      }
      function handleEdit(id){
        if(id){
          store.state.noteId = id;
          router.push("/roles/edit")
        }
      }
      function handRolesAdd(){
        Form1.value.validate().then(()=>{
          if(editData.value){
            add(editData.value).then(res=>{
              if(res.data.code=="200"){
                ElMessage({message: res.data.msg,type: 'success'})
                dialogVisibleStatus.value = false
                editData.value={}
                getLsit()
              }else{
                ElMessage({message: res.data.msg,type: 'warning'})
              }
            }).catch(err=>{
              console.log(err)
            })
          }else{
            update(editData.value).then(res=>{
              if(res.data.code=="200"){
                ElMessage({message: '更新成功',type: 'success'})
                dialogVisibleStatus.value = false
                editData.value={}
                getLsit()
              }else{
                ElMessage({message: res.data.msg,type: 'warning'})
              }
            }).catch(error=>{
              console.log(error)
            })
          }
        }) 
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
            //   deleteRoles(id).then((res)=>{
            //     if(res.data.code=="200"){
            //       ElMessage({message: '删除成功',type: 'success'})
            //       getLsit()
            //     }else{
            //       ElMessage({message: res.data.msg,type: 'success'})
            //     }
            //   })
            }
          }).catch(() => {
        })
      }
      function handleChange(){
        if(selectAppendValue.value){
          editData.value.email = editData.value.email.split("@")[0]
          editData.value.email =editData.value.email+ selectAppendValue.value
        }
      }
      function emailChange(){
        if(editData.value.email && selectAppendValue.value){
          editData.value.email = editData.value.email.split("@")[0]
          editData.value.email = editData.value.email+ selectAppendValue.value
        }
      }
      function emailfocus(){
        if(editData.value.email){
          editData.value.email = editData.value.email.split("@")[0]
        }
      }
      function handleSizeChange(){
  
      }
      function handleCurrentChange(){
  
      }
      function changeStatus(){
  
      }
      function handleFilter(){
  
      }
      function collectId(val){
        deleteItem = val.map(function(item){
          return item.id
        }).join(',')
      }
      onMounted(()=>{
          getLsit()
      })
      return{
        rolesData,
          listQuery,
          listLoading,
          deleteItem,
          total,
          dialogVisibleStatus,
          editData,
          Form1,
          rules,
          selectAppendValue,
          getLsit,
          handleEdit,
          emailChange,
          emailfocus,
          handleChange,
          handleDelete,
          handleSizeChange,
          handleCurrentChange,
          handleFilter,
          changeStatus,
          handleAdd,
          collectId,
          handRolesAdd
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