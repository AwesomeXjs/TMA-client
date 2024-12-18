<script setup lang="ts">

</script>

<template>
  <ClientOnly>
    <header>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/">Contacts</NuxtLink>
    </header>
    <main>
      <slot></slot>
    </main>
  </ClientOnly>
</template>

<style scoped></style>
