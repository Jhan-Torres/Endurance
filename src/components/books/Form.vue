<template>
  <fwb-button
    class="mb-1"
    color="dark"
    @click="toggleFormButton"
  >
    <span>New Book</span>
  </fwb-button>

  <div 
    class="flex flex-col items-center gap-2 justify-center mb-1 bg-slate-400 px-3 py-4 rounded-lg animate-fade-down animate-once animate-duration-500"
    v-if="showForm"
  >
    <input type="text" placeholder="Book Title (*)" class="rounded-lg w-60">
    <input type="text" placeholder="Autor" class="rounded-lg w-60">
    <select class="rounded-lg w-60">
      <option 
        value="" 
        hidden
      >
        <span>
          Category
        </span>
      </option>
      <option 
        v-for="(option, index) in booksCategories" 
        :key="index" 
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <input type="text" placeholder="File Link" class="rounded-lg w-60">

    <fwb-button
      class="mb-1"
      color="red"
      @click="showForm = false"
    >
      <span>Cancel</span>
    </fwb-button>
  </div>
  
</template>

<script setup>
import { FwbButton } from 'flowbite-vue';
import { ref } from 'vue';

const showForm = ref(false);

const booksCategories = [
  'Astronomy',
  'Programming',
  'Science'
]

function toggleFormButton() {
  showForm.value = true;
}

</script>

<style scoped>

</style>
