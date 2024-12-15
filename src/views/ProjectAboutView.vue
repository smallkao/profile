<script setup lang="ts">
  const router = useRouter()
  const loading=ref(false);
  const backPage=()=>{
    router.push({ name: 'home'})
  }
  onMounted(async ()=>{

  })
</script>
<template>
  <section class="w-full flex flex-col p-2 gap-6 max-w-[1280px] items-start
    mx-auto my-[6em]  "
    v-loading="loading" element-loading-text="服務讀取中，請稍候。">
    <el-button type="success" plain @click="backPage()">返回上一頁</el-button>
    <article class="p-2 flex flex-col justify-content-start  items-start border rounded">
      <p class="w-auto border-b-[.5rem] text-[1.5rem] bold">專案名稱</p>
      <p class="min-h-[30vh] bg-[#fff] border-t border-[#eee] px-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero earum tempora sed ea magnam ipsam sit vel et nemo repudiandae porro animi illo tenetur consequuntur, iure voluptatum fugit eveniet unde!</p>
      <span>負責部分</span>
    </article>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
