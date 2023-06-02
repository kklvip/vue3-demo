<template>
  <div class="container">
    <div class="login-container" :class="reset">
        <el-form class="login-form face" autoComplete="on" :model="loginForm" :rules="loginFormRules" ref="loginForm" label-position="left">
            <div class="title-container">
                <h2 class="title">欢迎登录</h2>
            </div>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" autoComplete="on" placeholder="请使用用户名或手机号登录" maxlength="20">
                    <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                    </span>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input show-password v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" maxlength="12">
                    <span class="svg-container svg-container_password" style="padding-left:2px;">
                    <svg-icon icon-class="password" />
                    </span>
                </el-input>
            </el-form-item>
            <div class="forgetPwd">
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                    <span @click="forgetPwd()" style="float:right">忘记密码？</span>
            </div>
            <el-button type="primary" style="width:100%;margin:90px 0;" :loading="loading" >登录</el-button>
        </el-form>
        <!-- 找回密码框 -->
        <el-form class="login-form back" :rules="rules" :model="forgetForm" ref="forgetForm" label-position="left">
            <div class="title-container">
                <h2 class="title">找回密码</h2>
            </div>
            <el-form-item prop="tel">
            <el-input name="tel" type="text" v-model="forgetForm.tel" placeholder="请输入手机号" maxlength="11">
                <span class="svg-container svg-container_login">
                <svg-icon icon-class="phone" />
                <!-- <i class="el-icon-phone"></i> -->
                </span>
            </el-input>
            </el-form-item>
            <el-form-item prop="code">
            <el-input name="code" type="text" v-model="forgetForm.code" placeholder="请输入验证码" maxlength="6">
                <span class="svg-container">
                <svg-icon icon-class="message" />
                </span>
                <el-button class="codeBtn" :disabled="btnDisable" @click="getCode()" style="background-color:none">{{codeMsg}}</el-button>
            </el-input>
            </el-form-item>
            <el-form-item prop="password">
            <el-input name="password" type="password" v-model="forgetForm.password" placeholder="请输入新密码" maxlength="12">
                <span class="svg-container">
                <svg-icon icon-class="password" />
                </span>
            </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input name="confirmPassword" type="password" v-model="forgetForm.confirmPassword" placeholder="请再次输入新密码" maxlength="12">
                    <span class="svg-container">
                    <svg-icon icon-class="password" />
                    </span>
                </el-input>
            </el-form-item>
            <el-form-item>
                <div style="text-align:center">
                    <el-button type="warning" style="margin-bottom:30px;" @click="backLogin()">返回</el-button>
                <el-button type="primary" style="margin-bottom:30px;" :loading="resetLoading" >确认</el-button>
                </div>
                
            </el-form-item>
            
        </el-form>
    </div>
    <div class="beian">
        <a href="http://www.beian.miit.gov.cn">蜀ICP备19013140号</a>
    </div>
</div>
</template>

<script>
import { reactive,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
      setup() {
          const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'))
            }
            if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
                callback(new Error('密码不能为中文'))
            }
            if(value.length < 6 || value.length > 12) {
                callback(new Error('请输入6-12位长度的新密码'))
            }
            callback();
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'))
            }
            if (value !== this.forgetForm.password) {
                callback(new Error('两次密码输入不一致，请重新输入!'))
            }
            callback();
        };
          const data = reactive({
              loginForm:{
                username: '',
                password: ''
            },
            forgetForm:{
                code:'',
                tel:'',
                password:'',
                confirmPassword:''

            },
            passwordType: 'password',
            // 记住账号密码
            remember: false,
            loading:false,
            loginFormRules:{
                username: [{ required: true, trigger: 'change', message: '请输入用户名' }],
                password: [{ required: true, trigger: 'change', message: '请输入密码' }]
            },
            // 重置密码框校验
            rules: {
                tel: [{ required: true, trigger: 'change', message: '请输入手机号' }],
                code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
                password: [{ required: true, trigger: 'change', validator: validatePass }],
                confirmPassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
            },
            reset:'',
            btnDisable: false,
            codeMsg: '获取验证码',
            resetLoading: false,

          })
          onBeforeMount(() => {
          })
          onMounted(() => {
          })
          return {
              data  
          }

      }
  };
</script>
<style scoped>

</style>