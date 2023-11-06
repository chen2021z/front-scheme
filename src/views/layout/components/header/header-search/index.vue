<template>
  <div class="w-full">
    <m-search ref="search" v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示列表 -->
          <hint-vue
            v-show="inputValue"
            :search-text="inputValue"
            @item-click="onSearchHandler"
          ></hint-vue>
          <!-- 历史记录 -->
          <history-vue v-show="!inputValue" @item-click="onSearchHandler">
          </history-vue>
          <!-- 推荐主题 -->
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import store from '@/store'
import themeVue from './theme.vue'
const search = ref(null)

const inputValue = ref('')
/**
 * 搜索回调
 */
const onSearchHandler = (text) => {
  // 关闭搜索框
  search.value.isFocus = false
  if (text) {
    inputValue.value = text
    // 添加历史数据
    store.commit('search/addHistory', text)
    // 更新搜索关键词
    store.commit('app/changeSearchText', text)
  }
}
</script>

<style lang="scss" scoped></style>
