<template>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
          <el-button type="primary" @click="handleAdd()">添加</el-button>
          <span class="key" style="padding-left:20px">关键词：</span>
          <el-input clearable  @keyup.enter="handleFilter()" style="width:180px;margin:0 15px 10px;" class="filter-item" v-model="listQuery.keyword" placeholder="标题"></el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      </div>
      <el-table @selection-change="collectId" :data="menuData" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%">
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
        <el-table-column property="title" label="菜单名称" />
        <el-table-column  label="状态" >
            <template #default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row.id,scope.row.status)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column property="url" label="地址" />
        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" v-show="scope.$index!=0" @click="handleTop(scope.row,scope.$index)">向上</el-button>
              <el-button type="primary" size="mini" v-show="scope.$index+1 != total && scope.$index+1<10" @click="handleDown(scope.row,scope.$index)">向下</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" v-if="total > 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total" />
      </div>
      <el-dialog v-model="dialogVisibleStatus" title="编辑" width="30%" center>
        <el-form :model="Form" ref="Form1" :rules="rules" label-width="65px">
            <el-form-item prop="title" label="名称：">
              <el-input placeholder="请输入名称" maxlength="20" v-model="Form.title" ></el-input>
            </el-form-item>
            <el-form-item prop="url" label="地址：">
              <el-input placeholder="请输入地址" maxlength="20" v-model="Form.url" ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submit()">确定</el-button>
            <el-button type="warning" @click="dialogVisibleStatus=false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  <script>
  import { reactive,onMounted, ref,nextTick } from 'vue'
  import { listAdmin,up,down,save,updateStatus,deletemenu } from "@/api/menu"
  import { ElMessageBox,ElMessage } from 'element-plus'
  export default {
    name:'menusFront',
    setup(){
      const Form1 = ref();
      let menuData = reactive([])
      let listQuery = reactive({
          page:1,
          size:10,
          keyword:""
      })
      let listLoading = ref(false)
      let dialogVisibleStatus = ref(false)
      let deleteItem = reactive([])
      let total = ref()
      let Form = reactive({
        // id:"",
        // title:"",
        // url:"",
        // sort:""
      });
      
      const rules = reactive({
        title: [
          { required: true, message: '请先输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请先输入地址', trigger: 'blur' }
        ],
      })
      function getList(){
        listLoading.value = true
        listAdmin(listQuery).then(res=>{
          if(res.data.code=="200"){
            menuData.length = 0;
            listLoading.value = false;
            total.value = res.data.data.total;
            menuData.push(...res.data.data.list)
          }else{
            listLoading.value = false;
          }
        }).catch(error=>{
          listLoading.value = false;
          console.log(error)
        })
      }
      function submit(){
        Form1.value.validate().then(()=>{
          save(Form).then(res=>{
            if(res.data.code=="200"){
              dialogVisibleStatus.value = false
              ElMessage({message: res.data.msg,type: 'success'})
              getList()
            }else{
              ElMessage({message: res.data.msg,type: 'warning'})
            }
          }).catch(error=>{
            console.log(error)
          })
        })
      }
      function handleEdit(row){
        if(row){
            dialogVisibleStatus.value=true
            Form.id = row.id
            Form.title = row.title
            Form.url = row.url
            Form.sort = row.sort
        }
      }
      function handleAdd(){
        dialogVisibleStatus.value=true
        Form.id = ""
        Form.title = ""
        Form.url = ""
        Form.sort = ""
        nextTick(()=>{

        })
      }
    //   function handRolesAdd(){
        // Form1.value.validate().then(()=>{
        //   saveRoles(Form.value).then(res=>{
        //         if(res.data.code=="200"){
        //             ElMessage({message: '更新成功',type: 'success'})
        //             dialogVisibleStatus.value = false
        //             Form.value.name=""
        //             getList()
        //         }else{
        //             ElMessage({message: res.data.msg,type: 'success'})
        //         }
        //       }).catch(error=>{
        //         console.log(error)
        //       })
        //   })
    //   }
      function handleDelete(id){
        ElMessageBox.confirm('确认要删除吗?','提示',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
          ).then(() => {
            if(id){
              deletemenu(id).then((res)=>{
                if(res.data.code=="200"){
                  ElMessage({message: '删除成功',type: 'success'})
                  getList()
                }else{
                  ElMessage({message: res.data.msg,type: 'success'})
                }
              }).catch(error=>{
                console.log(error)
              })
            }
          }).catch((error) => {
            console.log(error)
        })
      }
      function handleTop(row,index){
        var oldId = "";
        var oldSort = "";
        for(var i =0;i<menuData.length;i++){
            if(i==index){
                oldId = menuData[i-1].id
                oldSort = menuData[i-1].sort
            }
        }
        if(row){
          var jsonData = {
            id:row.id,
            sort:row.sort,
            oldId:oldId,
            oldSort:oldSort
          }
            up(jsonData).then((res)=>{
                if(res.data.code=="200"){
                    ElMessage({message: res.data.msg,type: 'success'})
                    getList()
                }
            }).catch(error=>{
                console.log(error)
            })
        }
      }
      function handleDown(row,index){
        var oldId = "";
        var oldSort = "";
        for(var i =0;i<menuData.length;i++){
            if(i==index){
                oldId = menuData[i+1].id
                oldSort = menuData[i+1].sort
            }
        }
        if(row){
          var jsonData = {
            id:row.id,
            sort:row.sort,
            oldId:oldId,
            oldSort:oldSort
          }
            down(jsonData).then((res)=>{
                if(res.data.code=="200"){
                    ElMessage({message: res.data.msg,type: 'success'})
                    getList()
                }
            }).catch(error=>{
                console.log(error)
            })
        }
      }
      function changeStatus(id,status){
        updateStatus({id:id,status:status}).then(res=>{
          if(res.data.code=="200"){
            ElMessage({message: res.data.msg,type: 'success'})
          }else{
            getList()
            ElMessage({message: res.data.msg,type: 'warning'})
          }
        }).catch(error=>{
          console.log(error)
        })
      }
      function handleSizeChange(){
  
      }
      function handleCurrentChange(){
  
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
        menuData,
          listQuery,
          listLoading,
          deleteItem,
          total,
          dialogVisibleStatus,
          Form,
          Form1,
          rules,
          getList,
          handleEdit,
          handleDelete,
          handleSizeChange,
          handleCurrentChange,
          handleFilter,
          changeStatus,
          handleAdd,
          collectId,
          submit,
          handleTop,
          handleDown
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