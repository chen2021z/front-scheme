<template>
  <div>
    <!-- 内容 -->
    <slot ></slot>
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
import { ref } from 'vue'
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
// 滚动元素
const loadingTarget = ref(null)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting && !loading.value && !props.isFinished) {
      loading.value = true
      // 触发加载更多
      emits('onLoad')
    }
  }
)
</script>

<style lang="scss" scoped></style>
