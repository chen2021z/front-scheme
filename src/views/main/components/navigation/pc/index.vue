<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
    <ul
      class="w-[910px] m-auto relative flex flex-wrap content-start px-[10px] py-1 text-base duration-300 overflow-hidden"
      :class="[isOpenCategory ? 'h-[230px]' : 'h-[70px]']"
    >
      <!-- 右边箭头 -->
      <div
        class="absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <!-- item -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-1 z-10 ml-[14px] duration-200 mt-1 font-bold rounded cursor-pointer text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        :class="[
          index === currentCategoryIndex
            ? 'bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300'
            : ''
        ]"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * 展开状态切换
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}

/**
 * 选中状态处理
 */
const currentCategoryIndex = ref(0)
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>

<style lang="scss" scoped></style>
