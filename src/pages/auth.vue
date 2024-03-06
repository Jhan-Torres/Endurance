<template>
  <div class="extended bg-gray-600 py-10 px-2">
    <div class="rounded-t-lg text-lg font-bold font-body text-center bg-gray-300 text-gray-600 border-b border-gray-400 mx-auto max-w-xl">
      <ul class="flex justify-center">
        <li>
          <a 
            href="#" 
            class="inline-block py-2 px-4 border-x-2 border-transparent hover:text-gray-500 hover:border-gray-500"
            :class="{'text-blue-600 border-blue-600 border-b-2': active}"
          >
            Login
          </a>
        </li>
        <li>
          <a 
            href="#" 
            class="inline-block py-2 px-4 border-x-2 border-transparent hover:text-gray-500 hover:border-gray-500"
            :class="{'text-blue-600 border-blue-600 border-b-2': active}"
          >
            Signup
          </a>
        </li>
      </ul>
    </div>
    <section class="font-body flex flex-col items-center justify-center animate-fade-up animate-duration-[800ms] animate-delay-200">
      <Form 
        :case="'login'"
      />
    </section>
  </div>
</template>

<script setup>
import Form from '@/components/login-signup/Form.vue';
import { ref } from 'vue';

const active = ref(false);
</script>

<style>
/* .extended {
  min-height: calc(100vh - 148px);
} */
</style>
