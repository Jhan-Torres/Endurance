<template>
  <div class="p-1 font-body" @dblclick="showEditF(props.noteChild, props.noteIndex)">
    <h5 class="p-1 h-12 text-sm font-medium tracking-tight rounded-t-md bg-gray-800 text-lime-50 md:text-base">
      {{ props.noteChild.title }}
    </h5>
    <p class="text-xs text-gray-800 overflow-auto rounded-b-lg text-wrap h-24 bg-gray-200 p-1 md:text-sm">
      {{ props.noteChild.content }}
    </p>
    <hr class="border-gray-300 mx-auto mt-1">
    <button class="trashIcon hover:scale-125 hover:cursor-pointer transition duration-200 mr-1"
      @click="deleteNote(props.noteIndex)">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
    <button class="editIcon hover:scale-125 hover:cursor-pointer transition duration-200 ml-1"
      @click="showEditF(props.noteChild, props.noteIndex)">
      <font-awesome-icon :icon="['fas', 'pen']" />
    </button>
    <h6 class="text-sm font-semibold text-teal-500 inline-block float-right uppercase">{{ props.noteChild.category }}
    </h6>
  </div>
</template>

<script setup>

//PROPS & EMITS
const props = defineProps({
  noteChild: {
    type: Object,
    required: true
  },
  noteIndex: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(["setDeleteNote", "setShowForm", "showAlert"]);

function deleteNote(indexNoteDeleted) {
  emits("setDeleteNote", indexNoteDeleted);
  emits("showAlert", 'node deleted');
}

function showEditF(noteToEdit, indexNoteEdit) {
  emits("setShowForm", noteToEdit, indexNoteEdit)
}
</script>

<style scoped>
.trashIcon :hover {
  color: rgb(190, 11, 11);
}

.editIcon :hover {
  color: rgb(15, 15, 163);
}
</style>
