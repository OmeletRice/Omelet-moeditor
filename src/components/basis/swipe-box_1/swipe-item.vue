<template>
  <div class="mo-swipe-box-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MoSwipeBoxItem',
    mounted() {
      this.$parent && this.$parent.swipeItemCreated(this);
    },
    destroyed() {
      this.$parent && this.$parent.swipeItemDestroyed(this);
    }
  };
</script>
