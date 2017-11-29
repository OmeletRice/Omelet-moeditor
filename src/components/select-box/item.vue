<template>
  <div class="mo-select-box-item"
    :class="[
      { 'is-editing': isOpenEditFrame }
    ]"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd">
    <lazy-component class="mo-select-box-item__lazy-wrap" @show="handlerShowSelectItem">
      <mo-tinymce-wrap ref="tinymce" v-if="isEnableTinymce" @mouted="handleTinymceMouted"></mo-tinymce-wrap>
    </lazy-component>
    <div class="mo-select-box-item___modal" v-show="isLoading">
      <mo-spinner class="mo-select-box-item___modal-spinner" color="#4682B4" :size="50"></mo-spinner>
    </div>
    <div ref="cloneNodePlace" :class="['mo-select-box-item__tinymce-holder', { 'is-hide': !isLoading }]"></div>
  </div>
</template>

<script>
// import MoTinymceWrap from 'basis/tinymce/tinymce'
import { hasClass } from 'basis/utils/dom'
const TINYMCE_BTN_MASKTAP_CLASS_TAG = 'tinymce-mobile-mask-tap-icon'
const TINYMCE_BTN_BACK_CLASS_TAG = 'tinymce-mobile-icon-back'
export default {
  name: 'MoSelectBoxItem',

  components: {
    // MoTinymceWrap
    'mo-tinymce-wrap': require('basis/tinymce/tinymce').default
  },

  props: {
    nodeInfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isOpenEditFrame: false,
      isLoading: true,
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
      if (evt.target && hasClass(evt.target, TINYMCE_BTN_MASKTAP_CLASS_TAG)) {
        this.isOpenEditFrame = true
      }
      if (evt.target && hasClass(evt.target, TINYMCE_BTN_BACK_CLASS_TAG)) {
        this.isOpenEditFrame = false
      }
    },
    handleTouchEnd(evt) {
      // this.isTouch = false
    },
    getSelecterId() {
      return this.$refs.cloneNodePlace ? `#${this.$refs.cloneNodePlace.id}` : null
    },
    handlerShowSelectItem() {
      console.log('show', this.getSelecterId())
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
    handleTinymceMouted() {
      if (this.editorVm === 'editorVM') {
        this.$refs.tinymce.createTinymce(this.getSelecterId())
        this.isLoading = false
        console.log('tinymce Mouted')
      }
    }
  },

  watch: {
    nodeInfo: {
      deep: true,
      handler(node) {
        if (node.el !== null) {
          // console.log(node, this.$refs.cloneNodePlace)
          this.createCloneNode(node.el, this.$refs.cloneNodePlace)
        }
      }
    }
  }
}
</script>

<style>
.mo-select-box-item {
  height: 180px;
  /* min-height: 180px; */
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 5px 1px #acacac;
  
  transition: .5s;
}

.mo-select-box-item.is-editing {
  height: 100%;
  box-shadow: 0 0 5px 1px #ffffff;
}

.mo-select-box-item___modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(213, 213, 213, 0.15);
  border-radius: 5px;
}

.mo-select-box-item___modal-spinner {
  margin: auto
}

.mo-select-box-item .mo-select-box-item__lazy-wrap {
  /* min-height: 1px; */
}

.mo-select-box-item .mo-select-box-item__tinymce-holder {
  height: 180px;
  display: block !important;
  position: absolute;
  padding: 20px 10px;
  opacity: .4;
  filter: blur(3px);
  transition-delay: .5s;
  transition-duration: .3s;
  /* box-shadow: 0 0 5px 1px #acacac;
  border-radius: 5px; */
}

.mo-select-box-item .mo-select-box-item__tinymce-holder.is-hide {
  opacity: 0;
  filter: blur(0.5);
}

.mo-select-box-item .tinymce-mobile-outer-container:not(.tinymce-mobile-fullscreen-maximized) .tinymce-mobile-editor-socket {
  height: 180px;
  /* box-shadow: 0 0 5px 1px #acacac;
  border-radius: 5px; */
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
