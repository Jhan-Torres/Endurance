<template>
  <div class="mb-1">
    <h2 class="font-body text-yellow-50 uppercase text-xl font-bold" v-if="props.case === 'edit'">Edit Note</h2>
    <h2 class="font-body text-slate-900 uppercase text-xl font-bold" v-else>Create Note</h2>
  </div>
  <fwb-input required placeholder="Title (60 max)" class="rounded-lg font-body w-56 md:w-96" v-model="inputTitle"
    v-bind:validation-status="validationTitle">
    <template #validationMessage v-if="!inputTitle">
      <span class="text-slate-100 font-bold tracking-wider">Title required</span>
    </template>
    <template #validationMessage v-if="inputTitle.length >= 60">
      <span class="text-slate-100 font-bold tracking-wider">60 max capacity</span>
    </template>
  </fwb-input>
  <fwb-textarea v-model="inputContent" label="" placeholder="Content..." class="rounded-lg font-body my-2 w-56 md:w-96" />
  <select v-model="inputCategory"
    class="rounded-lg font-body mb-4 text-slate-500 text-base border-1 border-gray-300 w-56 md:w-96">
    <option value="" hidden>Select category</option>
    <option v-for="option in optionsCategories" :key="option.name" :value="option.name">{{ option.name }}</option>
  </select>
  <div v-if="props.case === 'create'">
    <fwb-button gradient="green-blue" square @click="addNote()">
      Add Note
    </fwb-button>
  </div>
  <div v-if="props.case === 'edit'" class="flex flex-col">
    <fwb-button gradient="green-blue" square @click="saveEdit()">
      <span class="text-slate-100 font-bold tracking-wider">Save Changes</span>
    </fwb-button>
    <fwb-button gradient="red" square @click="cancelEdit()" class="m-2">
      <span class="text-slate-100 font-bold tracking-wider">Cancel</span>
    </fwb-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'

//EMITS % PROPS
const emits = defineEmits(["closeForm", "showAlert", "addNote", "editNote"]);

const props = defineProps({
  case: {
    type: String,
    required: true
  },
  noteClicked: {
    type: Object,
    default: {},
  },
  noteId: Number,
  required: true
})

let inputTitle = ref('');
let inputContent = ref('');
let inputCategory = ref('');

//to set error message according to flowbite componen
let validationTitle = ref('');

//to set initial values on inputs if "edit" case is sending
if (props.case === 'edit') {
  inputTitle.value = props.noteClicked.title;
  inputContent.value = props.noteClicked.content;
  inputCategory.value = props.noteClicked.category;
}

const optionsCategories = [
  { name: 'Course' },
  { name: 'Entertainment' },
  { name: 'Hacking' },
  { name: 'Link' },
  { name: 'Programming' },
  { name: 'Research' },
  { name: 'Several' },
  { name: 'Social Media' },
  { name: 'Tools' },
]

//METHODS
function addNote() {
  if (!inputTitle.value || inputTitle.value.length >= 60) {
    validationTitle.value = "error";
    return;
  }

  //build new "note" object
  const note = {
    id: props.noteId,
    title: inputTitle.value,
    content: inputContent.value,
    category: inputCategory.value
  }

  emits("addNote", note);
  emits("closeForm");
  emits("showAlert", 'note added');
}

function saveEdit() {
  if (!inputTitle.value || inputTitle.value.length >= 60) {
    validationTitle.value = "error";
    return;
  }

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
</script>
