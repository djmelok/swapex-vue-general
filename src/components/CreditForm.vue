<template lang="pug">
form.card-form(@submit.prevent="sumbitSaveCard", method="post")
  .card-list
    .card-item(:class="{ '-active': isCardFlipped }")
      .card-item__overlay(v-if="!saveCard.number.length && !editing", @click="editing = true")
        .card-item__overlay-text
          | Добавить карту
          i.card-item__overlay-text-icon.fas.fa-credit-card
      .card-item__side.-front
        .card-item__focus(:class="{ '-active': focusElementStyle }", :style="focusElementStyle", ref="focusElement")
        .card-item__cover
          img.card-item__bg(:src="require(`../assets/images/credit-form/backgrounds/${currentCardBackground}.jpeg`)")
        .card-item__wrapper
          .card-item__top
            img.card-item__chip(:src="require(`../assets/images/credit-form/chip.png`)")
            .card-item__type
              transition(name="slide-fade-up")
                img.card-item__typeImg(
                  :src="require(`../assets/images/credit-form/types/${getCardType}.png`)",
                  v-if="getCardType",
                  :key="getCardType",
                  alt=""
                )
          label.card-item__number(for="cardNumber", ref="cardNumber")
            template(v-if="getCardType === 'amex'")
              span(v-for="(n, $index) in amexCardMask", :key="$index")
                transition(name="slide-fade-up")
                  .card-item__numberItem(v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''")
                    | *
                  .card-item__numberItem(:class="{ '-active': n.trim() === '' }", :key="$index", v-else-if="cardNumber.length > $index")
                    | {{ cardNumber[$index] }}
                  .card-item__numberItem(:class="{ '-active': n.trim() === '' }", v-else, :key="$index + 1")
                    | {{ n }}
            template(v-else)
              span(v-for="(n, $index) in otherCardMask", :key="$index")
                transition(name="slide-fade-up")
                  .card-item__numberItem(v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''")
                    | *
                  .card-item__numberItem(:class="{ '-active': n.trim() === '' }", :key="$index", v-else-if="cardNumber.length > $index")
                    | {{ cardNumber[$index] }}
                  .card-item__numberItem(:class="{ '-active': n.trim() === '' }", v-else, :key="$index + 1")
                    | {{ n }}
          .card-item__content
            label.card-item__info(for="cardName", ref="cardName")
              .card-item__holderCard Имя
              transition(name="slide-fade-up")
                .card-item__name(v-if="cardName.length", key="1")
                  transition-group(name="slide-fade-right")
                    span.card-item__nameItem(v-for="(n, $index) in getCardName", :key="$index + 1")
                      | {{ n }}
                .card-item__name(v-else, key="2") Ф.И.О
            .card-item__date(ref="cardDate")
              label.card-item__dateTitle(for="cardMonth") Дата
              label.item__dateItem(for="cardMonth")
                transition(name="slide-fade-up")
                  span(v-if="cardMonth", :key="cardMonth")
                    | {{ cardMonth }}
                  span(v-else, key="2") ММ
              | /
              label.card-item__dateItem(for="cardYear")
                transition(name="slide-fade-up")
                  span(v-if="cardYear", :key="cardYear")
                    | {{ String(cardYear).slice(2, 4) }}
                  span(v-else, key="2") ГГ
      .card-item__side.-back
        .card-item__cover
          img.card-item__bg(:src="require(`../assets/images/credit-form/backgrounds/${currentCardBackground}.jpeg`)")
        .card-item__band
        .card-item__cvv
          .card-item__cvvTitle CVV
          .card-item__cvvBand
            span(v-for="(n, $index) in cardCvv", :key="$index") *
          .card-item__type
            img.card-item__typeImg(:src="require(`../assets/images/credit-form/types/${getCardType}.png`)", v-if="getCardType")
  .card-form__inner(v-show="editing")
    .card-input
      label.card-input__label(for="cardNumber") Номер карты
      .card-input__field
        input#cardNumber.card-input__input(
          type="text",
          inputmode="numeric",
          :class="{ 'card-input__input--error': errors.number.length }",
          v-mask="generateCardNumberMask",
          v-model="cardNumber",
          @focus="focusInput",
          @blur="blurInput",
          data-ref="cardNumber",
          autocomplete="off",
          required
        )
        .card-input__input-error(v-if="errors.number.length") {{ errors.number }}
    .card-input
      label.card-input__label(for="cardName") Имя владельца
      input#cardName.card-input__input(
        type="text",
        v-model="cardName",
        @focus="focusInput",
        @blur="blurInput",
        data-ref="cardName",
        autocomplete="off",
        required
      )
    .card-form__row
      .card-form__col
        .card-form__group
          label.card-input__label(for="cardMonth") Дата окончания срока
          select#cardMonth.card-input__input.-select(v-model="cardMonth", @focus="focusInput", @blur="blurInput", data-ref="cardDate")
            option(value="", disabled, selected) Месяц
            option(:value="n < 10 ? '0' + n : n", v-for="n in 12", :disabled="n < minCardMonth", :key="n")
              | {{ n < 10 ? '0' + n : n }}
          select#cardYear.card-input__input.-select(v-model="cardYear", @focus="focusInput", @blur="blurInput", data-ref="cardDate")
            option(value="", disabled, selected) Год
            option(:value="$index + minCardYear", v-for="(n, $index) in 12", :key="n")
              | {{ $index + minCardYear }}
      .card-form__col.-cvv
        .card-input
          label.card-input__label(for="cardCvv") CVV
          input#cardCvv.card-input__input(
            type="text",
            inputmode="numeric",
            v-mask="'####'",
            maxlength="4",
            v-model="cardCvv",
            @focus="flipCard(true)",
            @blur="flipCard(false)",
            autocomplete="off",
            required
          )
    button.card-form__button.primary-button(type="sumbit") Сохранить
