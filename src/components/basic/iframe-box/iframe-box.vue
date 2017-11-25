<template>
  <div class="mo-iframe-box" @scroll="throttleHandleScroll">
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
import throttle from 'throttle-debounce/throttle'
import { getIframeBodyHeight, appendScriptToHtmlBody, getIframeScrollLength } from '../utils/iframe'
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
    },

    throttle: {
      type: Number,
      default: 200
    },

    scriptText: String
  },

  data() {
    return {
      throttleHandleScroll: null
    }
  },

  methods: {
    handleIframeLoad(e) {
      const _iframe = this.$refs.iframewarp
      const contentHeight = getIframeBodyHeight(_iframe)
      if (contentHeight) this.$refs.iframewarp.height = contentHeight
      appendScriptToHtmlBody(_iframe, this.scriptText)
    },
    handleScroll(e) {
      this.emitRange()
    },
    getIframeRect() {
      return this.$refs.iframewarp.getBoundingClientRect()
    },
    emitRange() {
      const ret = getIframeScrollLength(this.$refs.iframewarp)
      this.$emit('scroll', ret)
    }
  },

  created() {
    this.throttleHandleScroll = throttle(this.throttle, val => {
      this.handleScroll(val)
    })
  },

  watch: {
    '$editor.state.selectNode': {
      deep: true,
      handler(val) {
        const { el } = val
        const top = el.getBoundingClientRect().top + this.getIframeRect().top
        const left = el.getBoundingClientRect().left + this.getIframeRect().left
        this.$emit('position', {
          top: top,
          left: left,
          width: el.getBoundingClientRect().width - 4,
          height: el.getBoundingClientRect().height - 2
        })
      }
    }
  }
}
</script>
