import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 指定到localStorage 中的key
      key: 'front-scheme',
      // 需要保存的模块
      path: ['category']
    })
  ]
})

export default store
