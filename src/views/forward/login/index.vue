<template>
    <div class="container">
            <div class="login-container"  :class="{ 'phoneClass': phoneFlag }">
                <el-form class="login-form face" label-position="left" :model="loginForm" ref="loginForm1" :rules="rules" label-width="65px">
                    <div class="title-container">
                        <h2 class="title">欢迎登录</h2>
                    </div>
                    <el-form-item prop="username" label="账号：">
                        <el-input placeholder="请使用用户名或手机号登录" maxlength="20" v-model="loginForm.username" >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码：">
                        <el-input show-password v-model="loginForm.password" placeholder="请输入密码" maxlength="12" autocomplete="on" @keyup.enter="submitFun('loginForm1')">
                        </el-input>
                    </el-form-item>
                    <div class="tiparea">
                            <!-- <el-checkbox v-model="status1.remember" @change="isRember()">记住密码</el-checkbox> -->
                            <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                            <a style="float:left" @click="toForgetPwd()">忘记密码？</a>
                            <p>没有账号? <a>立即注册</a></p>
                    </div>
                    <el-button type="primary" style="width:100%;margin:90px 0;" :loading="loading" @click="submitFun('loginForm1')">登录</el-button>
                </el-form>
            </div>
        <div class="beian">
            <a href="http://www.beian.miit.gov.cn">蜀ICP备19013140号</a>
        </div>
    </div>
</template>
<script>
import { reactive,getCurrentInstance,onMounted,ref } from 'vue'
import { useRouter } from 'vue-router';
import {rules} from "@/utils/validate"
// import { formatData } from "@/utils"
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
export default ({
    name:"login",
    setup() {
        const router = useRouter();
        let store = useStore();
        const loginForm = reactive({
            username:"",
            password:''
        });
        const loginForm1 = ref();
        const phoneFlag = ref(false);
        const {ctx} = getCurrentInstance()
        const submitFun = ()=>{
            loginForm1.value.validate().then(()=>{
                store.dispatch('LoginByUsername',loginForm).then(res=>{
                        if(res.code == "200"){
                            store.dispatch('GetUserInfo');
                            router.push("/home");
                        }else{
                            ElMessage({message: res.msg,type: 'error'});
                        }
                    })
            }).catch(error=>{
                console.log(error)
            })
        }
        function toForgetPwd(){
            router.push("/modifyPwd");
        }
        onMounted(()=>{
            if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|WebOS|Symbian|Windows Phone|Phone)/i))) {
                phoneFlag.value = true;
            }else{
                phoneFlag.value = false;
            }
            store.state.phoneFlag = phoneFlag;
        })
        return{
            submitFun,
            toForgetPwd, 
            phoneFlag,
            rules,
            ctx,
            checked:false,
            loginForm,
            codeMsg: '获取验证码',
            resetLoading: false,
            loading:false,
            loginForm1
        }
    }
})
</script>

<style lang="scss" scoped>
.container{
  background: url("../../../assets/img/back.jpeg") no-repeat;
  height: 100%;
  overflow: hidden;
  background-size:cover;
}
.login-container{
  background-color: #fff;
  position: relative;
  float: right;
  width: 365px;
  padding: 30px;
  height: 359px;
  border: 1px solid #ccc;
  margin: 80px 100px 0 0 ;
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
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  justify-content: space-between;
  margin-bottom:0px;
}
.tiparea a {
  color: #409eff;
  cursor: pointer;
}
</style>
