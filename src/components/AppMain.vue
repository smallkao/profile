<template>
  <main class="flex flex-col min-h-[100vh]">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>

</template>

<script lang="ts">
  export default {
    name:`AppMain`
  }
</script>

<style lang="scss" scoped>

</style>
