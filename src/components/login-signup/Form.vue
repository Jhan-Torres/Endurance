<template>
  <div class="w-full max-w-xl px-2 py-3 bg-[#97b8d8] rounded-b-lg animate-fade-down animate-duration-[500ms] animate-delay-100 md:px-4 md:py-4">
    <h2 class="text-xl font-bold text-gray-900 first-letter:uppercase md:text-2xl">
      {{ props.case }} to <strong class="text-orange-600 text-shadow shadow-red-300 select-none">Endurance</strong>
    </h2>

    <!-- Login Form -->
    <form 
      class="mt-4 space-y-5"
      v-if="props.case === 'login'"
    >
      <div>
        <label 
          for="email" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Your email:
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          placeholder="name@company.com"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="password" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Your password:
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
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="remember" 
            aria-describedby="remember" 
            name="remember" 
            type="checkbox" 
            class="w-4 h-4 border-gray-300 rounded focus:ring-3 focus:ring-blue-300"
            autocomplete="off"
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
        >
          Lost Password?
        </a>
      </div>
      <button 
        type="submit" 
        class="w-full py-2 bg-blue-700 rounded-lg hover:bg-blue-800"
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
      class="mt-3 space-y-3 md:space-y-4 md:mt-4"
      v-else
    >
      <div>
        <label 
          for="userName" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Full name:
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
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Email:
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          class="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs md:text-sm" 
          placeholder="name@company.com"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="password" 
          class="block mb-0.5 font-bold text-gray-900 text-xs md:text-sm"
        >
          Password:
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
      <button 
        type="submit" 
        class="w-full py-2 bg-blue-700 rounded-lg hover:bg-blue-800"
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
//PROPS & EMITS
const props = defineProps({
  case: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["changeForm"]);

function changeForm() {
  emits("changeForm", props.case);
}
</script>
