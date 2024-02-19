<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center mt-1" 
    v-if="!notesList.length"
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

  <div
    class="bg-slate-400 p-1 mt-2 rounded-md flex flex-wrap items-center justify-evenly gap-2 animate-fade-right animate-duration-1000 animate-delay-[250ms] md:gap-4"
    v-if="notesList.length"
    >
    <Card 
      v-for="(note, index) in notesList" 
      :key="index"
      :noteChild="note" 
      :noteIndex="index" 
      @setDeleteNote="deleteNote" 
      @setShowForm="showEditForm"
      @showAlert="toggleShowAlert" 
    />
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
import { ref, onMounted } from 'vue'
import RedAlert from '@/components/RedAlert.vue'
import BlueAlert from '@/components/BlueAlert.vue'
import Form from '@/components/notes/Form.vue';
import Card from '@/components/notes/Card.vue';
//Firebase imports
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from '@/firebase';
//firebase refs
const notesCollectionRef = collection(db, 'notes');

const notesList = ref([]);

onMounted(() => {
  //set all notes stored on firebase
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
  });
})

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

//to hide form on user doble click on edit form
function hideForm() {
  editFormButton.value = false;
}

//to set edit note button
function showEditForm(noteObject, index) {
  indexNote.value = index;
  noteToEdit.value = noteObject;
  editFormButton.value = true;
}

function updateNote(note) {
  //first delete note from the array
  notesList.value.splice(indexNote.value, 1);
  //after add note updated
  notesList.value.splice(indexNote.value, 0, note);
  //later modify the local storage list
  localStorage.setItem('NotesList', JSON.stringify(notesList.value));
}

//delete note with its index
function deleteNote(index) {
  notesList.value.splice(index, 1);
  localStorage.setItem('NotesList', JSON.stringify(notesList.value));
}

function toggleShowAlert(text) {
  //to set and show alert's
  textAlert.value = text;
  showAlert.value = true;

  //set showAlert value to false after show alert
  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}
</script>
