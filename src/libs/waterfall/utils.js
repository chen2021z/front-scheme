/**
 * 从 itemElement 中抽离所有的 imgElement
 */
export const getImgElements = (elements) => {
  const imgElements = []
  elements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 获取所有的图片链接
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((el) => el.src)
}

/**
 * 监听图片数组加载完成 (promise)
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promises = []
  imgs.forEach((src, index) => {
    promises[index] = new Promise((res) => {
      const newImage = new Image()
      newImage.src = src
      newImage.onload = () => {
        res({ src, index })
      }
    })
  })
  return Promise.all(promises)
}

/**
 * 返回列高对象中最小高度所在的列 index
 */
export const getMinHeightIndex = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(
    (key) => columnHeightObj[key] === minHeight
  )
}

/**
 * 获取多列中的最小高度
 */
export const getMinHeight = (columnHeightObj) => {
  return Math.min(...Object.values(columnHeightObj))
}

/**
 * 获取多列中的最大高度
 */
export const getMaxHeight = (columnHeightObj) => {
  return Math.min(...Object.values(columnHeightObj))
}
