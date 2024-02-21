<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center mt-1" 
    v-if="!notesList.length && showLoaderSpinner === false"
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
      @showAlert="toggleShowAlert" 
    />
  </div>

  <div class="flex justify-center items-center mt-1">
    <Spinner
      v-if="showLoaderSpinner"
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
        @setShowForm="showEditForm"
        @showAlert="toggleShowAlert" 
      />  
    </div>
  </div>

  <!-- edit note form -->
  <div
    class="bg-gray-900 fixed inset-0 border-2 z-10 border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200"
    v-if="editFormButton"
    @dblclick="hideForm"
    v-on:keyup.esc="hideForm"
  >
    <Form 
      :case="'edit'" 
      :noteClicked="noteToEdit" 
      @editNote="updateNote" 
      @closeForm="editFormButton = false"
      @showAlert="toggleShowAlert" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RedAlert from '@/components/RedAlert.vue'
import BlueAlert from '@/components/BlueAlert.vue'
import Form from '@/components/notes/Form.vue';
import Card from '@/components/notes/Card.vue';
import Spinner from '@/components/Spinner.vue';
//Firebase imports
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase';
//firebase refs
const notesCollectionRef = collection(db, 'notes');

const showLoaderSpinner = ref(true);
const notesList = ref([]);

//set all notes stored on firebase, it works automatically
onSnapshot(notesCollectionRef, (querySnapshot) => {
  const fbNotes = [];
  querySnapshot.forEach((doc) => {
    //data of every doc(note)
    const note = {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      category: doc.data().category
    }
    fbNotes.push(note);
  });
  notesList.value = fbNotes;
  showLoaderSpinner.value = false;
});

//to show/hide edit form
let editFormButton = ref(false);

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
  // Add a new document with a generated id to firebase.
  addDoc(notesCollectionRef, note);  
}

function deleteNote(noteId) {
  //delete a document with its id from firebase. 
  deleteDoc(doc(notesCollectionRef, noteId));
}

function updateNote(note, noteId) {
  //update a document with its id and fields modified, from firebase
  updateDoc(doc(notesCollectionRef, noteId), note);
}

function hideForm() {
  editFormButton.value = false;
}

//to set edit note button
function showEditForm(noteObject, index) {
  indexNote.value = index;
  noteToEdit.value = noteObject;
  editFormButton.value = true;
}

function toggleShowAlert(text) {
  textAlert.value = text;
  showAlert.value = true;

  //set showAlert value to false after show alert
  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}
</script>
