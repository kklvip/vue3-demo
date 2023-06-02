<template>
    <div class="container">
        <div class="title">
            <h1>{{ softdata.title }}</h1>
        </div>
        <div class="info">
            <span><h3>作者：</h3>管理员</span><span><h3>下载量：</h3>{{ softdata.counts }}</span><span><h3>更新时间：</h3>{{ softdata.createTime }}</span><span><h3>文件大小：</h3>{{ match(softdata.fileSize) }}</span>
            <span ><img src="../assets/img/downland.png" alt="" title="点击下载该文件" @click="downSoftware()"></span>
        </div>
        <div class="info">
            <span><h3>摘要：</h3>{{ softdata.summary}}</span>
            
        </div>
        <div class="content">
            <img :src="imgHost+softdata.pic" />
            <div v-html="softdata.content"> </div>
        </div>
        <el-dialog v-model="dialogVisible" title="" width="350px" center>
            <span >数据错误，{{ ii }}s后自动跳转到软件列表界面</span>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent,ref,onMounted } from 'vue'
import { getSoftById } from "@/api/soft"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { imgHost } from "@/utils/config"
export default defineComponent({
    name: 'softDetail',
    props: {
    },
    components: {

    },
    setup(){
        let softdata = ref({})
        const router = useRouter()
        let dialogVisible = ref(false)
        let ii = ref(3)
        onMounted(()=>{
            getInfo()
        })
        function getInfo(){
            if(sessionStorage.getItem("softId")){
                getSoftById(sessionStorage.getItem("softId")).then(res=>{
                    if(res.data.code=="200"){
                        softdata.value = res.data.data
                    }else{
                        ElMessage({message:res.data.msg,type:"warning"})
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }else{
                dialogVisible.value = true;
                var timer = setInterval(function(){
                    ii.value--;
                    if(ii.value ==0){
                        dialogVisible.value=false
                        clearInterval(timer);
                        setTimeout(function(){
                            router.push("/soft")
                        },500)
                    }
                },1000)
                
                
            }
        }
        function downSoftware(){
            $.ajax({
                type: 'get',
                cache: false,//true的话会读缓存,第二次的时候得到的是上次访问的结果，而不是重新到服务器获取。false的话会在url后面加一个时间缀，让它跑到服务器获取结果。cache只有GET方式的时候有效。
                url: imgHost+softdata.value.url, //url地址
                dataType: "jsonp", //跨域采用jsonp方式
                processData: false,//processData 默认为true，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data，false会序列化。
                timeout:0,//设置超时 ‘0’：为永不超时，当请求超时后会进入error，可以在error中做超时的处理。
                complete: function (data) {
                    //data.status 请求url地址的状态码，以此来判断url是否有效可以访问。
                    if (data.status==200) {  
                        window.open(imgHost+softdata.value.url, '_self');          
                    } else {
                        router.push("/404")
                    }
                },
                error:function (){
                }
            });
        }
        function match(val){
            if(!val)return;
            if(val/1024/1024/1024>1){
                return (val/1024/1024/1024).toFixed(2) +" GB"
            }else if(val/1024/1024>1){
                return (val/1024/1024).toFixed(2) +" MB"
            }else if(val/1024>1){
                return (val/1024).toFixed(2) +" KB"
            }else{
                console.log(val)
                return val.toFixed(2)+" byte"
            }
        }

        return {
            softdata,
            getInfo,
            imgHost,
            downSoftware,
            dialogVisible,
            match
        }
    },
})
</script>

<style scoped lang='scss'>
    .container{
        width: 1200px;
        margin: 20px auto;
    }
    .title{
        width: 100%;
        text-align: center;
        height: 30px;
        margin: 80px auto 50px;
    }
    .info{
        width: 100%;
        height: 30px;
        line-height: 30px;
        >span{
            float: left;
            margin-right: 50px;
            >img{
                width: 30px;
                height: 30px;
            }
            >img:hover{
                cursor: pointer;
            }
            &>h3{
                float: left;
            }
        }
    }
    .content{
        margin-top: 50px;
        min-height: 500px;
        &>img{
            float: left;
            margin: 0 20px 20px 0;
        }
        &>div{
            float: left;
            text-indent: 2em;
        }
    }
</style>