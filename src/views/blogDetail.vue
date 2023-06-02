<template>
  <div class="container">
    <div class="page">
      <div class="c_head">
        <div>
          <h1>{{blogData.title}}</h1>
        </div>
        <div>
          <span>作者：{{blogData.authorName?blogData.authorName:'平台'}}</span><span>浏览量：{{blogData.views}}</span><span>更新时间：{{blogData.updateTime||blogData.createTime}}</span>
        </div>
      </div>
      <div class="c_content" v-html="blogData.content"></div>
    </div>
  </div>
  <div class="contact" ref="contact" @mouseleave="mouseOut()" @mouseenter="mouseIn()" >
      <img class="img1" src="../assets/img/contact.gif" alt="" @click="dialogVisibleStatus = true,initSocket()">
      <img class="img2" src="../assets/img/cm.png" alt="" @click="dialogVisibleStatus = true,initSocket()">
    </div>
    <el-dialog :model-value="dialogVisibleStatus" center width="600px" :title="contactWith" :close-on-click-modal="closemodal" :modal="modal" :before-close="close">
      <div class="contactBox">
        <div class="show-area" ref="showArea">
          <ul>
          <li class="connect" v-if="conStatus">
              <p>{{upperDate(conTime)}}</p>
              <i style="color:green">连接成功 </i>              
            </li>
            <li v-for="(item,index) in dataList" :key="index">
                <p v-if="item.status==true" >{{upperDate(item.ctime)}}</p>
                <!-- <span class="bubble">{{item.msg}}</span>  -->
                <span :class="[item.type=='1'?'right':'left','bubble']">{{ item.msg }}</span>       
            </li>
            <li class="connect" v-if="losConStatus">
              <i  style="color:red">对方不在线，请稍后联系</i>
            </li>
            <li class="connect" v-if="falseStatus">
              <p>{{upperDate(gettime())}}</p>
              <i  style="color:red">服务出了一点小问题，请稍后再试</i>
            </li>
          </ul>
        </div> 
        <VueEmoji @input="onInput" ref="clearRef" width="550" ></VueEmoji>
        <el-button type="danger" class="sendButton" @click="send"> 发送</el-button>
      </div>
    </el-dialog>
