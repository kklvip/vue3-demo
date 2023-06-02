<template>
  <div>
    <!-- <el-upload
      class="avatar-uploader"
      :disabled="disabled"
      :accept="accept"
      :action="action"
      :show-file-list="false"
      :data="imgUploadType(paramType)"
      :headers="token"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      v-loading="loading">
      <img v-if="path && fileType === 'image'" :src="imgHost + path" class="avatar">
      <video v-if="path && fileType ==='video'" :src="imgHost + path" class="avatar" controls style="width:400px;height:auto;"></video>
      <i v-if="!disabled && !path" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <span class="imgTips" v-if="!disabled && fileType === 'image'">支持jpg、png、jpeg格式，小于10M</span>
    <span class="imgTips" v-if="!disabled && fileType === 'video'">仅支持mp4格式文件</span>
  </div>
</template>

<script>
import { authorization } from '@/utils/auth'
import { imgHost, imgUpload, imgUploadType, limitImage } from '@/utils/config'
import { loadImageAsync } from '@/utils'

export default {
  name: 'UploadFile',
  data() {
    return {
      token: authorization(),
      imgHost,
      imgUpload,
      imgUploadType,
      loading: false
    }
  },
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
  created() {

  },
  methods: {
    handleError() {
      this.loading = false
      this.$message.warning('上传失败，请稍候再试！')
    },
    handleSuccess(res) {
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
    },
    // 上传前校验
    beforeUpload(file) {
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
    },
  }
}
</script>
<style lang="scss" scoped>
  .avatar-uploader{
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
</style>
