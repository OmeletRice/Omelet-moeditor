<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
var browser = typeof window !== 'undefined'
// if (browser) window.Swiper = require('swiper')
export default {
  name: 'MpSwipeBox',

  props: {
    options: {
      type: Object,
      default: () => {
        return {
          autoplay: 3500
        }
      }
    },
    notNextTick: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },

  data() {
    return {
      swiper: null,
      defaultSwiperClasses: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },

  methods: {
    mouted() {
      if (!this.swiper && browser) {
        delete this.options.notNextTick
        var setClassName = false
        for (var className in this.defaultSwiperClasses) {
          if (this.defaultSwiperClasses.hasOwnProperty(className)) {
            if (this.options[className]) {
              setClassName = true
              this.defaultSwiperClasses[className] = this.options[className]
            }
          }
        }
        if (setClassName) {
          this.$nextTick(() => {
            this.mountInstance()
          })
        } else {
          this.mountInstance()
        }
      }
    },
    mountInstance() {
      this.swiper = new Swiper(this.$el, this.options)
    }
  },

  mounted() {
    // if (this.options.notNextTick || this.notNextTick) {
    //   this.mouted()
    // } else {
    //   this.$nextTick(() => {
    //     this.mouted()
    //   })
    // }
  },
  updated() {
    // if (this.swiper) {
    //   this.swiper.update()
    // }
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy()
      delete this.swiper
    }
  }
}
</script>