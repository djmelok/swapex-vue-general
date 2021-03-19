<template lang="pug">
nav.index-nav
  a.index-nav__link(href="/pay")
    i.index-nav__link-icon.fas.fa-shopping-cart
    span.index-nav__link-text Купить
  a.index-nav__link(href="#")
    i.index-nav__link-icon.fas.fa-sync-alt
    span.index-nav__link-text Обменять
  a.index-nav__link(href="/output")
    i.index-nav__link-icon.fas.fa-money-bill-alt
    span.index-nav__link-text Продать
  a.index-nav__link(href="#")
    i.index-nav__link-icon.far.fa-window-restore
    span.index-nav__link-text Проверить
</template>

<style lang="scss">
.index-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e2e2e;
  padding: 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #999;

    &-icon {
      font-size: 16px;
    }

    &-text {
      margin-top: 4px;
      font-size: 12px;
    }

    &.nuxt-link-exact-active {
      color: #f8880f;
    }
  }
}
</style>
