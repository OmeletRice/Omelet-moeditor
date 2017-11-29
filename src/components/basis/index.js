import Vue from 'vue'
import MoButton from './button/button'
import MoIframeBox from './iframe-box/iframe-box'
import MoIndicatorBox from './indicator-box/indicator-box'
import MoHeader from './header/header'
import MoSpinner from './spinner/spinner'

const components = [
  MoButton,
  MoIframeBox,
  MoIndicatorBox,
  MoHeader,
  MoSpinner
]

const install = function () {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
