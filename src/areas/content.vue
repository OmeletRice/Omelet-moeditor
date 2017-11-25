<template>
  <div class="mo-content-area">
    <mo-indicator-box :position="position"></mo-indicator-box>
    <mo-iframe-box 
      :src="src" 
      :script-text="insertScript"
      @scroll="handleRange" 
      @position="handlePosition"></mo-iframe-box>
  </div>
</template>

<script>
import MoIframeBox from 'basic/iframe-box/iframe-box'
import MoIndicatorBox from 'basic/indicator-box/indicator-box'
export default {
  name: 'MoContentArea',

  components: {
    MoIframeBox,
    MoIndicatorBox
  },

  data () {
    return {
      src: 'static/mock-page/trans/index.html',
      position: null,
      insertScript: `
        document.body.ontouchstart = (evt) => {
          window.parent.editor.state.selectNode.event = evt
          window.parent.editor.state.selectNode.el = evt.target
        }
      `
    }
  },

  methods: {
    handleRange(range) {
      // console.log(range, this.$editor)
      const selectNodeEl = this.$editor.state.selectNode.el
      if (!selectNodeEl) return
      const top = selectNodeEl.getBoundingClientRect().top + range.vertical
      const left = selectNodeEl.getBoundingClientRect().left + range.horizontal
      this.position = {
        top: top,
        left: left,
        width: selectNodeEl.getBoundingClientRect().width - 4,
        height: selectNodeEl.getBoundingClientRect().height - 2
      }
    },
    handlePosition(position) {
      this.position = position
    }
  }
}
</script>