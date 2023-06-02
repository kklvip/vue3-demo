<template>
    <div id="test">
        <div class="container">
        <div class="item"><img src="../../assets/img/bb/6.jpg" alt=""></div>
        <div class="item"><img src="../../assets/img/bb/2.jpg" alt=""></div>
        <div class="item"><img src="../../assets/img/bb/3.jpg" alt=""></div>
        <div class="item"><img src="../../assets/img/bb/5.jpg" alt=""></div>
        <div class="item"><img src="../../assets/img/bb/7.jpg" alt=""></div>
    </div>
    <audio ref="audioRef"  class="audio" preload="auto">
     <source :src="url" />
    </audio>
    </div>
    
</template>

<script>
import { defineComponent, onMounted,ref} from 'vue';


export default defineComponent({
  name: 'baobei',
  // 注册你的组件
  components:{ },
  setup(){ 
    const audioRef = ref()
    let url = ref("")
    const audio = audioRef.value
    function changeDuration(){

    }
    onMounted(()=>{
        
        setTimeout(()=>{
            // url.value = "../../assets/music/王力宏 - 爱的就是你.mp3"
            url.value = "../../assets/music/王力宏 - 爱的就是你.mp3"

        },200)
        document.addEventListener('touchstart', function() {
            audio.play()
        })
    })             
    return {
        url,
        audioRef,
        changeDuration
    }
  },
  

});
</script>

<style lang="scss" scoped>
#test{
    width: 100%;
    height: 100%;
}
.container{
    width: 80%;
    height: 40%;
    margin: 100px auto 0;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    grid-template: 
    'A A B'
    'C D B'
    'C E E';
    gap: 5px;
    --r:360deg;
    animation: play 10s linear infinite;
}
.item{
    overflow: hidden;
    border: 2PX solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item img{
    --r:-360deg;
    width: 200%;
    height: 200%;
    animation: play 10s linear infinite;
    
}
.item:nth-child(1){
    grid-area: A;
}
.item:nth-child(2){
    grid-area: B;
}
.item:nth-child(3){
    grid-area: C;
}
.item:nth-child(4){
    grid-area: D;
}
.item:nth-child(5){
    grid-area: E;
}
@keyframes play{
    to{
        transform: rotate(var(--r));
    }
}
</style>