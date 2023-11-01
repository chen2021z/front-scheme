<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="w-4 h-4 cursor-pointer duration-200 outline-none hover:bg-zinc-100/60 px-1"
        fillClass="bg-zinc-100/60"
      ></m-svg-icon>
    </template>
    <template #default>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
          v-for="item in themeArr" :key="item.id"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900"
          ></m-svg-icon>
          <span class="text-zinc-900 text-sm">{{ item.name }}</span>
        </div>
      </div>
    </template>
  </m-popover>
  <div>theme</div>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
const themeArr = [
  { id: '0', type: THEME_DARK, icon: 'theme-light', name: '极简白' },
  { id: '1', type: THEME_LIGHT, icon: 'theme-dark', name: '极夜黑' },
  { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]
</script>

<style lang="scss" scoped></style>
