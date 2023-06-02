<template>
    <videos :video_data="data" v-if="data.url"/>
</template>

<script>
    import {defineComponent,onMounted,ref} from 'vue'
    import videos from "@/components/video/index.vue"
    import { getById,updateViews } from "@/api/movie"
    export default defineComponent({
        name: 'movieDetail',
        props: {
            // videoPlay
        },
        components: {
            videos
        },
        setup(){
            const status = ref()
            let data = ref({});
            let movieId = ref(sessionStorage.getItem("movieId"))
            function getInfo(){
                getById(movieId.value).then(res=>{
                    if(res.data.code=="200"){
                        data.value = res.data.data
                    }else{
                        console.log("")
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            onMounted(()=>{
                getInfo()
                setTimeout(()=>{
                    updateViews(movieId.value)
                },2000)
            })
            return {
                data,
                status,
                movieId,
                getInfo
            }
        },
    })
</script>

<style scoped lang='scss'>

</style>