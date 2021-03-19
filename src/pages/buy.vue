<template lang="pug">
.buy
  HeadPage(title="Купить")
  form.buy__content
    .buy__content-operation
      .buy__content-operation-title
        img.buy__content-operation-title-img(src="../assets/images/icons/arrow_line_up_right_light.png")
        span.buy__content-operation-title-text Отдать
      input.buy__content-operation-input(v-model.number="inputTransfer", inputmode="decimal", type="number", value="", placeholder="0.00")
      BaseSelect.buy__content-operation-select(:options="selectTransfer", @input="selectHandler")
    .buy__content-payment
      button.buy__content-payment-choice(type="button")
        img(src="../assets/images/icons/visa-master-dark.png")
      .buy__content-payment-line
      button.buy__content-payment-lock(type="button")
        i.fas.fa-lock
    .buy__content-operation
      .buy__content-operation-title
        img.buy__content-operation-title-img(src="../assets/images/icons/arrow_line_down_left_light.png")
        span.buy__content-operation-title-text Получить
      input.buy__content-operation-input(v-model.number="inputReceive", inputmode="decimal", type="number", value="", placeholder="0.00")
      BaseSelect.buy__content-operation-select(:options="selectReceive", @input="selectHandler")
    .buy__content-balance
      span.buy__content-balance-text Баланс:
      span.buy__content-balance-value 0 BTC
    .buy__content-range
      button.buy__content-range-button(type="button") Min
      button.buy__content-range-button(type="button") 50%
      button.buy__content-range-button(type="button") Min
    BaseSubmit(title="Далее")
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import BaseSelect from '../components/BaseSelect.vue';
import BaseSubmit from '../components/BaseSubmit.vue';

export default {
  components: {
    HeadPage,
    BaseSelect,
    BaseSubmit
  },
  data() {
    return {
      selectTransfer: ['EUR', 'USD', 'RUB'],
      selectReceive: ['BTC', 'ETH', 'LTC'],
      inputTransfer: null,
      inputReceive: null
    };
  },
  methods: {
    selectHandler(e) {
      console.log('Select: ', e);
    },
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.buy {
  padding: 12px;

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    margin-bottom: 48px;

    &-operation {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: 30% auto;
      color: #dadada;

      &-title {
        display: flex;
        align-items: center;

        span {
          margin-left: 8px;
        }

        img {
          width: 24px;
          height: 24px;
        }
      }

      &-input {
        width: 100%;
        grid-column: 1;
        font-size: 56px;
        color: #dadada;
        background: none;
        border: none;
        outline: none;
      }

      &-select {
        margin-left: auto;
      }
    }

    &-payment {
      display: flex;
      align-items: center;
      margin: 32px 0;

      &-choice {
        width: 140px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: #dadada;
        padding: 16px;

        img {
          width: 100%;
        }
      }

      &-line {
        height: 1px;
        flex-grow: 1;
        background-color: #404040;
        margin: 0 12px;
      }

      &-lock {
        padding: 12px;
        border-radius: 12px;
        background-color: #dadada;
      }
    }

    &-balance {
      display: flex;
      align-items: center;
      margin-top: 12px;

      &-text {
        color: #dadada;
        margin-right: 8px;
      }

      &-value {
        color: #dadada;
        font-weight: bold;
      }
    }

    &-range {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;

      &-button {
        width: 96px;
        height: 46px;
        color: #dadada;
        text-transform: uppercase;
        border: 2px solid #dadada;
        border-radius: 12px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
