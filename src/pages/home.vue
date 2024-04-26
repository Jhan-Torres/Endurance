<template>
  <PageInProgress :pageName="'Home'"/>
  <hr class="border-gray-500 mx-20 my-1">
  <section class="font-body text-center mx-2">
    <h2 class="text-3xl uppercase text-blue-800 font-extrabold md:text-5xl">
      want a <span class="text-red-600">demo?</span>
    </h2>
    <p class="text-sm md:text-base">
      You can find <span class="font-bold">credentials</span> in the <span class="font-bold">login</span> form
    </p>
  </section>
</template>

<script setup>
import PageInProgress from '@/components/PageInProgress.vue';
</script>
