<template lang="pug">
.base-select(:class="getClassOpened", :tabindex="0", @blur="isOpened = false")
  .base-select__selected(@click="isOpened = !isOpened")
    img.icon(:src="getOptionIcon(selected)", alt="icon")
    .base-select__selected-text {{ selected }}
    i.base-select__selected-arrow.fas.fa-angle-down
  .base-select__items
    .base-select__items-option(v-for="(option, idx) in getFilterOptions()", :key="idx", @click="selectOption(option)")
      img.icon(:src="getOptionIcon(option)", alt="icon")
      .base-select__items-option-text {{ option }}
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: this.options[0],
      isOpened: false
    }
  },
  computed: {
    getClassOpened() {
      return { 'base-select--opened': this.isOpened }
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  },
  methods: {
    selectOption(option) {
      this.selected = option
      this.isOpened = false
      this.$emit('input', option)
    },
    getOptionIcon(option) {
      return require(`../assets/images/crypto/svg/white/${option.toLowerCase()}.svg`)
    },
    getFilterOptions() {
      return this.options.filter(item => item !== this.selected)
    }
  }
}
</script>

<style lang="scss">
.base-select {
  $self: &;

  width: 140px;
  position: relative;
  outline: none;
  z-index: 2;

  &--opened {
    #{$self}__selected {
      border-radius: 12px 12px 0px 0px;

      &-arrow {
        transform: rotate(180deg);
      }
    }

    #{$self}__items {
      display: block;
    }
  }

  &__selected,
  &__items-option {
    display: flex;
    align-items: center;
    padding: 18px;
    user-select: none;
    cursor: pointer;
  }

  &__selected,
  &__items-option {
    &-text {
      font-weight: 500;
      margin-left: 12px;
      margin-right: auto;
      color: #fff;
    }
  }

  &__selected {
    background-color: #2e2e2e;
    border-radius: 12px;
  }

  &__items {
    display: none;
    background-color: #2e2e2e;
    border-top: none;
    border-radius: 0px 0px 12px 12px;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;

    &-option {
      user-select: none;
      border-top: 1px solid #141414;

      &:hover {
        background-color: #f8880f;
      }
    }
  }

  .icon {
    width: 24px;
    height: 24px;
  }
}
</style>
