<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center mb-1" 
    v-if="!booksList.length && !books.showSpinner.value === false"
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
      @addBook="addBook"
      @showAlert="handleShowAlert"
    />
  </div>

  <div class="mx-1 mb-2 md:mx-3">
    <div class="flex justify-center items-center">
      <Spinner
        v-if="books.showSpinner.value"
      />
    </div>

    <fwb-table 
      v-if="booksList.length"
      hoverable 
      class="font-body animate-fade-up duration-500 max-w-screen-xl mx-auto"
    >
      <fwb-table-head class="bg-slate-700 text-white tracking-wider select-none">
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
          :screenType="screenType"
          :book="book"
          @editBook="handleEditBook"
          @deleteBook="deleteBook"
          @showAlert="handleShowAlert"
          :draggable="screenType === 'desktop'"
          @dragover="handleDragOver"
          @dragstart="handleDragStart(book)"
          @dragend="handleDragEnd"
          @addBookToReadZone="handleDrop"
        />
      </fwb-table-body>
    </fwb-table>
  </div>
  <!-- edit book form -->
  <div
    class="bg-gray-900 fixed inset-0 border-2 z-10 font-body border-orange-500 rounded-lg flex flex-col items-center justify-center m-2 animate-fade-up animate-duration-[800ms] animate-delay-200"
    v-if="showEditForm"
    v-on:keyup.esc="showEditForm = false"
  >
    <h2 class="text-yellow-500">Edit Book</h2>
    <Form 
      :case="'edit'" 
      :bookToEdit="bookToEdit" 
      @saveEdit="updateBook"
      @closeEditForm="handleCloseEditForm"
      @showAlert="handleShowAlert"
    />
  </div>

  <section
    v-if="booksList.length"
    class="mb-1 mx-1 md:mx-3" 
  >
    <div 
      class="hover:animate-border hover:bg-gradient-to-r from-red-500 via-purple-600 to-blue-700 bg-[length:400%_400%] p-1 max-w-screen-xl mx-auto rounded-2xl"
    >
      <div class="font-body rounded-xl overflow-hidden bg-slate-500">
        <h2 class="text-center p-2 text-orange-500 bg-gray-900 uppercase font-bold text-xl tracking-widest select-none">
          [Reading Zone]
        </h2>
        <div
          class="p-2 flex flex-wrap items-center justify-evenly gap-3 min-h-28 relative"
        >
          <span 
            v-if="showDropZone"
            class="font-black text-orange-500 absolute z-10 text-5xl w-full h-full opacity-75 bg-gray-300 flex items-center justify-center"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop(bookDrag)"
          >
            DROP HERE
          </span>
          <font-awesome-icon 
            :icon="['fas', 'book-skull']" 
            v-if="!booksDroppedList.length"
            class="h-20 w-24 text-gray-600"
          />
          <BookToRead 
            v-for="(book, index) in booksDroppedList"
            :key="index"
            :bookDropped="book"
            :index="index"
            @deleteDroppedBook="deleteDroppedBook"
            @finishDroppedBook="finishDroppedBook"
            @showAlert="handleShowAlert"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TableRow from '@/components/books/TableRow.vue';
import Form from '@/components/books/Form.vue';
import RedAlert from '@/components/RedAlert.vue';
import BlueAlert from '@/components/BlueAlert.vue';
import BookToRead from '@/components/books/BookToRead.vue';
import Spinner from '@/components/Spinner.vue';
import { FwbTable, FwbTableBody, FwbTableHead, FwbTableHeadCell, } from 'flowbite-vue'
import { computed, ref } from 'vue';

//composables imports
import { useBooksTableHeads } from '@/composables/useNames'; //Importing a function
import getScreenWidth from '@/composables/useScreenWidth';
import { useBooks } from '@/composables/useBooks'

const tableHeads = useBooksTableHeads();
const screenType = getScreenWidth();
const books = useBooks();

const booksList = computed(() => {
  return books.booksList.value;
});

const booksDroppedList = computed(() => {
  return books.booksDroppedList.value;
})

//Data refs
const showAlert = ref(false);
const textAlert = ref('');
const showEditForm = ref(false);
const bookToEdit = ref({});
//variables to store book object and its index which are dragged
const bookDrag = ref({});
const showDropZone = ref(false);

function addBook(book) {
  books.addBook(book)
  .then(() => handleShowAlert("book added"))
  .catch(() => console.error("something happened"));
}

function deleteBook(book) {
  books.deleteBook(book)
  .then(() => handleShowAlert("book deleted"))
  .catch(() => console.error("something happened"));
}

function updateBook(book) {
  books.updateBook(book)
  .then(() => handleShowAlert("book edited"))
  .catch(() => console.error("something happened"));
}

function handleEditBook(book) {
  showEditForm.value = true;
  bookToEdit.value = book;
}

function handleDragStart(book) {
  bookDrag.value = book;
  showDropZone.value = true;
}

//to drag and drop correctly 
function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave() {
  showDropZone.value = true;
}

async function handleDrop(book) {
  if (duplicateBook(book.id)) return;

  await updateDoc(doc(booksCollectionRef, book.id), {
    status: 'reading'
  });
}

function handleDragEnd() {
  showDropZone.value = false;
  bookDrag.value = {};
}

async function deleteDroppedBook(book) {
  await updateDoc(doc(booksCollectionRef, book.id), {
    status: ''
  });
}

async function finishDroppedBook(book) {
  await updateDoc(doc(booksCollectionRef, book.id), {
    status: 'finished'
  });
}

function duplicateBook(bookId) {
  for (let i = 0; i < booksDroppedList.value.length; i++) {
    if (booksDroppedList.value[i].id === bookId) {
      handleShowAlert("Book Duplicate");
      return true;
    }
  }
  return false;
}

function handleCloseEditForm() {
  showEditForm.value = false;
}

function handleShowAlert(text) {
  showAlert.value = true;
  textAlert.value = text;

  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}
</script>
