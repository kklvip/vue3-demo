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
        <el-table-column property="roleName" label="名称" />
        <el-table-column  label="状态" >
            <template #default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit1(scope.row)">编辑</el-button>
              <el-button type="warning" size="mini" @click="handleEdit2(scope.row.roleId)">关联</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.roleId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" v-if="total > 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
      </div>
      <el-dialog v-model="editForm1dialogVisibleStatus" title="编辑" width="30%" center>
        <el-form :model="editForm1" ref="refForm1" :rules="rules" label-width="65px">
            <el-form-item prop="name" label="名称：">
              <el-input placeholder="请输入名称" maxlength="20" v-model="editForm1.name" ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handRolesAdd">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="editForm2dialogVisibleStatus" title="编辑" width="30%" center>
        <div style="padding:50px 100px">
          <el-tree ref="treeRef" :data="menusData" show-checkbox default-expand-all node-key="id" highlight-current :props="props" />
      </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handRolesAdd2">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  <script>
  import { reactive,onMounted, ref } from 'vue'
  import { getRoleslist,saveRoles,deleteRoles,changeRolesStatus,modifyRoleShip,getRolesByOne } from "@/api/roles"
  import { menusListAll } from "@/api/menus"
  // import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { ElMessage,ElMessageBox } from 'element-plus'
  export default {
    name:'roleList',
    setup(){
      let rolesData = reactive([])
      let menusData = reactive([])
      let menusIdData = reactive([])
      let menusOldData = reactive([])
      let menusNewData = reactive([])
      let menusSubData = reactive([])
      let selectRolesId = ref(0); 
      let listQuery = reactive({
          page:1,
          size:10,
          keyword:""
      });
      const treeRef = ref()
      const props = {
        value: 'id',
        label: 'name',
        children: 'children'
      }; 
      let listLoading = ref(false);
      let editForm1dialogVisibleStatus = ref(false);
      let editForm2dialogVisibleStatus = ref(false);
      let deleteItem = reactive([]);
      let total = ref();
      let editForm1 = reactive({
        id:"",
        name:"",
        status:""
      }); 
      const refForm1 = ref();
      const rules = reactive({
        name: [
          { required: true, message: '请先输入名称', trigger: 'blur' }
        ]
      });
      // const router = useRouter();
      const store = useStore();
      function test(){
        modifyRoleShip().then(()=>{

        }).catch(error=>{
          console.log(error)
        })
      }
      function getList(){
        listLoading.value = true;
        getRoleslist(listQuery).then(res=>{
          if(res.data.code=="200"){
            rolesData.length = 0;
            listLoading.value = false;
            total.value = res.data.data.length;
            rolesData.push(...res.data.data);
          }else{
            listLoading.value = false;
          }
        }).catch(error=>{
          listLoading.value = false;
          console.log(error);
        })
      }
      function handleAdd(){
        store.state.rolesId = '';
        editForm1dialogVisibleStatus.value = true;
      }
      function handleEdit1(row){
        if(row.roleId&&row.roleName){
          editForm1.id = row.roleId;
          editForm1.name = row.roleName;
          editForm1.status = row.status;
          editForm1dialogVisibleStatus.value = true;
        }
      }
      function handleEdit2(val){
        selectRolesId.value = val;
        getRolesByOne(val).then((res)=>{
          if(res.data.code=="200"){
            menusOldData.length = 0;
            menusOldData.push(...res.data.data)
          }
        })
        editForm2dialogVisibleStatus.value = true;
        menusListAll().then((res)=>{
          if(res.data.code=="200"){
            menusData.length = 0;
            menusData.push(...res.data.data)
            for(var i=0;i<menusData.length;i++){
              if(menusData[i].id){
                menusIdData.push({menuId:menusData[i].id,roleId:selectRolesId.value,status:""});
                var a = menusData[i].children;
                if(a.length>0){
                  for(var j = 0;j<a.length;j++){
                    if(a[j].id){
                      menusIdData.push({menuId:a[j].id,roleId:selectRolesId.value,status:""});
                      var b = a[j].children;
                      if(b.length>0){
                        for(var k = 0;k<b.length;k++){
                          if(b[k].id){
                            menusIdData.push({menuId:b[k].id,roleId:selectRolesId.value,status:""});
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }else{
            ElMessage({message: '菜单信息获取失败，请稍后再试',type: 'warning'})
          }
        })
      }
      function handRolesAdd(){
        refForm1.value.validate().then(()=>{
          saveRoles(editForm1).then(res=>{
            if(res.data.code=="200"){
                ElMessage({message: '更新成功',type: 'success'})
                editForm1dialogVisibleStatus.value = false;
                editForm1.id="";
                editForm1.name="";
                editForm1.status="";
                getList();
            }else{
                ElMessage({message: res.data.msg,type: 'success'});
            }
          }).catch(error=>{
            console.log(error);
          })
        })
      }
      function handRolesAdd2(){
        console.log(treeRef.value.getCheckedKeys()); 
        console.log(treeRef.value.getHalfCheckedNodes());
        // compare(treeRef.value.getCheckedKeys(),menusOldData);
        // modifyRoleShip({"roleShip":menusSubData});
        // editForm2dialogVisibleStatus.value = false;
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
            deleteRoles(id).then((res)=>{
              if(res.data.code=="200"){
                ElMessage({message: '删除成功',type: 'success'});
                getList();
              }else{
                ElMessage({message: res.data.msg,type: 'warning'});
              }
            })
          }
        }).catch(() => {
        })
      }
      function handleSizeChange(){
  
      }
      function handleCurrentChange(){
  
      }
      function changeStatus(row){
        changeRolesStatus(row.roleId,row.status).then(res=>{
          if(res.data.code=="200"){
            ElMessage({message: res.data.msg,type: 'success'});
          }else{
            ElMessage({message: res.data.msg,type: 'warning'});
          }
        })
      }
      function handleFilter(){
  
      }
      function collectId(val){
        deleteItem = val.map(function(item){
          return item.id
        }).join(',')
      }
      function compare(arr1,arr2){
        menusSubData.length = 0;
        if(arr1.length>0){
          for(var i in arr2){
            for(var j in arr1){
              if(j.id.indexOf(i)<0){
                //新增
                menusSubData.push({"id":"","menuId":j,"roleId":j.roleId,"status":"1"})
              }
            }
          }
        }
        if(arr2.length>0){
          for(var x in arr1){
            for(var y in arr2){
              if(y.id.indexOf(x)<0){
                //删除
                menusSubData.push({"id":y.id,"menuId":"","roleId":"","status":"2"})
              }
            }
          }
        }
      }
      onMounted(()=>{
          getList()
      })
      return{
        rolesData,
        menusData,
        listQuery,
        listLoading,
        deleteItem,
        selectRolesId,
        total,
        editForm1dialogVisibleStatus,
        editForm2dialogVisibleStatus,
        editForm1,
        refForm1,
        treeRef,
        rules,
        props,
        menusOldData,
        menusNewData,
        menusSubData,
        getList,
        handleEdit1,
        handleEdit2,
        handleDelete,
        handleSizeChange,
        handleCurrentChange,
        handleFilter,
        changeStatus,
        handleAdd,
        collectId,
        handRolesAdd,
        handRolesAdd2,
        compare,
        test
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