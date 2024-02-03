<template>
  <fwb-table 
    hoverable 
    class="font-body animate-fade-up duration-500 max-w-screen-xl mx-auto"
  >
    <fwb-table-head class="bg-slate-700 text-white tracking-widest">
      <fwb-table-head-cell>
        <span class="text-sm md:text-base">Title</span>
      </fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="text-sm md:text-base">Autor</span>
      </fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="text-sm md:text-base">Category</span>
      </fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="text-sm md:text-base">Link</span>
      </fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="sr-only">Edit</span>
      </fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row draggable="true">
        <fwb-table-cell>Apple MacBook Pro 17"</fwb-table-cell>
        <fwb-table-cell>Sliver</fwb-table-cell>
        <fwb-table-cell>Laptop</fwb-table-cell>
        <fwb-table-cell>$2999</fwb-table-cell>
        <fwb-table-cell>
          <fwb-a href="#">
            Edit
          </fwb-a>
        </fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-cell>Microsoft Surface Pro</fwb-table-cell>
        <fwb-table-cell>White</fwb-table-cell>
        <fwb-table-cell>Laptop PC</fwb-table-cell>
        <fwb-table-cell>$1999</fwb-table-cell>
        <fwb-table-cell>
          <fwb-a href="#">
            Edit
          </fwb-a>
        </fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-cell>Magic Mouse 2</fwb-table-cell>
        <fwb-table-cell>Black</fwb-table-cell>
        <fwb-table-cell>Accessories</fwb-table-cell>
        <fwb-table-cell>$99</fwb-table-cell>
        <fwb-table-cell>
          <fwb-a href="#">
            Edit
          </fwb-a>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>

<script setup>
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'
</script>

<style scoped>

</style>
