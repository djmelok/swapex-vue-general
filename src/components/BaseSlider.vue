<template lang="pug">
.base-slider
  .base-slider__inner(:style="{ '--X': this.indexActive * -1 }", v-touch:swipe="swipeHandler")
    slot
  .base-slider__pagination(v-if="slideCount >= 2")
    button.base-slider__pagination-dot(v-for="(_, idx) in slideCount", @click="clickPagination(idx)", :class="getClassActive(idx)", type="button")
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
    clickPagination(idx) {
      this.indexActive = idx;
    },
  },
  watch: {
    indexActive(value) {
      this.$emit('slideActive', value);
    }
  },
  mounted() {
    this.$emit('slideActive', this.indexActive);
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
    transition: transform 0.3s ease;
  }

  &__pagination {
    display: flex;
    padding: 16px 0;

    &-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid #dadada;
      transition: transform 0.3s ease;

      & + & {
        margin-left: 18px;
      }

      &--active {
        transform: scale(1.5);
        background-color: #dadada;
      }
    }
  }
}
</style>
