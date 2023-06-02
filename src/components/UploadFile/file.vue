<template>
  <el-upload
    class="upload-demo"
    :action="action"
    :accept="accept"
    :on-change="handChange()"
    :headers="authorization()"
    :data="imgUploadType(paramType)"
    :on-success="handleSuccess"
    :before-remove="handleRemove()"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    multiple
    v-loading="loading"
    :limit="1">
    <el-button size="mini" type="primary">点击上传</el-button>
    <div class="el-upload__tip imgTips" >一次只能上传1个文件，大小不超过{{ fileSizes }}M</div>
  </el-upload>
</template>
<script>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { authorization } from '@/utils/auth'
  import { fileUpload, imgUploadType,limitSoft,limitSize } from '@/utils/config'
  export default {
    props: {
      // 上传地址
      action: {
        type: String,
        default: fileUpload
      },
      // 禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 文件大小
      fileSize: {
        type: Number,
        default: 1024
      },
      // 文件类型 && 组件name值
      fileType: {
        type: String,
        default: ''
      },
      // 上传文件限制
      accept: {
        type: String,
        default: ".zip, .exe, .7z, .dmg, .war"
      },
      // 文件相对路径地址
      path: {
        type: String,
        default: ''
      },
      // 文件上传携带的type参数值 具体类型详见utils/config.js
      paramType: {
        type: String,
        default: ''
      }
    },
    setup(){
      let loading = ref(false)
      let fileSizes = limitSize("soft")
      function handleError() {
        loading.value = false
        ElMessage({type:"error",message:"上传失败，请稍候再试！"})
      }
      function handleSuccess(res) {
        if(res.code!="200") {
          ElMessage({type:"error",message:res.msg})
          loading.value = false
          return false
        }
        return res;
      }
      // 上传前校验
      function beforeUpload(file) {
        const limit1 =file.size / 1024 / 1024 < limitSize("soft")
        const limit2 = file.size/ 1024 / 1024 >1
        const fileName = file.name
        // const fileLength = file.name.length
        const L1 = fileName.lastIndexOf(".")+1
        const L2 = fileName.length
        const softtype = fileName.substring(L1,L2)
        const isSoft = limitSoft(softtype)
        // const typeMap = {
        //   exe: 'windows软件',
        //   dmg: '苹果软件',
        //   zip: '压缩包'
        // }
        // const fileTypeName = typeMap[softtype]
        // 图片验证格式
        if (!isSoft) {
          ElMessage({type:"warning",message:'软件格式不正确,只能上传exe,dmg,rar,7z或者zip格式的文件'});
          return false
        }
        if (!limit1 || !limit2) {
          if(!limit1 && limit2){
            ElMessage({type:"warning",message:'上传软件大小不能超过'+ limitSize("soft") +'MB!'});
          }else if(limit1 && !limit2){
            ElMessage({type:"warning",message:'上传文件不能小于1MB'});
          }else{
            ElMessage({type:"warning",message:'其他错误信息'});
          }
          return false
        }
      }
      function handChange(){

      }
      function handleExceed(file){
        return file
      }
      function handleRemove(){

      }
      return{
        handleError,
        handleExceed,
        handleSuccess,
        beforeUpload,
        authorization,
        imgUploadType,
        fileSizes,
        loading,
        handChange,
        handleRemove
      }
    }   
  }
</script>
