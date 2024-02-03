<template>
  <div class="flex flex-col items-center justify-center font-body">
    <Form/>
  </div>
  <div class="mx-3 mb-2">
    <fwb-table 
      hoverable 
      class="font-body animate-fade-up duration-500 max-w-screen-xl mx-auto"
    >
      <fwb-table-head class="bg-slate-700 text-white tracking-wider">
        <fwb-table-head-cell>
          <span class="text-xs font-thin md:text-sm">Title</span>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="text-xs font-thin md:text-sm">Autor</span>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="text-xs font-thin md:text-sm">Category</span>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="text-xs font-thin md:text-sm">Link</span>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <TableRow 
          
        />
      </fwb-table-body>
    </fwb-table>
  </div>
</template>

<script setup>
import TableRow from '@/components/books/TableRow.vue';
import Form from '@/components/books/Form.vue';
import {
  FwbTable,
  FwbTableBody,
  FwbTableHead,
  FwbTableHeadCell,
} from 'flowbite-vue'
import { ref } from 'vue';

//Data refs
const booksList = ref([]);
</script>

<style scoped>

</style>