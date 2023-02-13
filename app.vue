<template>
  <NuxtPage/>
</template>
<script>

import {loadScript} from "vue-plugin-load-script";

export default {
  data() {
    return {}
  },
  // mounted() {
  //   console.log(`mounted`, this.$config.public.accountId);
  //   const playerUrl = `https://players.brightcove.net/${this.$config.public.accountId}/${this.$config.public.playerId}_default/index.min.js`
  //   loadScript(playerUrl).then(() => {
  //     console.log(`load player script ok`);
  //   }).catch(console.error);
  // },
  methods: {}
}
</script>
