<template>
    <div class="videoBox" ref="videoBox" :style="{ 'padding-top': topValue  }">
        <videoPlay v-bind="options" :poster="imgHost+video_data.pic"/>
        <div class="videoBox-right" :style="{'top':topValue}">
            <h2>{{ video_data.title }}</h2>
            <div>
                <span class="classity"><el-tag>{{ video_data.tag }}</el-tag></span>
                <span>浏览次数：{{ video_data.views }}</span>
                <span>{{ video_data.ctime }}</span>
            </div>
            <div><p>简介：{{ video_data.summary }}</p></div>
            <div><p v-html="video_data.content"></p></div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import videoPlay from "vue3-video-play"

import {imgHost} from "@/utils/config"
export default defineComponent({
    name: 'videoPlayComponent',
    props:['video_data'],
    components: {
        videoPlay
    },
    
    setup(props){
        const videourl =imgHost+ props.video_data.url;
        const pcH = ref(0);
        const winH = ref(0);
        const topValue = ref(0)
        const videoBox = ref();
        const options = ref({
            width: '1200px', //播放器高度
            height: '750px', //播放器高度
            color: "#409eff", //主题色
            title: '', //视频名称
            src: videourl, //视频源
            muted: false, //静音
            webFullScreen: false,
            speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
            autoPlay: false, //自动播放
            loop: false, //循环播放
            mirror: false, //镜像画面
            ligthOff: false,  //关灯模式
            volume: 0.3, //默认音量大小
            control: true, //是否显示控制器
        })
        // const t1 = reactive(props.video_data);
        // watch(t1,(newValue,oldValue)=>{
        //     options.value.src = newValue.url
        //     console.log(newValue)
        //     console.log(oldValue)
        // })
        onMounted(()=>{
            winH.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            pcH.value = winH.value-970;
            if(pcH.value>=0){
                videoBox.value.style.height = winH.value-220+'px';
            }else{
                videoBox.value.style.height = 'auto';
            }
            topValue.value = ((winH.value-220)/2)-375+"px"
        })
        return {
            pcH,
            winH,
            imgHost,
            options,
            videourl,
            topValue,
            videoBox
        }
    },
})
</script>

<style scoped lang="scss">
    .videoBox{
        position: relative;
        margin: 0 auto;
        width: 1200px;
        height: 750px;

    }
    .videoBox-right{
        position: absolute;
        width: 280px;
        height: 730px;
        right: -302px;
        padding: 10px;
        >h2{
            margin-bottom: 20px; 
        }
        >div{
            overflow: hidden;
            margin-bottom: 20px;
            .classity{
                cursor: pointer;
            }
            >span{
                margin-left: -10px;
                float: left;
                padding: 0 10px;
            }
        }
    }
</style>