<script setup>
import {
  FwbTable,
  FwbTableBody,
  FwbTableHead,
  FwbTableHeadCell,
} from 'flowbite-vue'
import TableRow from './TableRow.vue';
import { PasswordTableHeads } from '@/utils/PasswordTableHeads';

const data = {
  site: 'Facebook',
  url: 'www.facebook.com',
  user: 'jhanmte_g@hotmail.com',
  password: 'Pa$$w0rd',
  category: 'Red Social',
}
</script>

<template>
  <fwb-table 
    hoverable 
    class="font-body max-w-screen-xl mx-auto shadow-lg shadow-slate-600"
  >
    <fwb-table-head class="bg-slate-800 text-white tracking-widest">
      <fwb-table-head-cell
        v-for="(title, i) in PasswordTableHeads"
        :key="i"
      > 
        {{ title }}
      </fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <TableRow
        :data="data"
      />
    </fwb-table-body>
  </fwb-table>
</template>

