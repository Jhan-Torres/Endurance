<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center mt-1" 
    v-if="!booksList.length"
  >
    <RedAlert :text="'no books added'"/>
  </div>
  <div
    class="animate-fade-down animate-once animate-duration-[1000ms] animate-delay-[250ms] animate-reverse fixed bottom-24 left-0 right-0 z-10"
    v-if="showAlert"
  >
    <BlueAlert :text="textAlert"/>
  </div>

  <div class="flex flex-col items-center justify-center font-body mt-1">
    <Form 
      :case="'create'" 
      @addBookToList="addBook" 
      @showAlert="toggleShowAlert"
    />
  </div>
  <div class="mx-1 mb-2">
    <fwb-table 
      v-if="booksList.length"
      hoverable 
      class="font-body animate-fade-up duration-500 max-w-screen-xl mx-auto"
    >
      <fwb-table-head class="bg-slate-700 text-white tracking-wider">
        <fwb-table-head-cell 
          v-for="(head, index) in tableHeads"
          :key="index"  
        >
          <span class="text-xs font-thin ml-4 md:text-sm">{{ head }}</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <TableRow 
          v-for="(book, index) in booksList"
          :key="index"
          :book="book"
          :bookIndex="index"
          @editBook="editBook"
          @deleteBook="deleteBook"
          @showAlert="toggleShowAlert"
          :draggable="true"
          @dragover="handleDragOver"
          @dragstart="handleDragStart(book)"
          @dragend="handleDragEnd"
          :bookFinishedId="bookFinishedId"
          :showBookFinishedCheck="showBookFinishedCheck"
        />
      </fwb-table-body>
    </fwb-table>
  </div>

  <!-- edit book form -->
  <div
    class="bg-gray-900 fixed inset-0 border-2 z-10 font-body border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200"
    v-if="showEditForm"
    @dblclick="showEditForm = false"
    v-on:keyup.esc="showEditForm = false"
  >
    <h2 class="text-yellow-500">Edit Book</h2>
    <Form 
      :case="'edit'" 
      :bookToEdit="bookToEdit" 
      @saveEdit="saveEdit" 
      @closeEditForm="showEditForm = false"
      @showAlert="toggleShowAlert" 
    />
  </div>

  <section
    v-if="booksList.length"
    class="mb-1 mx-1" 
    >
    <div class="font-body rounded-xl overflow-hidden bg-gray-400 mx-auto max-w-screen-xl">
      <h2 class="text-center p-2 text-orange-500 bg-gray-900 uppercase font-bold text-xl tracking-widest">
        [Reading Zone]
      </h2>
      <div
        class="p-2 flex flex-wrap items-center justify-evenly gap-3 min-h-32 relative"
      >
        <span 
          v-if="shopDropZone"
          class="font-black text-orange-500 absolute z-10 text-5xl w-full h-full opacity-75 bg-gray-300 flex items-center justify-center"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          DROP HERE
        </span>
        <font-awesome-icon 
          :icon="['fas', 'book-skull']" 
          v-if="!booksDroppedList.length"
          class="h-24 w-24 text-gray-600"
        />

        <BookToRead 
          v-for="(book, index) in booksDroppedList"
          :key="index"
          :bookDropped="book"
          :bookDroppedIndex="index"
          @deleteDroppedBook="deleteDroppedBook"
          @finishDroppedBook="finishDroppedBook"
          @showAlert="toggleShowAlert"
        />  
      </div>
    </div>
  </section>
</template>

<script setup>
import TableRow from '@/components/books/TableRow.vue';
import Form from '@/components/books/Form.vue';
import RedAlert from '@/components/RedAlert.vue';
import BlueAlert from '@/components/BlueAlert.vue';
import BookToRead from '@/components/books/BookToRead.vue'
import {
  FwbTable,
  FwbTableBody,
  FwbTableHead,
  FwbTableHeadCell,
} from 'flowbite-vue'
import { ref, onBeforeMount } from 'vue';

const booksList = ref([]);
const booksDroppedList = ref([]);

onBeforeMount(() => {
  if (localStorage.getItem("BooksList")) {
    booksList.value = JSON.parse(localStorage.getItem("BooksList"));
  }

  if (localStorage.getItem("BooksDroppedList")) {
    booksDroppedList.value = JSON.parse(localStorage.getItem("BooksDroppedList"));
  }
})

const tableHeads = [
  'Title',
  'Autor',
  'Category',
  '' //empty space on table head
]

//Data refs
const showAlert = ref(false);
const textAlert = ref('');
const showEditForm = ref(false);
const bookToEdit = ref({});
const indexBookToEdit = ref();
//variables to store book object and its index which are dragged
const bookDrag = ref();
const shopDropZone = ref(false);
const bookFinishedId = ref();
const showBookFinishedCheck = ref(false);

function addBook(book) {
  booksList.value.push(book);
  localStorage.setItem('BooksList', JSON.stringify(booksList.value));
}

function deleteBook(bookIndex) {
  booksList.value.splice(bookIndex, 1);
  localStorage.setItem('BooksList', JSON.stringify(booksList.value));
}

function editBook(book, indexBook) {
  showEditForm.value = true;
  bookToEdit.value = book; 
  indexBookToEdit.value = indexBook;
}

function saveEdit(book) {
  booksList.value.splice(indexBookToEdit.value, 1);
  booksList.value.splice(indexBookToEdit.value, 0, book);
  localStorage.setItem('BooksList', JSON.stringify(booksList.value));
}

function toggleShowAlert(text) {
  showAlert.value = true;
  textAlert.value = text;

  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}

function handleDragStart(book) {
  bookDrag.value = book;
  shopDropZone.value = true;
}

//to drag and drop correctly 
function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave() {
  shopDropZone.value = true;
}

function handleDrop() {
  booksDroppedList.value.push(bookDrag.value);
  localStorage.setItem('BooksDroppedList', JSON.stringify(booksDroppedList.value));
}

function handleDragEnd() {
  shopDropZone.value = false;
}

function deleteDroppedBook(indexBook) {
  booksDroppedList.value.splice(indexBook, 1);
  localStorage.setItem('BooksDroppedList', JSON.stringify(booksDroppedList.value)); 
}

function finishDroppedBook(indexBook, bookId) {
  booksDroppedList.value.splice(indexBook, 1);
  localStorage.setItem('BooksDroppedList', JSON.stringify(booksDroppedList.value)); 
  bookFinishedId.value = bookId;
  showBookFinishedCheck.value = true;
}
</script>

<style scoped>

</style>
