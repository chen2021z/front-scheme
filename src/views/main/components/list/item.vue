<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="group relative w-full cursor-zoom-in rounded"
      :style="{
        backgroundColor: randomRGB()
      }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        ref="imgTarget"
        v-lazy
        :src="data.photo"
        class="w-full rounded"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden xl:block opacity-0 w-full h-full absolute bg-zinc-900/50 top-0 left-0 rounded duration-300 group-hover:opacity-100"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5" @click="onShareClick"
          >分享</m-button
        >
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy :src="data.avatar" class="h-2 w-2 rounded-full" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color.js'
import { message } from '@/libs'
import { saveAs } from 'file-saver'
import { useFullscreen, useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'
import { weiboShare } from '@/utils/share'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})
/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  message('success', '图片正在下载中', 5000)
  // 传入下载的图片链接，相当于 window.open(props.data.photoDownLink)
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 500)
}
/**
 * 生成全屏方法
 */
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)

const emits = defineEmits(['click'])

/**
 * pins 跳转处理，记录图片的中心点（X|Y位置 + 宽|高的一半）
 */

const imgContainerCenter = computed(() => {
  // useElementBounding 仅在 window的 scroll 方法时被触发，所以移动端的 useElementBounding 不再具备响应式
  const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
  } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(imgContainerX + imgContainerWidth / 2),
    translateY: parseInt(imgContainerY + imgContainerHeight / 2)
  }
})

/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emits('click', {
    id: props.data.id,
    location: imgContainerCenter
  })
}

/**
 * 分享按钮点击处理
 */
const onShareClick = () => {
  weiboShare(
    props.data.photo,
    `http://mvvme.top/pins/${props.data.id}`
  )
}
</script>
