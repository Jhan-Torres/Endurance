<template>
  <fwb-table-row 
    @dblclick="editBook"
  >
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      <font-awesome-icon 
        v-show="props.book.done"
        :icon="['fas', 'check-double']" 
        style="color: blueviolet;"
      />
      <span :class="{'ml-3':props.book.done, 'ml-6':!props.book.done}">
        {{ props.book.title }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.autor }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm">
      {{ props.book.category }}
    </fwb-table-cell>
    <fwb-table-cell class="text-xs font-thin md:text-sm flex flex-col gap-0.5">
      <button 
        v-if="props.screenType === 'mobile'"
        class="p-1 bg-slate-400 rounded-lg mx-1 hover:bg-slate-500"
        @click="addBookToReadZone"
      >
        <span class="text-black">
          Read
        </span>
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
import { onUpdated, ref } from 'vue';

const showIcon = ref(null);

const props = defineProps({
  screenType: {
    type: String,
    required: true
  },
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

//show doble check icon
onUpdated(() => {
  if(props.showBookFinishedCheck === true  && props.bookFinishedId === props.book.id) {
    props.book.done = true;
    showIcon.value = true;
  } 
})

const emits = defineEmits(["deleteBook", "editBook", "showAlert", "addBookToReadZone"])

//METHODS
function deleteBook() {
  emits("deleteBook", props.bookIndex);
  emits("showAlert", 'book deleted');
}

function editBook() {
  emits("editBook", props.book, props.bookIndex);
}

function addBookToReadZone() {
  emits("addBookToReadZone", props.book);
} 

</script>
