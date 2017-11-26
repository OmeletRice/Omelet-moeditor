<template>
  <div class="mo-floating-menu"
    :class="[
      { 'is-full': isFull }
    ]">
    <mo-button 
      size="large" 
      round
      @click="handleEdit">{{$t('mo.floatingMenu.btn.edit')}}</mo-button>
  </div>  
</template>

<script>
export default {
  name: 'MoFloationMenu',

  props: {
    isFull: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleEdit(evt) {
      console.log(evt)
    }
  }
}
</script>

<style>
.mo-floating-menu {
  position: absolute;
  /* $--floating-menu--float-height */
  bottom: 45px;
  /* $--floating-menu--width */
  width: 50%;
  left: 50%;
  margin-left: -25%;
  text-align: center;
  z-index: 50;
}
</style>
