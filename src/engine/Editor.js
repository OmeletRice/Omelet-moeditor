/**
 * Editor.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueLazyload from 'vue-lazyload'
// import VueRouter from 'vue-router'

import MoEditor from '@/editor'
import Basis from '@/components/basis'
// import routes from './router'
import messages from './i18n/index.js'
import BlockManager from 'engine/BlockManager'

const EditorVue = Vue.extend(MoEditor)

// router
// const router = new VueRouter({
//   base: __dirname,
//   routes
// })

// let indexScrollTop = 0
// router.beforeEach((route, redirect, next) => {
//   if (route.path !== '/') {
//     indexScrollTop = document.body.scrollTop
//   }
//   document.title = route.meta.title || document.title
//   next()
// })

// router.afterEach(route => {
//   if (route.path !== '/') {
//     document.body.scrollTop = 0
//   } else {
//     Vue.nextTick(() => {
//       document.body.scrollTop = indexScrollTop
//     })
//   }
// })

const Editor = function(el, options) {
  if (!Editor.installed) {
    Editor.install()
  }

  const self = this

  self.options = options
  self.data = {}

  self.blocks = new BlockManager(self);

  self.vm = new EditorVue({
    data: {
      data: self.data,
      state: {
        selectNode: {
          event: null,
          el: null
        },
        showBlockSelect: false
      }
    },
    // router,
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

  // fastclick
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FastClick) window.FastClick.attach(document.body)
  }, false)

  // Vue plugin
  Vue.use(VueI18n)
  Vue.use(VueLazyload, {
    preLoad: 1.5,
    // error: Editor.baseUrl + '/lazy/error.png',
    // loading: Editor.baseUrl + '/lazy/loading.gif',
    // listenEvents: ['touchmove'],
    attempt: 1,
    lazyComponent: true
  })
  // Vue.use(VueRouter)

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

// console.log(Test)

export default Editor
