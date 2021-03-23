<template lang="pug">
.login
  img.login__logo(src="@/assets/images/logo.png")
  BaseCheckbox(@change="changeCheckbox")
    | Я прочитал и согласен с&nbsp;
    a(href="/erms") условиями пользованиями&nbsp;
    | и&nbsp;
    a(href="/policy") политикой конфиденциальности
  .login__buttons
    a.login__button.login__button--signin(:class="getClassName", href="/user/singnin")
      i.fas.fa-sign-in-alt
      span Войти
    a.login__button.login__button--google(:class="getClassName", href="/auth/google")
      i.fab.fa-google
    //- ButtonTelegram
    a.login__button.login__button--telegram.login__button--disabled(:class="getClassName", href="/auth/telegram")
      i.fab.fa-telegram-plane
    a.login__button.login__button--signup(:class="getClassName", href="/user/registration")
      i.fas.fa-sign-up-alt
      span Зарегистрироваться
</template>

<script>
import BaseCheckbox from '../components/BaseCheckbox.vue'
import ButtonTelegram from '../components/ButtonTelegram.vue'

export default {
  components: {
    BaseCheckbox,
    ButtonTelegram,
  },
  data() {
    return {
      checkbox: false
    };
  },
  computed: {
    getClassName() {
      return {
        'login__button--disagree': !this.checkbox
      };
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
  },
  methods: {
    changeCheckbox(e) {
      console.log('changeCheckbox', e);
      this.checkbox = e;
    },
    resizeHandler() {
      if (window.innerHeight === this.oldHeight) return;
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      this.oldHeight = window.innerHeight;
    }
  }
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.login {
  height: calc((var(--vh, 1vh) * 100));
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__logo {
    width: 212px;
    height: auto;
  }

  &__buttons {
    width: 100%;
    display: grid;
    grid-template-columns: auto 60px 60px;
    grid-template-rows: auto auto;
    margin-top: 12px;
  }

  &__button {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    padding: 12px;
    transition: background-color 0.3s ease, opacity 0.3s ease, color 0.3s ease;

    &--disabled,
    &--disagree {
      pointer-events: none;
    }

    &--signin,
    &--signup {
      width: 100%;
      background-color: #ff6800;
      color: #fff;
    }

    &--signip {
      i {
        margin-left: -14px;
      }
    }

    &--signup {
      grid-column-start: 1;
      grid-column-end: 4;
      margin-top: 12px;
    }

    &--google {
      margin-left: 12px;
      background-color: #fff;
      color: #26a2e1;
    }

    &--telegram {
      margin-left: 12px;
      background-color: #26a2e1;
      color: #fff;
    }

    &--disagree,
    &--disabled {
      background-color: #ccc;
      color: #fff;
    }

    span {
      text-transform: uppercase;
      font-weight: 500;
      margin-left: 8px;
    }
  }
}
</style>
