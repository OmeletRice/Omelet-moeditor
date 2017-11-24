<template>
  <div class="mo-iframe-box" @scroll="handleScroll">
    <slot></slot>
    <iframe class="mo-iframe-box__inner"
      :src="src" 
      :height="height" 
      :width="width" 
      :scrolling="scrolling"
      :name="name"
      frameborder="false"
      @load="handleIframeLoad"
      ref="iframewarp"></iframe>
  </div>
</template>

<script>
// import { on } from '../utils/dom'
export default {
  name: 'MoIframeBox',

  props: {
    src: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    name: String,

    scrolling: {
      type: String,
      default: 'auto'
    }
  },

  methods: {
    handleIframeLoad(e) {
      this.getIframeContentHeight()
      this.insertScript()
    },
    getIframeContentHeight() {
      const iframeWindow = this.$refs.iframewarp.contentWindow
      if (iframeWindow) {
        const rect = iframeWindow.document.body.getBoundingClientRect()
        // if (rect) return rect.height
        this.$refs.iframewarp.height = rect.height + 'px'
      }
    },
    insertScript() {
      let _script = document.createElement('script')
      _script.text = `
        document.body.ontouchstart = (e) => {
          window.parent.editor.selectNodeEvent = e
        }
      `
      const iframeWindow = this.$refs.iframewarp.contentWindow
      if (iframeWindow) {
        iframeWindow.document.body.append(_script)
      }
    },
    handleScroll(e) {
      // console.log(this.getIframeRect())
      this.emitRange()
    },
    getIframeRect() {
      return this.$refs.iframewarp.getBoundingClientRect()
    },
    emitRange() {
      const rect = this.getIframeRect()
      const ret = {
        vertical: rect.top,
        horizontal: rect.left
      }
      this.$emit('range', ret)
    }
  },

  mounted() {
    // console.log(this.$refs.iframewarp.contentWindow.document.body)
    // get iframe widow
    // this.$refs.iframewarp.contentWindow
    // get iframe head
    // this.$refs.iframewarp.contentWindow.document.head

    // var _script = document.createElement('script')
    // _script.text = `
    //   window.onload = () => {
    //     console.log(document.body.getBoundingClientRect())

    //     var box = null
    //     document.body.onclick = (e) => {
    //       console.log(e)
    //       box = null
    //       var p = e.target.getBoundingClientRect()
    //       var el = e.target
    //       console.log('getBoundingClientRect', e.target.getBoundingClientRect())
    //       box = document.createElement('div')
    //       box.style.position = 'absolute'
    //       box.style.border = '2px solid red'
    //       box.style.left = (Number(el.offsetLeft) - 1) + 'px'
    //       box.style.top = (Number(el.offsetTop) - 1) + 'px'
    //       box.style.width = (Number(p.width) + 3) + 'px'
    //       box.style.height = (Number(p.height) + 3) + 'px'
    //       document.body.append(box)
    //     }
    //   }
    // `
    // this.$refs.iframewarp.contentWindow.document.body.append(_script)
  }
}
</script>
