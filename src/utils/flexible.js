import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

/**
 * 判断当前是都为移动设备，判断依据屏幕宽度否小于一个指定宽度
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态指定 rem 基准值，最大40px
 * 根据屏幕宽度计算，赋值给html：fontsize
 */
export const useREM = ()=>{
  // 定义最大的fontsize
  const MAX_FONT_SIZE = 40  
  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded',()=>{
    const html = document.querySelector('html')
    // 计算 fontSize, 根据屏幕宽度 / 10
    let fontSize = Math.min(MAX_FONT_SIZE, window.innerWidth / 10)
    html.style.fontSize = fontSize + 'px'
  })
}