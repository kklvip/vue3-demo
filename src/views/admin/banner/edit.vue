<template>
  <div class="app-container calendar-list-container">
    <h1>{{bannerId?'轮播图编辑':'轮播图添加'}}</h1>
    <div class="panelBody" >
      <!-- <el-form :model="blogData" label-width="120px">
        <div class="text-center">
          <el-button type="warning" @click="close()" >取消</el-button>
          <el-button type="primary" @click="saveData()" >确定</el-button>
        </div>
      </el-form> -->
      <el-form ref="formRef" :model="bannerData" label-width="120px" class="demo-ruleForm" style="width:880px;margin:0 auto" status-icon>
        <el-form-item label="标题" prop="title" :rules="{required:true,message:'请输入标题',trigger:'change'}">
          <el-input v-model="bannerData.title" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary" >
          <el-input v-model="bannerData.summary" />
        </el-form-item>
        <el-form-item label="链接" prop="url" >
          <el-input v-model="bannerData.url" />
        </el-form-item>
        <el-form-item label="图片" prop="pic" :rules="{required:true,message:'请上传图片',trigger:'change'}">
          <UploadFile paramType="7" @success="handleImgSuccess" :path="bannerData.pic"></UploadFile> 
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确定</el-button>
          <el-button @click="resetForm()">返回</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import { onMounted,ref } from 'vue'
import { getById,save } from "@/api/banner"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UploadFile from '@/components/UploadFile/test1'
export default {
  name:'blogEdit',
  components: {UploadFile },
  setup(){
    const router = useRouter()
    const store = useStore()
    let bannerData = ref({})
    const bannerId = ref(0)
    const formRef = ref()
    function getInfo(){
      if(bannerId.value){
        getById(bannerId.value).then(res=>{
          if(res.data.code=="200"){
            bannerData.value=res.data.data ;
          }
        })
      }
    }
    function handleImgSuccess(res){
      console.log(res.data)
      bannerData.value.pic = res.data
    }
    function close(){
      router.go(-1)
    }
    onMounted(()=>{
      bannerId.value = store.state.bannerId;
      getInfo()
    })
    function submitForm(){
      formRef.value.validate().then(()=>{
        if(!bannerData.value.url){
          ElMessage({message: '轮播图片还没有上传',type: 'warning'})
          return
        }
        save(bannerData.value).then((res)=>{
          if(res.data.code=="200"){
            ElMessage({message: res.data.msg,type: 'success'})
            setTimeout(()=>{
              router.go(-1)
            },2000)
          }
        })
      })
    }
    return{
      bannerData,
      bannerId,
      getInfo,
      handleImgSuccess,
      submitForm,
      close,
      formRef
    }
  }
}
</script>
<style scoped>
  .panelBody{
    padding:40px 15px;
    border-width: 1px 0 0 0;
  }
  .dataForm{
    overflow: hidden;
  }
  .select{

  }
  .option{

  }
</style>