<script setup>
import { FwbButton } from 'flowbite-vue';
import { nextTick, ref } from 'vue';

const url = ref(null);

const showForm = ref(false);

const toggleFormButton = () => {
  showForm.value = !showForm.value;

  nextTick(() => {
    if (showForm.value) {
      url.value.focus()
      cleanInputs();
    }
  });
}

const data = ref({});
</script> 

<template>
  <section class="flex justify-center">
    <fwb-button
      class="mb-1"
      color="dark"
      @click="toggleFormButton"
    >
      Add
    </fwb-button>
  </section>

  <section
    v-if="showForm"
    v-on:keyup.esc="showForm = false"
    class="my-2 animate-fade-left animate-once animate-duration-300"
  >
    <form 
      class="flex flex-col justify-center items-center lg:flex-row lg:justify-around "
    >
      <div class="relative group my-0.5">
        <input
          id="url"
          type="text"
          autocomplete="off"
          required
          class="rounded-md min-w-52 text-xs peer bg-blue-50 md:text-sm"
          v-model="data.url"
          ref="url"
        >
        <label 
          for="url" 
          class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
          peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
        >
          url:
        </label>
      </div>
      <div class="relative group my-0.5">
        <input 
          id="title"
          type="text"
          autocomplete="off"
          required
          class="rounded-md min-w-52 text-xs peer bg-blue-50 md:text-sm"
          v-model="data.site"
        >
        <label 
          for="title" 
          class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
          peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
        >
          user:
        </label>
      </div>
      <div class="relative group my-0.5">
        <input 
          id="title"
          type="text" 
          autocomplete="off"
          required
          class="rounded-md min-w-52 text-xs peer bg-blue-50 md:text-sm"
          v-model="data.site"
        >
        <label 
          for="title" 
          class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
          peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
        >
          password:
        </label>
      </div>
      <div class="relative group my-0.5">
        <input 
          id="title"
          type="text" 
          autocomplete="off"
          required
          class="rounded-md min-w-52 text-xs peer bg-blue-50 md:text-sm"
          v-model="data.site"
        >
        <label 
          for="title" 
          class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
          peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
        >
          category:
        </label>
      </div>
    </form>
  </section>
</template>