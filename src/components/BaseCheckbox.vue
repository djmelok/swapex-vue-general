<template lang="pug">
.base-checkbox
  input#checkbox.base-checkbox__input(v-model="inputCheckbox", @change="emitCheckbox", :name="name", :checked="checked", type="checkbox")
  label.base-checkbox__label(for="checkbox")
    span.base-checkbox__label-text
      slot
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'checkbox'
    },
    checked: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      inputCheckbox: false
    }
  },
  methods: {
    emitCheckbox() {
      this.$emit('change', this.inputCheckbox);
    }
  }
};
</script>

<style lang="scss">
.base-checkbox {
  display: flex;
  align-items: center;

  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked {
      & + .base-checkbox__label::before {
        border-color: #ff6800;
        background-color: #ff6800;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      }
    }
  }

  &__label {
    margin: 24px 0;
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;

    &::before {
      content: "";
      display: inline-block;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #adb5bd;
      border-radius: 6px;
      margin-right: 12px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }

    &-text {
      color: #fff;

      a {
        font-weight: 500;
        color: #ff6800;
      }
    }
  }
}
</style>
