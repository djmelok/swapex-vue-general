<template lang="pug">
.signup
  img.signup__logo(src="@/assets/images/logo.png")
  form.signup__form(@submit="checkForm", action="/user/registry" method="post")
    .signup__form-title
      span Регистрация
    input.signup__form-input(v-model="key", type="hidden", name="ref", readonly)
    input.signup__form-input(v-model="email", type="email",name="email", placeholder="E-mail", required)
    input.signup__form-input(v-model="password", type="password",name="password", placeholder="Пароль", required)
    input.signup__form-input(v-model="passwordAgain", type="password",name="ConfirmPassword", placeholder="Повторный пароль", required)
    button.signup__form-button(type="submit")
      i.fas.fa-sign-in-alt
      span Зарегистрироваться
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordAgain: '',
      key: '',
      errors:""
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  created() {
    let url = Object.fromEntries(new URL(window.location).searchParams.entries());
    this.key = url.ref ? url.ref : '';
    Vue.http.post('/api/errors', { withCredentials: true })
        .then(response => {
          if(response.body.length > 0){
            this.$toast.error(response.body[0], {
              queue: true,
              duration: 2500,
              position: 'top'
            });
          }
        }, error => {
          console.error(error)
        });
  },
  mounted() {
    this.resizeHandler();
  },
  methods: {
    resetInput() {
      this.password = '';
      this.passwordAgain = '';
    },
    checkForm(e) {
      if (!this.email || !this.password || !this.passwordAgain) {
        e.preventDefault();
        return false;
      }

      if (this.password !== this.passwordAgain) {
        this.$toast.error('Пароли не совпадают', {
          queue: true,
          duration: 2500,
          position: 'top'
        });
        this.resetInput();
        e.preventDefault();
      } else if (this.password.length < 6) {
        this.$toast.error('Пароль должен быть больше 6 символов', {
          queue: true,
          duration: 2500,
          position: 'top'
        });
        this.resetInput();
        e.preventDefault();
      }
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

.signup {
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
