<template>
    <div style="padding:150px 500px">
        <el-tree ref="treeRef" :data="data" show-checkbox default-expand-all node-key="id" highlight-current :props="props" />
    </div>
</template>

<script>
import { reactive,onMounted} from 'vue';
import { menusListAll } from "@/api/menus"

export default {
  name: 'menulistall', 
  // 注册你的组件
  components:{  },  
  setup(){
    let data = reactive([]); 
    const props = {
        value: 'id',
        label: 'name',
        children: 'children'
    };                     // 父组件数据
    function getList(){
        menusListAll().then((res)=>{
            if(res.data.code=="200"){
                data.length = 0;
                data.push(...res.data.data)
            }
        })
    }
    onMounted(()=>{
        getList()
    });
    return {
        data,
        props,
        getList
    }
  }
  
};
</script>

<style lang="scss" scoped>

</style>