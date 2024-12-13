<script setup lang="ts">
  import { ProjectOverview} from "@/interfaces/project";
  const loading=ref(false);
  const projectList:ProjectOverview[]=[
   
  ];
  console.log(projectList)
</script>

<template>
  <section class="w-full flex flex-col p-2 gap-4 items-start" v-loading="loading" element-loading-text="服務讀取中，請稍候。">
    
  </section>
</template>
