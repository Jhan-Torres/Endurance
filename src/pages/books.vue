<template>
  <!-- Alerts -->
  <div 
    class="flex items-center justify-center" 
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

  <div class="flex flex-col items-center justify-center font-body">
    <Form 
      :case="'create'" 
      @addBook="addBook"
      @showAlert="handleShowAlert"
    />
  </div>
  <div class="mx-1 mb-2">
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
          :bookIndex="index"
          @editBook="editBook"
          @deleteBook="deleteBook"
          @showAlert="handleShowAlert"
          :draggable="screenType === 'desktop'"
          @dragover="handleDragOver"
          @dragstart="handleDragStart(book)"
          @dragend="handleDragEnd"
          :bookFinishedId="bookFinishedId"
          :showBookFinishedCheck="showBookFinishedCheck"
          @addBookToReadZone="handleDrop"
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
      @closeEditForm="handleCloseEditForm"
      @showAlert="handleShowAlert"
    />
  </div>

  <section
    v-if="booksList.length"
    class="mb-1 mx-1" 
    >
    <div class="font-body rounded-xl overflow-hidden bg-gray-400 mx-auto max-w-screen-xl">
      <h2 class="text-center p-1 text-orange-500 bg-gray-900 uppercase font-bold text-xl tracking-widest select-none">
        [Reading Zone]
      </h2>
      <div
        class="p-2 flex flex-wrap items-center justify-evenly gap-3 min-h-28 relative"
      >
        <span 
          v-if="shopDropZone"
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
          :bookDroppedIndex="index"
          @deleteDroppedBook="deleteDroppedBook"
          @finishDroppedBook="finishDroppedBook"
          @showAlert="handleShowAlert"
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
import BookToRead from '@/components/books/BookToRead.vue';
import Spinner from '@/components/Spinner.vue';
import { FwbTable, FwbTableBody, FwbTableHead, FwbTableHeadCell, } from 'flowbite-vue'
import { ref, onBeforeMount } from 'vue';
import { useBooksTableHeads } from '@/composables/useNames'; //Importing a function
//Firebase imports
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase';
//firebase refs
const booksCollectionRef = collection(db, 'books');

const showLoaderSpinner = ref(true);

const booksList = ref([]);
const booksDroppedList = ref([]);
const screenType = ref("");

onBeforeMount(() => {
  //to manage the type of the screen where website is running
  screenType.value = (screen.width <= 768) ? 'mobile' : 'desktop';
})

onSnapshot(booksCollectionRef, (querySnapshot) => {
  const fbBooks = [];
  const fbBooksOnReading = [];
  showLoaderSpinner.value = true;
  querySnapshot.forEach((doc) => {
    //use conditional operator (?) cuz when we get data from firebase some fields are undefined, this will
    //throw error on edit actions, due we are using objects to store field´s values.  
    const book = {
      id: doc.id,
      title: doc.data().title,
      autor: (doc.data().autor) ? doc.data().autor : '',
      category: doc.data().category,
      status: (doc.data().status) ? doc.data().status : '',
    }
    fbBooks.push(book);
    
    if(doc.data().status === 'reading') {
      fbBooksOnReading.push(book);
    }
  });
  booksList.value = fbBooks;
  booksDroppedList.value = fbBooksOnReading;
  showLoaderSpinner.value = false;
});

const tableHeads = useBooksTableHeads();

//Data refs
const showAlert = ref(false);
const textAlert = ref('');
const showEditForm = ref(false);
const bookToEdit = ref({});
//variables to store book object and its index which are dragged
const bookDrag = ref();
const shopDropZone = ref(false);
const bookFinishedId = ref();
const showBookFinishedCheck = ref(false);
//if we delete a book from table also delete on readingZone
const bookDroppedToDeleteIndex = ref();

function addBook(book) {
  // Add a new document with a generated id to firebase.
  addDoc(booksCollectionRef, book);
}

function deleteBook(book) {
  deleteDoc(doc(booksCollectionRef, book.id))
}

function editBook(book) {
  showEditForm.value = true;
  bookToEdit.value = book; 
} 

function saveEdit(book) {
  updateDoc(doc(booksCollectionRef, book.id), book);
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

function handleDrop(book) {
  if (duplicateBook(book.id)) return;

  updateDoc(doc(booksCollectionRef, book.id), {
    status: 'reading'
  });
}

function handleDragEnd() {
  shopDropZone.value = false;
}

function deleteDroppedBook(book) {
  updateDoc(doc(booksCollectionRef, book.id), {
    status: ''
  });
}

function finishDroppedBook(book) {
  updateDoc(doc(booksCollectionRef, book.id), {
    status: 'finished'
  });
  showBookFinishedCheck.value = true;
}

function duplicateBook(bookId) {
  for (let i = 0; i < booksDroppedList.value.length; i++) {
    if (booksDroppedList.value[i].id === bookId) {
      handleShowAlert("Book Duplicate");
      bookDroppedToDeleteIndex.value = i;
      return true;
    }
  }
  return false;
}

function handleCloseEditForm() {
  showEditForm.value = false;
  //to clean bookFinishedId cuz we´re using onUpdate hook on tableRow
  bookFinishedId.value = null;
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
