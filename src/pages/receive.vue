<template lang="pug">
.receive
  HeadPage(title="Получить")
  .receive__title(v-if="getCoin")
    img.receive__title-icon(:src="`/img/crypto/png/${getCoin.logo}`")
    .receive__title-name {{ getCoin.fullName }}
    .receive__title-balance {{ (getCoin.amount / 100).toFixed(2) }} {{ getCoin.name }}
  .receive__switch(:style="{ '--X': Number(switchPage) }")
    button.receive__switch-button(type="button", @click="switchPage = false", :class="{ 'receive__switch-button--active': !this.switchPage }") Обычный
    button.receive__switch-button(type="button", @click="switchPage = true", :class="{ 'receive__switch-button--active': this.switchPage }") Одноразовый
    .receive__switch-line
  .receive__content(v-if="!switchPage && getCoin")
    vue-qrcode.receive__content-qr(:value="`https://www.swapex.me/?code=${getCoin.key}`", :options="{ width: 200 }")
    button.receive__content-field(@click="clickCopy(getCoin.key)", type="button")
      span.receive__content-field-code {{ getCoin.key }}
      i.far.fa-copy.receive__content-field-icon
  //- template(v-if="switchPage && getCoin")
    //- BaseSlider(:slideCount="getCoin.multykeys.length")
    //-   .receive__content(v-for="obj in getCoin.multykeys")
  template(v-if="switchPage")
    BaseSlider(:slideCount="multykeys.length", ref="slider")
      .receive__content(v-if="multykeys.length", v-for="obj in multykeys", :class="getClassLoading(obj.key)")
        vue-qrcode.receive__content-qr(:value="`https://www.swapex.me/?code=${obj.key}`", :options="{ width: 200 }")
        .receive__content-cap
          i.receive__content-cap-icon.fas.fa-user-secret
          .receive__content-cap-loadbar
            .receive__content-cap-loadbar-logo
        .receive__content-info
          span.receive__content-info-text {{ obj.keyname }}
          span.receive__content-info-text {{ obj.summ }}
            i &#8372;
        button.receive__content-field(@click="clickCopy(obj.key)", type="button")
          span.receive__content-field-code {{ obj.key }}
          i.far.fa-copy.receive__content-field-icon
      //- .receive__content.receive__content--empty(v-if="!getCoin")
      .receive__content.receive__content--empty(v-if="!multykeys.length")
        .receive__content-cap
          i.receive__content-cap-icon.fas.fa-user-secret
        .receive__content-field
          span.receive__content-field-code Для создания одноразового ключа введите имя и сумму в форму ниже.
    form#generate.receive__form(@submit="onSubmit", method="post", action="/cointSWXCreateKey")
      input.receive__form-input(v-model.trim="inputKey", name="keyname", type="text", placeholder="Имя ключа", required)
      input.receive__form-input(v-model.trim="inputCount", name="coint", type="number", inputmode="decimal", placeholder="Сумма", required)
      button.receive__form-button(type="submit") Создать ключ
        i.receive__form-button-icon.fas.fa-plus
</template>

<script>
import HeadPage from '../components/HeadPage.vue';
import BaseSlider from '../components/BaseSlider.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    HeadPage,
    BaseSlider,
    VueQrcode,
  },
  data() {
    return {
      inputKey: '',
      inputCount: '',
      multykeys: [],
      switchPage: false,
    };
  },
  methods: {
    ...mapActions(['API_GET_DATA']),
    getClassLoading(key) {
      return { 'receive__content--loading': key === 'loading' }
    },
    clickCopy(key) {
      const input = document.createElement('input');
      input.setAttribute('value', key);
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
    onSubmit(e) {
      e.preventDefault();
      if (this.multykeys[0]?.key === 'loading') return;

      this.multykeys.unshift({
        key: "loading",
        keyname: '-',
        summ: '-',
      });

      const inputKey = this.inputKey;
      const inputCount = this.inputCount;
      this.inputKey = '';
      this.inputCount = '';

      if (this.multykeys.length > 1 && this.$refs.slider.getSlideActive() === 0) {
        this.$refs.slider.setSlideActive(1, false);
      }

      setTimeout(() => this.$refs.slider.setSlideActive(0), 50);
      setTimeout(() => {
        this.$set(this.multykeys, 0, {
          key: "R7A5cCN1o13TdVWL1EKZ5KKxlBWTXS8ZrMSavuHSQC0k8mEq4AdbQ6AG6rsI",
          keyname: inputKey,
          summ: inputCount,
        });
      }, 3000);
    },
  },
  computed: {
    ...mapGetters(['GET_COINS']),
    getCoin() {
      return this.GET_COINS.filter(coin => coin.name === 'SWX')[0];
    },
  },
  created() {
    this.API_GET_DATA();
  },
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
    $content: &;

    width: 100%;
    height: 316px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;

    &--loading,
    &--empty {
      #{$content}-qr {
        display: none;
      }

      #{$content}-cap {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        position: relative;
        margin-bottom: 8px;

        &::before {
          content: "";
          width: 170px;
          height: 170px;
          border: 3px solid #000;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 0;
        }

        &-icon {
          font-size: 132px;
          color: #000;
        }
      }

      #{$content}-field {
        pointer-events: none;
      }

      #{$content}-info-text i,
      #{$content}-field-icon {
        display: none;
      }
    }

    &--loading {
      #{$content}-cap {
        &-loadbar {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          position: absolute;
          z-index: 1;

          &-logo {
            width: 100%;
            height: 100%;
            background-image: url("../assets/images/logo.png");
            background-size: 35%;
            background-repeat: no-repeat;
            background-position: 50%;
            position: absolute;
            animation: rotate 1s ease infinite;

            @keyframes rotate {
              to {
                transform: rotate(360deg);
              }
            }
          }
        }
      }

      #{$content}-field-code {
        &::after {
          content: "...";
        }
      }
    }

    &--empty {
      #{$content}-field-code {
        word-break: break-word;
      }
    }

    &-qr {
      margin-bottom: 8px;
    }

    &-cap {
      display: none;
    }

    &-info {
      width: 100%;
      display: flex;

      &-text {
        width: 50%;
        font-weight: 500;
        text-align: right;
        color: #ff6800;
        padding: 0 16px;

        & + & {
          border-left: 2px solid #ff6800;
          text-align: left;
        }

        i {
          margin-left: 4px;
        }
      }
    }

    &-field {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;

      &-code {
        overflow-wrap: anywhere;
        word-break: break-all;
        font-weight: 500;
        text-align: center;
        color: #b8b8b8;
      }

      &-icon {
        margin-left: 16px;
        color: #b8b8b8;
        font-size: 18px;
      }
    }
  }

  &__form {
    padding: 0 16px;
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
</style>
