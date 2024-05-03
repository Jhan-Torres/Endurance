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
          :book="book"
          :indexBook="index"
          @editBook="handleEditBook"
          @deleteBook="deleteBook"
          :draggable="screenType === 'desktop'"
          @dragstart="dragAndDrop.dragStart(book)"
          @dragend="dragAndDrop.dragEnd()"
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
      :indexBook="editBookIndex"
      @saveEdit="updateBook"
      @closeEditForm="showEditForm = false"
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
            @dragleave="dragAndDrop.dragLeave()"
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
import getScreenWidth from '@/composables/useScreenWidth';
import { useBooksTableHeads } from '@/composables/useNames'; //Importing a function
import { useBooks } from '@/composables/useBooks'
import { useDragAndDrop } from '@/composables/useDragAndDrop'
import { validUser } from '@/firebase';
import useDemo from '@/composables/useDemo';

const demo = new useDemo();
const screenType = getScreenWidth();
const tableHeads = useBooksTableHeads();
const books = useBooks();
const dragAndDrop = useDragAndDrop();

const booksList = computed(() => {
  return (validUser.value) ? books.booksList.value : demo.getData("booksData");
});

const booksDroppedList = computed(() => {
  return (validUser.value) ? books.booksDroppedList.value : demo.getData("booksDropped");
})

//Data refs
const showAlert = ref(false);
const textAlert = ref('');
const showEditForm = ref(false);
const bookToEdit = ref({});
const editBookIndex = ref()

//variables to store book object and its index which are dragged
const bookDrag = computed(() => {
  return dragAndDrop.itemDragged.value;
});
const showDropZone = computed(() => {
  return dragAndDrop.showDropArea.value;
});

function addBook(book) {
  if(validUser.value) {
    books.addBook(book)
    .then(() => handleShowAlert("book added"))
    .catch(() => console.error("something happened"));
  } else {
    //if user is demo
    demo.add("booksData", book);
    handleShowAlert("book added");
  }
}

function deleteBook(book) {
  if(validUser.value) {
    books.deleteBook(book.id)
    .then(() => handleShowAlert("book deleted"))
    .catch(() => console.error("something happened"));
  } else {
    //if user is demo
    demo.delete("booksData", book);
    handleShowAlert("book deleted");
  }
}

function updateBook(newBook, indexOldBook) {
  if(validUser.value) {
    books.updateBook(newBook)
    .then(() => handleShowAlert("book edited"))
    .catch(() => console.error("something happened"));
  } else {
    //if user is demo
    demo.update("booksData", newBook, indexOldBook);
    handleShowAlert("book edited");
  }
}

function handleShowAlert(text) {
  showAlert.value = true;
  textAlert.value = text;

  setTimeout(() => {
    showAlert.value = false;
    textAlert.value = "";
  }, 1000);
}

function handleEditBook(book, indexBook) {
  showEditForm.value = true;
  bookToEdit.value = book;
  editBookIndex.value = indexBook;
}

//drag and drop functions
function handleDragOver(event) {
  dragAndDrop.dragOver(event);
}

function handleDrop(bookDropped) {
  //add a new field with new value; 
  bookDropped.status = 'reading';
  
  if(validUser.value) {
    if (duplicateBook(bookDropped.id)) return;
    dragAndDrop.drop(bookDropped);
    handleShowAlert("book added");
  } else {
    (booksDroppedList.value.indexOf(bookDropped) === -1) 
    ? demo.add("booksDropped", bookDropped)
    : handleShowAlert("Book Duplicate");
  }
}

function deleteDroppedBook(book) {
  //change status field
  book.status = '';

  if(validUser.value) {
    books.updateBook(book)
    .then(() => handleShowAlert("book deleted"))
    .catch(() => console.error("something happened"));
  } else {
    demo.delete("booksDropped", book);
    handleShowAlert("book deleted");
  }
}

function finishDroppedBook(book) {
  book.status = 'finished';

  if(validUser.value) {
    books.updateBook(book)
    .then(() => handleShowAlert("Congrats!"))
    .catch(() => console.error("something happened"));
  } else {
    demo.delete("booksDropped", book);
    handleShowAlert("Congrats!");
  }
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

</script>
