<template>
  <PageInProgress :pageName="'Home'"/>
  <section class="font-body">
    <h2 class="text-center text-5xl uppercase font-extrabold">
      want a demo?
    </h2>
    <p class="text-center">
      Login with <strong class="text-amber-600">demo@endurance.com</strong> and <strong class="text-amber-600">endurancedemo</strong> 
    </p>
  </section>
</template>

<script setup>
import PageInProgress from '@/components/PageInProgress.vue';
</script>
