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
      .swipeout-action(@click="receiveCoin(item)")
        img.swipeout-action__img(src="../assets/images/icons/arrow_line_down_left_light.png")
      .swipeout-action(@click="transferCoin(item)")
        img.swipeout-action__img(src="../assets/images/icons/arrow_line_up_right_light.png")
    template(v-slot:right="{ item }")
      .swipeout-action(@click="removecoint(item)")
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
    ...mapActions(['API_GET_COINS']),

    removecoint(e) {
      console.log(e)
    },receiveCoin(e) {
      this.$http.get(`/cointReceive/${e.name}`).then(response => {
        console.log('receive response', response);
      }, error => {
        console.error(error)
      });
    },
    transferCoin(e) {
      this.$http.get(`/cointSend/${e.name}`).then(response => {
        console.log('transfer response', response);
      }, error => {
        console.error(error)
      });
    },
    clickItem(e) {
      console.log(e, 'click coin');
    }
  },
  created() {
    this.API_GET_COINS();
  }
};
</script>

<style lang="scss">
[v-cloak] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999;
  background: red;
}

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
