<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl mb-4">
        Beachhacks Demo App
      </h1>

      <AppProducts/>

      <hr class="my-12">

      <AppChat/>
    </div>
  </div>
</template>

<script setup>
import AppChat from "~/components/AppChat.vue";
import AppProducts from "~/components/AppProducts.vue";
</script>