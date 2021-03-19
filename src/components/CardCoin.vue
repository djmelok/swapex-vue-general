<template lang="pug">
.card-coin(:class="getVisibilityClass")
  img.card-coin__logo(:src="`/img/crypto/svg/${logo}`")
  .card-coin__info
    .card-coin__info-title
      span.card-coin__info-title-name {{ name }}
      span.card-coin__info-title-amount {{ amount }}
      span.card-coin__info-title-hide
        i.fas.fa-star-of-life
        i.fas.fa-star-of-life
        i.fas.fa-star-of-life
        i.fas.fa-star-of-life
    .card-coin__info-subtitle
      span.card-coin__info-subtitle-name {{ fullName }}
      span.card-coin__info-subtitle-amount $ {{ fullAmount }}
    .card-coin__info-course
      span.card-coin__info-course-rate
        i.card-coin__info-course-rate-arrow(:class="getTrendClass")
        | $ {{ rate }}
      span.card-coin__info-course-percent {{ ratePercent }} %
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    logo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    fullAmount: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    ratePercent: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['GET_SHOW_DATA']),
    getVisibilityClass() {
      return {
        'card-coin--hide': !this.GET_SHOW_DATA
      };
    },
    getTrendClass() {
      return {
        'card-coin__info-course-rate-arrow--up': this.ratePercent >= 0,
        'card-coin__info-course-rate-arrow--down': this.ratePercent < 0
      };
    }
  }
};
</script>

<style lang="scss">
.card-coin {
  $self: &;

  width: 100%;
  height: 105px;
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: linear-gradient(45deg, #1e1e1e, #252525);
  color: #fff;

  &--hide {
    #{$self}__info {
      &-title {
        &-amount {
          display: none;
        }

        &-hide {
          display: block;
          font-size: 8px;

          svg {
            &:not(:last-child) {
              margin-right: 1px;
            }
          }
        }
      }

      &-subtitle-amount {
        display: none;
      }
    }
  }

  &__logo {
    width: 54px;
    height: 54px;
    margin-right: 12px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &-title,
    &-subtitle,
    &-course {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
    }

    &-title {
      color: #dadada;

      &-hide {
        display: none;
      }
    }

    &-subtitle {
      font-size: 14px;
      padding-bottom: 8px;
      margin-bottom: 2px;
      border-bottom: 1px solid #303030;
      color: #999;
    }

    &-course {
      font-size: 14px;
      color: #999;

      &-rate {
        &-arrow {
          margin-right: 6px;

          &--up {
            color: #64b180;

            &::before {
              content: "\2191";
            }
          }

          &--down {
            color: #b7637f;

            &::before {
              content: "\2193";
            }
          }
        }
      }
    }
  }
}
</style>
