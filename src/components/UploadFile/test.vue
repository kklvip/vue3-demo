<template>
        <div>
                <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :data = "imgUploadType(paramType)"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

        </div>


</template>
<script>
        import { ref } from 'vue'
        import { loadImageAsync } from '@/utils'
        import { imgHost, imgUpload, imgUploadType, limitImage } from '@/utils/config'
// import { ElMessage,UploadProps } from 'element-plus'
// import { Plus } from '@element-plus/icons-vue'

export default{
        props: {
                // 禁用状态
                disabled: {
                type: Boolean,
                default: false
                },
                // 文件大小
                fileSize: {
                type: Number,
                default: 2048
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
                // 文件上传携带的type参数值 具体类型详见utils/config.js
                paramType: {
                type: String,
                default: '1'
                }
        },
        setup(){
                let loading = ref(false);
                let imageUrl = ref("");
                let action = imgUpload
                function    handleError() {
                        loading.value = false
                }
                function handleSuccess(res) {
                        if(res.code!="200") {
                                this.$message.warning(res.msg)
                                this.loading = false
                                return false
                        }

                        if(this.fileType === 'image') {
                                // 图片加载完成后
                                loadImageAsync(imgHost + res.data).then(() => {
                                this.loading = false;
                                }).catch(() => {
                                this.loading = false
                                })
                        } else {
                                this.loading = false
                        }
                        this.$emit('success', res.data)
                }
                // 上传前校验
                function beforeUpload(file) {
                        const limit = file.size / 1024 / 1024 < this.fileSize;
                        const isImage = limitImage(file.type)
                        const typeMap = {
                                image: '图片',
                                video: '视频'
                        }
                        const fileTypeName = typeMap[this.fileType]
                        // 图片验证格式
                        if (this.fileType === 'image' && !isImage) {
                                this.$message.error(fileTypeName + '格式不正确');
                        }
                        if (!limit) {
                                this.$message.error('上传'+ fileTypeName +'大小不能超过'+ this.fileSize +'MB!');
                        }
                        // 上传视频只用校验文件大小
                        const flag = this.fileType === 'image' ? isImage && limit : limit
                        this.loading = flag
                        return flag
                }
                return{
                        loading,
                        action,
                        imageUrl,
                        imgUploadType,
                        imgUpload,
                        handleError,
                        loadImageAsync,
                        limitImage,
                        imgHost,
                        handleSuccess,
                        beforeUpload
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
        
<style>
        .avatar-uploader .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }
        
        .avatar-uploader .el-upload:hover {
          border-color: var(--el-color-primary);
        }
        
        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
        }
</style>