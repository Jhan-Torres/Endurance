<template>
  <!-- Alerts -->
  <div class="flex items-center justify-center mt-1" v-if="!notesList.length">
    <RedAlert />
  </div>
  <div
    class="animate-fade-down animate-once animate-duration-[2000ms] animate-delay-[250ms] animate-reverse fixed bottom-24 left-0 right-0 z-10"
    v-if="showAlert">
    <BlueAlert :text="textAlert" />
  </div>

  <!-- new note's button and form -->
  <div class="mt-1 flex flex-col items-center justify-center">
    <fwb-button color="dark" @click="showForm = !showForm">
      <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl transition duration-500"
        :class="{ 'rotate-45 redIcon': showForm, 'rotate-0': !showForm }" />
    </fwb-button>
    <div
      class="bg-gray-400 py-4 px-6 rounded-lg flex flex-col items-center justify-center m-2 md:py-8 md:px-12 lg:px-14 animate-fade-left animate-once animate-duration-500"
      v-if="showForm">
      <Form :case="'create'" :noteId="noteId" @addNote="addNoteToList" @closeForm="showForm = false"
        @showAlert="showNotification" />
    </div>
  </div>

  <div
    class="bg-slate-500 p-1 m-1 rounded-xl flex flex-wrap items-center justify-evenly gap-2 md:gap-4 animate-fade-right animate-duration-1000 animate-delay-[250ms]"
    v-if="notesList.length">
    <fwb-card class="w-80 animate-flip-up animate-once animate-duration-[1000ms]" v-for="(note, index) in notesList"
      :key="index">
      <Card :noteChild="note" :noteIndex="index" @setDeleteNote="deleteNote" @setShowForm="showEditForm"
        @showAlert="showNotification" />
    </fwb-card>
  </div>

  <!-- edit note form -->
  <div
    class="bg-gray-900 fixed inset-0 border-2 z-10 border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200"
    v-if="editFormButton">
    <Form :case="'edit'" :noteClicked="noteToEdit" @editNote="updateNote" @closeForm="editFormButton = false"
      @showAlert="showNotification" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RedAlert from '@/components/notes/RedAlert.vue'
import BlueAlert from '@/components/notes/BlueAlert.vue'
import Form from '@/components/notes/Form.vue';
import Card from '@/components/notes/Card.vue';

//FLOWBITE-VUE components
import { FwbButton, FwbCard } from 'flowbite-vue'

//show/hide create note form
let showForm = ref(false);

//to show/hide edit form
let editFormButton = ref(false);

//to store note object clicked to edit
let noteToEdit = ref();

//to store note's id to edit
let indexNote = ref();

//to store note objects in array 
const notesList = ref([]);

//to show alert notifications
let showAlert = ref();

//to set alert´s text
let textAlert = ref('');

//to set note's id
let noteId = 0;

//METHODS:
function addNoteToList(note) {
  noteId++;
  notesList.value.push(note);
}

//to set edit note button
function showEditForm(noteObject, index) {
  indexNote.value = index;
  noteToEdit.value = noteObject;
  editFormButton.value = true;
}

function updateNote(note) {
  //first delete note
  notesList.value.splice(indexNote.value, 1);
  //after add note updated
  notesList.value.splice(indexNote.value, 0, note);
}

//delete note with its index
function deleteNote(index) {
  notesList.value.splice(index, 1);
}

function showNotification(text) {
  //to set and show alert's
  textAlert.value = text;
  showAlert.value = true;

  //set showAlert value to false after show alert
  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 2000);
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
  color: rgb(48, 48, 128);
}
</style>
