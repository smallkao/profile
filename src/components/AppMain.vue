<template>
  <main class="min-h-screen">
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
