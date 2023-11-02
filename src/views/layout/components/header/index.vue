<template>
  <div class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1">
    <div class="flex items-center">
      <img
        src="@/assets/vue.svg"
        class="h-4 cursor-pointer mr-2"
        @click="onToHome"
      />
      <header-search-vue></header-search-vue>
      <header-theme-vue></header-theme-vue>
      <header-my-vue></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import headerMyVue from './header-my.vue'
import headerThemeVue from './header-theme.vue'
import headerSearchVue from './header-search/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
