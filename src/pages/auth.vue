<template>
  <div class="extended bg-gray-600 px-1 py-2 md:px-3">
    <div class="rounded-lg overflow-hidden text-lg font-bold font-body bg-gray-300 text-gray-600 border-b border-gray-400 mx-auto max-w-xl select-none">
      <ul class="flex justify-center">
        <li
          class="inline-block py-1 px-6 cursor-pointer md:py-2"
          :class="
            {'border-b-4 border-r-2 border-r-gray-400 text-blue-600 border-blue-600': activeForm === 'login', 
            'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'signup'}"
          @click="activeForm = 'login'"
        >
          <span class="text-sm md:text-base">Login</span>
        </li>
        <li
          class="inline-block py-1 px-6 cursor-pointer md:py-2"
          :class="
            {'border-b-4 border-l-2 border-l-gray-400 text-blue-600 border-blue-600': activeForm === 'signup', 
            'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'login'}"
          @click="activeForm = 'signup'"
        >
          <span class="text-sm md:text-base">Signup</span>
        </li>
      </ul>
      <section>
        <Form 
          v-if="activeForm === 'login'"
          :case="'login'"
          @login="handleLogin" 
          @changeForm="handleChangeForm"
        />
        <Form
          v-else
          :case="'signup'"
          @changeForm="handleChangeForm"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import Form from '@/components/login-signup/Form.vue';
import { ref } from 'vue';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'; //we´re importing a function, needs to execute later

const activeForm = ref('login');

function handleChangeForm(action) {
  activeForm.value = (action === 'login') ? 'signup' : 'login';
}

function handleLogin(userCredentials) {
  useFirebaseAuth().userLogin(userCredentials);
}
</script>
