<template lang="pug">
.buy
  ProgressStep(title="Купить", :step="2")
  form.buy__form(action="/pay/create", method="post", v-if="saveCards.length")
    .buy__form-operation
      .buy__form-operation-title
        img.buy__form-operation-title-img(src="../assets/images/icons/arrow_line_up_right_light.png")
        span.buy__form-operation-title-text Отдать
      input.buy__form-operation-input(
        :value="inputTransfer",
        @input="onInputTransfer",
        name="summOut",
        inputmode="decimal",
        type="number",
        placeholder="0.00"
      )
      BaseSelect.buy__form-operation-select(name="selectTransfer", :options="selectTransfer", @input="selectHandler")
    .buy__form-payment
      button.buy__form-payment-choice(type="button")
        img(src="../assets/images/icons/visa-master-dark.png")
      .buy__form-payment-line
      button.buy__form-payment-lock(type="button")
        i.fas.fa-lock
    .buy__form-operation
      .buy__form-operation-title
        img.buy__form-operation-title-img(src="../assets/images/icons/arrow_line_down_left_light.png")
        span.buy__form-operation-title-text Получить
      input.buy__form-operation-input(
        :value="inputReceive",
        @input="onInputReceive",
        name="summIn",
        inputmode="decimal",
        type="number",
        value="",
        placeholder="0.00"
      )
      BaseSelect.buy__form-operation-select(name="selectReceive", :options="selectReceive", @input="selectHandler")
    //- .buy__form-balance
    //-   span.buy__form-balance-text Баланс:
    //-   span.buy__form-balance-value 0 BTC
    //- .buy__form-range
    //-   button.buy__form-range-button(type="button") Min
    //-   button.buy__form-range-button(type="button") 50%
    //-   button.buy__form-range-button(type="button") Max
    BaseSubmit(title="Далее")
  BaseSlider(slideName="card", :slideCount="saveCards.length + 1", @slideActive="getSlideActive")
    .buy__card(v-for="card in saveCards")
      .buy__card-number
        span.buy__card-number-text {{ card.cardNumber }}
      .buy__card-name
        span.buy__card-name-text {{ card.cardName }}
      img.buy__card-type(:src="require(`../assets/images/credit-form/types/${getCardType(card)}.png`)", v-if="getCardType(card)", alt="type")
    form.buy__bind(action="/addCard/create", method="post")
      input.buy__bind-input(type="text", placeholder="Наименование карты", name="cardName")
      button.buy__bind-button(type="sumbit")
        i.fas.fa-plus.buy__bind-button-icon
        span.buy__bind-button-text Добавить карту
  input(name="card", ref="inputActiveCard", type="hidden")
</template>

<script>
import ProgressStep from '../components/ProgressStep.vue';
import BaseSlider from '../components/BaseSlider.vue';
import BaseSelect from '../components/BaseSelect.vue';
import BaseSubmit from '../components/BaseSubmit.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ProgressStep,
    BaseSlider,
    BaseSelect,
    BaseSubmit
  },
  data() {
    return {
      // selectTransfer: ['UAH', 'EUR', 'USD'],
      selectTransfer: ['UAH'],
      selectReceive: ['SWX'],
      inputTransfer: null,
      inputReceive: null,
      saveCards: [
        { cardNumber: '4444 **** 0010', cardName: 'Александр Петров' },
        { cardNumber: '5566 **** 0010', cardName: 'Олег Иванов' },
      ],
      curse: 0
    };
  },
  computed: {
    ...mapGetters(['GET_COURSE']),
  },
  methods: {
    ...mapActions(['API_GET_DATA']),
    onInputTransfer({ target }) {
      const number = Number(target.value);
      this.inputTransfer = number;
      this.inputReceive = (number / this.GET_COURSE).toFixed(2);
    },
    onInputReceive({ target }) {
      const number = Number(target.value);
      this.inputReceive = number;
      this.inputTransfer = (number * this.GET_COURSE).toFixed(2);
    },
    selectHandler(e) {
      console.log('Select: ', e);
    },
    getSlideActive(e = 0) {
      if (e < this.saveCards.length) {
        this.$refs.inputActiveCard.value = this.saveCards[e].cardNumber;
      } else this.$refs.inputActiveCard.value = '';
    },
    getCardType(card) {
      let re = /^4/;
      if (card.cardNumber.match(re) != null) return 'visa';

      re = /^(34|37)/;
      if (card.cardNumber.match(re) != null) return 'amex';

      re = /^5[1-5]/;
      if (card.cardNumber.match(re) != null) return 'mastercard';

      re = /^6011/;
      if (card.cardNumber.match(re) != null) return 'discover';

      re = /^9792'/;
      if (card.cardNumber.match(re) != null) return 'troy';

      re = /^2/;
      if (card.cardNumber.match(re) != null) return 'mir';

      return 'none';
    },
  },
  watch: {
    inputTransfer(value) {
      const min = (this.GET_COURSE / 100).toFixed(2);
      if (Number(value) < min) this.inputTransfer = min;
    },
    inputReceive(value) {
      const min = 0.01;
      if (Number(value) < min) this.inputReceive = min;
    }
  },
  created() {
    this.API_GET_DATA();
    this.$http.post('/pay', { withCredentials: true })
      .then(response => {
        this.saveCards = response.data.saveCards;
        this.saveCards.forEach((card) => {
          const number = card.cardNumber;
          const length = card.cardNumber.length;
          card.cardNumber = `${number.slice(0, 4)} **** ${number.slice(length - 4, length)}`;
        });

        this.curse = response.data.curse;
      }, error => {
        console.error(error)
      });
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.buy {
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-top: 140px;
  margin-bottom: 72px;

  &__form {
    margin-bottom: 32px;

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

  &__card,
  &__bind {
    width: 100%;
    height: 160px;
    display: flex;
    background-color: #141414;
    border: 2px solid #636363;
    border-radius: 12px;
    flex-shrink: 0;
    cursor: pointer;
  }

  &__card {
    color: #dadada;
    padding: 24px 0;
    position: relative;

    &-number {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    &-name {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      border-left: 2px solid #636363;
      padding: 0 12px;
    }

    &-type {
      height: 32px;
      position: absolute;
      bottom: 12px;
      right: 12px;
      z-index: 0;
      opacity: 0.75;
    }
  }

  &__bind {
    justify-content: center;
    flex-direction: column;
    padding: 24px;

    &-input {
      background-color: transparent;
      border: none;
      outline: none;
      padding: 12px;
      border-bottom: 2px solid #636363;
      color: #dadada;
      text-align: center;
    }

    &-button {
      width: 100%;
      padding: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      &-icon {
        color: #dadada;
        font-size: 12px;
      }

      &-text {
        margin-left: 8px;
        text-transform: uppercase;
        font-weight: bold;
        color: #dadada;
      }
    }
  }
}
</style>
