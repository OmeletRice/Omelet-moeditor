<template>
  <lazy-component class="mo-select-box-item__lazy-wrap" @show="handlerShowSelectItem">
    <div class="mo-select-box-item"
      :class="[
        { 'is-active': isTouch }
      ]"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd">
      <mo-tinymce-wrap ref="tinymce" v-if="isEnableTinymce" :content="nodeInfo.el.innerHTML"></mo-tinymce-wrap>
    </div>
  </lazy-component>
</template>

<script>
import MoTinymceWrap from 'basis/tinymce/tinymce'
export default {
  name: 'MoSelectBoxItem',

  components: {
    MoTinymceWrap
    // 'mo-tinymce-wrap': import('basis/tinymce/tinymce')
  },

  props: {
    nodeInfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isTouch: false,
      editorVm: 'editorVM'
    }
  },

  computed: {
    isEnableTinymce() {
      // return this.type === 'text'
      return true
    }
  },

  methods: {
    handleTouchStart(evt) {
      console.log(evt.target)
      this.isTouch = true
    },
    handleTouchEnd(evt) {
      this.isTouch = false
    },
    handlerShowSelectItem(val) {
      // console.log('show', val)
      // this.$refs.tinymce.createTinymce()
    }
  }
}
</script>