</template>
<script>
  import {nextTick, onMounted,reactive,ref} from 'vue'
  import { useStore } from 'vuex'
  import VueEmoji from 'emoji-vue'
  import { ElMessage } from 'element-plus'
  import {getBlogById,updateViews } from "@/api/blog"
  import {socketUrl} from "@/utils/config"
  export default{
      name:'noteDetail', 
      components:{VueEmoji},  
      setup(){
        const store = useStore()
        let userInfo = store.getters.userInfo;
        let blogData = ref({})
        let conStatus = ref(true)
        let losConStatus = ref(false)
        let falseStatus = ref(false)
        let conTime = ref("")
        let losTime = ref("")
        let dataList = ref([])
        let closemodal = ref(false)
        let modal=ref(true)
        let msgFrom = ref("")
        let websock = ref(null)
        let dialogVisibleStatus = ref(false)
        let myText = ref("")
        let showArea = ref()
        let contactWith = ref()
        const contact = ref()
        let sendInfo = reactive({
          To:"",
          msg:"",
          nickName:"",
          type:"",
          status:false
        })
        let timer = ref(null);
        let clearRef = ref(null)
        function getInfo(){
          var blogId = sessionStorage.getItem("blogId")
          if(blogId){
            getBlogById(blogId).then(res=>{
            if(res.data.code=="200"){
                blogData.value = res.data.data;
            }
            }).catch(error=>{
              console.log(error)
            })
          }else{
            ElMessage({message:"数据错误，请稍后再试",type:"warning"})
          }
        }
        function upperDate(v){
          let date = new Date(v);
          // let y = date.getFullYear();
          // let MM = date.getMonth() + 1;
          // MM = MM < 10 ? "0" + MM : MM;
          // let d = date.getDate();
          // d = d < 10 ? "0" + d : d;
          let h = date.getHours();
          h = h < 10 ? "0" + h : h;
          let m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          // let s = date.getSeconds();
          // s = s < 10 ? "0" + s : s;
          return h +":"+ m;
        }
        function initSocket(){
          // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
          const wsurl = socketUrl+"/webSocketNew/"+userInfo.username;
          if ('WebSocket' in window) { 
            websock.value = new WebSocket(wsurl); 
          } else { 
            console.log('当前浏览器 Not support websocket')
            return; 
          } 
          websock.value.onopen = websocketonOpen;
          websock.value.onmessage = websocketonMessage;
          websock.value.onerror = websocketonError;
          websock.value.onclose = WebsocketClose;
          conTime.value = gettime()
          nextTick(()=>{
            // showArea.value.style.overflowY='hidden';
          })
        }
        function websocketonOpen(){
          console.log("WebSocket连接已打开")
          conStatus.value = true
          falseStatus.value = false
          losConStatus.value = false
        }
        function websocketonMessage(e){
          let redata = JSON.parse(e.data);
          if(redata.from){
            msgFrom.value = redata.from
            if(!redata.nickName){
              redata.nickName="用户"
            }
            var i=1;
            var timer = setInterval(()=>{
              if(i%3==0){
                contactWith.value = "您正在与"+redata.nickName+"聊天中..."
              }else if(i%3==1){
                contactWith.value = "您正在与"+redata.nickName+"聊天中."
              }else{
                contactWith.value = "您正在与"+redata.nickName+"聊天中.."
              }
              i++;
              if(i>1000){
                clearInterval(timer)
              }
            },1000)
          }
          // showArea.value.$forceUpdate()
          if(redata.code=="300"){
            losConStatus.value = true
            losTime.value = redata.ctime
          }else{
            conStatus.value = true
            losConStatus.value = false
            falseStatus.value = false
            redata.type="2"
            dataList.value.push(redata)
            setTimeout(()=>{
              if(dataList.value.length>1){
                for(var i = dataList.value.length-1;i>0;i--){
                  if(((new Date(dataList.value[i-1].ctime)).getTime() - (new Date(dataList.value[i].ctime)).getTime())/1000 < -30){
                    dataList.value[i].status = true
                  }else{
                    dataList.value[i].status = false
                  }
                }
              } 
              showArea.value.scrollTop = showArea.value.scrollHeight
            },100)
          }
          
        }
        function websocketonError(){
          console.log("WebSocket连接发生错误")
        }
        function WebsocketClose(){
          console.log('断开连接',)
            falseStatus.value = true
        }
        function onInput(event) {
          myText.value = event.data
        }
        function mouseIn(){
          contact.value.style.width="180px"
          contact.value.style.cursor="pointer"
        }
        function mouseOut(){
          contact.value.style.width="80px"
          contact.value.style.cursor="none"
        }
        function close(){
          WebsocketClose()
          clearInterval(timer.value);
          dialogVisibleStatus.value = false
        }
        function send(){
          sendInfo.msg = myText.value
          if(userInfo.username=="admin"){
            sendInfo.To = msgFrom.value||""
          }else{
            sendInfo.To="admin"
          }
          sendInfo.nickName = userInfo.nickname;
          sendInfo.ctime = new Date();
          sendInfo.status = true
          sendInfo.type="1"
          if(sendInfo.msg==""){
            ElMessage({type:"warning",message:"请输入聊天信息"})
            return 
          }
          if(websock.value.readyState==3){
            falseStatus.value = true
            return
          }
          losConStatus.value = false
          falseStatus.value = false
          websock.value.send(JSON.stringify(sendInfo));
          setTimeout(()=>{
            dataList.value.push(deepClone(sendInfo))
            if(dataList.value.length>1){
              for(var i=dataList.value.length-1;i>0;i--){
                if(((new Date(dataList.value[i-1].ctime)).getTime()-(new Date(dataList.value[i].ctime)).getTime())/1000<-30){
                  dataList.value[i].status = true
                }else{
                  dataList.value[i].status = false
                }
              }
            }
            sendInfo.status = false 
            
          },100)
          myText.value = ""
          clearRef.value.clear();
          setTimeout(() => {
            sendInfo.msg="";
            showArea.value.scrollTop = showArea.value.scrollHeight
          }, 200);
        }
        function gettime(){
          function nowtime(){
            var myDate = new Date();
            var year=myDate.getFullYear();
            var month=myDate.getMonth()+1;
            var date=myDate.getDate();
            var h=myDate.getHours();       //获取当前小时数(0-23)
            var m=myDate.getMinutes();     //获取当前分钟数(0-59)
            var s=myDate.getSeconds();
            var now=year+'-'+month+'-'+date+' '+p(h)+':'+p(m)+":"+p(s);
            return ""+now;
          }
          //转换格式
          function p(s) {
              return s < 10 ? '0' + s: s;
          }
          //获取时间
          var time = nowtime();
          return time
        }
        function deepClone(obj) {
          var _obj = JSON.stringify(obj),
            objClone = JSON.parse(_obj);
          return objClone;
        }
        onMounted(()=>{
            getInfo()            
            dialogVisibleStatus.value = false
            setTimeout(()=>{
              updateViews(sessionStorage.getItem("blogId"))
            },2000)
        })
        
        return{
          contactWith,
            blogData,
            getInfo,
            clearRef,
            msgFrom,
            initSocket,
            websocketonOpen,
            websocketonMessage,
            close,
            websocketonError,
            WebsocketClose,
            upperDate,
            onInput,
            mouseIn,
            mouseOut,
            send,
            deepClone,
            gettime,
            myText,
            showArea,
            sendInfo,
            dataList,
            conTime,
            closemodal,
            modal,
            conStatus,
            losConStatus,
            falseStatus,
            dialogVisibleStatus,
            store,
            contact,
            timer
        }
    }
  }