</template>

<script>
export default {
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25 + 1),
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear(),
      amexCardMask: '#### ###### #####',
      otherCardMask: '#### #### #### ####',
      cardNumberTemp: '',
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      editing: false,
      errors: {
        number: '',
        name: '',
        mounth: '',
        year: '',
        cvv: ''
      },
      saveCard: {
        number: '',
        name: '',
        mounth: 0,
        year: 0,
        cvv: 0
      }
    };
  },
  computed: {
    getCardType() {
      let re = /^4/;
      if (this.cardNumber.match(re) != null) return 'visa';

      re = /^(34|37)/;
      if (this.cardNumber.match(re) != null) return 'amex';

      re = /^5[1-5]/;
      if (this.cardNumber.match(re) != null) return 'mastercard';

      re = /^6011/;
      if (this.cardNumber.match(re) != null) return 'discover';

      re = /^9792'/;
      if (this.cardNumber.match(re) != null) return 'troy';

      re = /^2/;
      if (this.cardNumber.match(re) != null) return 'mir';

      return 'none';
    },
    getCardName() {
      return this.cardName.replace(/\s\s+/g, ' ');
    },
    generateCardNumberMask() {
      return this.getCardType === 'amex' ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    editing(value) {
      this.$emit('editCardHandler', value);
    },
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = '';
      }
    }
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById('cardNumber').focus();
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      const targetRef = e.target.dataset.ref;
      const target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      };
    },
    blurInput() {
      const vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
    sumbitSaveCard() {
      this.errors.number = '';

      if (this.getCardType === 'none' || this.cardNumber.length < 17) {
        this.errors.number = 'Неправильный формат карты';
        return false;
      }

      this.saveCard.number = this.cardNumber;
      this.saveCard.name = this.cardName;
      this.saveCard.month = this.cardMonth;
      this.saveCard.year = this.cardYear;
      this.saveCard.cvv = this.cardCvv;

      this.editing = false;
      this.$emit('savedCardHandler', true);
    }
  }
};
</script>

