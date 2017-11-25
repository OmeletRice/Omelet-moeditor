<template>
  <div class="mo-indicator-box">
    <div class="mo-indicator-box__inner" :style="boxStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'MoIndicatorBox',

  props: {
    width: String,
    height: String,
    top: String,
    right: String,
    bottom: String,
    left: String,
    position: {}
  },

  computed: {
    boxStyle() {
      return {
        width: (this.position ? this.position.width : this.width) + 'px',
        height: (this.position ? this.position.height : this.height) + 'px',
        top: (this.position ? this.position.top : this.top) + 'px',
        right: (this.position ? this.position.right : this.right) + 'px',
        bottom: (this.position ? this.position.bottom : this.bottom) + 'px',
        left: (this.position ? this.position.left : this.left) + 'px'
      }
    }
  }
}
</script>

<style>
.mo-indicator-box {
  pointer-events: none;
}
.mo-indicator-box__inner {
  position: absolute;
  left: -5px;
  top: -5px;
  height: 110%;
  width: 110%;
  border: 2px solid rgba(0, 64, 128, 0.63);
  border-radius: 4px;
  transition: cubic-bezier(0.15, 1.04, 0.96, 1.07) .25s;
}
</style>
