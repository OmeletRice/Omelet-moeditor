<template>
  <div draggable="false" class="mo-tinymce-wrap" ref="tinymcewrap">
  </div>
</template>

<script>
import tinymce from 'tinymce'
const TINYMCE_TOOLBAR = ['undo', 'redo', 'bold', 'italic', 'underline', 'fontsizeselect', 'forecolor', 'styleselect', 'removeformat']
const TINTMCE_BASEURL = 'static/tinymce'
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
    value: String
  },

  data() {
    return {
      editor: null
    }
  },

  watch: {
    content(newVal) {
      if (!this.editor) return
      this.editor.setContent(newVal)
    }
  },

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
    createTinymce() {
      const self = this
      let customOptions = this.options
      if (!customOptions) customOptions = {}

      if (customOptions.baseURL) {
        tinymce.baseURL = customOptions.baseURL || TINTMCE_BASEURL
      }

      const toolbar = customOptions.toolbar || TINYMCE_TOOLBAR

      let options = {
        target: this.$refs.tinymcewrap,
        theme: 'mobile',
        // language:
        branding: false,
        resize: true,
        toolbar: toolbar
      }

      let setup = (editor) => {
        editor.on('Change', (e) => {
          self.$emit('change')
          console.log('change')
        })
        editor.on('init', (e) => {
          self.editor = this
          if (self.parent(self)) {
            self.parent(self).editorVm = this
          }
        })
      }

      options.setup = setup
      tinymce.init(options)
    }
  },

  mounted() {
    // compa: ie suppore ?
    this.$refs.tinymcewrap.innerHTML = this.content
    this.createTinymce()
  },

  beforeDestroy() {
    tinymce.execCommand('mceRemoveEditor', false)
    this.editor.destroy()
  }
}
</script>
