<template>
  <div class="mo-content-area">
    <mo-indicator-box :position="position"></mo-indicator-box>
    <mo-iframe-box 
      :src="src" 
      :script-text="insertScript"
      @scroll="handleScroll" 
      @position="handlePosition"
      ref="iframebox"></mo-iframe-box>
    <mo-floating-menu v-show="showMenu" :is-mask="maskMenu"></mo-floating-menu>
  </div>
</template>

<script>
import MoFloatingMenu from '@/components/floating-menu/floating-menu'
const INSERT_SCRIPT = `
  if (document.addEventListener) {
    document.addEventListener('touchend', function(evt) {
      window.parent.editor.state.selectNode.event = evt
      window.parent.editor.state.selectNode.el = evt.target
    }, false) 
  } else {
    document.attachEvent('ontouchend', function(evt) {
      window.parent.editor.state.selectNode.event = evt
      window.parent.editor.state.selectNode.el = evt.target
    })
  }
  
`
export default {
  name: 'MoContentArea',

  components: {
    MoFloatingMenu
  },

  data () {
    return {
      src: this.$editor.options.iframeSrc,
      position: null,
      insertScript: INSERT_SCRIPT,
      showMenu: false,
      maskMenu: false,
      timeout: null
    }
  },

  watch: {
    '$editor.state.showBlockSelect': {
      immediately: true,
      handler(val) {
        if (val === false) {
          this.resetContent()
        }
      }
    }
  },

  methods: {
    handleScroll(scrollLen) {
      const selectedNodeEl = this.$editor.state.selectNode.el
      if (!selectedNodeEl) return
      this.position = this.updateIndicatorBoxPostion(selectedNodeEl, scrollLen)
    },
    updateIndicatorBoxPostion(el, scrollLength) {
      this.handleMaksMenu()
      const elRect = el.getBoundingClientRect()
      return {
        top: elRect.top + scrollLength.vertical,
        left: elRect.left + scrollLength.horizontal,
        width: elRect.width,
        height: elRect.height
      }
    },
    handlePosition(position) {
      this.showMenu = true
      this.position = position
    },
    handleMaksMenu() {
      this.maskMenu = true
      if (this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.maskMenu = false
      }, 500)
    },
    resetContent() {
      const iframewarp = this.$refs.iframebox.$refs.iframewarp
      this.position = {
        left: -5,
        top: -5,
        height: iframewarp ? iframewarp.offsetHeight + 10 : 9999,
        width: iframewarp ? iframewarp.offsetWidth + 10 : 9999
      }
      this.showMenu = false
    }
  }
}
</script>