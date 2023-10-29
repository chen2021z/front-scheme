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
