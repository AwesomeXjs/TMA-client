<script setup lang="js">

import {useWebTgApp} from "@/shared/store";

const nuxtApp = useNuxtApp();



// example composables
const { sayExample } = useExample();
sayExample();
const tgWebApp = useWebTgApp()

  tgWebApp.init()


onMounted(() => {
  nuxtApp.$sayHello();
  // example plugins

});
</script>

<template>
  <h1>Hello Telegram mini app, my name is {{tgWebApp.first_name}}</h1>
</template>

<style scoped></style>
