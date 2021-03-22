<template lang="pug">
.index-content.content
  CardProfile
  SwipeList(:items="GET_COINS", item-key="id", @swipeout:click="clickItem")
    template(v-slot="{ item }")
      CardCoin(
        :logo="item.logo",
        :name="item.name",
        :amount="item.amount / 100",
        :fullName="item.fullName",
        :fullAmount="item.fullAmount",
        :rate="item.rate",
        :ratePercent="item.ratePercent"
      )
    template(v-slot:left="{ item }")
      a.swipeout-action(:href="`/cointReceive/${item.name}`")
        img.swipeout-action__img(src="../assets/images/icons/arrow_line_down_left_light.png")
      a.swipeout-action(:href="`/cointSend/${item.name}`")
        img.swipeout-action__img(src="../assets/images/icons/arrow_line_up_right_light.png")
    template(v-slot:right="{ item }")
      .swipeout-action(@click="REMOVE_COIN(item)")
        i.fas.fa-minus
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { SwipeList } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';
import CardProfile from '../components/CardProfile.vue';
import CardCoin from '../components/CardCoin.vue';

export default {
  components: {
    SwipeList,
    CardProfile,
    CardCoin,
  },
  computed: {
    ...mapGetters(['GET_COINS']),
  },
  methods: {
    ...mapMutations(['REMOVE_COIN']),
    ...mapActions(['API_GET_DATA']),
    clickItem(e) {
      window.location.href = `/coint/${e.name}`;
    }
  },
  created() {
    this.API_GET_DATA();
  }
};
</script>

<style lang="scss">
.swipeout {
  $self: &;

  &-list-item {
    margin-top: 12px;
  }

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }

  &-left #{$self}-action {
    margin-left: 0;
  }

  &-right #{$self}-action {
    margin-right: 0;
  }

  &-action {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #999;
    margin: 12px;
    color: #fff;

    &__img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
