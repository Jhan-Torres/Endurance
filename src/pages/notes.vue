<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center mt-1" 
    v-if="!notesList.length && !notes.showSpinner.value"
  >
    <RedAlert :text="'no notes added'"/>
  </div>
  <div
    class="animate-fade-down animate-once animate-duration-[2000ms] animate-delay-[250ms] animate-reverse fixed bottom-24 left-0 right-0 z-10"
    v-if="showAlert"
  >
    <BlueAlert 
      :text="textAlert" 
    />
  </div>

  <!-- new note's button and form -->
  <div class="mt-1 flex flex-col items-center justify-center" >
    <Form
      :case="'create'" 
      @addNote="addNote"
    />
  </div>

  <div class="flex justify-center items-center p-1">
    <Spinner
      v-if="notes.showSpinner.value"
    />
    <div
      v-else
      class="flex flex-wrap items-center justify-evenly gap-2 animate-fade-right animate-duration-1000 animate-delay-[250ms] md:gap-4"
    >
      <Card 
        v-for="(note, index) in notesList" 
        :key="index"
        :noteChild="note"
        :noteIndex="index"
        @deleteNote="deleteNote"
        @setShowForm="handleEditNote"
      />
    </div>
  </div>

  <!-- edit note form -->
  <div
    class="bg-gray-900 fixed inset-0 border-2 z-10 border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200"
    v-if="showEditForm"
    @dblclick="showEditForm = false"
    v-on:keyup.esc="showEditForm = false"
  >
    <Form 
      :case="'edit'" 
      :noteClicked="noteToEdit" 
      :indexNoteClicked="indexNote"
      @editNote="updateNote" 
      @closeForm="showEditForm = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import RedAlert from '@/components/RedAlert.vue'
import BlueAlert from '@/components/BlueAlert.vue'
import Form from '@/components/notes/Form.vue';
import Card from '@/components/notes/Card.vue';
import Spinner from '@/components/Spinner.vue';


//composables imports
import { validUser } from '@/firebase';
import useDemo from '@/composables/useDemo';
import { useNotes } from '@/composables/useNotes';

const demo = new useDemo();
const notes = useNotes();

const notesList = computed(() => {
  return (validUser.value) ? notes.notesList.value : demo.getData("notesData")
});

//to show/hide edit form
let showEditForm = ref(false);

//to store note object clicked to edit
let noteToEdit = ref();

//to store note's id to edit
let indexNote = ref();

//to show alert notifications
let showAlert = ref();

//to set alert´s text
let textAlert = ref('');

//METHODS:
function addNote(note) {
  if(validUser.value) {
    notes.addNote(note)
    .then(() => handleShowAlert("note added"))
    .catch(() => console.error("something happened"));
  } else {
    demo.add("notesData", note);
    handleShowAlert("note added");
  }
}

function deleteNote(noteId, note) {
  if(validUser.value) {
    notes.deleteNote(noteId)
    .then(() => handleShowAlert("note deleted"))
    .catch(() => console.error("something happened"));
  } else {
    demo.delete("notesData", note);
    handleShowAlert("note deleted");
  }
}

function updateNote(newNote, noteId, oldId) {
  if (validUser.value) {
    notes.updateNote(newNote, noteId)
    .then(() => handleShowAlert("note edited"))
    .catch(() => console.error("something happened"));
  } else {
    demo.update("notesData", newNote, oldId);
    handleShowAlert("note edited");
  }
}

//to set edit note button
function handleEditNote(noteObject, index) {
  indexNote.value = index;
  noteToEdit.value = noteObject;
  showEditForm.value = true;
}

function handleShowAlert(text) {
  textAlert.value = text;
  showAlert.value = true;

  //set showAlert value to false after show alert
  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}
</script>
