// 定义 图片懒加载 插件
// 判断是否进入视口区
import { useIntersectionObserver } from '@vueuse/core'

// useIntersectionObserver对于元素的监听一直存在，除非手动停止监听， 存在内存浪费
// 解决 在监听的图片第一次加载完成后 就停止监听
export const lazyPlugin = {
  install(app) {
    // 定义全局指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el 指令绑定的元素 img
        // binding: binding.value 指令等于号后面绑定的表达式的值 图片 url
        // console.log(el,binding.value)
        // 判断是否进入视口区
        const a = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 进入视口区 逻辑
              el.src = binding.value
              a.stop()
            }
          }
        )
      }
    })
  }
}
