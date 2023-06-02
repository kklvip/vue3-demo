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
        <el-table-column property="name" label="菜单名称" />
        <el-table-column  label="状态" >
            <template #default="scope">
            <el-switch v-model="scope.row.status" @change="change(scope.row.id,scope.row.status)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column property="level" label="菜单类型" >
          <template #default="scope">{{ matchLevel(scope.row.level) }}</template>
        </el-table-column>
        <el-table-column property="url" label="地址" />
        <el-table-column property="pidName" label="父菜单" />
        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)" :disabled="scope.row.level=='0'">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)" :disabled="scope.row.level=='0'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" v-if="total > 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
      </div>
      <el-dialog v-model="dialogVisibleStatus" title="编辑" width="30%" center>
        <el-form :model="editForm" ref="Form1" :rules="rules" label-width="85px">
            <el-form-item prop="name" label="名称：">
              <el-input placeholder="请输入名称" maxlength="20" v-model="editForm.name" ></el-input>
            </el-form-item>
            <el-form-item prop="level" label="等级：">
              <el-select v-model="editForm.level" placeholder="请选择菜单等级">
                <el-option :label="item.desc" :value="item.name" v-for="(item,index) in LevelOptionData" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="pid" label="父级菜单：" v-show="editForm.level!='1'">
              <el-select v-model="editForm.pid" placeholder="请选择父级菜单">
                <div v-show="editForm.level=='2'">
                  <el-option :label="item.name" :value="item.id" v-for="(item,index) in level1Data" :key="index" @click="optionUnitClick(item.name)" @change="optionUnitClick(item.name)"></el-option>
                </div>
                <div v-show="editForm.level=='3'">
                  <el-option :label="item.name" :value="item.id" v-for="(item,index) in level2Data" :key="index" @click="optionUnitClick(item.name)" @change="optionUnitClick(item.name)"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item prop="url" label="地址：">
              <el-input placeholder="请输入地址" maxlength="20" v-model="editForm.url" ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="sureBtn()">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  <script>
  import {reactive,onMounted, ref} from 'vue'
  import { menusList,save,getLevel1,getLevel2,changeStatus } from "@/api/menus"
  // import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { deepClone } from "@/utils/validate"
  import { ElMessageBox,ElMessage } from 'element-plus'
  export default {
    name:'adminNote',
    setup(){
      let rolesData = reactive([])
      let listQuery = reactive({
          page:1,
          size:10,
          keyword:""
      })
      let isGetData1 = ref(false)
      let isGetData2 = ref(false)
      let listLoading = ref(false)
      let dialogVisibleStatus = ref(false)
      let deleteItem = reactive([])
      const LevelOptionData =[{name:"1",desc:"一级菜单"},{name:"2",desc:"二级菜单"},{name:"3",desc:"三级菜单"}] 
      let total = ref(0)
      let editForm = ref({});
      const Form1 = ref();
      let level1Data = reactive([])
      let level2Data = reactive([])
      const rules = reactive({
        name: [
          { required: true, message: '请先输入名称', trigger: 'blur' }
        ]
      })
      // const router = useRouter()
      const store = useStore() 
      function getList(){
        listLoading.value = true
        menusList(listQuery).then(res=>{
          if(res.data.code=="200"){
            rolesData.length = 0;
            listLoading.value = false;
            total.value = res.data.data.total;
            rolesData.push(...res.data.data.list)
          }else{
            listLoading.value = false;
          }
        }).catch(error=>{
          listLoading.value = false;
          console.log(error)
        })
      }
      function matchLevel(val){
        if(val =="1"){
          return "一级菜单"
        }else if(val=="2"){
          return "二级菜单"
        }else{
          return "三级菜单"
        }
      }
      function change(id,status){
        changeStatus(id,status).then(res=>{
          if(res.data.code=="200"){
            ElMessage({type:"success",message:res.data.msg})
          }else{
            ElMessage({type:"warning",message:res.data.msg})
          }
        })
      }
      function handleAdd(){
        editForm.value = {}
        store.state.rolesId = '';
        dialogVisibleStatus.value = true
      }
      function handleEdit(row){
        if(row.id){
          // store.state.noteId = id;
          dialogVisibleStatus.value = true
          console.log(deepClone(row));
          editForm.value = deepClone(row)
          console.log(editForm.value)
        }
      }
      function optionUnitClick(val){
        editForm.value.pidName = val
      }
      function sureBtn(){
        if(editForm.value.level =="1"){
          editForm.value.pid = "0"
        }
        save(editForm.value).then(res=>{
          if(res.data.code=="200"){
            ElMessage({type:"success",message:res.data.msg})
            dialogVisibleStatus.value = false
            getList()
          }else{
            ElMessage({type:"warning",message:res.data.msg})
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
      function handleSizeChange(){
  
      }
      function handleCurrentChange(){
  
      }
      function handleFilter(){
        getList()
      }
      function getMenusLevel1(){
        getLevel1().then(res=>{
          if(res.data.code=="200"){
            isGetData1.value=true
            level1Data.length=0;
            level1Data.push(...res.data.data)
            console.log(level1Data)
          }else{
            isGetData1.value=false
          }
        })
      }

      function getMenusLevel2(){
        getLevel2().then(res=>{
          if(res.data.code=="200"){
            level2Data.length=0;
            isGetData2.value=true
            level2Data.push(...res.data.data)
          }else{
            isGetData2.value=false
          }
        })
      }
      function collectId(val){
        deleteItem = val.map(function(item){
          return item.id
        }).join(',')
      }
      onMounted(()=>{
        getList()
        getMenusLevel1()
        getMenusLevel2()
      })
      return{
        rolesData,
          listQuery,
          listLoading,
          deleteItem,
          total,
          dialogVisibleStatus,
          editForm,
          Form1,
          rules,
          change,
          level1Data,
          level2Data,
          isGetData1,
          isGetData2,
          getList,
          LevelOptionData,
          handleEdit,
          matchLevel,
          handleDelete,
          handleSizeChange,
          handleCurrentChange,
          handleFilter,
          handleAdd,
          collectId,
          sureBtn,
          optionUnitClick
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