<template>
    <div class="app-container calendar-list-container">
      <h1>{{movieId?'视频编辑':'视频添加'}}</h1>
      <h2>{{}}</h2>
      <div class="panelBody" >
        <el-form class="dataForm" style="width:780px;margin:0 auto" label-position="right" label-width="100px" ref="dataForm" :model="temp" :rules="rules">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="temp.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="分类:" prop="cid">
            <el-select v-model="temp.cid" placeholder="请选择分类" class="select">
              <el-option class="option" v-for="item in typeList" :label="item.tag" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片:" :rules="{required:true,message:'请上传图片',trigger:'change'}">
            <UploadFile paramType="5" fileType="image" @success="handleImgSuccess" :path="temp.pic"></UploadFile>
          </el-form-item>
          <el-form-item label="摘要:" prop="summary">
            <el-input v-model="temp.summary" placeholder="请输入摘要"></el-input>
          </el-form-item>
          <el-form-item label="视频内容:" :rules="{required:true,message:'请上传视频',trigger:'change'}">
            <UploadFile paramType="6" accept="audio/mp4, video/mp4"  fileType="video" @success="handleImgSuccess2" :path="temp.url"></UploadFile>
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
                  ref="editorRuleRef"
                  :mode="mode"
                  :rules="rules"
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
    import {onMounted,reactive,ref,shallowRef,onBeforeUnmount, nextTick} from 'vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { rules } from "@/utils/validate"
    import UploadFile from '@/components/UploadFile/test1'
    import {imgHost} from "@/utils/config"
    import {save,getById,movieClassityList } from "@/api/movie"
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    export default{
      name:'movieEdit',
      components: { UploadFile,Editor,Toolbar },
      setup(){
        const router = useRouter()
        const store = useStore()
        let movieId = ref()

        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()
        const editorRuleRef = ref()
        
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
            if(store.state.movieId){
                movieId.value = store.state.movieId
            }else{
                movieId.value = ""
            }
            if(movieId.value){
                getInfo()
            }
            getTypelist()
            nextTick(()=>{
              
            })
            
        })

        function  getInfo(){
            getById(movieId.value).then(res=>{
                if(res.data.code=="200"){
                    temp.value =res.data.data
                }else{
                    ElMessage({message: res.data.msg,type: 'danger'})
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        function getTypelist(){
            movieClassityList().then(res=>{
              if(res.data.code=="200"){
                typeList.length = 0;
                typeList.push(...res.data.data)
              }else{
                ElMessage({message: res.data.msg,type: 'success'})
              }
            }).catch(error=>{
              console.log(error)
            })
        }
        function saveData(){          
            dataForm.value.validate().then(()=>{
              save(temp.value).then(res=>{
                if(res.data.code=="200"){
                  if(movieId.value){
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
          if(movieId.value==""){
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
                  router.push("/movie/list")
                })
                .catch(() => {
                })
            }
          }
          
        }
        function handleImgSuccess(val){
          temp.value.pic = val.data
        }

        function handleImgSuccess2(val){
          temp.value.url = val.data.url
        }

        const handleCreated = (editor) => {
          editorRef.value = editor // 记录 editor 实例，重要！
          if(editor==null) return          
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
            movieId,
            temp,
            imgHost,
            typeList,
            rules,
            getInfo,
            dataForm,
            saveData,
            handleImgSuccess,
            handleImgSuccess2,
            handleCreated,
            editorRef,
            editorRuleRef,
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
  