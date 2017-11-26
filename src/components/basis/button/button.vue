<template>
  <button
    class="mo-button"
    :class="['mo-button--' + type, 'mo-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain,
      'is-round': round
    }]"
    :type="nativeType"    
    @click="handleClick"
    :disabled="disabled">
    <label class="mo-button-text"><slot></slot></label>
  </button>
</template>

<script>
export default {
  name: 'MoButton',

  props: {
    icon: String,
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
    round: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'danger',
          'primary'
        ].indexOf(value) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1;
      }
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
