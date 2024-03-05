<template>
  <div class="w-full max-w-xl px-4 py-5 bg-[#a3b7ca] rounded-lg">
    <h2 class="text-2xl font-bold text-gray-900 first-letter:uppercase">
      {{ props.case }} to <strong class="text-orange-600 text-shadow shadow-red-300 select-none">Endurance</strong>
    </h2>
    <form class="mt-4 space-y-5">
      <div>
        <label 
          for="email" 
          class="block mb-0.5 text-sm font-bold text-gray-900"
        >
          Your email:
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          placeholder="name@company.com"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label 
          for="password" 
          class="block mb-0.5 text-sm font-bold text-gray-900"
        >
          Your password:
        </label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="••••••••" 
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
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
        class="w-full py-3 bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        <span class="text-white">
          Login to your account
        </span>
      </button>
      <div class="text-sm font-bold text-gray-900">
        New around here? <a class="text-blue-600 ml-2 hover:underline" href="#">Create account</a>
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
</script>
