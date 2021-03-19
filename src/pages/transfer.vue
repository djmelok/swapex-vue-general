<template lang="pug">
.transfer
  HeadPage(title="Перевод")
  .transfer__title
    img.transfer__title-icon(src="../assets/images/crypto/png/btc.png")
    .transfer__title-name Bitcoin
    .transfer__title-balance 0 BTC
  form.transfer__content
    .transfer__content-course
      .transfer__content-course-currency
        span 0.00 USD
        span 0.00 UAH
      .transfer__content-course-crypto
        | {{ (inputRange / 1000).toFixed(2) }} BTC
    .transfer__content-range
      .transfer__content-range-dash.transfer__content-range-dash--left 
        span.transfer__content-range-dash-text min
      .transfer__content-range-dash.transfer__content-range-dash--middle 
        span.transfer__content-range-dash-text 50%
      .transfer__content-range-dash.transfer__content-range-dash--right 
        span.transfer__content-range-dash-text max
      input.transfer__content-range-input(v-model="inputRange", type="range", step="0.01", min="0", :max="maxValue", value="25000")
    .transfer__content-often
      button.transfer__content-often-button(
        v-for="item in oftenUsed",
        :class="getDisabledClass(item)",
        @click="clickOftenButton(item)",
        type="button"
      ) {{ (item / 1000).toFixed(2) }}
    .transfer__content-address
      input.transfer__content-address-input(type="text", placeholder="Адрес получателя", ref="address")
      button.transfer__content-address-button(type="button", @click="clickPaste")
        i.fas.fa-paste.transfer__content-address-button-icon
    BaseSubmit(title="Далее")
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import BaseSubmit from '../components/BaseSubmit.vue';

export default {
  components: {
    HeadPage,
    BaseSubmit,
  },
  data() {
    return {
      oftenUsed: [5000, 10000, 20000, 50000, 100000, 300000, 500000, 1000000],
      maxValue: 100000,
      inputRange: 25000
    };
  },
  methods: {
    getDisabledClass(item) {
      return {
        'transfer__content-often-button--disabled': item > this.maxValue,
      }
    },
    clickOftenButton(item) {
      this.inputRange = item;
    },
    clickPaste() {
      if (!navigator.clipboard) return;

      navigator.clipboard.readText().then(clipText => {
        this.$refs.address.value = clipText
      });
    },
  },
  watch: {
    inputRange(val) {
      return Number(val).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";
.transfer {
  padding: 12px;

  &__title {
    width: 100%;
    display: grid;
    grid-template-columns: 48px auto;
    grid-template-rows: auto;
    padding: 0 12px 12px;
    background-color: #2e2e2e;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: #dadada;
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 4;

    &-icon {
      width: 32px;
      height: 32px;
      margin: auto;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    &-balance {
      grid-column: 2;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 92px;
    margin-bottom: 48px;

    &-course {
      display: flex;
      flex-direction: column;
      margin-top: 32px;
      color: #dadada;

      &-currency {
        display: flex;
        border-bottom: 2px solid #404040;
        margin-bottom: 8px;
        padding: 8px 0;

        span {
          width: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-size: 26px;

          &:first-child {
            border-right: 2px solid #404040;
          }
        }
      }

      &-crypto {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
      }
    }

    &-range {
      width: 96%;
      height: 24px;
      margin: 24px auto 0 auto;
      position: relative;

      &-dash {
        $dash: &;

        content: "";
        width: 1px;
        height: 60%;
        background-color: #dadada;
        position: absolute;
        top: 50%;
        z-index: -1;
        transform: translateY(-50%);

        &--left {
          left: 0;
        }

        &--middle {
          height: 30%;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);

          #{$dash}-text {
            top: 14px;
          }
        }

        &--right {
          right: 0;
        }

        &-text {
          font-size: 14px;
          color: #626262;
          text-transform: uppercase;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;
        }
      }

      &-input {
        width: 100%;
        height: 2px;
        position: absolute;
        top: 50%;
        left: 0;
        z-index: 0;
        transform: translateY(-50%);
        background-color: #dadada;
        outline: none;
        appearance: none;

        &::-webkit-slider-thumb {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background-color: #f8880f;
          cursor: pointer;
          appearance: none;
        }

        &::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background-color: #f8880f;
          cursor: pointer;
        }
      }
    }

    &-often {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-template-rows: auto auto;
      justify-content: space-between;
      margin-top: 32px;
      color: #dadada;

      &-button {
        width: 56px;
        height: 56px;
        margin-top: 12px;
        background-color: #404040;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
        color: #dadada;

        &--disabled {
          opacity: 0.8;
          color: #141414;
          pointer-events: none;
        }
      }
    }

    &-address {
      margin-top: 32px;
      position: relative;

      &-input {
        width: 100%;
        height: 48px;
        padding: 12px 48px 12px 12px;
        border-radius: 6px;
        background-color: #404040;
        color: #dadada;
        border: none;
        outline: none;
      }

      &-button {
        width: 48px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-50%);
        font-size: 18px;
        font-weight: 500;
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 0;

        &-icon {
          font-size: 18px;
          color: #dadada;
        }
      }
    }
  }
}
</style>
