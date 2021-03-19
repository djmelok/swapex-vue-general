<template lang="pug">
.pre-check
  ProgressStep(title="Pre-check", :step="4")
  .pre-check__content
    .pre-check__list
      template(v-for="(item, idx) in transferCheck")
        .pre-check__list-title(:class="{ 'pre-check__list-title--head': !idx }") {{ item.title }}
        .pre-check__list-value(:class="{ 'pre-check__list-value--head': !idx }") {{ item.value }}
    .pre-check__list
      template(v-for="(item, idx) in receiveCheck")
        .pre-check__list-title(:class="{ 'pre-check__list-title--head': !idx }") {{ item.title }}
        .pre-check__list-value(:class="{ 'pre-check__list-value--head': !idx }") {{ item.value }}
      BaseSubmit(title="Подтверждаю", hasBack)
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
      transferCheck: [
        { title: 'Отдаете: Hryvnia', value: '2000 UAH' },
        { title: 'Курс обмена 1 ETH', value: '45000.54 UAH' },
        { title: 'Комиссия банка 1.5% + 5 UAH', value: '34.48 UAH' },
        { title: 'Комиссия провайдера 0% + 0.0005 ETH', value: '225.05 UAH' },
        { title: 'Комиссия Swapex 0.5%', value: '9.83 UAH' },
      ],
      receiveCheck: [
        { title: 'Получите: Ethereum', value: '0.03845 ETH' },
        { title: 'Курс обмена 1 ETH', value: '45000.54 UAH' },
        { title: 'Комиссия банка 1.5% + 5 UAH', value: '34.48 UAH' },
        { title: 'Комиссия провайдера 0% + 0.0005 ETH', value: '225.05 UAH' },
        { title: 'Комиссия Swapex 0.5%', value: '9.83 UAH' },
      ]
    };
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";
.pre-check {
  padding: 12px;

  &__content {
    margin-top: 140px;
    margin-bottom: 48px;
  }

  &__list {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    color: #dadada;

    & + & {
      margin-top: 24px;
      padding-top: 24px;
      position: relative;

      &::before {
        content: "";
        width: 80%;
        height: 2px;
        border-radius: 4px;
        background-color: #dadada;
        transform: translateX(-50%);
        position: absolute;
        top: -1;
        left: 50%;
        z-index: 0;
      }
    }

    &-title {
      margin-left: 12px;
    }

    &-value {
      margin-right: 12px;
      justify-content: flex-end;
      font-weight: bold;
    }

    &-title,
    &-value {
      display: inline-flex;
      align-items: center;
      margin-bottom: 12px;

      &--head {
        font-size: 24px;
        font-weight: bold;
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
