<template lang="pug">
label.base-switch
  input.base-switch__input(type="checkbox", :checked="checked")
  span.base-switch__slider
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style lang="scss">
.base-switch {
  $self: &;

  width: 32px;
  height: 18px;
  position: relative;
  display: inline-block;

  &__input {
    width: 0;
    height: 0;
    opacity: 0;

    &:checked + #{$self}__slider {
      background-color: #f8880f;
    }

    &:focus + #{$self}__slider {
      box-shadow: 0 0 2px #f8880f;
    }

    &:checked + #{$self}__slider:before {
      transform: translate(16px, -50%);
    }
  }

  &__slider {
    cursor: pointer;
    background-color: #ccc;
    transition: transform 0.3s ease;
    border-radius: 34px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;

    &::before {
      content: "";
      width: 16px;
      height: 16px;
      transform: translate(0, -50%);
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 0;
      background-color: #fff;
      transition: transform 0.3s ease;
      border-radius: 50%;
    }
  }
}
</style>
