<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useWebTgApp} from "@/shared/store/tg/tgWebApp.js";

tgWebApp = useWebTgApp()

tgWebApp.init()
</script>
