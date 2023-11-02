import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理navigationBar 中的数据 categorys
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    categorys: []
  }),
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
