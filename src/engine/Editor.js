/**
 * Editor.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import MoEditor from '@/editor'
import Basis from '@/components/basis'
import messages from './i18n/index.js'

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
    i18n: new VueI18n({
      locale: self.options.lang,
      messages: messages
    }),
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
  Vue.use(VueI18n)
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
