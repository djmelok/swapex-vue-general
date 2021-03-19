<template lang="pug">
.card-provider(:class="getClassesName")
  .card-provider__logo
    img.card-provider__logo-img(:src="require(`../assets/images/exchange/${logo}`)")
  .card-provider__content
    .card-provider__content-title Kuna
    .card-provider__content-course
      i.fas.fa-lock.card-provider__content-course-icon
      span.card-provider__content-course-value 1 ETH &asymp; 46009.23 UAH
    template(v-if="problem")
      span.card-provider__content-problem {{ problem }}
    template(v-else)
      .card-provider__content-operation
        img.card-provider__content-operation-icon(src="../assets/images/icons/arrow_line_up_right_light.png")
        span.card-provider__content-operation-value 2000
          i UAH
      .card-provider__content-operation
        img.card-provider__content-operation-icon(src="../assets/images/icons/arrow_line_down_left_light.png")
        span.card-provider__content-operation-value &asymp; 0.04144
          i ETH
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
      required: true
    },
    best: {
      type: Boolean,
      default: false
    },
    problem: {
      type: String,
      default: null
    }
  },
  computed: {
    getClassesName() {
      return {
        'card-provider--best': this.best,
        'card-provider--disabled': this.problem,
      }
    }
  }
};
</script>

<style lang="scss">
.card-provider {
  width: 100%;
  padding: 16px;
  display: flex;
  border-radius: 24px;
  border: 2px solid #dadada;
  background: linear-gradient(45deg, #1e1e1e, #252525);
  color: #fff;
  margin: 2px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &--best {
    border-color: #ff6800;
    box-shadow: inset 0 0 8px 0 #ff6800, 0 0 8px 0 #ff6800;

    &::before {
      content: "Best offer";
      background-color: #ff6800;
      border-bottom-left-radius: 24px;
      padding: 8px 16px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
    }
  }

  &--disabled {
    border-color: transparent;
    opacity: 0.5;
    pointer-events: none;
    cursor: none;
  }

  &__logo {
    width: 64px;
    height: 64px;
    padding: 12px;
    margin-right: 16px;
    border-radius: 50%;
    background-color: #dadada;
    flex-shrink: 0;

    img {
      width: 100%;
    }
  }

  &__content {
    &-title {
      font-weight: 600;
    }

    &-course {
      margin: 12px 0;

      &-icon {
        margin-right: 6px;
      }

      &-value {
        font-weight: 600;
      }
    }

    &-problem {
      font-size: 18px;
      font-weight: 600;
    }

    &-operation {
      display: flex;
      align-items: center;

      &-icon {
        width: 24px;
        height: 24px;
        margin-left: -5px;
        margin-right: 6px;
      }

      &-value {
        font-weight: 600;

        i {
          font-size: 18px;
          font-weight: 600;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
