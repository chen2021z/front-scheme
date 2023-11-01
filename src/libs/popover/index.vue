<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：用于触发弹层 -->
      <slot name="reference"></slot>
    </div>

    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        v-if="slots.default"
        ref="contentTarget"
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white border rounded border-zinc-200"
        :style="contentStyle"
      >
        <!-- 匿名插槽：用于展示弹出层的内容 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 延时关闭时间
const DELAY_TIME = 200
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placeEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
/**
 * 1. 指定多有可选位置的常亮，生成 enum
 * 2. 通过 prop 控制指定位置
 * 3. 获取元素的 DOM，创建读取元素尺寸的方法
 * 4. 计算弹层位置
 * 5. 根据 prop，计算样式对象
 */
import { ref, watch, nextTick, useSlots } from 'vue'
const slots = useSlots()
const props = defineProps({
  // 气泡弹出位置，位置不对给出错误提示
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator: (value) => {
      const res = placeEnum.includes(value)
      if (!res) {
        throw new Error(`placement 必须为 ${placeEnum.join('、')} 中的一个`)
      }
      return res
    }
  }
})

const contentTarget = ref(null)
const referenceTarget = ref(null)

/**
 * 获取元素尺寸
 */
const getElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
const isVisible = ref(false)

let timer
const onMouseenter = () => {
  isVisible.value = true
  if (timer) {
    clearTimeout(timer)
  }
}
// 延迟关闭
const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisible.value = false
    timer = null
  }, DELAY_TIME)
}
const contentStyle = ref({
  top: 0,
  left: 0
})
/**
 * 计算弹层位置
 * 在气泡展示的时候再进行计算
 */
watch(isVisible, (value) => {
  if (!value) return
  // 等待元素渲染
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
