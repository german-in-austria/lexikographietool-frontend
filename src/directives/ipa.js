import Vue from 'vue'
import IpaOverlay from '../views/IpaOverlay.vue'
const IpaOverlayClass = Vue.extend(IpaOverlay)
// create the instance once.
export const overlayInstance = new IpaOverlayClass()
overlayInstance.$mount()
// append it to the body once.
document.body.appendChild(overlayInstance.$el)

export default {
  bind(el, bindings) {
    if (bindings.value.show !== false) {
      const element = el.querySelector('input') || el
      element.addEventListener('focus', () => {
        const instance = overlayInstance
        // update the instance with the new props.
        instance.aElement = element
        instance.directionV = bindings.value.directionV || 'top'
        instance.directionH = bindings.value.directionH || 'left'
        instance.maxWidth = bindings.value.maxWidth || 350
      })
    }
  },
  // inserted(el, bindings, vNode) {
  // },
  // update(el, bindings, vNode) {
  // },
  // componentUpdated(el, bindings, vNode) {
  // },
  // unbind(el) {
  // }
}