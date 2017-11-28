<template>
  <transition name="mo-slide-in-out" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
    <div class="mo-floating-menu"
      :class="[
        { 'is-full': isFull,
          'is-mask': isMask }
      ]">
      <mo-button 
        size="large" 
        type="primary"
        round
        @click="handleEdit">
        {{$t('mo.floatingMenu.btn.edit')}}
      </mo-button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MoFloationMenu',

  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    isMask: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleEdit(evt) {
      if (this.isMask) return
      this.$editor.state.showBlockSelect = true
    }
  }
}
</script>
