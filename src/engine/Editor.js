/**
 * Editor.js
 */
import Vue from 'vue'
import MoEditor from '@/editor'
import Basis from '@/components/basis'

const EditorVue = Vue.extend(MoEditor)

const Editor = function(el, options) {
  if (!Editor.installed) {
    Editor.install()
  }

  const self = this

  self.options = options
  self.data = {}

  self.vm = new EditorVue({
    data: {
      data: self.data,
      state: {
        selectNode: {
          event: null,
          el: null
        }
      }
    },
    editor: self
  })

  self.vm.$mount(el)
}

Editor.prototype = {
  get state() {
    return this.vm.state
  }
}

// Editor.baseUrl = './'
Editor.installed = false
Editor.install = function() {
  Vue.config.productionTip = false

  // Vue plugin
  // Install all vue components
  Basis.install()

  // Add $editor property to all editor components
  Object.defineProperty(Vue.prototype, '$editor', {
    get: function () {
      return this.$root.$options.editor
    }
  })

  Editor.installed = true
}

export default Editor
