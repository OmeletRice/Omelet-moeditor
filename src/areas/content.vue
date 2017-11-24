<template>
  <div class="mo-content-area">
    <mo-indicator-box
      :width="'50px'"
      :height="'200px'">
    </mo-indicator-box>
    <mo-iframe-box :src="src" @range="handleRange"></mo-iframe-box>
  </div>
</template>

<script>
import MoIframeBox from 'basic/iframe-box/iframe-box'
import MoIndicatorBox from 'basic/indicator-box/indicator-box'
export default {
  name: 'MoContentArea',

  components: {
    MoIframeBox,
    MoIndicatorBox
  },

  data () {
    return {
      src: 'static/mock-page/trans/index.html'
    }
  },

  methods: {
    handleRange(range) {
      console.log(range, this.$editor)
    }
  }
}
</script>