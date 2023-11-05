<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ifinite'
}
</script>

<script setup>
import { useIntersectionObserver, useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onLoad', 'update:modelValue'])
// 处理 loding状态
const loading = useVModel(props, 'modelValue', emits)
// 用于判断当前 loading DOM 是否与视口交叉
const targetIsIntersecting = ref(false)
// 滚动元素
const loadingTarget = ref(null)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    targetIsIntersecting.value = isIntersecting
    // 初始化执行一次
    emitLoad()
  }
)
/**
 * 触发 load
 */
const emitLoad = () => {
  // 数据请求完毕后，loading -> false 才会执行
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    // 切换为 loading 状态
    loading.value = true
    // 触发加载更多
    emits('onLoad')
  }
}

/**
 * 需要监听 loading 状态，
 */
watch(loading, (val) => {
  setTimeout(emitLoad, 300)
})
</script>

<style lang="scss" scoped></style>
