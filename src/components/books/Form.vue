<template>
  <fwb-button
    class="mb-1"
    color="dark"
    @click="toggleFormButton"
  >
    <span>New Book</span>
  </fwb-button>

  <div 
    class="flex flex-col items-center gap-1 justify-center mb-1 bg-slate-400 py-1 px-2 rounded-lg animate-fade-down animate-once animate-duration-500"
    v-if="showForm"
    v-on:keyup.esc="showForm = false"
  >
    <input 
      type="text" 
      placeholder="Book Title (*)" 
      class="rounded-md w-52 text-xs" 
      v-model="bookObject.title" 
      ref="title"
    >
    <input 
      type="text" 
      placeholder="Autor" 
      class="rounded-md w-52 text-xs" 
      v-model="bookObject.autor"
    >
    <div class="flex items-center">
      <label 
        for="select" 
        class="text-xs mr-2"
      >
        Category
      </label>
      <select 
        id="select" 
        class="rounded-md w-36 text-xs" 
        v-model="bookObject.category"
      >
        <option 
          v-for="(option, index) in booksCategories" 
          :key="index" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <input 
      type="text" 
      placeholder="File Link" 
      class="rounded-md w-52 text-xs" 
      v-model="bookObject.link"
    >

    <fwb-button 
        gradient="green-blue" 
        square 
        @click="createBook"
      >
        <span class="text-xs">Add Book</span>
      </fwb-button>

    <fwb-button
      color="red"
      @click="showForm = false"
    >
      <span class="text-xs">Cancel</span>
    </fwb-button>
  </div>
  
</template>

<script setup>
import { FwbButton } from 'flowbite-vue';
import { ref, nextTick, onBeforeMount } from 'vue';

let bookId;

//Set note id at the begginig 
onBeforeMount(() => {
  bookId = (localStorage.getItem("bookId")) ? (JSON.parse(localStorage.bookId)) : 0;  
})

//DATA REFS
const bookObject = ref({})

const showForm = ref(false);

const booksCategories = [
  'Astronomy',
  'Programming',
  'Science'
]

//html elements references
const title = ref(null);

//METHODS
function toggleFormButton() {
  showForm.value = true;

  nextTick(() => {
    if (showForm.value) {
      title.value.focus()
    }
  });
}

function createBook() {
  if (bookObject.value.title) {
    
  }
}

function validateTitle() {
  //required validation
  if (!bookObject.value.title) {
    textError.value = "Title Required";
    title.value.focus();
    return false;
  }

  //max 60 caracteres validation 
  if (inputTitle.value.length >= 60) {
    textError.value = "60 Max Capacity";
    title.value.focus();
    return false;
  }

  return true;
}

</script>

<style scoped>

</style>
