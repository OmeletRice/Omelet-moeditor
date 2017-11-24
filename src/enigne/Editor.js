/**
 * Editor.js
 */
import Vue from 'vue'
import MoEditor from '@/editor'

const EditorVue = Vue.extend(MoEditor)

const Editor = (el, options) => {
  if (!Editor.installed) {
    Editor.install()
  }

  const self = this

  self.options = options
  self.data = {}

  self.vm = new EditorVue({
    data: {
      data: self.data
    },
    editor: self
  })

  self.vm.$mount(el)
}

// Editor.baseUrl = './'
Editor.installed = false
Editor.install = () => {
  Vue.config.productionTip = false

  // Vue plugin

  // Add $editor property to all editor components
  Object.defineProperty(Vue.prototype, '$editor', {
    get: function () {
      return this.$root.$options.editor
    }
  })

  Editor.installed = true
}

export default Editor
