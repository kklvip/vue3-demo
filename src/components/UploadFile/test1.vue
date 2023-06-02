<template>
  <el-upload 
    :action="action" 
    :disabled="disabled"
    class='avatar-uploader' 
    :show-file-list="false"
    :accept="accept"
    :headers="authorization()"
    :data="imgUploadType(paramType)" 
    :on-success="handleSuccess" 
    :before-upload="beforeUpload" 
    :on-error="handleError" 
    :on-change="handleChange" 
    name="file">
    <img v-if="path && fileType === 'image'" :src="imgHost+path" class="avatar" />
    <video v-if="path && fileType ==='video'" :src="imgHost + path" class="avatar" controls style="width:800px;height:350px;"></video>
    <i v-if="!disabled && !path" class="el-icon-plus avatar-uploader-icon"></i>
    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
  </el-upload>
</template>
<script>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { imgHost, imgUpload,imgUploadType,limitSize } from '@/utils/config'
  import { loadImageAsync } from '@/utils'
  import { authorization } from '@/utils/auth'
  export default{
    props: {
      // 上传地址
      action: {
        type: String,
        default: imgUpload
      },
      // 禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 文件大小
      fileSize: {
        type: Number,
        default: 10
      },
      // 文件类型 && 组件name值
      fileType: {
        type: String,
        default: 'image'
      },
      // 上传文件限制
      accept: {
        type: String,
        default: 'image/gif, image/jpeg, image/png'
      },
      // 文件相对路径地址
      path: {
        type: String,
        default: ''
      },
      // 文件上传携带的type参数值
      paramType: {
        type: String,
        default: '1'
      }
    },
    setup(props){
      let loading = ref(false);
      let imageUrl = ref("");
      function beforeUpload(file){
        loading.value = true
        var size = limitSize(props.fileType);
        if((file.size / 1024 / 1024) > size){
          ElMessage.error('上传文件大小不能超过 '+size+'MB!')
          return false
        }
        return true
      }

      function handleChange(file, fileList) {
        // 当多余一个的时候替换文件
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
      }

      function handleSuccess(res){
        loading.value = false
        if(res){
          loadImageAsync(imgHost + res.body.path).then(() => {
            loading.value = false;
          }).catch(() => {
            loading.value = false
          })
        }
      }
      function handleError(){
        ElMessage.error('上传失败')
        imageUrl = ''
      }
      return{
        imageUrl,
        loading,
        imgHost,
        imgUpload,
        beforeUpload,
        handleChange,
        handleSuccess,
        handleError,
        imgUploadType,
        props,
        loadImageAsync,
        authorization
    }
  }
}
</script>
<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
<style scoped lang="scss">
      .el-upload {
        border: 1px dashed #666 !important;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
      }
    
    
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    
    .avatar-uploader-icon {
      font-size: 20px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px dashed #666;
    }
</style>