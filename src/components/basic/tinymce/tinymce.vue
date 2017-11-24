<template>
  <div draggable="false" class="mo-tinymce-wrap" ref="tinymcewrap">
  </div>
</template>

<script>
const TINYMCE_TOOLBAR = ['undo', 'redo', 'bold', 'italic', 'underline', 'fontsizeselect', 'forecolor', 'styleselect', 'removeformat']
const TINTMCE_BASEURL = 'static/tinymce'
// unused
// plugins: ['autosave', 'lists', 'autolink']
// toolbar: ['link', 'unlink', 'image', 'bullist', 'numlist']
import tinymce from 'tinymce'
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
          console.log('init', e)
          this.editor = this
        })
      }

      options.setup = setup
      tinymce.init(options)
    }
  },

  mounted() {
    // compa: ie suppore ?
    this.$refs.tinymcewrap.innerHTML = this.content
  },

  beforeDestroy() {
    tinymce.execCommand('mceRemoveEditor', false)
    this.editor.destroy()
  }
}
</script>
