<template>
  <div class="h-full bg-white dark:bg-zinc-800 duration-500">
    <navigation-vue></navigation-vue>

    <div class="max-w-screen-xl mx-auto relative xl:mt-3">
      <list-vue></list-vue>
    </div>
  </div>
</template>


<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>
