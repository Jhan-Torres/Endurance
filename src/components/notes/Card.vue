<template>
  <div class="p-1.5 font-body">
    <h5 class="p-1 h-14 text-sm font-medium tracking-tight mb-2 rounded-sm bg-gray-700 text-lime-50 md:text-base">
      {{ props.noteChild.title }}
    </h5>
    <p class="text-xs text-gray-700 dark:text-gray-400 overflow-auto text-wrap h-20 md:text-sm">
      {{ props.noteChild.content }}
    </p>
    <hr class="border-gray-400 mx-auto mt-2">
    <button class="trashIcon hover:scale-110 hover:cursor-pointer transition duration-200 mr-1"
      @click="deleteNote(props.noteIndex)">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
    <button class="editIcon hover:scale-110 hover:cursor-pointer transition duration-200 ml-1"
      @click="showEditF(props.noteChild, props.noteIndex)">
      <font-awesome-icon :icon="['fas', 'pen']" />
    </button>
    <h6 class="text-sm font-semibold text-teal-500 inline-block float-right">{{ props.noteChild.category }}</h6>
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
