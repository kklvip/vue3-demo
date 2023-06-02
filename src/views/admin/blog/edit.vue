<template>
  <div class="app-container calendar-list-container">
    <h1>{{blogId?'博客编辑':'博客添加'}}</h1>
    <div class="panelBody" >
      <!-- <el-form :model="blogData" label-width="120px">
        <div class="text-center">
          <el-button type="warning" @click="close()" >取消</el-button>
          <el-button type="primary" @click="saveData()" >确定</el-button>
        </div>
      </el-form> -->
      <el-form ref="formRef" :model="blogData" label-width="120px" class="demo-ruleForm" style="width:880px;margin:0 auto" status-icon>
        <el-form-item label="标题" prop="title" :rules="{required:true,message:'请输入标题',trigger:'change'}">
          <el-input v-model="blogData.title" />
        </el-form-item>
        <el-form-item label="分类" prop="classityId" :rules="{required:true,message:'请选择分类',trigger:'change'}">
          <el-select v-model="blogData.classityId" placeholder="请选择分类" class="select">
              <el-option class="option" v-for="item in typeList" :label="item.tag" :key="item.classityId" :value="item.classityId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="摘要" prop="summary" >
          <el-input v-model="blogData.summary" />
        </el-form-item>
        <el-form-item label="图片" prop="url" :rules="{required:true,message:'请上传图片',trigger:'change'}">
          <UploadFile paramType="1" @success="handleImgSuccess" :path="blogData.url"></UploadFile> 
        </el-form-item>
        <el-form-item label="内容:" prop="content" :rules="{required:true,message:'请输入内容',trigger:'change'}">
          <template #default>
            <div style="border: 1px solid #ccc;border-radius: 2px;">
              <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="[]"
              :mode="mode"
            />
              <Editor
                style="height: 350px; overflow-y: hidden;"
                v-model="blogData.content"
                :defaultConfig="[]"
                :mode="mode"
                @onCreated="handleCreated"
              />
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确定</el-button>
          <el-button @click="resetForm(blogData)">返回</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import {reactive,onMounted,ref,onBeforeUnmount,shallowRef} from 'vue'
import { getBlogById,getBlogClassity,save } from "@/api/blog"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UploadFile from '@/components/UploadFile/test1'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
export default {
  name:'blogEdit',
  components: { UploadFile,Editor,Toolbar },
  setup(){
    const router = useRouter()
    const store = useStore()
    const formSize = ref('default')
    let typeList = reactive([])
    const formRef = ref()
    let blogData = ref({
    })
    const blogId = ref(0)
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    function getInfo(){
      if(blogId.value){
        getBlogById(blogId.value).then(res=>{
          if(res.data.code=="200"){
            blogData.value = res.data.data;
          }
        })
      }
    }
    function handleImgSuccess(res){
      console.log(res.data)
      blogData.value.url = res.data
    }
    function close(){
      router.push("/blog/list")
    }
    function getTypeList(){
      getBlogClassity().then(res=>{
        if(res.data.code=="200"){
          typeList.length = 0;
          typeList.push(...res.data.data)
          console.log(typeList)
        }else{
          ElMessage({message: res.data.msg,type: 'warning'})
        }
      })
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    onMounted(()=>{
      blogId.value = store.state.blogId;
      console.log("store.state.blogId",store.state.blogId)
      getTypeList()
      getInfo()

    })
    function submitForm(){

      formRef.value.validate().then(()=>{
        if(!blogData.value.url){
          ElMessage({message: '博客图片还没有上传',type: 'warning'})
          return
        }
        save(blogData.value).then((res)=>{
          if(res.data.code=="200"){
            ElMessage({message: res.data.msg,type: 'success'})
            setTimeout(()=>{
              router.go(-1)
            },2000)
          }
        })
      })
    }
    const handleCreated = (editor) => {
          editorRef.value = editor // 记录 editor 实例，重要！
        }
        const handleChange = (editor) => {
        console.log('change:', editor.getHtml());
      };
      const handleDestroyed = (editor) => {
        console.log('destroyed', editor);
      };
      const handleFocus = (editor) => {
        console.log('focus', editor);
      };
      const handleBlur = (editor) => {
        console.log('blur', editor);
      };
      const customAlert = (info, type) => {
        alert(`【自定义提示】${type} - ${info}`);
      };
      const customPaste = (editor, event, callback) => {
        console.log('ClipboardEvent 粘贴事件对象', event);
  
        // 自定义插入内容
        editor.insertText('xxx');
  
        // 返回值（注意，vue 事件的返回值，不能用 return）
        callback(false); // 返回 false ，阻止默认粘贴行为
        // callback(true) // 返回 true ，继续默认的粘贴行为
      };
  
      const insertText = () => {
        const editor = editorRef.value;
        if (editor == null) return;
  
        editor.insertText('hello world');
      };
  
      const printHtml = () => {
        const editor = editorRef.value;
        if (editor == null) return;
        console.log(editor.getHtml());
      };
  
      const disable = () => {
        const editor = editorRef.value;
        if (editor == null) return;
        editor.disable()
      };
    return{
      blogData,
      blogId,
      formSize,
      getInfo,
      handleImgSuccess,
      close,
      getTypeList,
      submitForm,
      disable,
      printHtml,
      insertText,
      customPaste,
      customAlert,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      editorRef,
      typeList,
      formRef,
      mode: 'default', // 或 'simple'
    }
  }
}
</script>
<style scoped>
  .panelBody{
    padding:40px 15px;
    border-width: 1px 0 0 0;
  }
  .dataForm{
    overflow: hidden;
  }
  .select{

  }
  .option{

  }
</style>