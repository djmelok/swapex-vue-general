<template lang="pug">
.index-header
  a.index-header__logo(href="/")
    img(src="../assets/images/logo.png")
    span wapex
  ProfileBalance.index-header__balance(:class="getDisplayClass")
  button.index-header__button(type="button")
    i.fab.fa-telegram
  button.index-header__button(type="button", @click="OPEN_SIDEBAR")
    i.fas.fa-bars
</template>

<script>
import { mapActions } from 'vuex'
import ProfileBalance from '../components/ProfileBalance.vue';

export default {
  components: {
    ProfileBalance,
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    getDisplayClass() {
      return {
        'index-header__balance--display': this.scrollY > 140
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(['OPEN_SIDEBAR']),
    handleScroll() {
      this.scrollY = window.scrollY
    }
  }
}
</script>

<style lang="scss">
.index-header {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #141414;
  padding: 24px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  &__logo {
    display: flex;
    align-items: center;
    margin-right: auto;

    img {
      width: 32px;
      height: 32px;
    }

    span {
      font-weight: 500;
      color: #dadada;
    }
  }

  &__balance {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    pointer-events: none;
    opacity: 0;

    &--display {
      pointer-events: auto;
      opacity: 1;
    }
  }

  &__button {
    color: #dadada;
    font-size: 24px;

    & + & {
      margin-left: 12px;
    }
  }
}
</style>
