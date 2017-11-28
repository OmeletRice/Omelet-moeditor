<template>
  <transition name="mo-slide-in-out" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft"
    @after-enter="handleAfterEnter">
    <div class="mo-select-box">
      <mo-header :title="$t('mo.selectbox.title')" fixed>
        <mo-button slot="left" icon="back" @click="handleBack">{{$t('mo.nav.btn.back')}}</mo-button>
      </mo-header>
      <div class="mo-select-box__container">
        <mo-swipe-box 
          :options="swiperOption" 
          class="mo-swiper-box" 
          ref="mySwiper">

          <mo-swipe-box-item 
            :class="['mo-swiper-item']" 
            v-for="(blk, idx) in blocks" 
            :key="blk._id">

            <select-item :node-info="blk" @show="handleShow" @openTinymceFrame="handleOpenTinymceFrame"></select-item>

          </mo-swipe-box-item>
        </mo-swipe-box>
        <!-- <select-item v-for="(blk, idx) in blocks" 
            :key="blk._id"
            :node-info="blk"></select-item> -->
      </div>
    </div>
  </transition>
</template>

<script>
import SelectItem from '@/components/select-box/item'
import MoSwipeBox from 'basis/swipe-box/swipe-box'
import MoSwipeBoxItem from 'basis/swipe-box/swipe-item'
export default {
  name: 'MoSelectBox',

  components: {
    SelectItem,
    MoSwipeBox,
    MoSwipeBoxItem
  },

  data() {
    return {
      blocks: [],
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        direction: 'vertical',
        centeredSlides: true, // 活动块会居中
        slidesPerView: 3, // 设置slider容器能够同时显示的slides数量(carousel模式)
        spaceBetween: 30, // slide之间的距离px
        slidesPerGroup: 1, // 在carousel mode下定义slides的数量多少为一组
        paginationClickable: true,
        slideToClickedSlide: true // 设置为true则点击slide会过渡到这个slide
        // swipeHandler: '.mo-swiper-box'
      },
      blk: {}
    }
  },

  watch: {
    '$editor.state.selectNode': {
      deep: true,
      handler(node) {
        const _id = node.el.getAttribute('moeditor-id')
        const type = 'text'
        const el = node.el
        this.blk = {_id, type, el}
        this.blocks.push({_id, type, el})
      }
    }
  },

  methods: {
    handleBack(evt) {
      this.$editor.state.showSelectBox = false
    },
    handleShow() {
    },
    handleAfterEnter(val) {
      if (this.$refs.mySwiper) {
        this.$refs.mySwiper.mountInstance()
      }
    },
    handleOpenTinymceFrame() {
      if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
        this.$refs.mySwiper.swiper.allowTouchMove = false
      }
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },

  mounted() {
    // console.log(this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    // this.swiper.update(true)
  }
}
</script>

<style>
.mo-select-box__container .mo-select-box-item__lazy-wrap {
  height: 200px;
}

.mo-select-box__container .mo-select-box-item {
  width: 90%;
  margin: 0 auto;
}

.mo-select-box__container .mo-swiper-box {
  width: 100%;
  height: 100%;

  /* transition: .5s; */
}
.mo-select-box__container .mo-swiper-item {
  /* width: 100%;
  margin: 0 auto; */

  /* height: 80%;
  text-align: center;
  font-size: 18px ;
  background: #fff;
  transition: .25s;

  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center; */
}

/* .mo-select-box__container .mo-swiper-item.swiper-slide-active {
  height: 100%;
} */

/* .mo-select-box__container .mo-swiper-item.swiper-slide-active .mo-select-box-item__lazy-wrap {
  height: 100%;
} */

</style>
