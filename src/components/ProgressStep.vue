<template lang="pug">
.progress-step
  HeadPage.progress-step__title(:title="title")
  .progress-step__bar
    .progress-step__bar-start
      i.fas.fa-dollar-sign.progress-step__bar-start-inner 
    .progress-step__bar-intermediate(v-for="num in max", :class="getClassName(num)")
      i.fas.fa-check.progress-step__bar-intermediate-inner(v-if="num < step")
      i.fas.fa-arrow-right.progress-step__bar-intermediate-inner(v-else)
    .progress-step__bar-end
      i.fab.fa-ethereum.progress-step__bar-end-inner
</template>

<script>
import HeadPage from '../components/HeadPage.vue';

export default {
  components: {
    HeadPage
  },
  props: {
    title: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 4
    }
  },
  methods: {
    getClassName(num) {
      const className = 'progress-step__bar-intermediate';
      if (num < this.step) return `${className}--prev`;
      else if (num === this.step) return `${className}--current`;
      else return `${className}--next`
    }
  }
}
</script>

<style lang="scss">
.progress-step {
  width: 100%;

  &__title {
    padding-bottom: 0;
  }

  &__bar {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #2e2e2e;
    border-bottom: 3px solid #404040;
    padding: 8px 24px 16px 24px;
    position: fixed;
    top: 52px;
    left: 0;
    z-index: 4;

    &-start,
    &-intermediate,
    &-end {
      position: relative;
      flex-grow: 1;

      &-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #141414;
      }
    }

    &-start,
    &-end {
      &-inner {
        width: 56px;
        height: 56px;
        border: 2px solid #dadada;
        color: #dadada;
        font-size: 28px;
      }
    }

    &-start,
    &-intermediate {
      &-inner {
        &::after {
          content: "";
          border-bottom: 2px solid #dadada;
          transform: translateY(-50%);
          position: absolute;
          right: 0;
          top: 50%;
          z-index: 0;
        }
      }
    }

    &-start {
      &-inner {
        &::after {
          width: calc(100% - 56px);
        }
      }
    }

    &-intermediate {
      $inter: &;

      &--current,
      &--next {
        #{$inter}-inner {
          &::after {
            border-bottom-style: dashed;
          }
        }
      }

      &--current {
        #{$inter}-inner {
          &::after {
            opacity: 0.5;
          }
        }
      }

      &--next {
        opacity: 0.5;
      }

      &-inner {
        width: 28px;
        height: 28px;
        background-color: #dadada;
        font-size: 14px;

        &::after {
          width: calc(100% - 28px);
        }
      }
    }

    &-end {
      flex-grow: 0;
    }
  }
}
</style>
