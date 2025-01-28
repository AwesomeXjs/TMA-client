<script setup lang="js">
import {useWebTgApp} from "@/shared/store";
import {MainButton} from "vue-tg";

const nuxtApp = useNuxtApp();

// example composables
const {sayExample} = useExample();
sayExample();


const tgWebApp = useWebTgApp()
tgWebApp.init()


const tryValidate = async () => {
  if (tgWebApp.userAuthToken == null) {
    tgWebApp.setUserAuthToken()
  }

  await nuxtApp.$apiService.createPortfolio({
    name: "test",
    ownerID: tgWebApp.dataUnsafe.user.id
  }, tgWebApp.userAuthToken)
}

onMounted(() => {
  nuxtApp.$sayHello();
  // example plugins

});
</script>


<template>
  <div v-if="tgWebApp.dataUnsafe">

    <h1>Hello Telegram mini app, my name is {{ tgWebApp.dataUnsafe.user.first_name }}</h1>
    <MainButton @click="tryValidate"/>
  </div>
  <!--  <ClosingConfirmation/>-->
</template>

<style scoped></style>
