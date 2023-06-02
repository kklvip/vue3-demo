import { ref,reactive} from 'vue'
/*
 * @Description: validate.js 文件，各类验证规则
 * @Author: zlj
 * @Date: 2020-05-05 17:05:13
 * @LastEditTime: 2020-05-08 15:17:37
 * @LastEditors: zlj
 */

/* 电话号码 */
export function validateTel(rule,str,callback){
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if(!reg.test(str)){
    callback(new Error("电话格式不正确！"));
  }else{
    callback();
  }
}
/* 特殊字符过滤 */
export function strpscript (str) {
  var patter = new RegExp(
    "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  );
  var rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.sub(i, 1).replace(patter, "");
  }
  return rs;
}
/* 验证邮箱 */
export function validateVEmail (rule,value,callback) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if(!reg.test(value)){
    console.log("value"+value)
    callback(new Error("邮箱格式不正确！"));
  }else{ 
    console.log("value"+value)
    callback()
  }
  // return !reg.test(value) ? true : false;
}
  
/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword (value) {
  let reg = /^(?=.*[a-z])(?=.*\d)[\s\S]{6,20}$/;
  return !reg.test(value) ? true : false;

  // return false;
}
  
/* 验证验证码 6位验证码，包含数字字母*/
export function validateVCheckCode (value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

// 密码验证
let validatePassword = (rule, value, callback) => {
  if (value == "") callback(new Error("密码不能为空！"));
  else if (validateVPassword(value)) {
      callback(new Error("密码格式有误！"));
  } else callback();
};
//深拷贝
export function deepClone(obj) {
  var _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}
// 表单验证
export  const rules = reactive({
    username: [
        {
        message:"请输入您的登录账号",
        trigger: "blur",
        required:true
        },
        {
        min: 4,
        max: 13,
        trigger: "blur",
        message:"4 to 10"
        }
    ],
    password: [
        {
        // validator: validatePassword,
        message:"请输入您的登录密码",
        trigger: "blur",
        required:true
        }
    ],
    password1: [
      {
        message:"请输入您的登录密码",
        trigger: "blur",
        required:true
        }
    ],
    checkPassword: [
        {
        validator: "", //validateCheckPassword
        trigger: "blur"
        }
    ],
    tag: [
        {
        validator: "", //validateCheckPassword
        trigger: "blur",
        required:true
        }
    ],
    title: [
        {
        validator: "", //validateCheckPassword
        trigger: "blur",
        required:true,
        message:"请输入标题"
        }
    ],
    cid: [
        {
        validator: "", //validateCheckPassword
        trigger: "blur",
        message:"请选择分类",
        required:true,
        type:"number"
        }
    ],
    checkCode: [
        {
        validator: validateVCheckCode, //validateCheckCode
        message:"验证码格式输入错误",
        trigger: "blur"
        }
    ],
    summary:[
      {
        validator: validateVCheckCode, //validateCheckCode
        message:"请输入摘要",
        trigger: "blur",
        required:true
        }
    ],
    content:[
      {
        validator: validateVCheckCode, //validateCheckCode
        message:"请输入内容",
        trigger: "blur",
        required:true
        }
    ],
    name:[
      {
        message:"请输入名称",
        trigger: "blur",
        required:true
        }
    ],
    tel:[
      {
        validator:validateTel,                           
        message:"请输入正确的电话号码",
        trigger: "blur",
        required:true
      }
    ],
    address:[
      {
        message:"请输入地址",
        trigger: "blur",
        required:true
        }
    ],
    birthday:[
      {
        message:"请选择生日",
        trigger: "blur",
        required:true
        }
    ],
    sex:[
      {
        message:"请选择性别",
        trigger: "blur",
        required:true
        }
    ],
    email:[
      {
        validator:validateVEmail,
        message:"请输入正确的邮箱地址",
        trigger: "blur",
        required:true
        }
    ],
    introduction:[
      {
        message:"请输入用户简介",
        trigger: "blur",
        required:true
        }
    ],
    validCode:[
      {
        message:"请输入验证码",
        trigger: "blur",
        required:true
      }
    ],
    newpassword:[
      {
        validator:validatePassword,
        trigger: "blur",
        required:true
      }
    ]
});

export const loginUser = ref({
  email: "",
  password: "",
});