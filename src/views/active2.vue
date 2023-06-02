<template>
    <div class="active">
        <el-button @click="start()" style="width:80px;height:40px;" :disabled="disabled">开始</el-button>
		<el-button @click="stop()" style="width:80px;height:40px;" :disabled="!disabled">停止</el-button>
		<span >{{ footName }}</span>
    </div>
</template>

<script>

export default{
    name: 'active2',
    // 注册你的组件
    components:{  },
    data(){
        return{
            footName:"今天吃什么？",
            disabled:false,
            timer:null,
            data : [{name:"",desc:"今天吃什么？"},{name:1,desc:"羊肉粉"},{name:2,desc:"米皮"},{name:3,desc:"炒饭"},{name:4,desc:"快餐"},{name:5,desc:"炒菜"},{name:6,desc:"酸辣粉/重庆小面"},{name:7,desc:"黄焖鸡"},{name:8,desc:"去外面吃"}]
        }
    },
    methods:{
        start(){
            this.disabled = true;
            //x上限，y下限
            var x = 1;
            var y = 8;
            var rand = parseInt(Math.random() * (x - y + 1) + y);
            this.footName=this.match(rand);
            this.timer = setTimeout(this.start(), 1000);
        },
        createsj(){
            //x上限，y下限
            var x = 1;
            var y = 8;
            var rand = parseInt(Math.random() * (x - y + 1) + y);
            return rand;
        },
        match(id){
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].name==id){
                    return this.data[i].desc;
                }
            }
        },
        stop(){
            this.disabled = false;
            clearTimeout(this.timer);
        }
    }
};
</script>

<style lang="scss" scoped>
    th {

				font-size:150px;
				font-style: normal;
				line-height: normal;
				font-weight: bold;
				font-variant: normal;
			}
			table{
				margin-top:200px;
				margin-bottom:200px;
			}
</style>