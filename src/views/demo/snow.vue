<template>
    <canvas></canvas>
</template>

<script>
import { onMounted } from 'vue';


export default({
  name: 'snow',
  // 注册你的组件
  components:{  },
  
  setup(){
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let num = 200;
    let snows = [];
    for(let i=0;i<num;i++){
            snows.push({
                x:Math.random()*w,
                y:Math.random()*h,
                r:Math.random()*10+1,
            })
        }
    function move(){
        for(let i=0;i<num;i++){
            let snow = snows[i]
            snow.x+=Math.random()*2+1;
            snow.y+=Math.random()*2+1;
            if(snow.x>w){
                snow.x=0
            }
            if(snow.y>h){
                snow.y=0
            }
        }
    }
    function draw(){
        context.clearRect(0,0,w,h);
        context.beginPath();
        context.fillStyle = 'rgb(255,255,255)';
        context.shadowColor = 'rgb(255,255,255)';
        context.shadowBlur = 10;

        for(let i=0;i<num;i++){
            let snow = snows[i];
            context.moveTo(snow.x,snow.y)
            context.arc(snow.x,snow.y,snow.r,0,Math.PI*2)
        }
        context.fill();
        context.closePath();
        move();
    }
    onMounted(()=>{
        draw();
        setInterval(draw,30)
    })
    return {
        draw,
        move
    }
  },
  

});
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    body{
        background-image: url("../../assets/img/snow_bg.webp");
        background-size: cover;
    }
</style>