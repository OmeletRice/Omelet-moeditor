<template>
  <div id="moEditor">
    <!-- <transition name="mo-slide-in-out" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight"> -->
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <!-- </transition> -->
    <mo-content-area></mo-content-area>
    <mo-select-box v-show="$editor ? $editor.state.showSelectBox : false"></mo-select-box>
  </div>
</template>

<script>
import MoContentArea from './areas/content'
import MoSelectBox from './areas/select-box'
import './theme-default/lib/index.css'
export default {
  name: 'MoEditor',

  components: {
    MoContentArea,
    MoSelectBox
    // 'mo-select-box': () => import('./areas/select-box')
  }
}
</script>

