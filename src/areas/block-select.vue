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
      console.log('handleBeforeEnter:')
      this.getSelectedBlock()
    },
    getSelectedBlockId(node) {
      if (node && node.el) return node.el.getAttribute('moeditor-id')
    },
    getSelectedBlockType(node) {
      // test
      if (node.el && node.el.children.length === 0) {
        const nodeName = node.el.nodeName.toLowerCase()
        const types = ['p', 'span']
        if (types.indexOf(nodeName) !== -1) {
          return 'text'
        }
      }
      // analyze
      // 有子元素
      // 没有子元素
        // 获取 nodeName
    },
    getSelectedBlockEl(node) {
      // 分析
      // text
      // 计算改元素上应用的 某一些样式值 getComputedStyle
      // color, font-size...
      // 全部转为 inline-style
      // 创建一个同 tag 元素 直接添加 style 属性
        // 如果有子元素，重复
      // 最后获得一个 与之同样的 copy 节点
      if (node && node.el) {
        // old
        const styleList = ['color', 'font-size', 'font-family', 'font-stlye', 'font-weight', 'line-height']
        const styles = this.getElementComputedStyle(node.el, styleList)
        let dupNode = node.el.cloneNode(true)
        Object.keys(styles).forEach((name) => {
          dupNode.style[name] = styles[name]
        })
        return dupNode
      }
    },
    getElementComputedStyle(el, styleList) {
      const computedStyle = document.defaultView.getComputedStyle(el, null)
      var retStyleList = {}
      styleList.forEach((name) => {
        const val = computedStyle[name]
        if (val) {
          retStyleList[name] = val
        }
      })
      return retStyleList
    },

    getSelectedBlock() {
      const node = this.state.selectNode
      this.activeBlock = {
        id: this.getSelectedBlockId(node),
        type: this.getSelectedBlockType(node),
        el: this.getSelectedBlockEl(node)
      }
      // console.log(this.activeBlock)
    }
  }
}
</script>
