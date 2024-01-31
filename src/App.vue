<template>
  <Header />
  <div 
    class="extended mt-1"
  >
    <RouterView />
  </div>
  <Footer />
</template>
    
<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';

//pages
import notesPage from './pages/notes.vue';
import booksPage from './pages/books.vue';
import passwordsPage from './pages/passwords.vue';

</script>

<style>
html {
  background: radial-gradient(circle, rgba(122, 169, 171, 0.09567577030812324) 7%, rgba(115, 153, 200, 1) 100%);
}

.extended {
  min-height: calc(100vh - 152px);
}
</style>