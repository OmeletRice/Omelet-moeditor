import Editor from './lib.js'

let options = {}

/* eslint-disable no-new */
const editor = new Editor('#app', options)

window.editor = editor

// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import MoEditor from './editor'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<MoEditor/>',
//   components: { MoEditor }
// })
