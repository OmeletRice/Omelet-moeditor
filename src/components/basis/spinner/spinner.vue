<template>
  <span><component :is="spinner"></component></span>
</template>

<script>
export default {
  name: 'MoSpinner',

  computed: {
    spinner() {
      return `mo-spinner-${this.type}`;
    }
  },

  components: {
    'mo-spinner-double-bounce': require('./double-bounce.vue').default
  },

  props: {
    type: {
      default: 'double-bounce'
    },
    size: {
      type: Number,
      default: 28
    },
    color: {
      type: String,
      default: '#ccc'
    }
  }
}
</script>
