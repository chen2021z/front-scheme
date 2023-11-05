<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>
          <!-- 搜索提示列表 -->
          <hint-vue v-show="inputValue" :search-text="inputValue" @item-click="onSearchHandler"></hint-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from "vue";
import hintVue from "./hint.vue";

const inputValue = ref('')
/**
 * 搜索回调
 */
const onSearchHandler = (text) => {
  inputValue.value = text
}
</script>

<style lang="scss" scoped></style>
