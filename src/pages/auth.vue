<template>
  <section class="p-2 bg-gray-800 fixed inset-0 border-2 z-10 font-body border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200 md:p-3">
    <UserForm 
      :case="'login'"
    />
  </section>
</template>

<script setup>
import UserForm from '@/components/UserForm.vue';
</script>