<style lang="scss">
.card-form {
  max-width: 570px;
  width: 100%;
  outline: none;

  &__inner {
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    padding: 24px;
    padding-top: 80px;
    margin-top: -70px;

    @media screen and (max-width: 360px) {
      padding: 15px;
      padding-top: 80px;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__col {
    width: 100%;
    flex: unset;
    margin-bottom: 20px;
    margin-right: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    margin-top: 10px;
  }
}

.card-item {
  max-width: 300px;
  width: 90%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 360px) {
    height: 180px;
  }

  &.-active {
    .card-item__side {
      &.-front {
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
      }
      &.-back {
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
      }
    }
  }

  &__overlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 2px dashed #dadada;
    border-radius: 15px;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(20, 20, 20, 0.8);
    cursor: pointer;

    &--hide {
      display: none;
    }

    &-text {
      width: 100%;
      background-color: #dadada;
      text-align: center;
      text-transform: uppercase;
      color: #141414;
      padding: 16px;

      &-icon {
        margin-left: 8px;
      }
    }
  }

  &__focus {
    position: absolute;
    z-index: 2;
    border-radius: 5px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.65);

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: rgb(8, 20, 47);
      height: 100%;
      border-radius: 5px;
      filter: blur(25px);
      opacity: 0.5;
    }

    &.-active {
      opacity: 1;
    }
  }

  &__side {
    border-radius: 15px;
    overflow: hidden;
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    backface-visibility: hidden;
    height: 100%;

    @media screen and (max-width: 768px) {
      transition: none;
    }

    &.-back {
      width: 100%;
      height: 100%;
      padding: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);

      .card-item__cover {
        transform: rotateY(-180deg);
      }
    }
  }

  &__bg {
    max-width: 100%;
    display: block;
    max-height: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__cover {
    height: 100%;
    background-color: #1c1d27;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(6, 2, 29, 0.45);
    }
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 25px;
    padding: 0 10px;

    @media screen and (max-width: 360px) {
      margin-bottom: 15px;
    }
  }

  &__chip {
    width: 50px;

    @media screen and (max-width: 360px) {
      width: 40px;
    }
  }

  &__type {
    max-width: 90px;
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;

    @media screen and (max-width: 360px) {
      height: 30px;
    }
  }

  &__typeImg {
    max-width: 100%;
    object-fit: contain;
    max-height: 100%;
    object-position: top right;
  }

  &__info {
    color: #fff;
    width: 100%;
    max-width: calc(100% - 85px);
    padding: 10px;
    font-weight: 500;
    display: block;
    cursor: pointer;
  }

  &__holder {
    opacity: 0.7;
    font-size: 12px;
    margin-bottom: 5px;
  }

  &__wrapper {
    padding: 20px 10px;
    position: relative;
    z-index: 3;
    height: 100%;
    user-select: none;
  }

  &__name {
    font-size: 16px;
    line-height: 1;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  &__nameItem {
    display: inline-block;
    min-width: 8px;
    position: relative;
  }

  &__number {
    font-size: 21px;
    font-weight: 500;
    line-height: 1;
    color: #fff;
    display: inline-block;
    margin-bottom: 15px;
    padding: 10px;
    cursor: pointer;

    @media screen and (max-width: 360px) {
      font-size: 19px;
      margin-bottom: 10px;
      padding: 10px 10px;
    }
  }

  &__numberItem {
    width: 13px;
    display: inline-block;

    &.-active {
      width: 16px;
    }

    @media screen and (max-width: 360px) {
      width: 12px;

      &.-active {
        width: 8px;
      }
    }
  }

  &__content {
    color: #fff;
    display: flex;
    align-items: flex-start;
  }

  &__date {
    flex-wrap: wrap;
    font-size: 16px;
    margin-left: auto;
    padding: 10px;
    display: inline-flex;
    width: 90px;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
  }

  &__dateItem {
    position: relative;
    span {
      width: 22px;
      display: inline-block;
    }
  }

  &__holderCard,
  &__dateTitle {
    opacity: 0.7;
    font-size: 12px;
    padding-bottom: 5px;
    width: 100%;
  }

  &__band {
    background: rgba(0, 0, 19, 0.8);
    width: 100%;
    height: 50px;
    margin-top: 20px;
    position: relative;
    z-index: 1;

    @media screen and (max-width: 360px) {
      height: 40px;
      margin-top: 10px;
    }
  }

  &__cvv {
    text-align: right;
    position: relative;
    padding: 12px;
    z-index: 1;

    .card-item__type {
      opacity: 0.7;
    }
  }

  &__cvvTitle {
    padding-right: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 5px;
  }

  &__cvvBand {
    height: 40px;
    background-color: #fff;
    margin-bottom: 12px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    font-size: 18px;
    border-radius: 4px;
  }
}

.card-input {
  margin-bottom: 20px;

  &__label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
    width: 100%;
    display: block;
    user-select: none;
  }

  &__field {
    position: relative;
  }

  &__input {
    width: 100%;
    height: 42px;
    border-radius: 6px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 6px 12px;
    background: none;

    &:hover,
    &:focus {
      border-color: #f8880f;
      outline: none;
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }

    &--error {
      border: 1px solid #cc0000;
    }

    &.-select {
      -webkit-appearance: none;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC");
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }

    &-error {
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 12px;
      z-index: 0;
      font-size: 12px;
      font-weight: 500;
      color: #cc0000;
    }
  }
}

.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}
.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}

.slide-fade-right-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-right-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-right-enter {
  opacity: 0;
  transform: translateX(10px) rotate(45deg);
  pointer-events: none;
}
.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-10px) rotate(45deg);
  pointer-events: none;
}
</style>
