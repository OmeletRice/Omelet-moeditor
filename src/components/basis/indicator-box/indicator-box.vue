<template>
  <div class="mo-indicator-box">
    <div class="mo-indicator-box__inner" :style="boxStyle"></div>
  </div>
</template>

<script>
const POSITIONS = ['width', 'height', 'top', 'right', 'bottom', 'left']
export default {
  name: 'MoIndicatorBox',

  props: {
    width: String,
    height: String,
    top: String,
    right: String,
    bottom: String,
    left: String,
    position: {},
    unit: {
      type: String,
      default: 'px'
    }
  },

  computed: {
    boxStyle() {
      let position = this.position
      POSITIONS.forEach(p => {
        const val = this.getPositionVal(p)
        if (val !== '') position[p] = val
      })
      return position
    }
  },

  methods: {
    getPositionVal(p) {
      const val = this.position ? this.position[p] : this[p]
      return val === undefined ? '' : val + this.unit
    },
    resetPosition() {
      this.$emit('reset')
    }
  }
}
</script>

