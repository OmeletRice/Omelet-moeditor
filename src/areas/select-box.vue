<template>
  <transition name="mo-slide-in-out" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
    <div class="mo-select-box">
      <mo-header :title="$t('mo.selectbox.title')" fixed>
        <mo-button slot="left" icon="back" @click="handleBack">{{$t('mo.nav.btn.back')}}</mo-button>
      </mo-header>
      <div class="mo-select-box__container">
        <select-item v-for="(blk, idx) in blocks" :key="blk._id" :node-info="blk"></select-item>
      </div>
    </div>
  </transition>
</template>

<script>
import SelectItem from '@/components/select-box/item'
export default {
  name: 'MoSelectBox',

  components: {
    SelectItem
  },

  // props: {
  //   blocks: {
  //     type: Array,
  //     default: () => {
  //       const def = {
  //         _id: '',
  //         type: '',
  //         el: null
  //       }
  //       let ret = []
  //       for (let i = 0; i < 10; i++) {
  //         ret.push(def)
  //       }
  //       return ret
  //     }
  //   }
  // },

  data() {
    return {
      blocks: []
    }
  },

  watch: {
    '$editor.state.selectNode': {
      deep: true,
      handler(node) {
        const _id = node.el.getAttribute('moeditor-id')
        const type = 'text'
        const el = node.el
        this.blocks.push({_id, type, el})
      }
    }
  },

  methods: {
    handleBack(evt) {
      this.$editor.state.showSelectBox = false
    }
  }
}
</script>
