<template>
  <div id="moEditor">
    <!-- <transition name="mo-slide-in-out" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight"> -->
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <!-- </transition> -->
    <mo-content-area></mo-content-area>
    <keep-alive>
      <mo-select-box v-if="showBlockSelect"></mo-select-box>
    </keep-alive>
  </div>
</template>

<script>
import MoContentArea from './areas/content'
// import MoBlockSelect from './areas/block-select'
import './theme-default/lib/index.css'
export default {
  name: 'MoEditor',

  components: {
    MoContentArea,
    'mo-select-box': () => import('./areas/block-select')
  },

  computed: {
    showBlockSelect() {
      return this.$editor ? this.$editor.state.showBlockSelect : false
    }
  }
}
</script>

