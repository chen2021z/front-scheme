<template>
  <button
    class="text-base text-center rounded duration-100 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-[1.05]': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-2"
    ></m-svg-icon>
    <!-- icon按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else></slot>
  </button>
</template>

<script>
const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
  main: 'text-white bg-main hover:bg-hover-main active:main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}
// size 可选项：用于区分按钮大小，包含文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  //  icon 按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMITS_CLICK = 'click'

</script>
<script setup>
import { computed } from 'vue'

/**
 * 1. 构建 type 风格可选项和 size 大小可选项
 * 2. 通过 props 让开发者控制按钮
 * 3. 区分 icon button 和 text button
 * 4. 依据当前的数据实现视图
 * 5. 处理点击事件
 */

const props = defineProps({
  // icon 图标
  icon: String,
  // icon 颜色
  iconColor: String,
  // icon 类名（tailwind）
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 1. 获取所有的可选项
      const keys = Object.keys(typeEnum)
      // 2. 判断当前的值是否在可选项中
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的 type 必须是 ${keys.join('、')} 中的一个`)
      }
      return result
    }
  },
  // 大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 1. 获取所有的可选项
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 2. 判断当前的值是否在可选项中
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      return result
    }
  },
  // 按钮在点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMITS_CLICK])
// 如果用户传了icon，则需要在size前加一个前缀 icon-
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
/**
 * 处理点击事件
 */
const onBtnClick = () => {
  if(props.loading){
    return
  }
  emits(EMITS_CLICK)
}

</script>

<style lang="scss" scoped></style>
