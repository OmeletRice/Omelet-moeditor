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
    left: String
  },

  computed: {
    boxStyle() {
      return {
        width: this.width,
        height: this.height,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left
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
  border: 1px solid red;
}
</style>
