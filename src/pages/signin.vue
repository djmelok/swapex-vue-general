<template lang="pug">
.signin
  img.signin__logo(src="@/assets/images/logo.png")
  form.signin__form(@submit="checkForm", action="/user/singnin", method="post")
    .signin__form-title
      span Авторизация
    input.signin__form-input(v-model="email", name="login", type="email", placeholder="E-mail", required)
    input.signin__form-input(v-model="password", name="password", type="password", placeholder="Пароль", required)
    .g-recaptcha(data-sitekey="6LcqfoEaAAAAALUD5kGTMqfI6qgce1s-JqfuZH9a")
    button.signin__form-button(type="submit")
      i.fas.fa-sign-in-alt
      span Войти
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  created() {
    Vue.http.post('/api/errors', { withCredentials: true })
      .then(response => {
        if (response.body.length > 0) {
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
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
  },
  methods: {
    checkForm(e) {
      if (!this.email || !this.password) {
        e.preventDefault();
        return false;
      }

      if (this.password.length < 6) {
        this.$toast.error('Пароль должен быть больше 6 символов', {
          queue: true,
          duration: 2500,
          position: 'top'
        });
        this.password = '';
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

.signin {
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
      background-color: 6800;
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
