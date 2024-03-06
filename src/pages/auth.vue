<template>
  <div class="extended bg-gray-600 py-10 px-2">
    <div class="rounded-t-lg text-lg font-bold font-body text-center bg-gray-300 text-gray-600 border-b border-gray-400 mx-auto max-w-xl select-none">
      <ul class="flex justify-center">
        <li>
          <a 
            href="#" 
            class="inline-block py-2 px-4"
            :class="
              {'border-b-4 border-r-2 border-r-gray-400 text-blue-600 border-blue-600': activeForm === 'login', 
              'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'signup'}"
            @click="activeForm = 'login'"
          >
            Login
          </a>
        </li>
        <li>
          <a 
            href="#" 
            class="inline-block py-2 px-4"
            :class="
              {'border-b-4 border-l-2 border-l-gray-400 text-blue-600 border-blue-600': activeForm === 'signup', 
              'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'login'}"
            @click="activeForm = 'signup'"
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

const activeForm = ref('login');
</script>

<style>
/* .extended {
  min-height: calc(100vh - 148px);
} */
</style>
