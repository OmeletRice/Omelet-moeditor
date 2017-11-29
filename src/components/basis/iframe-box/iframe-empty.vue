<template>
  <div class="mo-iframe-empty">
    <slot></slot>
    <iframe class="mo-iframe-empty__inner"
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
export default {
  name: 'MoIframeEmpty',

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

    scriptText: String,

    elementNode: {}
  },

  data() {
    return {
    }
  },

  methods: {
    handleIframeLoad(e) {
      const _iframe = this.$refs.iframewarp
      this.replaceHtmlBody(_iframe, this.elementNode)
      this.removeScriptTag(_iframe)
    },
    replaceHtmlBody(iframe, elNode) {
      const iframeWindow = iframe.contentWindow
      if (!iframeWindow || !elNode || (elNode.nodeType !== 1)) return null
      iframeWindow.document.body.textContent = ''
      iframeWindow.document.body.append(elNode)
      return iframe
    },
    removeScriptTag(iframe) {
      const iframeWindow = iframe.contentWindow
      if (!iframeWindow) return null
      const head = iframeWindow.document.head
      const childrens = head.children
      if (head && childrens.length !== 0) {
        for (let i = 0, len = childrens.length; i < len; i++) {
          if (childrens[i].nodeName.toLowerCase() === 'script') {
            childrens[i].parentNode.removeChild(childrens[i])
          }
        }
      }
    }
  }
}
</script>
