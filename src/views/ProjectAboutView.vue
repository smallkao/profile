<script setup lang="ts">
  import { ProjectOverview} from "@/interfaces/project";
  import httpRequest from "@/services/axios";
  const loading=ref(false);
  const ususalLink={
    projectList:"/static/projectList.json"
  }
  const router = useRouter()
  const route = useRoute();
  const activeProject=ref<ProjectOverview | null>(null);
  const activeProjectId=route.params.id;
  const getProjectList=async ()=>{
    const response=await httpRequest.get({url:ususalLink.projectList})
    activeProject.value= response.data.list.find((row:ProjectOverview)=>row.id.toString()==activeProjectId)
    console.log(activeProject.value)
  }
  const backPage=()=>{
    router.push({ name: 'home'})
  }
  onMounted(async ()=>{
    await getProjectList()
  })
</script>
<template>
  <section class="w-full flex flex-col p-2 gap-6  items-start
    py-[3em] min-h-[100vh]  relative text-[#333]" 
    v-if="activeProject"  
    v-loading="loading" element-loading-text="服務讀取中，請稍候。">
    <div class="absolute inset-0 bg-repeat bg-center opacity-50  "
      :style="'background-image: url(/img/bg-twbasin.png)'">
    </div>
    <div class="relative flex flex-col  gap-6 items-start min-h-[20vh] w-full max-w-[1280px] p-2 mx-auto overflow-x-hidden">
      <el-button type="primary" class="relative z-[10]" @click="backPage()">返回上一頁</el-button>
      <div class="flex gap-2 items-center ">
        <h2 class="w-auto border-b-[.5rem]  text-[#8cbabd] border-[#8cbabd] font-extrabold text-[1.5rem] bold">{{activeProject.title}}</h2>
      </div>
      <span class="min-h-[30vh] bg-[#fff] border border-[#8cbabd] rounded p-2 w-full text-[1.25rem]">
        <p>系統介紹:</p>
        <p class="px-2">{{activeProject.description}}</p>
      </span>
      <div class="w-full min-h-[20vh]  flex  gap-2 items-start   p-2 ">
        <div class=" flex flex-col  gap-2 items-start max-w-[20%]">
          <div class="flex flex-wrap  gap-2 border border-2 bg-[#fcfcfc] border-[#8cbabd] rounded p-2">
            <span>專案性質:</span>
            <div class="flex flex-wrap gap-2 ">
              <template :key="i" v-for="tag,i in activeProject.nature">
                <el-tag type="warning" effect="dark">{{tag}}</el-tag>
              </template>
            </div>
          </div>
          <div class="flex flex-wrap   gap-2 border border-2 bg-[#fcfcfc] border-[#8cbabd] rounded p-2">
            <span>負責範圍:</span>
            <div class="flex gap-2 flex-wrap">
              <template :key="i" v-for="tag,i in activeProject.techNature">
                <el-tag type="warning" effect="dark">{{tag}}</el-tag>
              </template>
            </div>
          </div>

        </div>
        <span class="w-full min-h-[20vh] bg-[#fff] border-2 border-[#8cbabd] rounded p-2">歷程:</span>
      </div>
      
    </div>
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
