<template>
    <div class="app-container calendar-list-container">
      <h1>{{noteId?'Note编辑':'Note添加'}}</h1>
      <h2>{{}}</h2>
      <div class="panelBody" >
        <el-form class="dataForm" style="width:780px;margin:0 auto" label-position="right" label-width="60px" ref="dataForm" :model="temp">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="temp.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="分类:" prop="classityId">
            <el-select v-model="temp.classityId" placeholder="请选择分类" class="select">
              <el-option class="option" v-for="item in typeList" :label="item.tag" :key="item.classityId" :value="item.classityId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片:" :rules="{required:true,message:'请上传图片',trigger:'change'}">
            <UploadFile paramType="2" @success="handleImgSuccess" :path="temp.pic"></UploadFile>
          </el-form-item>
          <el-form-item label="摘要:" prop="summary">
            <el-input v-model="temp.summary" placeholder="请输入摘要"></el-input>
          </el-form-item>
  
          <el-form-item label="内容:" prop="content">
            <template #default>
              <div style="border: 1px solid #ccc;border-radius: 2px;">
                <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
                <Editor
                  style="height: 350px; overflow-y: hidden;"
                  v-model="temp.content"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"
                />
              </div>
              
            </template>
          </el-form-item>
          <div class="text-center">
            <el-button type="warning" @click="close()" >取消</el-button>
            <el-button type="primary" @click="saveData()" >确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
    import {onMounted,reactive,ref,shallowRef,onBeforeUnmount} from 'vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import UploadFile from '@/components/UploadFile/test1'
    import {imgHost} from "@/utils/config"
    import {save,getNoteById,getNoteClassity } from "@/api/note"
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    export default{
      name:'noteEdit',
      components: { UploadFile,Editor,Toolbar },
      setup(){
        const router = useRouter()
        const store = useStore()
        let noteId = ref()

        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        // 内容 HTML
        let valueHtml = ref('')
        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }
        const dataForm = ref();
        let temp = ref({})
        let typeList = reactive([]);

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })
        onMounted(()=>{
            if(store.state.noteId){
                noteId.value = store.state.noteId
            }else{
                noteId.value = ""
            }
            if(noteId.value){
                getInfo()
            }
            getTypelist()
        })

        function  getInfo(){
            getNoteById(noteId.value).then(res=>{
                if(res.data.code=="200"){
                    temp.value =res.data.data
                }else{
                    ElMessage({message: '修改成功',type: 'danger'})
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        function getTypelist(){
            getNoteClassity().then(res=>{
              if(res.data.code=="200"){
                typeList.length = 0;
                typeList.push(...res.data.data)
              }else{
                ElMessage({message: '修改成功',type: 'success'})
              }
            }).catch(error=>{
              console.log(error)
            })
        }
        function saveData(){
            dataForm.value.validate().then(()=>{
              save(temp.value).then(res=>{
                if(res.data.code=="200"){
                  if(noteId.value){
                    ElMessage({message: '更新成功',type: 'success'})
                  }else{
                    ElMessage({message: '添加成功',type: 'success'})
                  }
                    router.go(-1)
                }else{
                    ElMessage({message: res.data.msg,type: 'success'})
                }
              }).catch(error=>{
                console.log(error)
              })
            
          })
        }
        function close(){
          if(noteId.value==""){
            if(temp.value.title!="" ||temp.value.content!=""){
              ElMessageBox.confirm(
                '有信息已经填写，确认要取消吗?',
                'Warning',
                {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                }
              )
                .then(() => {
                  router.push("/note/list")
                })
                .catch(() => {
                })
            }
          }
          
        }
        function handleImgSuccess(val){
          temp.value.pic = val.data
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
            noteId,
            temp,
            imgHost,
            typeList,
            getInfo,
            dataForm,
            saveData,
            handleImgSuccess,
            handleCreated,
            editorRef,
            valueHtml,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            printHtml,
            disable,
            insertText,
            customPaste,
            handleChange,
            handleDestroyed,
            handleFocus,
            handleBlur,
            customAlert,
            close
        }
      }
    }
  </script>
  
  <style scoped="scoped">
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
  