<template lang="pug">
.change-pin
  HeadPage(hasBack)
  img.change-pin__logo(src="@/assets/images/logo.png")
  transition(name="title", mode="out-in")
    span.change-pin__title(v-if="step === 0", key="1") Введите новый PIN-код
    span.change-pin__title(v-else, key="2") Подтвердите PIN-код
  .change-pin__input
    .change-pin__input-dot(v-for="num in maxpin", :class="getClassName(num)")
  .change-pin__keypad
    button.change-pin__keypad-button(v-for="num in 9", @click="addNum(num)", type="button") {{ num }}
    button.change-pin__keypad-button.change-pin__keypad-button--zero(@click="addNum(0)", type="button") 0
    button.change-pin__keypad-button.change-pin__keypad-button--delete(@click="deleteNum")
      i.fas.fa-backspace
</template>

<script>
import HeadPage from '../components/HeadPage.vue';

export default {
  components: {
    HeadPage,
  },
  data() {
    return {
      maxpin: 6,
      step: 0,
      pincodes: ['', ''],
      freezen: false
    };
  },
  watch: {
    pincodes: {
      handler(arr) {
        if (arr[0].length < this.maxpin || arr[1].length < this.maxpin) return;

        if (arr[0] === arr[1]) {
          this.freezen = true;
          this.$toast.success('Пинкод изменен!', {
            queue: true,
            duration: 2500,
            position: 'top'
          });
        } else {
          setTimeout(() => {
            this.step = 0;
            this.pincodes.forEach((_, idx) => {
              this.$set(this.pincodes, idx, '');
            })
          }, 400);

          this.$toast.error('Пинкоды не совпадают!', {
            queue: true,
            duration: 2500,
            position: 'top'
          });
        }
      },
      deep: true
    },
  },
  methods: {
    getClassName(num) {
      return {
        'change-pin__input-dot--active': num <= this.pincodes[this.step].length,
      }
    },
    addNum(num) {
      if (this.pincodes[this.step].length === this.maxpin || this.freezen) return;

      this.$set(this.pincodes, this.step, this.pincodes[this.step] + num.toString());

      if (this.pincodes[this.step].length === this.maxpin) {
        setTimeout(() => this.step = 1, 300);
      }
    },
    deleteNum() {
      if (!this.pincodes[this.step].length || this.freezen) return;
      const value = this.pincodes[this.step].slice(0, this.pincodes[this.step].length - 1);
      this.$set(this.pincodes, this.step, value);
    },
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.change-pin {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;

  &__logo {
    width: 124px;
    margin-top: 80px;
  }

  &__title {
    font-size: 14px;
    color: #b8b8b8;
    margin-top: 18px;
  }

  &__input {
    display: flex;
    border-bottom: 2px solid #f8880f;
    padding: 16px 32px;
    margin-top: 18px;

    &-dot {
      width: 8px;
      height: 8px;
      background-color: #f8880f;
      border-radius: 50%;
      transition: transform 0.2s ease;

      &--active {
        transform: scale(1.8);
      }

      & + & {
        margin-left: 16px;
      }
    }
  }

  &__keypad {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    margin-top: 18px;

    &-button {
      width: 64px;
      height: 64px;
      color: #b8b8b8;
      margin: 0 12px;
      font-size: 22px;

      &:hover,
      &:active {
        background-color: #202020;
      }

      &--zero {
        grid-column: 2;
      }
    }
  }

  .title-enter-active,
  .title-leave-active {
    transition: opacity 0.3s ease;
  }

  .title-enter,
  .title-leave-to {
    opacity: 0;
  }

  .title-enter-to,
  .title-leave {
    opacity: 1;
  }
}
</style>
