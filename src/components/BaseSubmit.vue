<template lang="pug">
.base-submit
  button.base-submit__back(type="button", v-if="hasBack")
    i.base-submit__icon.fas.fa-chevron-left
  button.base-submit__primary(type="submit") {{ title }}
    i.base-submit__icon.fas.fa-long-arrow-alt-right
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    hasBack: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss">
.base-submit {
  width: calc(100% - 24px);
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 12px;
  left: 12px;
  z-index: 2;

  &__primary,
  &__back {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 12px;
    font-size: 18px;
    font-weight: 500;
  }

  &__primary {
    flex-grow: 1;
    justify-content: space-between;
    background-color: #f8880f;
    color: #fff;
  }

  &__back {
    width: 48px;
    height: 48px;
    justify-content: center;
    background-color: #2e2e2e;
    color: #fff;
    margin-right: 12px;
  }

  &__icon {
    font-size: 24px;
  }
}
</style>
