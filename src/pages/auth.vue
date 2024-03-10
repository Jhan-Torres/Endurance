<template>
  <div class="extended bg-gray-600 px-1 py-2 md:px-3">
    <div class="rounded-t-lg text-lg font-bold font-body text-center bg-gray-300 text-gray-600 border-b border-gray-400 mx-auto max-w-xl select-none">
      <ul class="flex justify-center">
        <li>
          <a 
            href="#" 
            class="inline-block py-1 px-6 md:py-2"
            :class="
              {'border-b-4 border-r-2 border-r-gray-400 text-blue-600 border-blue-600': activeForm === 'login', 
              'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'signup'}"
            @click="activeForm = 'login'"
          >
            <span class="text-sm md:text-base">Login</span>
          </a>
        </li>
        <li>
          <a 
            href="#" 
            class="inline-block py-1 px-6 md:py-2"
            :class="
              {'border-b-4 border-l-2 border-l-gray-400 text-blue-600 border-blue-600': activeForm === 'signup', 
              'border-b-4 border-transparent hover:text-gray-500 hover:border-gray-500' : activeForm === 'login'}"
            @click="activeForm = 'signup'"
          >
            <span class="text-sm md:text-base">Signup</span>
          </a>
        </li>
      </ul>
    </div>
    <section class="font-body flex flex-col items-center justify-center">
      <Form 
        v-if="activeForm === 'login'"
        :case="'login'"
        @loginUser="handleLoginUser" 
        @changeForm="handleChangeForm"
      />
      <Form
        v-else
        :case="'signup'"
        @changeForm="handleChangeForm"
      />
    </section>
  </div>
</template>

<script setup>
import Form from '@/components/login-signup/Form.vue';
import { ref } from 'vue';

//vue router import to change url after login or signup
import router from '@/router'; 

//auth imports from firebase
import { userAuth, signInWithEmailAndPassword } from '@/firebase';

const activeForm = ref('login');

function handleChangeForm(action) {
  activeForm.value = (action === 'login') ? 'signup' : 'login';
}

function handleLoginUser(userCredentials) {
  //authenticate
  signInWithEmailAndPassword(userAuth, userCredentials.email, userCredentials.password)
  .then(() => {
    alert("succed");

    //to go after correct login
    router.push('/');
  })
  .catch((error) => {
    alert(error.message);
  });
}
</script>
