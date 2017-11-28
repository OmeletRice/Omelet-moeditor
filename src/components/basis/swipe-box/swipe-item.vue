<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MoSwipeBoxItem',

  data() {
    return {
      slideClass: 'swiper-slide'
    }
  },

  methods: {
    update() {
      if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
        this.$parent.swiper.update(true)
        if (this.$parent.options.loop) {
          this.$parent.swiper.reLoop()
        }
      }
    }
  },

  updated() {
    this.update()
  },

  mounted() {
    if (this.$parent.options.slideClass) {
      this.slideClass = this.$parent.options.slideClass
    }
    this.update()
  }
}
</script>