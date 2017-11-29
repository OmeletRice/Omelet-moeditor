<template>
  <div class="mo-spinner-double-bounce" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div class="mo-spinner-double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></div>
    <div class="mo-spinner-double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></div>
  </div>
</template>

<script>
export default {
  name: 'MoDoubleBounce',

  props: {
    size: Number,
    color: String
  },

  computed: {
    spinnerColor() {
      return this.color || this.$parent.color || '#ccc'
    },
    spinnerSize() {
      return (this.size || this.$parent.size || 28) + 'px'
    }
  }
};
</script>

<style>
.mo-spinner-double-bounce {
  position: relative;
}
.mo-spinner-double-bounce-bounce1,
.mo-spinner-double-bounce-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: mo-spinner-double-bounce 2s infinite ease-in-out;
  animation: mo-spinner-double-bounce 2s infinite ease-in-out;
}
.mo-spinner-double-bounce-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@-webkit-keyframes mo-spinner-double-bounce {
  0%,
  to {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes mo-spinner-double-bounce {
  0%,
  to {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
