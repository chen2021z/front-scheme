<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
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
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import store from '../../../../../store'

const inputValue = ref('')
/**
 * 搜索回调
 */
const onSearchHandler = (text) => {
  inputValue.value = text
  if (text) {
    store.commit('search/addHistory', text)
  }
}
</script>

<style lang="scss" scoped></style>
