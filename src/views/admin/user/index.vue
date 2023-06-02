<template>
  <div class="panelBody app-container calendar-list-container" style="padding:40px 15px;" :class="disabled ? 'visit' : ''" >
    <el-row>
      <el-col :span="6" :offset="3" class="uploadAvatar">
        <UploadFile :disabled="disabled" paramType="0" @success="handleImgSuccess" :path="newAttr"></UploadFile>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-form :model="datas" label-width="120px">
          <el-form-item label="姓名：">
            <el-input v-model="datas.username" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="datas.nickname" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="datas.tel" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="datas.address" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="datas.email" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input v-model="datas.introduction" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="disabled = false" v-if="disabled">编辑</el-button>
            <el-button type="primary" @click="updateData" v-if="!disabled">确认修改</el-button>
            <el-button type="primary" @click="disabled = true" v-if="!disabled">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent,ref} from 'vue';
import UploadFile from '@/components/UploadFile/test1'
import { useStore } from "vuex"
import { userSave } from "@/api/public"
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: '',
  // 注册你的组件
  components:{ UploadFile },
  props: {
    text: {
      type:String,
      default: ''
    },
    is_right: Boolean,
    obj: {
      type: Object,
      default: ()=>{ return {xx:''} }
    }

  },
  
  setup(){                    // 父组件数据
    let store = useStore();
    let userInfo = store.getters.userInfo;
    let newAttr =  ref(userInfo.headImg);
    let datas = ref({...userInfo})
    let disabled = ref(true) 
    function updateData(){
      userSave(datas.value).then(res=>{
        store.dispatch('GetUserInfo');
        ElMessage({type:"success",message:res.data.msg})
      }).catch(error=>{
        console.log(error)
      })
        disabled.value = true
    }
    function handleImgSuccess(val){
      newAttr.value = val.data
      datas.value.headImg = val.data
      console.log(newAttr.value)
    }

    return {
      updateData,
      handleImgSuccess,
      disabled,
      datas,
      userInfo,
      newAttr 
    }
  },
  

});
</script>

<style lang="scss" scoped>
.uploadAvatar{
  display: flex;
  justify-content: center;
  align-items: center;
  &>div{
    cursor: pointer;
    &>i{
      cursor: pointer;
    }
  }
}
.avatar-uploader-icon{
  cursor: pointer;
}
</style>