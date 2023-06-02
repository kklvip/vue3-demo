<template>
    <div class="container">
            <div class="login-container"  :class="{ 'phoneClass': phoneFlag }">
                <el-form class="login-form face" label-position="left" :model="submitData" ref="modifyRef" :rules="rules" label-width="95px">
                    <div class="title-container">
                        <h2 class="title">修改密码</h2>
                    </div>
                    <el-form-item prop="tel" label="手机号码：">
                        <el-input placeholder="请使用用户名或手机号登录" maxlength="20" v-model="submitData.tel" >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="validCode" label="验证码：" autocomplete="off">
                        <el-input placeholder="请输入验证码" maxlength="6" v-model="submitData.validCode" style="width: 160px">
                        </el-input>
                        <el-button :disabled="disabled==true" @click="ValidCode()" style="float: right;width: 140px;">{{ codeWord }}</el-button>
                    </el-form-item>
                    <el-form-item prop="password" label="密码：">
                        <el-input show-password v-model="submitData.password" placeholder="请输入密码" maxlength="20">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newpassword" label="新密码：">
                        <el-input show-password v-model="submitData.newpassword" placeholder="请再次输入密码" maxlength="20" >
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin: 90px 0;">
                        <el-button type="primary"  :loading="loading" @click="back()">返回登陆</el-button>
                        <el-button type="primary"  :loading="loading" @click="submitFun()">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        <div class="beian">
            <a href="http://www.beian.miit.gov.cn">蜀ICP备19013140号</a>
        </div>
    </div>
</template>

<script>
import { defineComponent,onMounted,ref} from 'vue';
import { useRouter } from 'vue-router';
import { rules } from "@/utils/validate"
import { ElMessage } from 'element-plus'
import { getValidCode,resetPwdApi } from "@/api/user"

export default defineComponent({
  name: 'modifyPwd',
  // 注册你的组件
  components:{  },
  setup(){
    const router = useRouter();
    const submitData = ref({
    });
    let loading = ref(false);
    let disabled = ref(false);
    let codeWord = ref("获取验证码")
    const modifyRef = ref();
    const phoneFlag = ref(false);
    function submitFun(){
        modifyRef.value.validate().then(()=>{
            if(submitData.value.password==submitData.value.newpassword){
                resetPwdApi(submitData.value).then(res=>{
                    if(res.data.code=="200"){
                        ElMessage({type:"success",message:"密码修改成功"})
                        setTimeout(()=>{
                            router.push("/login")
                        },2000)
                    }else{
                        ElMessage({type:"warning",message:res.data.msg})
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                ElMessage({type:"warning",message:"密码不一致"})
            }
        })
    }
    function ValidCode(){
        submitData.value.type="1";
        getValidCode(submitData.value).then(res=>{
            if(res.data.code=="200"){
                var time = 60;
                disabled.value = true
                var timer=  setInterval(function(){
                    if(time>0){
                        time --;
                        codeWord.value = "获取验证码("+time+"s)"
                    }else{
                        codeWord.value = "获取验证码"
                        disabled.value = false
                        clearInterval(timer)
                    }
                },1000)
            }else{
                ElMessage({type:"warning",message:res.data.msg})
            }
        }).catch(err=>{
            console.log(err)
        })
        
    }
    function back(){
        router.push("/login")
    }
    onMounted(()=>{
        submitData.value.password="";
        submitData.value.validCode="";
        submitData.value.newpassword="";
        console.log(submitData)
    })
    return {
        phoneFlag,
        modifyRef,
        submitData,
        rules,
        loading,
        disabled,
        codeWord,
        submitFun,
        ValidCode,
        back
    }
  },
  

});
</script >

<style lang="scss" scoped>
    .container{
        display: flex;
  background: url("../../../assets/img/back.jpeg") no-repeat;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size:cover;
}
.login-container{
  background-color: #fff;
  position: relative;
  width: 465px;
  padding: 30px;
  height: 489px;
  border: 1px solid #ccc;
  -webkit-perspective: 2000px;
  -moz-perspective: 2000px;
  -o-perspective: 2000px;
  perspective: 2000px;
  .title-container{
      margin-bottom: 5px;
  }
  &>form{
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    transition: 1s;
  }
  &>form.back{
      position: absolute;
      top: 30px;
      width: 303px;
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
  }
  &.reset{
    .face{
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
    }
    .back{
        position: absolute;
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
      -moz-transform: rotateY(0deg);
    }
  }
}
.phoneClass{
    width: 90%;
    margin: 100px auto;
    float: inherit;
    padding: 15px;
    border-radius: 4px;
}
.show-pwd{
  cursor: pointer;
}
.backIcon{
    color:#fff;
    cursor: pointer;
    font-size: 20px;
  }
  .beian{
      position: fixed;
      bottom: 30px;
      width: 100%;
      text-align: center;
      &>a{
          color: #666;
      }
      &>a:hover{
          
          color: #ff6a00!important;
      }
  }
</style>