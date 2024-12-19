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
  try {
    const response = await $fetch('/api/v1/test-validate', {
      params: {
        id: tgWebApp.dataUnsafe.user.id,
        hash: tgWebApp.dataUnsafe.hash,
        first_name: tgWebApp.dataUnsafe.user.first_name,
        auth_date: tgWebApp.dataUnsafe.auth_date
      },
      baseURL: 'http://127.0.0.1:8080',
    })

    console.log("response: ", response)

  } catch (error) {
    console.log("error: ", error)
  }
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
