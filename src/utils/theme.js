import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'
import { watch } from 'vue'
import store from '../store'

// 监听系统主题变更
let matchMedia
const watchSystemTheme = () => {
  // 仅需一次初始化
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变更
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

/**
 * 变更主题
 * @param {THEME_LIGHT | THEME_DARK | THEME_SYSTEM} theme 
 */
const changeTheme = (theme) => {
  let themeClass = ''
  switch (theme) {
    case THEME_LIGHT:
      break
    case THEME_DARK:
      themeClass = 'dark'
      break
    case THEME_SYSTEM:
      // 开始监听系统主题变化，变化后会再触发自身 changeTheme
      watchSystemTheme()
      // matchMedia.matches 判断系统是否为黑暗主题
      themeClass = matchMedia.matches ? 'dark' : ''
      break
  }
  // 修改html的class
  document.documentElement.className = themeClass
}

/**
 * 当主题发生变化时，或者进入到系统时，可以进行 html class 的配置
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, { immediate: true })
}
