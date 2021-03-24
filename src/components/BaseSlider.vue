<template lang="pug">
.base-slider(:style="{ '--duration': slideAnim ? '0.5s' : '0' }", v-touch:swipe="swipeHandler")
  .base-slider__inner(:style="{ '--X': this.indexActive * -1 }")
    slot
  .base-slider__pagination(v-if="slideCount >= 2")
    button.base-slider__pagination-dot(v-for="(_, idx) in slideCount", @click="setSlideActive(idx)", :class="getClassActive(idx)", type="button")
</template>

<script>

export default {
  props: {
    slideCount: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      indexActive: 0,
      slideAnim: true
    };
  },
  methods: {
    swipeHandler(e) {
      if (e === 'left') {
        if (this.indexActive >= this.slideCount - 1) return;
        this.indexActive = this.indexActive + 1;
      } else if (e === 'right') {
        if (this.indexActive <= 0) return;
        this.indexActive = this.indexActive - 1;
      }
    },
    getClassActive(idx) {
      return { 'base-slider__pagination-dot--active': idx === this.indexActive }
    },
    getSlideActive() {
      return this.indexActive;
    },
    setSlideActive(idx, anim = true) {
      this.slideAnim = anim;
      this.indexActive = idx;
    },
  },
  watch: {
    indexActive(value) {
      this.$emit('getSlideActive', value);
    }
  },
  mounted() {
    this.$emit('getSlideActive', this.indexActive);
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.base-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  &__inner {
    width: 100%;
    display: flex;
    transform: translateX(calc(var(--X) * 100%));
    transition: transform var(--duration) ease;
  }

  &__pagination {
    width: 100%;
    display: flex;
    padding: 16px;
    overflow-x: auto;

    &-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid #dadada;
      transition: transform var(--duration) ease;
      flex-shrink: 0;

      & + & {
        margin-left: 18px;
      }

      &:first-child {
        margin-left: auto;
      }

      &:last-child {
        margin-right: auto;
      }

      &--active {
        transform: scale(1.5);
        background-color: #dadada;
      }
    }
  }
}
</style>
