<template>
  <header
    class="mo-header"
    :class="{ 'is-fixed': fixed }">
    <div class="mo-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="mo-header-title" v-text="title"></h1>
    <div class="mo-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'mo-header',

  props: {
    fixed: Boolean,
    title: String
  }
}
</script>
