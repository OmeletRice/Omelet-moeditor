<template>
  <div class="mo-content-area">
    <mo-indicator-box :position="position"></mo-indicator-box>
    <mo-iframe-box 
      :src="src" 
      :script-text="insertScript"
      @scroll="handleScroll" 
      @position="handlePosition"></mo-iframe-box>
    <mo-floating-menu></mo-floating-menu>
  </div>
</template>

<script>
import MoFloatingMenu from '@/components/floating-menu/floating-menu'
const INSERT_SCRIPT = `
  document.body.onclick = (evt) => {
    window.parent.editor.state.selectNode.event = evt
    window.parent.editor.state.selectNode.el = evt.target
  }
`
export default {
  name: 'MoContentArea',

  components: {
    MoFloatingMenu
  },

  data () {
    return {
      src: 'static/mock-page/trans/index.html',
      position: null,
      insertScript: INSERT_SCRIPT
    }
  },

  methods: {
    handleScroll(scrollLen) {
      const selectedNodeEl = this.$editor.state.selectNode.el
      if (!selectedNodeEl) return
      this.position = this.updateIndicatorBoxPostion(selectedNodeEl, scrollLen)
    },
    updateIndicatorBoxPostion(el, scrollLength) {
      const elRect = el.getBoundingClientRect()
      return {
        top: elRect.top + scrollLength.vertical,
        left: elRect.left + scrollLength.horizontal,
        width: elRect.width - 4, // border-width / 2
        height: elRect.height - 2 // border-width
      }
    },
    handlePosition(position) {
      this.position = position
    }
  }
}
</script>