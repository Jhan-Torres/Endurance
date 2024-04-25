<template>
  <fwb-table-row 
    @dblclick="editBook"
  >
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      <font-awesome-icon 
        v-show="props.book.status === 'finished'"
        :icon="['fas', 'check-double']" 
        style="color: blueviolet;"
        class="w-4"
        title="finished book"
      />
      <font-awesome-icon  
        v-show="props.book.status === 'reading'"
        :icon="['fas', 'book-open']"
        style="color: #445BB5;"
        class="w-4"
        title="on read"
      />
      <span class="font-bold" :class="{'ml-2':props.book.status, 'ml-6':!props.book.status}">
        {{ props.book.title }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.autor }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.category }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs md:text-sm flex flex-col gap-0.5">
      <button 
        v-if="props.screenType === 'mobile'"
        class="p-1 bg-slate-400 rounded-lg mx-1 hover:bg-slate-500"
        @click="addBookToReadZone"
      >
        <span class="text-black font-bold tracking-wider">Read</span>
      </button>
      <button 
        class="hover:scale-125 hover:cursor-pointer transition duration-200"
        @click="deleteBook"
      > 
        <font-awesome-icon :icon="['fas', 'trash']" :style="{color: 'rgb(190, 11, 11)'}"/>
      </button>
      <button 
        class="hover:scale-125 hover:cursor-pointer transition duration-200" 
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
  screenType: {
    type: String,
    required: true
  },
  book: {
    type: Object,
    required: true
  },
  indexBook: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(["deleteBook", "editBook", "addBookToReadZone"])

//METHODS
function deleteBook() {
  emits("deleteBook", props.book);
}

function editBook() {
  emits("editBook", props.book, props.indexBook);
}

function addBookToReadZone() {
  emits("addBookToReadZone", props.book);
} 

</script>
