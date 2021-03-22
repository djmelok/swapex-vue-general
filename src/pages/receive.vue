<template lang="pug">
.receive
  HeadPage(title="Получить")
  .receive__title
    img.receive__title-icon(src="/img/crypto/png/btc.png")
    .receive__title-name Bitcoin
    .receive__title-balance 0 BTC
  .receive__switch(:style="{ '--X': Number(switchPage) }")
    button.receive__switch-button(type="button", @click="switchPage = false", :class="{ 'receive__switch-button--active': !this.switchPage }") Обычный
    button.receive__switch-button(type="button", @click="switchPage = true", :class="{ 'receive__switch-button--active': this.switchPage }") Одноразовый
    .receive__switch-line
  .receive__content(v-if="!switchPage")
    vue-qrcode.receive__content-qr(:value="`https://www.swapex.me/?code=${normalKey}`", :options="{ width: 200 }")
    button.receive__content-field(@click="clickCopy", type="button")
      span.receive__content-field-code {{ normalKey }}
      i.far.fa-copy.receive__content-field-icon
  .receive__content(v-if="switchPage")
    template(v-if="timeKey")
      vue-qrcode.receive__content-qr(:value="`https://www.swapex.me/?code=${timeKey}`", :options="{ width: 200 }")
      button.receive__content-field(@click="clickCopy", type="button")
        span.receive__content-field-code {{ timeKey }}
        i.far.fa-copy.receive__content-field-icon
    form.receive__content-form
      input.receive__content-form-input(name="name", type="text", placeholder="Имя ключа")
      input.receive__content-form-input(name="amount", type="text", placeholder="Сумма")
      button.receive__content-form-button(type="submit") Создать ключ
        i.receive__content-form-button-icon.fas.fa-plus
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { mapActions } from 'vuex';

export default {
  components: {
    HeadPage,
    VueQrcode,
  },
  data() {
    return {
      switchPage: false,
      normalKey: 'O7K5lgl0wXU4U7Wf89r3r48fBM6fIhpnEgoakcbfBy6kQ8evqJGxUbGBsXa5MQ2uiSbKSi0bs9N0ba1FJMA3dJJVKtF817v',
      timeKey: 'qJGxUbGBsXa5MQ2uiSbKSi0bs9N0ba1FJMA3dJJVKtF817v',
    };
  },
  methods: {
    ...mapActions(['API_GET_DATA']),
    clickCopy() {
      const input = document.createElement('input');
      input.setAttribute('value', this.normalKey);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this.$toast.default('Скопировано в буфер', {
        queue: true,
        duration: 2000,
        position: 'bottom'
      });
    },
  },
  created() {
    this.API_GET_DATA();
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";
.receive {
  display: flex;
  flex-direction: column;
  padding: 104px 12px 72px 12px;

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

  &__switch {
    display: flex;
    position: relative;

    &-button {
      width: 50%;
      padding: 16px;
      text-transform: uppercase;
      font-weight: 500;
      color: #dadada;

      &--active {
        color: #f8880f;
      }
    }

    &-line {
      width: 50%;
      height: 2px;
      background-color: #f8880f;
      transform: translateX(calc(var(--X) * 100%));
      transition: transform 0.3s ease;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    &-qr {
      margin-bottom: 16px;
    }

    &-field {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      &-code {
        overflow-wrap: anywhere;
        font-weight: 500;
        color: #b8b8b8;
      }

      &-icon {
        margin-left: 16px;
        color: #b8b8b8;
        font-size: 18px;
      }
    }

    &-form {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;

      &-input {
        width: 100%;
        padding: 24px 12px;
        background-color: transparent;
        border: none;
        outline: none;
        color: #dadada;
      }

      &-button {
        display: flex;
        grid-column-start: 1;
        grid-column-end: 3;
        justify-content: space-between;
        align-items: center;
        background-color: #f8880f;
        border-radius: 8px;
        padding: 12px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
      }
    }
  }
}
</style>
