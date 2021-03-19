<template lang="pug">
.index-sidebar(:class="getOpenClass")
  .index-sidebar__head
    span.index-sidebar__head-title Настройки
    button.index-sidebar__head-button(type="button", @click="CLOSE_SIDEBAR")
      i.fas.fa-times
  .index-sidebar__content
    .index-sidebar__content-title Профиль
    button.index-sidebar__content-button(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-user
      .index-sidebar__content-button-title Профиль
      .index-sidebar__content-button-action
        i.fas.fa-chevron-right
    button.index-sidebar__content-button(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-coins
      .index-sidebar__content-button-title Монеты
      .index-sidebar__content-button-action
        i.fas.fa-chevron-right
    button.index-sidebar__content-button(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-sign-out-alt
      .index-sidebar__content-button-title Выход
      .index-sidebar__content-button-action
        i.fas.fa-chevron-right

    .index-sidebar__content-title Безопасность
    button.index-sidebar__content-button(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-lock
      .index-sidebar__content-button-title PIN-код
      .index-sidebar__content-button-action
        BaseSwitch

    .index-sidebar__content-title Другое
    button.index-sidebar__content-button.index-sidebar__content-button--disabled(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-moon
      .index-sidebar__content-button-title Темный режим
        .index-sidebar__content-button-title-state Включен
      .index-sidebar__content-button-action
        BaseSwitch(checked)
    button.index-sidebar__content-button.index-sidebar__content-button--disabled(type="button")
      .index-sidebar__content-button-icon
        i.fas.fa-language
      .index-sidebar__content-button-title Language
        .index-sidebar__content-button-title-state Русский
      .index-sidebar__content-button-action
        i.fas.fa-chevron-right
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseSwitch from '../components/BaseSwitch.vue';

export default {
  components: {
    BaseSwitch,
  },
  computed: {
    ...mapGetters(['GET_STATUS_SIDEBAR']),
    getOpenClass() {
      return {
        'index-sidebar--open': this.GET_STATUS_SIDEBAR
      }
    }
  },
  methods: {
    ...mapActions(['CLOSE_SIDEBAR'])
  }
}
</script>

<style lang="scss">
.index-sidebar {
  width: 100%;
  min-height: 100vh;
  background: #141414;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: linear-gradient(to right, #f8880f, #ed5314);
  }

  &--open {
    transform: translateX(0);
  }

  &__head {
    display: flex;
    align-items: center;
    padding: 24px;
    background-color: #2e2e2e;
    position: sticky;
    top: 0;

    &-title {
      margin: 0 auto;
      text-transform: uppercase;
      font-weight: 500;
      color: #b8b8b8;
    }

    &-button {
      width: 24px;
      margin-left: -24px;
      color: #dadada;
      font-size: 24px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 0 12px;

    &-title {
      margin-top: 24px;
      margin-bottom: 4px;
      margin-left: 12px;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 500;
      color: #b8b8b8;
    }

    &-button {
      display: flex;
      align-items: center;
      flex-grow: 1;
      padding: 12px 0;
      font-size: 16px;

      &--disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      & + & {
        border-top: 1px solid #252525;
      }

      &-icon {
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        background-color: #252525;
        border-radius: 50%;
        color: #dadada;
      }

      &-title {
        font-weight: 500;
        color: #dadada;
        margin-right: auto;

        &-state {
          margin-top: 2px;
          text-align: left;
          font-size: 10px;
          font-weight: 700;
          color: #999;
        }
      }

      &-action {
        color: #dadada;
      }
    }
  }
}
</style>
