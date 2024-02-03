<template>
  <fwb-table-row draggable="true">
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      Apple MacBook Pro 17"
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      Sliver
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      Laptop
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      $2999
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      <button 
        class="hover:scale-125 hover:cursor-pointer transition duration-200 mr-0.5"
        @click="deleteBook"
      > 
        <font-awesome-icon :icon="['fas', 'trash']" :style="{color: 'rgb(190, 11, 11)'}"/>
      </button>
      <button class="hover:scale-125 hover:cursor-pointer transition duration-200 ml-0.5" >
        <font-awesome-icon :icon="['fas', 'pen']" :style="{color: 'rgb(100, 100, 255)'}"/>
      </button>
    </fwb-table-cell>
  </fwb-table-row>
</template>

<script setup>
import {
  FwbTableCell,
  FwbTableRow,
} from 'flowbite-vue'
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  book: {
    type: Object,
    required: true
  },
  bookIndex: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(["deleteBook", "showAlert"])

//METHODS
function deleteBook() {
  emits("deleteBook", props.bookIndex);
  emits("showAlert", 'book deleted');
}
</script>

<style scoped>

</style>
