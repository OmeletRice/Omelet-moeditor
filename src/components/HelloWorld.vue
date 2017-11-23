<template>
  <div class="hello">
    <textarea ref="test">诗（广义），一般认为是一种内容与形式高度结合统一，并体现出“美感”、适宜吟咏的文学形式。诗能够自成一格，也能与其他艺术相结合，如诗剧、歌词或散文诗，文字配上音乐则称为歌。“诗”根源于简洁、有力地想像觉察，或与经验、想法、情绪反应作联想，将意义、意识和潜意识的表现、象征化、正式或非正式的式样、声音和韵律等以某种规则加以重组安排。这种文学类型包含叙述性、戏剧性、讽刺性、训诫式、情色和个人形式[1]。</textarea>
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
