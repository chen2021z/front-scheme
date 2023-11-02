<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="w-4 h-4 cursor-pointer duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900 px-1"
        fillClass="bg-zinc-100/60 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <!-- 弹出层内容：主题选择 -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'
const themeArr = [
  { id: '0', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '1', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]
/**
 * 1. 监听主题切换行为
 * 2. 根据用户点击选择，将主题项保存到 vuex 中
 * 3. 根据 vuex 中保存的主题，在 header-theme 下显示对应的主题图标
 * 4. 修改 html 的 class
 */

const store = useStore()
// menu切换
const onItemClick = (item) => {
  store.commit('theme/changeThemeType', item.type)
}
// vuex 下的 themeType 切换，引发更新 svgIconName 视图更新
const svgIconName = computed(() => {
  const findTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  )
  return findTheme?.icon
})
</script>

<style lang="scss" scoped></style>
