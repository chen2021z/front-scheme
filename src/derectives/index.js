/**
 * 全局注册指令
 */
export default {
  install(app) {
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value ] of Object.entries(directives)){
      const arr = key.split('/')
      const directiveName = arr[arr.length - 1].replace('.js', '')
      app.directive(directiveName, value.default)
    }
  }
}
