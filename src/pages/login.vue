<template lang="pug">
.login
  img.login__logo(src="@/assets/images/logo.png")
  .login__checkbox
    input#checkbox.login__checkbox-input(v-model="checkbox", type="checkbox", name="checkbox")
    label.login__checkbox-label(for="checkbox")
      span.login__checkbox-label-text
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
import ButtonTelegram from '../components/ButtonTelegram.vue'

export default {
  components: {
    ButtonTelegram
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

  &__checkbox {
    display: flex;
    align-items: center;

    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;

      &:checked {
        & + .login__checkbox-label::before {
          border-color: #ff6800;
          background-color: #ff6800;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }
      }
    }

    &-label {
      margin: 24px 0;
      display: inline-flex;
      align-items: center;
      user-select: none;
      cursor: pointer;

      &::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #adb5bd;
        border-radius: 6px;
        margin-right: 12px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
      }

      &-text {
        color: #fff;

        a {
          font-weight: 500;
          color: #ff6800;
        }
      }
    }
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
