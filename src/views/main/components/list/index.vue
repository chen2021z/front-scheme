<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        class="p-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
        :rowSpacing="10"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import store from '../../../../store'
// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)

let query = { page: 0, size: 20 }
/**
 * 通过重置quer有，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  // waterfall 会监听数据变化，重新渲染布局
  pexelsList.value = []
}
// 监听 currentCategory 变化
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({ page: 0, categoryId: currentCategory.id })
  }
)
// 数据源
const pexelsList = ref([])
const getPexelsData = async () => {
  if (isFinished.value) return
  // 让 page 自增
  query.page++
  let res = await getPexelsList(query)
  pexelsList.value.push(...res.list)

  // 判断是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
