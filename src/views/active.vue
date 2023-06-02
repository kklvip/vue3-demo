<template>
  <div class="app-container active">
    <div class="title">
      <span>今天吃：{{ footName }}</span>
    </div>
    <div class="footer">
      <el-button @click="start()" type="primary" :disabled="disabled"
        >开始</el-button
      >
      <el-button @click="stop()" type="warning" :disabled="!disabled"
        >停止</el-button
      >
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";

export default defineComponent({
  name: "active",
  setup() {
    let data = reactive([
      { name: "", desc: "今天吃什么？" },
      { name: 1, desc: "羊肉粉" },
      { name: 2, desc: "米皮" },
      { name: 3, desc: "炒饭" },
      { name: 4, desc: "快餐" },
      { name: 5, desc: "炒菜" },
      { name: 6, desc: "酸辣粉/重庆小面" },
      { name: 7, desc: "黄焖鸡" },
      { name: 8, desc: "去外面吃" },
    ]);
    let footName = ref("");
    let disabled = ref(false);
    let status = ref(true);
    function start() {
      if (!status.value) {
        return;
      }
      status.value = true;
      disabled.value = true;
      var a = createsj();
      footName.value = match(a);
      setTimeout(() => {
        //需要定时执行的代码
        start();
      }, 75);
    }

    function createsj() {
      //x上限，y下限
      var x = 1;
      var y = 8;
      var rand = parseInt(Math.random() * (x - y + 1) + y);
      return rand;
    }
    function match(id) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == id) {
          return data[i].desc;
        }
      }
    }
    function stop() {
      disabled.value = false;
      status.value = false;
      setTimeout(() => {
        status.value = true;
      }, 1000);
      // setTimeout(2);
    }
    onMounted(() => {});
    return {
      start,
      stop,
      data,
      footName,
      createsj,
      match,
      status,
      disabled,
    };
  },
});
</script>

<style scoped>
.active {
  padding: 100px 20px;
  text-align: center;
}
.title {
  position: fixed;
  top: 200px;
  width: 100%;
}
.footer {
  position: fixed;
  bottom: 200px;
  width: 100%;
}
</style>