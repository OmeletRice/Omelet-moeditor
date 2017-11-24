<template>
  <div id="moEditor">
    <mo-content-area></mo-content-area>
  </div>
</template>

<script>
import MoContentArea from './areas/content'
import './theme-default/lib/index.css'
export default {
  name: 'MoEditor',

  components: {
    MoContentArea
  }
}
</script>

