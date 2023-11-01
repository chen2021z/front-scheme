<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <!-- search部分 -->
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 duration-500 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-400 tracking-wide text-sm font-semibold border border-zinc-100 focus:border-red-200 group-hover:bg-white group-hover:border-zinc-200"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchClick"
        @focus="onFoucsHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 group-hover:opacity-100 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[70px] duration-500 bg-zinc-200"
      ></div>

      <!-- 搜索按钮 -->
      <m-button
        type="main"
        iconColor="#ffffff"
        icon="search"
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-[10px] rounded-full duration-500 group-hover:opacity-100"
        @click="onSearchClick"
      ></m-button>
    </div>

    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const EMIT_UPDATA_MODEL_VALUE = 'update:modelValue'
// 搜索
const EMIT_SEARCH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点
const EMIT_FOCUS = 'focus'
// 失去焦点
const EMIT_BLUR = 'blur'
export default {
  name: 'search'
}
</script>
<script setup>
import { onClickOutside, useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
/**
 * 1. 输入内容实现双向数据绑定
 * 2. 搜索按钮在 hover 时展示
 * 3. 一键清空文本功能
 * 4. 触发搜索
 * 5. 下拉展示区控制
 * 6. 事件处理
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits([
  EMIT_UPDATA_MODEL_VALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
const inputValue = useVModel(props, 'modelValue', emits)

// 删除文本
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
// 点击搜索
const onSearchClick = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
const isFocus = ref(false)
const onFoucsHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
const containerTarget = ref(null)
// 点击区域外隐藏dropdown
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
// 失去交代你
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
