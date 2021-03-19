<template lang="pug">
button.profile-balance(
  :class="getVisibilityClass",
  @mousedown="touchShow",
  @mouseleave="touchHide",
  @mouseup="touchHide",
  @touchstart="touchShow",
  @touchend="touchHide",
  @touchcancel="touchHide",
  type="button"
)
  .profile-balance__visible
    | $
    span 0
  .profile-balance__invisible
    i.fas.fa-star-of-life
    i.fas.fa-star-of-life
    i.fas.fa-star-of-life
    i.fas.fa-star-of-life
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['GET_SHOW_DATA']),
    getVisibilityClass() {
      return {
        'profile-balance--hide': !this.GET_SHOW_DATA,
      }
    }
  },
  methods: {
    ...mapActions(['SHOW_DATA', 'HIDE_DATA', 'TOGGLE_DATA']),
    touchShow() {
      if (this.GET_SHOW_DATA) return

      this.isTouchShow = true
      this.SHOW_DATA()
    },
    touchHide() {
      if (!this.isTouchShow) return

      this.isTouchShow = false
      this.HIDE_DATA()
    }
  }
}
</script>

<style lang="scss">
.profile-balance {
  $self: &;

  height: 100%;
  display: flex;
  align-items: center;
  color: #dadada;

  &--hide {
    #{$self}__visible {
      display: none;
    }

    #{$self}__invisible {
      display: block;
      margin: auto 0;
      color: #dadada;

      svg {
        &:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
  }

  &__invisible {
    display: none;
  }

  span {
    font-size: 42px;
    font-weight: 100;
    margin-left: 4px;
  }
}
</style>
