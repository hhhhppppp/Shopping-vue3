// 把components 中的 所有组件都进行全局化注册
// 通过插件的方式
import ImageView from './imageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentsPlugin = {
  install(app) {
    // app.component('组件名字', 组件配置对象)
    app.component('ImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}
