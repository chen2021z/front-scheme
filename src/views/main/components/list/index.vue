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
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import store from '@/store'
import pinsVue from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)

let query = { page: 2, size: 20 }
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
    resetQuery({ page: 2, categoryId: currentCategory.id })
  }
)
// 监听搜索内容项的变化
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 2,
      searchText: val
    })
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

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})
/**
 * 进入 pins
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}
/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.4,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.5,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location?.translateX,
    y: currentPins.value.location?.translateY,
    opacity: 0
  })
}
</script>

<style lang="scss" scoped></style>
