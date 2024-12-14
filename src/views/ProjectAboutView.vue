<script setup lang="ts">

  const loading=ref(false);
  onMounted(async ()=>{

  })
</script>
<template>
  <section class="w-full flex  p-2 gap-6 items-center" v-loading="loading" element-loading-text="服務讀取中，請稍候。">
    <aside class="rounded border bg-[#efefef]">
      <span>使用技術</span>
    </aside>
    <article class="flex border ">
      <h1>專案內容介紹</h1>
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
