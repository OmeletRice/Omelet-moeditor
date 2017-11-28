<template>
  <div class="mo-select-box-item"
    :class="[
      { 'is-active': isTouch }
    ]"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd">
    <lazy-component class="mo-select-box-item__lazy-wrap" @show="handlerShowSelectItem">
      <mo-tinymce-wrap ref="tinymce" v-if="isEnableTinymce" @mouted="handleMouted"></mo-tinymce-wrap>
    </lazy-component>
    <div ref="cloneNodePlace" class="mo-select-box-item__tinymce-holder"></div>
  </div>
</template>

<script>
import MoTinymceWrap from 'basis/tinymce/tinymce'
// const TINYMCE_BTN_CLASS_TAG = 'tinymce-mobile-mask-tap-icon'
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
      // if (evt.target && evt.target.className === TINYMCE_BTN_CLASS_TAG) {
      //   this.$emit('openTinymceFrame')
      // }
      // if (evt.target) {
      //   this.isTouch = true
      //   console.log(evt)
      // }
      // console.log(this.editorVm.editor)
    },
    handleTouchEnd(evt) {
      // this.isTouch = false
    },
    getSelecterId() {
      return this.$refs.cloneNodePlace ? `#${this.$refs.cloneNodePlace.id}` : null
    },
    handlerShowSelectItem() {
      // alert('显示加载', this.getSelecterId())
    },
    createCloneNode(el, targetNode) {
      if (!el || !targetNode) return
      const id = this.getSelectedBlockId(el)
      targetNode.setAttribute('id', id)
      targetNode.append(el)
      // alert('创建完node, id')
    },
    getSelectedBlockId(node) {
      if (node.nodeType === 1) return node.getAttribute('moeditor-id')
    },
    handleMouted() {
      const selectorId = this.getSelecterId()
      // alert('tinymce mouted', this.$refs.tinymce)
      this.$refs.tinymce.createTinymce(selectorId)
    }
  },

  watch: {
    nodeInfo: {
      deep: true,
      handler(node) {
        if (node.el !== null) {
          console.log(node, this.$refs.cloneNodePlace)
          this.createCloneNode(node.el, this.$refs.cloneNodePlace)
        }
      }
    }
  }
}
</script>

<style>
.mo-select-box-item {
  min-height: 180px;
  margin-bottom: 20px;
}

.mo-select-box-item .mo-select-box-item__lazy-wrap {
  min-height: 1px;
}

.mo-select-box-item .mo-select-box-item__tinymce-holder {
  height: 180px;
  box-shadow: 0 0 5px 1px #acacac;
  border-radius: 5px;
}

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
