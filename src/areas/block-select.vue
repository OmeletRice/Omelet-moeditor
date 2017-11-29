<template>
  <transition name="mo-slide-in-out" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft"
    @before-enter="handleBeforeEnter">
    <div class="mo-block-select">
      <mo-header :title="$t('mo.selectbox.title')" fixed>
        <mo-button slot="left" icon="back" @click="handleBack">{{$t('mo.nav.btn.back')}}</mo-button>
      </mo-header>
      <div class="mo-block-select__container">
        <mo-select-box
          :blocks="blocks"
          :active-block="activeBlock">
        </mo-select-box>
      </div>
    </div>
  </transition>
</template>

<script>
import MoSelectBox from '@/components/select-box/select-box'
export default {
  name: 'MoBlockSelect',

  components: {
    MoSelectBox
  },

  data() {
    return {
      state: this.$editor.state,
      blocks: [],
      activeBlock: {
        id: null,
        type: null,
        el: null
      }
    }
  },

  methods: {
    handleBack(evt) {
      this.state.showBlockSelect = false
    },
    handleBeforeEnter() {
      // console.log('handleBeforeEnter:')
      this.activeBlock = this.$editor.blocks.getBlockInfo(this.state.selectNode.el)
      // this.getSelectedBlock()
    }
  }
}
</script>
