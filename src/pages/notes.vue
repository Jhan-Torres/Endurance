<template>
  <div class="flex items-center justify-center mt-1" v-if="!notesList.length">
    <span class="relative flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-300"></span>
    </span>
    <h1
      class="uppercase font-body tracking-wider font-extrabold text-2xl text-red-600 bg-red-200 rounded-lg px-3 py-1 ml-2 animate-pulse">
      no notes added
    </h1>
  </div>
  <div class="float-right fixed bottom-24 left-0 right-0 z-10" :hidden="showAlert">
    <div class="flex items-center justify-center">
      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-300"></span>
      </span>
      <h1
        class="uppercase font-body tracking-wider font-extrabold text-2xl text-blue-600 bg-blue-200 rounded-lg px-3 py-1 ml-2 animate-pulse">
        note added
      </h1>
    </div>
  </div>
  <div class="mt-1 flex flex-col items-center justify-center">
    <fwb-button color="dark" @click="toggleFormButton()">
      <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl transition duration-500"
        :class="{ 'rotate-45 redIcon': formButton, 'rotate-0': !formButton }" />
    </fwb-button>
    <div class="bg-gray-400 py-4 px-6 rounded-lg flex flex-col items-center justify-center m-2 md:py-8 md:px-12 lg:px-14"
      v-if="formButton">
      <fwb-input required placeholder="Title (60 max)" class="rounded-lg w-52 md:w-96 font-body" v-model="noteTitle"
        v-bind:validation-status="validationTitle">
        <template #validationMessage v-if="!noteTitle">
          Title required
        </template>
        <template #validationMessage v-if="noteTitle.length >= 60">
          60 max capacity
        </template>
      </fwb-input>
      <fwb-input placeholder="Content" class="rounded-lg w-52 md:w-96 font-body my-2" v-model="noteContent" />
      <select v-model="noteCategory"
        class="rounded-lg w-52 md:w-96 font-body mb-4 text-slate-500 text-base border-1 border-gray-300">
        <option value="" hidden>Select category</option>
        <option v-for="option in optionsCategories" :key="option.name" :value="option.name">{{ option.name }}</option>
      </select>
      <fwb-button gradient="green-blue" square @click="addNote()">
        Add Note
      </fwb-button>
    </div>
  </div>

  <!-- edit note form -->
  <div
    class="bg-gray-900 absolute inset-0 border-2 border-orange-500 rounded-lg flex flex-col items-center justify-center m-3 animate-fade-up animate-duration-[800ms] animate-delay-200">
    <fwb-input required placeholder="Title (60 max)" class="rounded-lg w-52 md:w-96 font-body" v-model="noteTitle"
      v-bind:validation-status="validationTitle">
      <template #validationMessage v-if="!noteTitle">
        <span class="text-slate-100 font-bold tracking-wider">Title required</span>
      </template>
      <template #validationMessage v-if="noteTitle.length >= 60">
        <span class="text-slate-100 font-bold tracking-wider">60 max capacity</span>
      </template>
    </fwb-input>
    <fwb-input placeholder="Content" class="rounded-lg w-52 md:w-96 font-body my-2" v-model="noteContent" />
    <select v-model="noteCategory"
      class="rounded-lg w-52 md:w-96 font-body mb-4 text-slate-500 text-base border-1 border-gray-300">
      <option value="" hidden>Select category</option>
      <option v-for="option in optionsCategories" :key="option.name" :value="option.name">{{ option.name }}</option>
    </select>
    <fwb-button gradient="green-blue" square @click="saveChanges()">
      <span class="text-slate-100 font-bold tracking-wider">Save Changes</span>
    </fwb-button>
    <fwb-button gradient="red" square @click="cancelButton()" class="mt-2">
      <span class="text-slate-100 font-bold tracking-wider">Cancel</span>
    </fwb-button>
  </div>

  <div class="bg-slate-400 p-1 m-1 rounded-xl flex flex-wrap items-center justify-evenly gap-1 md:gap-3"
    v-if="notesList.length">

    <!-- Loading spinner -->
    <div role="status" class="hidden">
      <svg aria-hidden="true" class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <fwb-card class="w-80" v-for="note in notesList" :key="note.id">
      <div class="p-1.5 font-body">
        <h5 class="p-1 h-14 text-sm font-medium tracking-tight rounded-sm bg-gray-700 text-lime-50 md:text-base">
          {{ note.title }}
        </h5>
        <hr class="border-gray-400 mx-auto my-1">
        <p class="text-xs text-gray-700 dark:text-gray-400 overflow-auto text-wrap h-20 md:text-sm">
          {{ note.content }}
        </p>
        <hr class="border-gray-400 mx-auto mt-2">
        <button class="trashIcon hover:scale-110 hover:cursor-pointer transition duration-200 mr-1"
          @click="deleteNote(note, note.id)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
        <button class="editIcon hover:scale-110 hover:cursor-pointer transition duration-200 ml-1"
          @click="toggleUpdateButton()">
          <font-awesome-icon :icon="['fas', 'pen']" />
        </button>
        <h6 class="text-sm font-semibold text-teal-500 inline-block float-right">{{ note.category }}</h6>
      </div>
    </fwb-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//FLOWBITE-VUE components
import { FwbButton, FwbInput, FwbCard } from 'flowbite-vue'

//Form button
let formButton = ref(false);

//Input values
let noteTitle = ref('');
let noteContent = ref('');
let noteCategory = ref('');

const optionsCategories = [
  { name: 'Course' },
  { name: 'Entertainment' },
  { name: 'Hacking' },
  { name: 'Link' },
  { name: 'Programming' },
  { name: 'Research' },
  { name: 'Several' },
  { name: 'Social Media' },
]

//to show error message on required title accord to flowbite library
let validationTitle = ref('');

//to show "note added" notification
let showAlert = ref(true);

//to show 

//to store note objects in array 
const notesList = ref([]);

//to set form button
function toggleFormButton() {
  formButton.value = !formButton.value;
  if (!formButton.value) cleanInputs();
}

//to set button for add note
function addNote() {
  if (!noteTitle.value || noteTitle.value.length >= 60) {
    validationTitle.value = "error";
    return;
  }

  //build "note" object
  const note = {
    id: 'N' + (notesList.value.length + 1),
    title: noteTitle.value,
    content: noteContent.value,
    category: noteCategory.value,
    done: false
  }

  notesList.value.push(note);

  //close fomr and clean inputs
  toggleFormButton();

  //show "note added" notification
  showAddedNotification();
}

function showAddedNotification() {
  setTimeout(() => {
    showAlert.value = !showAlert.value
  }, 500);

  setTimeout(() => {
    showAlert.value = !showAlert.value
  }, 3500);
}

const cleanInputs = () => {
  noteTitle.value = '';
  validationTitle.value = '';
  noteContent.value = '';
  noteCategory.value = '';
}

//delete note with its note.id
function deleteNote(noteId) {
  notesList.value.splice(noteId, 1);
}

//to set update note button
function toggleUpdateButton(noteId) {

}
</script>

<style scoped>
.redIcon {
  color: rgb(255, 94, 0);
}

.trashIcon :hover {
  color: rgb(190, 11, 11);
}

.editIcon :hover {
  color: rgb(95, 95, 102);
}
</style>
