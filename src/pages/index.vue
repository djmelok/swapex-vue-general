<template lang="pug">
.index
  IndexHeader
  IndexSidebar
  IndexContent
  IndexNav
</template>

<script>
import IndexHeader from '../components/IndexHeader.vue';
import IndexSidebar from '../components/IndexSidebar.vue';
import IndexContent from '../components/IndexContent.vue';
import IndexNav from '../components/IndexNav.vue';

export default {
  components: {
    IndexHeader,
    IndexSidebar,
    IndexContent,
    IndexNav
  },
};
</script>


<style lang="scss">
@import "~/src/assets/styles/settings.scss";
</style>
