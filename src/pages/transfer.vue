<template lang="pug">
.transfer
  HeadPage(title="Перевод")
  .transfer__title(v-if="getCoin")
    img.transfer__title-icon(:src="`/img/crypto/png/${getCoin.logo}`")
    .transfer__title-name {{ getCoin.fullName }}
    .transfer__title-balance {{ (getCoin.amount / 100).toFixed(2) }} {{ getCoin.name }}
  form.transfer__form(v-if="getCoin")
    .transfer__form-course
      .transfer__form-course-currency
        span {{ getUSD }}
          i USD
        span {{ getUAH }}
          i UAH
      .transfer__form-course-crypto {{ (inputRange / 100).toFixed(2) }}
        i {{ getCoin.name }}
    .transfer__form-range
      .transfer__form-range-dash.transfer__form-range-dash--left 
        span.transfer__form-range-dash-text min
      .transfer__form-range-dash.transfer__form-range-dash--middle 
        span.transfer__form-range-dash-text 50%
      .transfer__form-range-dash.transfer__form-range-dash--right 
        span.transfer__form-range-dash-text max
      input.transfer__form-range-input(v-model="inputRange", type="range", step="0.01", min="0", :max="getCoin.amount")
    .transfer__form-often(v-if="getCoin")
      button.transfer__form-often-button(
        v-for="item in getCoin.standard",
        :class="getDisabledClass(item.value)",
        @click="clickOftenButton(item.value)",
        type="button"
      ) {{ (item.value / 100).toFixed(2) }}
    .transfer__form-address
      input.transfer__form-address-input(type="text", placeholder="Адрес получателя", ref="address")
      button.transfer__form-address-button(type="button", @click="clickPaste")
        i.fas.fa-paste.transfer__form-address-button-icon
    BaseCheckbox(name="incognita") Отправить инкогнито
    BaseSubmit(title="Далее")
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import BaseCheckbox from '../components/BaseCheckbox.vue';
import BaseSubmit from '../components/BaseSubmit.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    HeadPage,
    BaseCheckbox,
    BaseSubmit,
  },
  data() {
    return {
      inputRange: 0,
    };
  },
  methods: {
    ...mapActions(['API_GET_DATA']),
    getDisabledClass(num) {
      return {
        'transfer__form-often-button--disabled': num > this.getCoin.amount,
      }
    },
    clickOftenButton(num) {
      this.inputRange = num;
    },
    clickPaste() {
      if (!navigator.clipboard) return;

      navigator.clipboard.readText().then(clipText => {
        this.$refs.address.value = clipText
      });
    },
  },
  computed: {
    ...mapGetters(['GET_COINS', 'GET_COURSE']),
    getCoin() {
      console.log(this.GET_COINS.filter(coin => coin.name === 'SWX')[0]);
      return this.GET_COINS.filter(coin => coin.name === 'SWX')[0];
    },
    getUSD() {
      return ((this.inputRange * 1) / 100).toFixed(2);
    },
    getUAH() {
      return ((this.inputRange * this.GET_COURSE) / 100).toFixed(2);
    },
  },
  watch: {
    inputRange(val) {
      return Number(val).toFixed(2);
    }
  },
  created() {
    this.API_GET_DATA().then(() => {
      this.inputRange = this.getCoin.amount / 2;
    });
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";
.transfer {
  display: flex;
  flex-direction: column;
  padding: 132px 12px 72px 12px;

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

  &__form {
    &-course {
      display: flex;
      flex-direction: column;
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
          align-items: baseline;
          font-size: 26px;

          &:first-child {
            border-right: 2px solid #404040;
          }

          i {
            margin-left: 4px;
            font-size: 16px;
          }
        }
      }

      &-crypto {
        display: flex;
        justify-content: center;
        align-items: baseline;
        font-size: 26px;

        i {
          margin-left: 4px;
          font-size: 16px;
        }
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

    .base-checkbox {
      &__label-text {
        color: #dadada;
      }
    }
  }
}
</style>
