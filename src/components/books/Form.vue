<template>
  <fwb-button
    class="mb-1"
    color="dark"
    @click="toggleFormButton"
  >
    New Book
  </fwb-button>

  <div 
    class="flex flex-col items-center gap-1 justify-center mb-1 bg-slate-400 py-1 px-2 rounded-lg animate-fade-down duration-500 md:py-2 md:px-5 lg:py-3 lg:px-7"
    v-if="showForm"
    v-on:keyup.esc="showForm = false"
  > 
    <input 
      id="title"
      type="text" 
      placeholder="Book Title (*)" 
      class="rounded-md w-52 text-xs" 
      v-model="bookObject.title" 
      ref="title"
    >
    <label 
      for="title" 
      class="text-xs text-red-600" 
      v-if="textError"
    >
      {{ textError }}
    </label>
    <input 
      type="text" 
      placeholder="Autor" 
      class="rounded-md w-52 text-xs" 
      v-model="bookObject.autor"
    >
    <div class="flex items-center gap-1">
      <label for="select" class="text-xs mr-1">Category</label>
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
    <div class="flex items-center gap-1">
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
  </div>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue';
import { ref, nextTick, onBeforeMount } from 'vue';

let bookId;

const textError = ref('');

//Set note id at the begginig 
onBeforeMount(() => {
  bookId = (localStorage.getItem("bookId")) ? (JSON.parse(localStorage.bookId)) : 0;  
})

//DATA REFS
const bookObject = ref({})

const showForm = ref(false);

const booksCategories = [
  'Astronomy',
  'Hacking',
  'Life Style',
  'Programming',
  'Psychology',
  'Research',
  'Science',
]

//html elements references
const title = ref(null);

//Emits & Props
const emits = defineEmits(["addBookToList", "showAlert"]);

const props = defineProps({
  case: {
    type: String,
    required: true
  },
  bookClicked: {
    type: Object,
    default: {},
  }
})

//METHODS
function toggleFormButton() {
  showForm.value = !showForm.value;

  nextTick(() => {
    if (showForm.value) {
      title.value.focus();
      cleanInputs();
    }
  });
}

function createBook() {
  if (!validateTitle()) return;
  
  bookObject.value.id = ++bookId;

  localStorage.setItem('bookId', JSON.stringify(bookId));
  showForm.value = false;

  emits("addBookToList", bookObject.value);
  emits("showAlert", 'book added');
}

function validateTitle() {
  //required validation
  if (!bookObject.value.title) {
    textError.value = "Title Required";
    title.value.focus();
    return false;
  }

  //max 60 caracteres validation 
  if (bookObject.value.title.length >= 30) {
    textError.value = "30 Max Capacity";
    title.value.focus();
    return false;
  }

  return true;
}

function cleanInputs() {
  bookObject.value = {};
  textError.value = '';
}

</script>

<style scoped>

</style>