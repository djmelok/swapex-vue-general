<template lang="pug">
.provider
  ProgressStep(title="Выберите провайдера", :step="2")
  form.provider__content
    CardProvider.provider__content-card(logo="kuna.png", best)
    CardProvider.provider__content-card(logo="kuna.png")
    CardProvider.provider__content-card(logo="kuna.png", problem="У провайдера есть ограничение по сумме: min 19231 UAH")
    BaseSubmit(title="Далее", hasBack)
</template>

<script>
import ProgressStep from '../components/ProgressStep.vue';
import CardProvider from '../components/CardProvider.vue';
import BaseSubmit from '../components/BaseSubmit.vue';

export default {
  components: {
    ProgressStep,
    CardProvider,
    BaseSubmit
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/settings.scss";

.provider {
  padding: 12px;

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 148px;
    margin-bottom: 48px;

    &-card {
      margin-bottom: 16px;
    }
  }
}
</style>
