<template>
  <fwb-button
    v-if="props.case === 'create'"
    class="mb-1"
    color="dark"
    @click="toggleFormButton"
  >
    New Book
  </fwb-button>
  <div 
    class="flex flex-col items-center gap-5 justify-center mb-1 bg-slate-400 rounded-lg animate-fade-down duration-500 pt-5 pb-2 px-4 md:py-6 md:px-5 lg:py-7 lg:px-6"
    v-if="showForm"
    v-on:keyup.esc="showForm = false"
  >
    <div>
      <div class="relative group">
        <input 
          id="title"
          type="text" 
          autocomplete="off"
          required 
          class="rounded-md w-52 text-xs peer bg-blue-50 md:text-sm md:w-56"
          v-model="bookObject.title" 
          ref="title"
        >
        <label 
          for="title" 
          class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
          peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
        >
          Title: (*)
        </label>
      </div>
      <label 
          for="title" 
          class="text-xs text-red-600 md:text-sm " 
          v-if="(textError === 'Title Required' || textError === '40 Max Capacity')"
        >
          {{ textError }}
      </label>
    </div>
    <div class="relative group">
      <input 
        id="autor"
        autocomplete="off"
        type="text" 
        class="rounded-md w-52 peer bg-blue-50 text-xs md:text-sm md:w-56"
        v-model="bookObject.autor"
        required
      >
      <label 
        for="autor" 
        class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
        peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
        group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
      >
        Autor:
      </label>
    </div>
    <div class="flex flex-col">
      <div class="flex items-center gap-1.5">
        <label 
          for="select" 
          class="text-xs font-semibold tracking-wide md:text-sm"
        >
          Category  
        </label>
        <select 
          class="rounded-md w-36 text-xs bg-blue-50 md:w-[150px] md:text-sm" 
          id="select"
          v-model="bookObject.category"
          ref="category"
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
      <label
        for="select" 
        class="text-xs text-red-600 text-center md:text-sm" 
        v-if="textError === 'Category required'"
      >
        {{ textError }}
      </label>
    </div>
    <div class="relative group">
      <input 
        id="link"
        type="text" 
        autocomplete="off"
        required
        class="rounded-md w-52 peer bg-blue-50 text-xs md:text-sm md:w-56"
        v-model="bookObject.link"
      >
      <label 
        for="link" 
        class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-xs group-focus-within:text-xs 
        peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
        group-focus-within:pl-0 peer-valid:pl-0 duration-500 font-semibold tracking-wide md:text-sm"
      >
        Link (PDF):
      </label>
    </div>
    <div 
      v-if="props.case === 'edit'"
      class="bg-gray-500 p-2 rounded-xl text-xs font-semibold tracking-wider md:text-sm"
    >
      <label 
        for="checkbox" 
        class="mr-2"
      >
        Finished?
      </label>
      <input 
        type="checkbox" 
        id="checkbox"
        v-model="bookObject.done"
      >
    </div>
    <div class="flex items-center gap-1">
      <fwb-button 
        v-if="props.case === 'create'"
        gradient="green-blue" 
        square 
        @click="createBook"
      >
        <span class="text-xs">Add Book</span>
      </fwb-button>
      <fwb-button 
        v-else
        gradient="green-blue" 
        square 
        @click="saveEdit"
      >
        <span class="text-xs">Save Changes</span>
      </fwb-button>
      <fwb-button
        color="red"
        @click="(props.case === 'create') ? showForm = false : $emit('closeEditForm')"
      >
        <span class="text-xs">Cancel</span>
      </fwb-button>
    </div>
  </div>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue';
import { ref, nextTick, onBeforeMount } from 'vue';
import { useBooksCategories } from '@/composables/useNames';

let bookId;

const textError = ref('');

//Set note id at the begginig 
onBeforeMount(() => {
  bookId = (localStorage.getItem("bookId")) ? (JSON.parse(localStorage.bookId)) : 0;  
})

//DATA REFS
const bookObject = ref({})

const showForm = ref(false);

const booksCategories = useBooksCategories();

//html elements references
const title = ref(null);
const category = ref(null);

//Emits & Props
const emits = defineEmits(["addBook", "showAlert", "saveEdit", "closeEditForm"]);

const props = defineProps({
  case: {
    type: String,
    required: true
  },
  bookToEdit: {
    type: Object,
    default: {},
  }
})

if (props.case === 'edit') {
  bookObject.value = props.bookToEdit;
  showForm.value = true;
}

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
  if (!validateTitleAndCategory()) return;
  
  showForm.value = false;

  emits("addBook", bookObject.value);
  emits("showAlert", 'book added');
}

function saveEdit() {
  if (!validateTitleAndCategory()) return;

  emits("saveEdit", bookObject.value, props.bookToEdit.id);
  emits("closeEditForm");
  emits("showAlert", 'book edited');
}

function validateTitleAndCategory() {
  //required validation
  if (!bookObject.value.title) {
    textError.value = "Title Required";
    title.value.focus();
    return false;
  }

  //max 60 caracteres validation 
  if (bookObject.value.title.length >= 40) {
    textError.value = "40 Max Capacity";
    title.value.focus();
    return false;
  }

  //validate category
  if (!bookObject.value.category) {
    textError.value = 'Category required';
    category.value.focus();
    return false;
  }

  return true;
}

function cleanInputs() {
  bookObject.value = {};
  textError.value = '';
}

</script>
