import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      // 指定到localStorage 中的key
      key: 'front-scheme',
      // 需要保存的模块
      path: ['category','theme']
    })
  ]
})

export default store