</script>
<style lang="scss" scoped>
.left{
  margin-left: 20px;
  float: left !important;
}
.right{
  margin-right: 20px;
  float: right !important;
}
  .container{
    width:1200px; 
    padding-top: 50px;
    min-height: 600px;
    margin:0 auto;
  }
  .page{
    background-color:#f2f2f2;
    padding: 0 20px;
    overflow:hidden;
  }
  .c_head{
    text-align:center;
    padding-bottom:50px;
    &>div{
      overflow:hidden;
      &>h1{
        margin-top: 20px;
        margin-bottom: 20px;
      }
      &>span{
        float:left;
        margin-right:30px;
      }
    }
  }
  .c_content{
    padding: 20px 0;
  }
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      padding: 0;
    }
  
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
  
    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
  
    body > .el-container {
      margin-bottom: 40px;
    }
  
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
.contact{
  position: absolute;
  bottom: 200px;
  right: 0;
  width: 80px;
  height: 65px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: 0.5s;
  overflow: hidden;
  .img1{
    float: left;
    cursor: pointer;
    width: 60px;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  .img2{
    cursor: pointer;
    width: 80px;
    margin-bottom: 55px;
  }
}
.contactBox{
  height: 400px;
  .show-area{
    height: 250px;
    margin-bottom: 20px;
    overflow: auto;
    &>ul{
      &>li{
        padding: 10px 0;
        overflow: hidden;
        &>p{
          text-align: center;
          font-size: 12px;
        }
        &>span{
          float: left;
        }
        .msgTime{
          font-size: 16px;
          line-height: 25px;
        }
        &>img{
          float: left;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .write-area{
    height: 50px;
    border: 1px solid #666;
  }
  /*webkit内核*/
  .show-area::-webkit-scrollbar {
            width: 3px;
            // height: 0px;
        }
}
.sendButton{
  float: right;
  margin-top: 2px;
}
.bubble{
  position: relative;
  min-width: 50px;
  max-width: 300px;
  padding: 7px 20px;
  border-radius: 4px;
  background-color: #f1f1f1;
}
.left:before{
  content:'';
  position:absolute;
  right:100%;
  top:10px;
  width:0;
  height:0;
  border-width:5px;
  border-style:solid;
  border-color:transparent;
  border-right-width:8px;
  border-right-color:currentColor;
  color:#f1f1f1;
}
.right:after{
  content:'';
  position:absolute;
  left:100%;
  top:10px;
  width:0;
  height:0;
  border-width:5px;
  border-style:solid;
  border-color:transparent;
  border-left-width:8px;
  border-left-color:currentColor;
  color:#f1f1f1;
}
.show-area ul li i{
  padding: 1px 3px;
  font-style: normal;
  border-radius: 4px;
  color: red;
  border:1px solid #f4f4f4;
}
.show-area ul .connect{
  text-align: center;
  padding: 1px 0;
}
.show-area ul .connect p{
  padding: 2px 0;
  margin: 0;
}      
</style>
      