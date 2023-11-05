export default {
  // 简单访问
  categorys: (state) => state.category.categorys,
  // 当前主题
  themeType: (state) => state.theme.themeType,
  // 当前category
  currentCategory: (state) => state.app.currentCategory,
  // 当前category 的下标
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => item.id === getters.currentCategory.id)
  }
}
