<template lang="pug">
.cards
  ProgressStep(title="Выберите карту", :step="3")
  .cards__content
    img.cards__content-logo(src="../assets/images/icons/visa-master-dark.png")
    .cards__content-card(v-for="card in saveCards")
      .cards__content-card-number {{ card.number }}
      .cards__content-card-name {{ card.name }}
      .cards__content-card-date {{ card.date }}
    a.cards__content-add(href="#")
      i.fas.fa-plus.cards__content-add-icon
      span.cards__content-add-text Добавить карту
    BaseSubmit(title="Далее", hasBack)
</template>

<script>
import ProgressStep from '../components/ProgressStep.vue';
import BaseSubmit from '../components/BaseSubmit.vue';

export default {
  components: {
    ProgressStep,
    BaseSubmit,
  },
  data() {
    return {
      saveCards: [
        { number: '4441 **** 9634', name: 'Александр Петров', date: '12/24' },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";
.cards {
  padding: 12px;

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 140px;
    margin-bottom: 48px;

    &-logo {
      width: 140px;
      height: 60px;
      border-radius: 12px;
      background-color: #dadada;
      padding: 16px;
      margin: 0 auto;
    }

    &-card {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: auto;
      color: #dadada;
      border: 2px solid #dadada;
      border-radius: 12px;
      padding: 12px 0;
      margin-top: 16px;

      &-number {
        grid-row-start: 1;
        grid-row-end: 3;
        margin: auto;
        font-weight: bold;
      }

      &-name,
      &-date {
        font-weight: bold;
        border-left: 2px solid #dadada;
        padding: 0 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-name {
        color: #636363;
      }
    }

    &-add {
      width: 100%;
      margin-top: 24px;
      padding: 16px 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      &-icon {
        color: #dadada;
        font-size: 12px;
      }

      &-text {
        margin-left: 8px;
        text-transform: uppercase;
        font-weight: bold;
        color: #dadada;
      }
    }
  }
}
</style>
