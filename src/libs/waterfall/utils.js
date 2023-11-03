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
