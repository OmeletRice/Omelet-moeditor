<template>
  <div class="mo-swipe-box">
    <div class="mo-swipe-box-items-wrap" ref="wrap">
      <slot></slot>
    </div>
    <!-- <div class="mo-swipe-box-indicators" v-show="showIndicators">
      <div class="mo-swipe-box-indicator"
        v-for="(page, $index) in pages"
        :key="page._id"
        :class="{ 'is-active': $index === index }"></div>
    </div> -->
  </div>
</template>

<script>
import { removeClass, addClass, once } from '@/components/basis/utils/dom.js'
export default {
  name: 'MoSwipeBox',

  props: {
    defaultIndex: {
      type: Number,
      default: 0
    },

    noDragWhenSingle: {
      type: Boolean,
      default: true
    },

    prevent: {
      type: Boolean,
      default: false
    },

    stopPropagation: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [],
      reInitTimer: null,
      noDrag: false,
      isDone: false
    }
  },

  watch: {
    index(newIndex) {
      this.$emit('change', newIndex)
    }
  },

  methods: {
    swipeItemCreated() {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPage()
      }, 100)
    },

    reInitPage() {
      const children = this.$children;
      this.noDrag = children.length === 1 && this.noDragWhenSingle

      const intDefaultIndex = Math.floor(this.defaultIndex)
      // max length overflow
      const defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
      this.index = defaultIndex

      var pages = []
      children.forEach(function(child, index) {
        pages.push(child.$el)

        removeClass(child.$el, 'is-active')

        if (index === defaultIndex) {
          addClass(child.$el, 'is-active')
        }
      })

      this.pages = pages
    },

    translate(el, offset, speed, callback) {
      if (speed) {
        this.animating = true
        el.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out'
        setTimeout(() => {
          el.style.webkitTransform = `translate3d(0, ${offset}px, 0)`
        }, 50)

        var called = false
        var transitionEndCallback = () => {
          if (called) return;
          called = true;
          this.animating = false;
          el.style.webkitTransition = '';
          el.style.webkitTransform = '';
          if (callback) {
            callback.apply(this, arguments);
          }
        };
        once(el, 'webkitTransitionEnd', transitionEndCallback);
        setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android
      }
      el.style.webkitTransition = '';
      el.style.webkitTransform = `translate3d(0, ${offset}px, 0)`;
    },

    doAnimate(towards, options) {
      if (this.$children.length === 0) return
      if (!options && this.$children.length < 2) return

      // var prevPage, nextPage, currentPage, pageWidth, offsetLeft, pageHeight, offsetTop, speedX, speedY
      var prevPage, nextPage, currentPage, pageHeight, offsetTop, speedY
      var speed = this.speed || 300
      var index = this.index
      var pages = this.pages
      var pageCount = pages.length

      if (!options) {
        // pageWidth = this.$el.clientWidth
        pageHeight = this.$el.clientHeight
        currentPage = pages[index]
        prevPage = pages[index - 1]
        nextPage = pages[index + 1]
        // if (this.continuous && pages.length > 1) {
        //   if (!prevPage) {
        //     prevPage = pages[pages.length - 1]
        //   }
        //   if (!nextPage) {
        //     nextPage = pages[0]
        //   }
        // }
        if (prevPage) {
          prevPage.style.display = 'block'
          this.translate(prevPage, -pageHeight)
        }
        if (nextPage) {
          nextPage.style.display = 'block'
          this.translate(nextPage, pageHeight)
        }
      } else {
        prevPage = options.prevPage
        currentPage = options.currentPage
        nextPage = options.nextPage
        // pageWidth = options.pageWidth
        pageHeight = options.pageHeight
        // offsetLeft = options.offsetLeft
        offsetTop = options.offsetTop
        // speedX = options.speedX
        speedY = options.speedY
      }

      var newIndex

      var oldPage = this.$children[index].$el

      if (towards === 'prev') {
        if (index > 0) {
          newIndex = index - 1
        }
      } else if (towards === 'next') {
        if (index < pageCount - 1) {
          newIndex = index + 1
        }
      }

      var callback = () => {
        if (newIndex !== undefined) {
          var newPage = this.$children[newIndex].$el
          removeClass(oldPage, 'is-active')
          addClass(newPage, 'is-active')

          this.index = newIndex
        }
        if (this.isDone) {
          this.end()
        }
        if (prevPage) {
          prevPage.style.display = ''
        }
        if (nextPage) {
          nextPage.style.display = ''
        }
      }

      setTimeout(() => {
        if (towards === 'next') {
          this.isDone = true
          this.before(currentPage)
          // if (speedX) {
          //   this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage);
          // } else {
          //   this.translate(currentPage, -pageWidth, speed, callback);
          //   if (nextPage) {
          //     this.translate(nextPage, 0, speed);
          //   }
          // }
          if (speedY) {
            // this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage);
          } else {
            this.translate(currentPage, -pageHeight, speed, callback)
            if (nextPage) {
              this.translate(nextPage, 0, speed)
            }
          }
        } else if (towards === 'prev') {
          this.isDone = true
          this.before(currentPage)
          // if (speedX) {
          //   this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage);
          // } else {
          //   this.translate(currentPage, pageWidth, speed, callback);
          //   if (prevPage) {
          //     this.translate(prevPage, 0, speed);
          //   }
          // }
          if (speedY) {
            // this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage);
          } else {
            this.translate(currentPage, pageHeight, speed, callback)
            if (prevPage) {
              this.translate(prevPage, 0, speed)
            }
          }
        } else {
          this.isDone = false
          this.translate(currentPage, 0, speed, callback)
          // if (typeof offsetLeft !== 'undefined') {
          //   if (prevPage && offsetLeft > 0) {
          //     this.translate(prevPage, pageWidth * -1, speed)
          //   }
          //   if (nextPage && offsetLeft < 0) {
          //     this.translate(nextPage, pageWidth, speed)
          //   }
          // } else {
          //   if (prevPage) {
          //     this.translate(prevPage, pageWidth * -1, speed)
          //   }
          //   if (nextPage) {
          //     this.translate(nextPage, pageWidth, speed)
          //   }
          // }
          if (typeof offsetTop !== 'undefined') {
            if (prevPage && offsetTop > 0) {
              this.translate(prevPage, pageHeight * -1, speed)
            }
            if (nextPage && offsetTop < 0) {
              this.translate(nextPage, pageHeight, speed)
            }
          } else {
            if (prevPage) {
              this.translate(prevPage, pageHeight * -1, speed)
            }
            if (nextPage) {
              this.translate(nextPage, pageHeight, speed)
            }
          }
        }
      }, 10)
    },

    before() {
      this.$emit('before', this.index)
    },

    end() {
      this.$emit('end', this.index)
    },

    doOnTouchStart(evt) {
      if (this.noDrag) return
      const _el = this.$el
      const touch = evt.touches[0]

      var dragState = this.dragState
      dragState.startTime = new Date()
      dragState.startLeft = touch.pageX
      dragState.startTop = touch.pageY
      dragState.startTopAbsolute = touch.clientY

      dragState.pageWidth = _el.offsetWidth
      dragState.pageHeight = _el.offsetHeight

      var prevPage = this.$children[this.index - 1]
      var dragPage = this.$children[this.index]
      var nextPage = this.$children[this.index + 1]

      dragState.prevPage = prevPage ? prevPage.$el : null
      dragState.dragPage = dragPage ? dragPage.$el : null
      dragState.nextPage = nextPage ? nextPage.$el : null

      if (dragState.prevPage) {
        dragState.prevPage.style.display = 'block'
      }
      if (dragState.nextPage) {
        dragState.nextPage.style.display = 'block'
      }
    },

    doOnTouchMove(evt) {
      if (this.noDrag) return

      var dragState = this.dragState
      var touch = event.touches[0]

      dragState.speedX = touch.pageX - dragState.currentLeft
      dragState.speedY = touch.pageY - dragState.currentTop
      dragState.currentLeft = touch.pageX
      dragState.currentTop = touch.pageY
      dragState.currentTopAbsolute = touch.clientY

      var offsetLeft = dragState.currentLeft - dragState.startLeft
      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute

      var distanceX = Math.abs(offsetLeft)
      var distanceY = Math.abs(offsetTop)
      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.userScrolling = true
        return
      } else {
        this.userScrolling = false
        event.preventDefault()
      }

      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1)
      offsetTop = Math.min(Math.max(-dragState.pageHeight + 1, offsetTop), dragState.pageTop - 1)

      var towards = offsetTop < 0 ? 'next' : 'prev'

      if (dragState.prevPage && towards === 'prev') {
        this.translate(dragState.prevPage, offsetTop - dragState.pageHeight)
      }

      this.translate(dragState.dragPage, offsetTop)

      if (dragState.nextPage && towards === 'next') {
        this.translate(dragState.nextPage, offsetTop + dragState.pageHeight)
      }
    },

    doTouchEnd(evt) {
      if (this.noDrag) return

      var dragState = this.dragState

      var dragDuration = new Date() - dragState.startTime
      var towards = null

      var offsetLeft = dragState.currentLeft - dragState.startLeft
      var offsetTop = dragState.currentTop - dragState.startTop
      // var pageWidth = dragState.pageWidth
      var pageHeight = dragState.pageHeight
      // var index = this.index
      // var pageCount = this.pages.length

      if (dragDuration < 300) {
        let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true;
        }
        if (fireTap) {
          this.$children[this.index].$emit('tap');
        }
      }

      // if (dragDuration < 300 && dragState.currentLeft === undefined) return

      // if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
      //   towards = offsetLeft < 0 ? 'next' : 'prev';
      // }

      if (dragDuration < 300 && dragState.currentTop === undefined) return

      if (dragDuration < 300 || Math.abs(offsetTop) > pageHeight / 2) {
        towards = offsetTop < 0 ? 'next' : 'prev';
      }

      if (this.$children.length < 2) {
        towards = null
      }

      this.doAnimate(towards, {
        // offsetLeft: offsetLeft,
        offsetTop: offsetTop,
        prevPage: dragState.prevPage,
        currentPage: dragState.dragPage,
        nextPage: dragState.nextPage,
        speedX: dragState.speedX,
        speedY: dragState.speedY
      })

      this.dragState = {}
    }
  },

  created() {
    this.dragState = {}
  },

  mounted () {
    this.ready = true

    // reinit
    this.reInitPage()

    // event
    var _el = this.$el

    _el.addEventListener('touchstart', (evt) => {
      if (this.prevent) evt.preventDefault()
      if (this.stopPropagation) evt.stopPropagation()
      if (this.animating) return

      this.dragging = true
      this.userScrolling = false
      this.doOnTouchStart(evt)
    })

    _el.addEventListener('touchmove', (evt) => {
      if (!this.dragging) return
      this.doOnTouchMove(evt)
    })

    _el.addEventListener('touchend', (evt) => {
      if (this.userScrolling) {
        this.dragging = false
        this.dragState = {}
        return
      }
      if (!this.dragging) return
      this.doTouchEnd(evt)
      this.dragging = false
    })
  }
}
</script>

<style>
.mo-swipe-box {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.mo-swipe-box-items-wrap {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.mo-swipe-box-items-wrap > div {
  position: absolute;
  transform: translateX(-100%);
  size: 100% 100%;
  display: none;
}

.mo-swipe-box-items-wrap > div.is-active {
  display: block;
  transform: none;
}

.mo-swipe-box-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.mo-swipe-box-indicator {
  size: 8px 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
  margin: 0 3px;
}

.mo-swipe-box-indicator.is-active {
  background: #fff;
}
</style>
