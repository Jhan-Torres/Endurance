<template>
  <fwb-card 
    class="w-80 animate-flip-up animate-once animate-duration-[1000ms] p-1 font-body"
    @dblclick="showEditF"
  >
    <h5  
      class="p-1 h-12 text-sm tracking-tight rounded-t-md text-black font-semibold md:text-base"
      :class="categoryColor, {'text-gray-200':(categoryColor === 'bg-[#2c4875]') || (categoryColor === 'bg-[#8a508f]')}" 
    >
      {{ props.noteChild.title }}
    </h5>
    <p class="text-xs text-gray-800 overflow-auto rounded-b-lg text-wrap h-24 bg-gray-200 p-1 md:text-sm">
      {{ props.noteChild.content }}
    </p>
    <hr class="border-gray-300 mx-auto mt-1" />
    <button 
      class="trashIcon hover:scale-125 hover:cursor-pointer transition duration-200 mr-1"
      @click="deleteNote"
    >
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
    <button 
      class="editIcon hover:scale-125 hover:cursor-pointer transition duration-200 ml-1"
      @click="showEditF"
    >
      <font-awesome-icon :icon="['fas', 'pen']" />
    </button>
    <h6 class="text-sm font-semibold text-teal-500 inline-block float-right uppercase" >
      {{ props.noteChild.category }}
    </h6>
  </fwb-card>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue';
import { onMounted, ref } from 'vue';
import { useNotesColors } from '@/composables/useNames';

const categoryColor = ref('');

onMounted(() => {
  categoryColor.value = listCategoriesColors[props.noteChild.category];
});

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

const listCategoriesColors = useNotesColors(); 

function deleteNote() {
  emits("setDeleteNote", props.noteIndex);
  emits("showAlert", 'node deleted');
}

function showEditF() {
  emits("setShowForm", props.noteChild, props.noteIndex)
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
