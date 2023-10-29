import requset from "@/utils/request";

/**
 * 获取分类列表
 */
export const getCategory = () => {
  return requset({
    url: '/category'
  })
}