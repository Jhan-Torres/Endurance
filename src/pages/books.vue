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
    <BlueAlert 
      :text="textAlert" 
    />
  </div>

  <div class="flex flex-col items-center justify-center font-body mt-1">
    <Form 
      :case="'create'" 
      @addBookToList="addBook" 
      @showAlert="toggleShowAlert"
    />
  </div>
  <div class="mx-3 mb-2">
    <fwb-table 
      hoverable 
      class="font-body animate-fade-up duration-500 max-w-screen-xl mx-auto"
    >
      <fwb-table-head class="bg-slate-700 text-white tracking-wider">
        <fwb-table-head-cell 
          v-for="(head, index) in tableHeads"
          :key="index"  
        >
          <span class="text-xs font-thin md:text-sm">{{ head }}</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <TableRow 
          v-for="(book, index) in booksList"
          :key="index"
          :book="book"
          :bookIndex="index"
          @deleteBook="deleteBook"
          @showAlert="toggleShowAlert"
        />
      </fwb-table-body>
    </fwb-table>
  </div>
</template>

<script setup>
import TableRow from '@/components/books/TableRow.vue';
import Form from '@/components/books/Form.vue';
import RedAlert from '@/components/RedAlert.vue';
import BlueAlert from '@/components/BlueAlert.vue';
import {
  FwbTable,
  FwbTableBody,
  FwbTableHead,
  FwbTableHeadCell,
} from 'flowbite-vue'
import { ref } from 'vue';

const tableHeads = [
  'Title',
  'Autor',
  'Category',
  'Link',
  ''
]

//Data refs
const booksList = ref([]);
const showAlert = ref(false);
const textAlert = ref('');

function addBook(book) {
  booksList.value.push(book);
  localStorage.setItem('BooksList', JSON.stringify(booksList.value));
}

function deleteBook(bookIndex) {
  booksList.value.splice(bookIndex, 1);
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
</script>

<style scoped>

</style>