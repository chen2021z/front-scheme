import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理navigationBar 中的数据 categorys
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // 1. 让 category 具备初始化数据
    // 2. 从服务端获取数据，替换初始化数据
    // 3. 为了防止初始化数据太老，每次接口得到的值进行缓存，下次运行将缓存值作为初始值
    categorys: CATEGORY_NOMAR_DATA
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
