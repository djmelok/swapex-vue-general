<template>
  <vue-telegram-login
    mode="callback"
    telegram-login="test_auth_swipe_bot"
    size="large"
    radius="20"
    :userpic="false"
    @callback="onTelegramAuth(user)"
  />
</template>

<script>
import { vueTelegramLogin } from 'vue-telegram-login'

export default {
  components: { vueTelegramLogin },
  methods: {
    onTelegramAuth(user) {
      window.location.replace('/telegram/hash?id=' + user.id + '&first_name=' + user.first_name + '&last_name=' + user.last_name + '&username=' + user.username + '&photo_url=' + user.photo_url + '&auth_date=' + user.auth_date + '&hash=' + user.hash);
    }
  },
};
</script>