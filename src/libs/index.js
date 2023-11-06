import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm'


export default{
  // 自动化注册组件
  install(app) {
    // 1. 获取当前路径下所有文件夹的 index.vue
    const components = import.meta.glob('./*/index.vue')
    // 2. 遍历过去的组件模块
    for(let key in components){
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
    // 3. 利用 app.component 进行注册 
      app.component(componentName, defineAsyncComponent(components[key]))
    }

  }
}
