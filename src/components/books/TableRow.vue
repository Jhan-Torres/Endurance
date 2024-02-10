<template>
  <fwb-table-row 
    @dblclick="editBook"
  >
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      <font-awesome-icon 
        v-if="(props.showBookFinishedCheck === true  && props.bookFinishedId === props.book.id)"
        :icon="['fas', 'check-double']" 
        style="color: blueviolet;" 
      />
      <span class="ml-4">
        {{ props.book.title }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.autor }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.category }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      <button 
        class="hover:scale-125 hover:cursor-pointer transition duration-200 mr-0.5"
        @click="deleteBook"
      > 
        <font-awesome-icon :icon="['fas', 'trash']" :style="{color: 'rgb(190, 11, 11)'}"/>
      </button>
      <button 
        class="hover:scale-125 hover:cursor-pointer transition duration-200 ml-0.5" 
        @click="editBook"
      >
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

const props = defineProps({
  book: {
    type: Object,
    required: true
  },
  bookIndex: {
    type: Number,
    required: true
  },
  bookFinishedId: {
    type: Number,
    default: -1
  },
  showBookFinishedCheck: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["deleteBook", "editBook", "showAlert"])

//METHODS
function deleteBook() {
  emits("deleteBook", props.bookIndex);
  emits("showAlert", 'book deleted');
}

function editBook() {
  emits("editBook", props.book, props.bookIndex);
}
</script>

<style scoped>

</style>
