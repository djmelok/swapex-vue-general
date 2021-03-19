<template lang="pug">
.referral
  HeadPage(title="Приглашай друзей")
  .referral__title Заработай вместе с Swapex Wallet до 30% от комиссии!
  vue-qrcode.referral__qr(:value="`https://www.swapex.me/user/registration?ref=${qr}`", :options="{ width: 200 }")
  .referral__id
    span.referral__id-value {{ qr }}
    button.referral__id-copy(@click="clickCopy", type="button")
      i.far.fa-copy.referral__id-copy-icon
  .referral__buttons
    button.referral__button(type="button")
      i.fas.fa-share-alt.referral__button-icon
      span.referral__button-text Поделиться
    button.referral__button(type="button")
      i.fas.fa-percentage.referral__button-icon
      span.referral__button-text Промокод
    button.referral__button(type="button")
      i.fas.fa-clipboard-list.referral__button-icon
      span.referral__button-text Детали
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    HeadPage,
    VueQrcode
  },
  data() {
    return {
      qr: 'id4400000',
    }
  },
  methods: {
    clickCopy() {
      const input = document.createElement('input');
      input.setAttribute('value', this.qr);
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
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.referral {
  padding: 12px;
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    color: #dadada;
    text-align: center;
  }

  &__qr {
    margin-top: 16px;
  }

  &__id {
    display: flex;
    align-items: center;
    margin-top: 12px;

    &-value {
      color: #ff6800;
      font-weight: bold;
      font-size: 20px;
    }

    &-copy {
      width: 32px;
      height: 32px;

      &-icon {
        color: #ff6800;
        font-size: 20px;
      }
    }
  }

  &__buttons {
    display: flex;
    margin-top: 32px;
  }

  &__button {
    width: 80px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    & + & {
      margin-left: 24px;
    }

    &-icon {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #8a8a8a;
      border-radius: 50%;
      color: #fff;
      font-size: 18px;
    }

    &-text {
      color: #dadada;
      margin-top: 6px;
    }
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;

    &-title {
      color: #dadada;
      text-align: center;
      border-bottom: 2px solid #ff6800;
      font-weight: 500;
      margin: 12px 0;
      padding: 12px 0;
    }

    &-input {
      border: none;
      outline: none;
      border-radius: 6px;
      margin-top: 12px;
      padding: 12px;
      background-color: #dadada;

      &:active,
      &:focus {
        background-color: #fff;
      }
    }

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      margin-top: 12px;
      padding: 12px;
      background-color: #ff6800;
      color: #fff;

      i {
        margin-left: -14px;
      }

      span {
        text-transform: uppercase;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }
}
</style>
