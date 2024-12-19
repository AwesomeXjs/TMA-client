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
  console.log(tgWebApp.dataSafe)
  const queryParams = new URLSearchParams(tgWebApp.dataSafe);
  const hash = queryParams.get('hash')
  queryParams.delete('hash')
  queryParams.sort()

  let dataCheckingString = "";
  for (const [key, value] of queryParams.entries()) {
    dataCheckingString += `${key}=${value}\n`
  }
  
  dataCheckingString = dataCheckingString.slice(0, -1)
  console.log(dataCheckingString)
  let dataUrl = [dataCheckingString, hash]

  try {
    const response = await $fetch(`/api/v1/test-validate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataUrl),
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
