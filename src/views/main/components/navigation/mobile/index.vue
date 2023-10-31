<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-base text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0.5 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
      >
        <m-svg-icon name="hamburger" class="w-2 h-2"></m-svg-icon>
      </li>
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 my-0.5"
      ></li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        :ref="setItemRef"
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4 z-10"
        :class="{ 'text-zinc-100': index === currentCategoryIndex }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, reactive, ref, watch } from 'vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})
// 滑块
let sliderStyle = reactive({
  transform: 'translateX(0px)',
  width: '77px'
})

// 选中 item 元素
const currentCategoryIndex = ref(0)

// 获取所有的 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据变化之后，DOM变化之前
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素
const ulTarget = ref(null)
// 获取scroll滚动的响应式数据
const { x: ulScrollLeft } = useScroll(ulTarget)

watch(currentCategoryIndex, (val) => {
  // 相对于屏幕的位置信息
  const { left, width } = itemRefs[val].getBoundingClientRect()
  let ulPadding = getComputedStyle(ulTarget.value, null).paddingLeft // 这里因为这种方法获取的是带有9.375px的字符串
  ulPadding = parseInt(ulPadding)
  // 滑块的位置 = ul 横向滚动的位置 + 当前元素相对于视口的 left - ul 的padding
  sliderStyle.transform = `translateX(${
    ulScrollLeft.value + left - ulPadding
  }px)`
  sliderStyle.width = `${width}px`
})

const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>
