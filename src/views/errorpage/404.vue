<template>
    <div ref="pageContent">
        <img src="../../assets/img/4044.jpg" alt="" srcset="">
    </div>
</template>

<script>
import {defineComponent, onMounted,getCurrentInstance,ref} from 'vue'
export default defineComponent({
    name: '',
    props: {
    },
    components: {

    },
    setup(){
        let winH = ref(0);
        let pcH = ref(0);
        const {ctx} = getCurrentInstance()
        onMounted(()=>{
            winH.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            pcH.value = winH.value-220;
            ctx.$refs['pageContent'].style.height = (pcH.value)+'px';
        })

        return {

        }
    },
})
</script>

<style scoped lang='scss'>
div{
    width: 100%;
    height: 100%;
    background-size:cover;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>