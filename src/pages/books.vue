<template>
  <div class="flex flex-col items-center justify-center font-body">
    <Form/>
  </div>
  <div class="mx-3 mb-2">
    <Table />
  </div>
</template>

<script setup>
import Table from '@/components/books/Table.vue';
import Form from '@/components/books/Form.vue';
</script>

<style scoped>

</style>