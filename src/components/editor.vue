
<template>
    <QuillEditor ref="editorRuleRef" />
</template>
<script>
import{ ref } from 'vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    export default {
        name:'editor',
        components: {
            QuillEditor
        },
        props:['rules'],
        setup(){
            const editorRuleRef = ref()
            //子组件校验，传递到父组件
            function validateForm(){
                let flag = null
                editorRuleRef.value.validate().then((valid)=>{
                    if (valid) {
                        flag = true
                    } else {
                        flag = false
                    }
                })
                return flag
            }
            return{
                editorRuleRef,
                validateForm
            } 
        }
    }
</script>


