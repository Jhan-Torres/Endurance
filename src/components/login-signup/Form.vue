<template>
  <div class="w-full max-w-xl px-2 py-1 bg-[#99bde0] animate-fade-down animate-duration-[500ms] animate-delay-100 md:px-4">
    <h2 
      class="text-xl font-bold text-sky-800 text-shadow shadow-gray-500 select-none first-letter:uppercase md:text-2xl"
      v-if="props.case === 'login'"
    >
      great to see you again!
    </h2>

    <h2 
      class="text-xl font-bold text-sky-800 text-shadow shadow-gray-500 select-none first-letter:uppercase md:text-2xl"
      v-else
    >
      let's create an account
    </h2>

    <p 
      class="text-sm"
      v-if="props.case === 'login'"
    >
      You can login with <strong class="text-amber-600 select-text">demo@endurance.com</strong> 
      and <strong class="text-amber-600 select-text">endurancedemo</strong> for a demo.
    </p>

    <!-- Login Form -->
    <form 
      class="mt-5 space-y-4"
      v-if="props.case === 'login'"
    >
      <div>
        <label 
          for="email" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          placeholder="name@company.com"
          required
          autocomplete="off"
          v-model="userData.email"
        />
      </div>
      <div>
        <label 
          for="password" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Password
        </label>
        <input 
          :type="passwordType"
          name="password"
          id="password" 
          placeholder="••••••••••" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          required
          autocomplete="off"
          v-model="userData.password"
        />
        <button 
          @click.prevent="handleVisiblePassword" 
          class="ml-2"
        >
          <font-awesome-icon
            v-if="passwordVisible"
            :icon="['fas', 'eye']"
          />
          <font-awesome-icon 
            v-else
            :icon="['fas', 'eye-slash']" 
          />
        </button>
      </div>
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="remember" 
            aria-describedby="remember" 
            name="remember" 
            type="checkbox" 
            class="w-4 h-4 border-gray-300 rounded focus:ring-3 focus:ring-blue-300"
            autocomplete="off"
            v-model="userData.remember"
          />
        </div>
        <div class="ms-1 text-sm">
          <label 
            for="remember" 
            class="font-bold text-gray-600"
          >
            Remember me
          </label>
        </div>
        <a 
          href="#" 
          class="ms-auto text-sm font-bold text-blue-600 hover:underline"
          @click="lostPassword"
        >
          Lost Password?
        </a>
      </div>
      <button 
        type="submit" 
        class="w-full py-2 bg-blue-700 rounded-lg hover:bg-blue-800"
        @click.prevent="login"
      >
        <span 
          class="text-white text-xs md:text-sm"
        >
          Login to your account
        </span>
      </button>
      <div 
        class="font-bold text-gray-900 text-xs md:text-sm"
      >
        <span>
          New around here?
        </span>
        <span 
          class="text-blue-600 ml-2 hover:underline hover:cursor-pointer" 
          @click="changeForm"
        >
          Create account
        </span>
      </div>
    </form>

    <!-- Signup Form -->
    <form 
      class="mt-2 space-y-4 md:space-y-2"
      v-else
    >
      <div>
        <label 
          for="userName" 
          class="block font-bold text-gray-900 text-xs md:text-sm"
        >
          Full name
        </label>
        <input 
          type="text" 
          name="userName" 
          id="userName" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          placeholder="user name"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="email" 
          class="block font-bold text-gray-900 text-xs md:text-sm"
        >
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          placeholder="Example: name@company.com"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="password" 
          class="block font-bold text-gray-900 text-xs md:text-sm"
        >
          Create a password
        </label>
        <input 
          type="password"
          name="password" 
          id="password" 
          placeholder="••••••••••" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="passwordConfirm" 
          class="block font-bold text-gray-900 text-xs md:text-sm"
        >
          Confirm password
        </label>
        <input 
          type="password"
          name="passwordConfirm" 
          id="passwordConfirm"
          placeholder="••••••••••" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          required
          autocomplete="off"
        />
      </div>
      <button 
        type="submit" 
        class="w-full py-2 bg-blue-700 rounded-lg cursor-not-allowed hover:bg-blue-800"
        @click.prevent="signupUser"
      >
        <span 
          class="text-white text-xs md:text-sm"
        >
          Register your account
        </span>
      </button>
      <div 
        class="font-bold text-gray-900 text-xs md:text-sm"
      >
        <span>
          Have an account already?
        </span>
        <span 
          class="text-blue-600 ml-2 hover:underline hover:cursor-pointer" 
          @click="changeForm"
        >
          Login your account
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

//data refs
const userData = ref({});
const passwordVisible = ref(false)
const passwordType = ref("password");

//PROPS & EMITS
const props = defineProps({
  case: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["login", "signupUser", "lostPassword", "changeForm"]);

function login() {
  if(!validateFields()) return;

  emits("login", userData.value);
}

function signupUser() {
  alert('signup users not ready yet');
  //emits("signupUser")
}

function lostPassword() {
  alert('validate password not ready yet');
  // emits("lostPassword")
}

function changeForm() {
  emits("changeForm", props.case);
}

function validateFields() {
  //email && password 
  if (!userData.value.email || !userData.value.password) {
    alert("Incorrect email or password");
    return false;
  }

  return true;
}

function handleVisiblePassword() {
  passwordVisible.value = !passwordVisible.value
  passwordType.value = (passwordVisible.value) ? "text" : "password";
}

</script>
