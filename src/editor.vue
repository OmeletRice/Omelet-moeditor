<template>
  <div id="moEditor">
    <mo-iframe-box :src="src"></mo-iframe-box>
  </div>
</template>

<script>
import MoIframeBox from 'basic/iframe-box/iframe-box'
import './theme-default/lib/index.css'
export default {
  name: 'MoEditor',

  components: {
    MoIframeBox
  },

  data () {
    return {
      src: 'static/mock-page/trans/index.html'
    }
  }
}
</script>

