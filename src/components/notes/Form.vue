<template>
  <fwb-button 
    v-if="props.case === 'create'"
    color="dark" 
    @click="toggleForm"
  >
    <font-awesome-icon 
      class="text-2xl transition duration-500"
      :class="{ 'rotate-45 redIcon' : showForm, 'rotate-0' : !showForm }"
      :icon="['fas', 'plus']" 
    />
  </fwb-button>
  <div
    class="px-6 py-1 mt-1 rounded-lg flex flex-col items-center justify-center animate-fade-down animate-once animate-duration-500 md:py-5 md:px-10 lg:px-12"
    :class="{ 'bg-gray-400' : (props.case === 'create') }"
    v-if="showForm"
    v-on:keyup.esc="showForm = false"
  >
    <h2 
      v-if="props.case === 'edit'"  
      class="font-body text-slate-200 uppercase text-lg font-bold"
    >
      edit note
    </h2>
    <h2 
      v-else 
      class="font-body text-slate-900 uppercase text-lg font-bold"
    >
      new note
    </h2>
    <input 
      class="bg-gray-50 border border-gray-300 font-body text-gray-900 text-sm rounded-lg block p-1.5 w-56 md:w-96"
      :class="{ 'bg-red-200 border-red-500' : textError }"  
      type="text" 
      placeholder="title... (*)" 
      ref="title" 
      v-model="inputTitle" 
    >
      <span class="text-red-600 font-body text-sm tracking-wider mb-0.5" 
        v-if="(textError === 'Title Required' || textError === '60 Max Capacity')"
      >
        {{ textError }}
      </span>
    <textarea 
      class="block p-1.5 text-sm font-body text-gray-900 bg-gray-50 rounded-lg border border-gray-300 my-1.5 w-56 md:w-96"
      rows="3"
      placeholder="content..." 
      v-model="inputContent" 
    />
    <select 
      class="rounded-lg font-body mb-1.5 p-1.5 text-slate-500 text-sm border-1 border-gray-300 w-56 md:w-96" 
      v-model="inputCategory"
      ref="category"
    >
      <option 
        value="" 
        hidden
      >
        <span>
          category...
        </span>
      </option>
      <option 
        v-for="option in optionsCategories" 
        :key="option.name" 
        :value="option.name"
      >
        {{ option.name }}
      </option>
    </select>
    <span class="text-red-600 font-body text-sm tracking-wider mb-0.5" 
      v-if="(textError === 'Category required')"
    >
      {{ textError }}
    </span>
    <div 
      class="mb-1"
      v-if="props.case === 'create'"
    >
      <fwb-button 
        gradient="green-blue" 
        square 
        @click="createNote"
      >
        <span class="uppercase" >
          done
        </span>
      </fwb-button>
    </div>
    <div 
      class="flex flex-col"
      v-if="props.case === 'edit'"
    >
      <fwb-button 
        gradient="green-blue" 
        square 
        @click="saveEdit"
      >
        <span class="text-slate-100 tracking-wider font-body uppercase" >
          save changes
        </span>
      </fwb-button>
      <fwb-button 
        gradient="red" 
        square 
        @click="cancelEdit" 
        class="m-2"
      >
        <span class="text-slate-100 tracking-wider font-body uppercase" >
          Cancel
        </span>
      </fwb-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeMount } from 'vue';
import { FwbButton } from 'flowbite-vue'
import { useNotesCategories } from '@/composables/useNames';

//to set note id autoincrement and store in LocalStorage
let noteId;

//Set note id at the begginig 
onBeforeMount(() => {
  noteId = (localStorage.getItem("noteId")) ? JSON.parse(localStorage.noteId) : 0;  
})

//EMITS & PROPS
const emits = defineEmits(["closeForm", "showAlert", "addNoteToList", "editNote"]);

const props = defineProps({
  case: {
    type: String,
    required: true
  },
  noteClicked: {
    type: Object,
    default: {},
  }
})

//DATA REFS
//html elements
const title = ref(null);
const category = ref(null);

//show/hide create note form
const showForm = ref(false);

//to set text error on title input
const textError = ref('');

//input values
const inputTitle = ref('');
const inputContent = ref('');
const inputCategory = ref('');

const optionsCategories = useNotesCategories();

//to set initial values on inputs if "edit" case is sending
if (props.case === 'edit') {
  inputTitle.value = props.noteClicked.title;
  inputContent.value = props.noteClicked.content;
  inputCategory.value = props.noteClicked.category;
  showForm.value = true;
}

//METHODS
function toggleForm() {
  showForm.value = !showForm.value;
  //set focus on title input
  nextTick(() => {
    if (showForm.value) {
      title.value.focus()
      cleanInputs();
    }
  });
}

function createNote() {
  if (!validateTitleAndCategory()) return;

  //build new "note" object
  const note = {
    id: ++noteId,
    title: inputTitle.value,
    content: inputContent.value,
    category: inputCategory.value
  }

  localStorage.setItem('noteId', JSON.stringify(noteId));
  showForm.value = false;

  emits("addNoteToList", note);
  emits("showAlert", 'note added');
}

function saveEdit() {
  if (!validateTitleAndCategory()) return;

  const note = {
    id: props.noteClicked.id,
    title: inputTitle.value,
    content: inputContent.value,
    category: inputCategory.value
  }

  emits("editNote", note);
  emits("closeForm");
  emits("showAlert", 'note edited');
}

function cancelEdit() {
  emits("closeForm");
}

function cleanInputs() {
  inputTitle.value = "";
  inputContent.value = "";
  inputCategory.value = "";
  textError.value = '';
}

function validateTitleAndCategory() {
  //required validation
  if (!inputTitle.value) {
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

  //validate category
  if (!inputCategory.value) {
    textError.value = 'Category required';
    category.value.focus();
    return false;
  }

  return true;
}
</script>

<style scoped>
.redIcon {
  color: rgb(255, 94, 0);
}
</style>
