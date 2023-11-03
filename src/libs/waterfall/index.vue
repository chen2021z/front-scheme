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
import { computed, ref, onMounted } from 'vue'

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
  console.log(columnWidth.value)
})
</script>

<style lang="scss" scoped></style>
