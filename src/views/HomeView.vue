<script setup lang="ts">
  const baseUrl: string = import.meta.env.VITE_BASE_URL;
  console.log(baseUrl)
  const router = useRouter()
  import type { ProjectOverview} from "@/interfaces/project";
  import httpRequest from "@/services/axios";
  const loading=ref(false);
  const ususalLink={
    projectList:`${baseUrl}/static/projectList.json`
  }
  const projectList=ref<ProjectOverview[]>([]);
  const frameWorkList=ref<ProjectOverview[]>([]);

  console.log(projectList)
  const changePage=(projectId:number)=>{
    router.push({ name: 'ProjectAbout', params: { id: projectId } })
  }
  onMounted(async ()=>{
    const response=await httpRequest.get({url:ususalLink.projectList})
    response.data.list.forEach((row:ProjectOverview) => {
      projectList.value.push(row)
    });
    response.data.framework.forEach((row:ProjectOverview) => {
      frameWorkList.value.push(row)
    });
    console.log(projectList)
  })
</script>

<template>
  <section class="w-full flex flex-col p-2 gap-6 items-center" v-loading="loading" element-loading-text="服務讀取中，請稍候。">
    <p class="w-auto flex text-tenter justify-center text-[1.5rem] bold border-b-[.3rem] border-sky-200 tracking-wider">作品集</p>
    <Transition enter-active-class="animate__animated animate__fadeInUp animate__fast">

      <article v-if="projectList.length>0" class="w-full max-w-[1280px] grid grid-cols-3 sm:grid-cols-1 gap-2">

        <div v-for="item in projectList" class="card relative flex flex-col border rounded cusuor-poniter cursor-pointer hover:shadow-lg gap-2 sm:w-full" :key="'prj_'+item.id" >
          <el-image
            style="width: 100%; height: auto"
            :src="item.images"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="item.previewList"
            :initial-index="item.previewList?.length"
            fit="cover"
          />
          <div class="title  text-[1rem] bold">{{item.title}}</div>
          <div class="w-full border-y flex flex-wrap gap-2 py-2">
            <template :key="i" v-for="tag,i in item.technologies">
              <el-tag>{{tag}}</el-tag>
            </template>
          </div>
          <el-button class="relative ml-auto bottom-0  text-[1rem] bold" @click="changePage(item.id)">...more</el-button>
        </div>

      </article>
    </Transition>
    <p class="w-auto flex text-tenter justify-center text-[1.5rem] bold border-b-[.3rem] border-sky-200 tracking-wider">應用開發框架</p>
    <article class="w-full max-w-[1280px] grid grid-cols-3 gap-4 sm:grid-cols-1">
      <div v-for="item in frameWorkList" :key="'frameWork_'+item.id" class="card  flex flex-col border rounded cusuor-poniter cursor-pointer hover:shadow-lg">
        <el-image
          style="width: 100%; height: auto"
          :src="item.images"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :initial-index="4"
          fit="cover"
        />
        <div class="title border-b">{{item.title}}</div>
        <div class="w-full flex flex-wrap gap-2 py-2">
          <template :key="i" v-for="(tag,i) in item.technologies">
            <el-tag>{{tag}}</el-tag>
          </template>
        </div>
      </div>

    </article>
  </section>
</template>

<style lang="scss" scoped>


</style>
