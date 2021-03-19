<template lang="pug">
.coin.content
  HeadPage(title="Bitcoin")
  .coin__info
    .coin__info-head
      img.coin__info-head-icon(src="../assets/images/crypto/png/btc.png")
      .coin__info-head-text
        span.coin__info-head-text-name Bitcoin
        .coin__info-head-text-field
          span.coin__info-head-text-field-code {{ shortCode }}
          button.coin__info-head-text-field-button(type="button", @click="clickCopy")
            i.far.fa-copy.coin__info-head-text-field-button-icon
    .coin__info-balance
      .coin__info-balance-crypto 0
      .coin__info-balance-dollars $ 0
  .coin__links
    a.coin__links-link(href="/")
      img.coin__links-link-icon(src="../assets/images/icons/arrow_line_down_left_light.png")
      span.coin__links-link-text Получить
    a.coin__links-link(href="/")
      i.fas.fa-shopping-cart.coin__links-link-icon
      span.coin__links-link-text Купить
    a.coin__links-link(href="/")
      img.coin__links-link-icon(src="../assets/images/icons/arrow_line_up_right_light.png")
      span.coin__links-link-text Отправить
</template>

<script>
import { mapGetters } from 'vuex';
import HeadPage from '../components/HeadPage.vue';

export default {
  components: {
    HeadPage,
  },
  data() {
    return {
      code: 'O7K5lgl0wXU4U7Wf89r3r48fBM6fIhpnEgoakcbfBy6kQ8evqJGxUbGBsXa5MQ2uiSbKSi0bs9N0ba1FJMA3dJJVKtF817v'
    };
  },
  computed: {
    ...mapGetters(['GET_COINS']),
    shortCode() {
      const length = this.code.length;
      return `${this.code.slice(0, 6)}.....${this.code.slice(length - 6, length)}`;
    }
  },
  methods: {
    clickCopy() {
      const input = document.createElement('input');
      input.setAttribute('value', this.code);
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

.coin {
  $self: &;

  width: 100%;
  display: flex;
  flex-direction: column;
  color: #dadada;

  &__info {
    display: flex;
    flex-direction: column;
    background: linear-gradient(45deg, #1e1e1e, #252525);
    border-radius: 12px;
    padding: 16px;
    flex-grow: 1;

    &-head {
      display: flex;

      &-icon {
        width: 56px;
        height: 56px;
      }

      &-text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-grow: 1;
        margin-left: 16px;

        &-name {
          text-transform: uppercase;
          font-weight: 500;
        }

        &-field {
          display: flex;
          align-items: center;

          &-code {
            max-width: calc(100% - 80px);
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
            color: #b8b8b8;
          }

          &-button {
            margin-left: 16px;

            &-icon {
              color: #b8b8b8;
              font-size: 18px;
            }
          }
        }
      }
    }

    &-balance {
      flex-grow: 1;
      padding: 18px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-crypto {
        font-size: 48px;
        font-weight: 300;
      }

      &-dollars {
        margin-top: 6px;
        font-size: 14px;
        color: #b8b8b8;
      }
    }
  }

  &__links {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-link {
      width: 30%;
      padding: 12px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 12px;
      border: 2px solid #dadada;
      font-size: 16px;
      color: #dadada;

      &-icon {
        width: 22px !important;
        height: 22px;
        margin-bottom: 4px;
        color: #dadada;
      }
    }
  }
}
</style>
