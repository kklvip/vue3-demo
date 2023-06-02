<template>
  <div></div>
    <div class="container">
        <div class="page">
            <div class="c_head">
              <div>
                <h1>{{noteData.title}}</h1>
              </div>
              <div>
                <span>作者：{{noteData.authorName?noteData.authorName:'平台'}}</span><span>时间：{{noteData.createTime}}</span><span>浏览量：{{noteData.views}}</span>
              </div>
            </div>
            <div class="c_content" v-html="noteData.content"></div>
        </div>
    </div>
</template>
<script>
    import {getNoteById,updateViews } from "@/api/note"
    import {onMounted,ref} from 'vue'
    import { useStore } from 'vuex'
    import { ElMessage } from 'element-plus'
    export default{
        name:'noteDetail', 
        setup(){
          const store = useStore()
          let noteData = ref({})
          let noteId = ref(sessionStorage.getItem("noteId"))
          function getInfo(){
            if(noteId.value){
              getNoteById(noteId.value).then(res=>{
              if(res.data.code=="200"){
                  noteData.value = res.data.data;
              }
              }).catch(error=>{
                console.log(error)
              })
            }else{
              ElMessage({message:"数据错误，请稍后再试",type:"warning"})
            }
          }
          onMounted(()=>{
              getInfo()
              setTimeout(()=>{
                updateViews(noteId.value)
              })
          })
          return{
              noteData,
              getInfo,
              store,
              noteId
          }
      }
    }
</script>
    <style lang="scss" scoped>
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
    </style>
    