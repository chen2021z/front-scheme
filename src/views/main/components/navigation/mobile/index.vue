<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <li v-for="item in data" :key="item.id" class="shrink-0 px-1.5 py-0.5 duration-200">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  data:{
    type: Array,
    required: true
  }
})
</script>
