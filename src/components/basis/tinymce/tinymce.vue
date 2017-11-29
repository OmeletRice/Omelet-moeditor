<template>
  <div draggable="false" class="mo-tinymce-wrap" ref="tinymcewrap"></div>
</template>

<script>
import tinymce from 'tinymce'
const TINYMCE_TOOLBAR = ['undo', 'redo', 'bold', 'italic', 'underline', 'fontsizeselect', 'forecolor', 'styleselect', 'removeformat']
const TINTMCE_BASEURL = 'static/tinymce'
// const TINYMCE_BTN_CLASS_TAG = 'tinymce-mobile-mask-tap-icon'
// unused
// plugins: ['autosave', 'lists', 'autolink']
// toolbar: ['link', 'unlink', 'image', 'bullist', 'numlist']
export default {
  name: 'MoTinymceWrap',

  props: {
    toolbar: String,
    options: Object,
    content: {
      type: String,
      default: ''
    },
    node: {},
    value: String
  },

  data() {
    return {
      editor: null
    }
  },

  // watch: {
  //   content(newVal) {
  //     if (!this.editor) return
  //     this.editor.setContent(newVal)
  //   }
  // },

  methods: {
    parent(vm) {
      let result = vm.$parent
      while (!result.editorVm) {
        result = result.$parent
      }
      return result
    },
    getContent() {
      if (!this.editor) return ''
      return this.editor.getContent()
    },
    createTinymce(selector) {
      const self = this
      let customOptions = this.options
      if (!customOptions) customOptions = {}

      if (customOptions.baseURL) {
        tinymce.baseURL = customOptions.baseURL || TINTMCE_BASEURL
      }

      const toolbar = customOptions.toolbar || TINYMCE_TOOLBAR

      let options = {
        selector: selector || this.node,
        // target: this.node || this.$refs.tinymcewrap,
        theme: 'mobile',
        // language:
        branding: false,
        resize: true,
        toolbar: toolbar
      }

      let setup = function(editor) {
        editor.on('Blur', function(e) {
          self.$emit('blur', self.getContent())
          console.log('blur')
        })
        editor.on('init', function(e) {
          self.editor = this
          const parent = self.parent(self)
          if (parent) parent.editorVm = self
        })
      }

      options.setup = setup
      tinymce.init(options)
    }
  },

  mounted() {
    // compa: ie suppore ?
    // this.$refs.tinymcewrap.innerHTML = this.content
    // this.createTinymce()
    this.$emit('mouted')
  },

  beforeDestroy() {
    tinymce.execCommand('mceRemoveEditor', false)
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
</script>
