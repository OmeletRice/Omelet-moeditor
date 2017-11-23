<template>
  <div class="hello">
    <textarea ref="test">m>>></textarea>
  </div>
</template>

<script>
// import OmTinymce from './basic/tinymce/tinymce'
import OmTinymce from 'tinymce'
export default {
  name: 'HelloWorld',
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    const self = this
    OmTinymce.baseURL = 'static/tinymce'
    OmTinymce.init({
      target: self.$refs.test,
      theme: 'modern',
      mobile: {
        // unused
        // plugins: ['autosave', 'lists', 'autolink'],
        // toolbar: ['link', 'unlink', 'image', 'bullist', 'numlist'],
        toolbar: ['undo', 'redo', 'bold', 'italic', 'underline', 'fontsizeselect', 'forecolor', 'styleselect', 'removeformat']
      }
    })
  }
}
</script>
