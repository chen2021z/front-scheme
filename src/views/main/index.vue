<template>
  <div class="h-full overflow-x-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation-vue></navigation-vue>

    <div class="max-w-screen-xl mx-auto relative xl:mt-1">
      <list-vue></list-vue>
    </div>
  </div>
</template>


<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>
