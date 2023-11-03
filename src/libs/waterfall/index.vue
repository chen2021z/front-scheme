<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight }"
  >
    <!-- 数据渲染 -->
    <template v-if="data.length && columnWidth">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfull-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { getImgElements, getAllImg, onComplateImgs } from './utils'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    defaul: 20,
    type: Number
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
// 容器实例
const containerTarget = ref(null)
// 容器总高度 == 最高一列的高度
const containerHeight = ref(0)
// 容器总宽度 (不含 padding margin border)
const containerWidth = ref(0)
// 容器左边距，计算item.left 时需要使用定位
const containerLeft = ref(0)
// 记录每列高度的容器
const columnHeightObj = ref({})
// 初始化各列的高度
const useColumnHeightObj = () => {
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value =
    containerTarget.value.clientWidth -
    containerLeft.value -
    parseFloat(paddingRight)
}
// 列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
// 计算列宽
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
  // 开始计算
  useColumnWidth()
})
// 图片高度集合
let itemHeights = []
/**
 * 需要等待图片预加载完成
 */
const waitImgComplate = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  // 获取所有的 img 元素
  const imgElements = getImgElements(itemElements)
  // 获取所有图片的链接
  const imgs = getAllImg(imgElements)
  // 等待图片加载完成
  onComplateImgs(imgs).then(() => {
    // 图片加载完成，可获取高度
    itemElements.forEach((el) => {
      itemHeights.push(el.clientHeight)
    })
  })
  // 渲染位置
  useItemLocation()
}
// 得到每个 item 的位置信息
const useItemLocation = () => {
  console.log(itemHeights)
}
/**
 * 不进行预加载，计算 item 的高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfull-item')]
  // 直接获取 item 高度
  itemElements.forEach((el) => {
    itemHeights.push(el.clientHeight)
  })
  // 渲染位置
  useItemLocation()
}
// 触发计算
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
