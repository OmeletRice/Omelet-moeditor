<template>
  <lazy-component class="mo-select-box-item__lazy-wrap" @show="handlerShowSelectItem">
    <div class="mo-select-box-item"
      :class="[
        { 'is-active': isTouch }
      ]"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd">
      <mo-tinymce-wrap ref="tinymce" v-if="isEnableTinymce" :content="nodeInfo.el ? nodeInfo.el.innerHTML : ''"></mo-tinymce-wrap>
    </div>
  </lazy-component>
</template>

<script>
import MoTinymceWrap from 'basis/tinymce/tinymce'
const TINYMCE_BTN_CLASS_TAG = 'tinymce-mobile-mask-tap-icon'
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
      if (evt.target && evt.target.className === TINYMCE_BTN_CLASS_TAG) {
        this.$emit('openTinymceFrame')
      }
      if (evt.target) {
        // this.isTouch = true
        // console.log(evt)
      }
      // console.log(this.editorVm.editor)
    },
    handleTouchEnd(evt) {
      // this.isTouch = false
    },
    handlerShowSelectItem(val) {
      // console.log('show', val)
      // this.$refs.tinymce.createTinymce()
      this.$emit('show')
    }
  }
}
</script>

<style>

.mo-select-box-item .tinymce-mobile-outer-container:not(.tinymce-mobile-fullscreen-maximized) .tinymce-mobile-editor-socket {
  height: 180px;
  box-shadow: 0 0 5px 1px #acacac;
  border-radius: 5px;
  /* margin: 20px 0; */
}

.mo-select-box-item .tinymce-mobile-outer-container .tinymce-mobile-disabled-mask {
  background: rgba(255, 255, 255, 0.5);
}

.mo-select-box-item .tinymce-mobile-outer-container .tinymce-mobile-disabled-mask .tinymce-mobile-content-container {
  box-shadow: 0 1px 6px -1px #1d5174;
}

.mo-select-box-item .tinymce-mobile-content-container {
  position: absolute;
  bottom: 30px;
  right: 10px;
}

.mo-select-box-item .tinymce-mobile-outer-container .tinymce-mobile-disabled-mask .tinymce-mobile-content-container .tinymce-mobile-content-tap-section .tinymce-mobile-mask-tap-icon {
  color: #ffffff;
  background-color: #4682B4;
}
</style>
