<template>
  <Header />
  <div class="extended mt-1" >
    <RouterView />
  </div>
  <Footer />
</template>
    
<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';

</script>

<style>
html {
  background: radial-gradient(circle, rgba(2, 61, 61, 0.096) 7%, rgb(85, 117, 156) 100%);
}

.extended {
  min-height: calc(100vh - 152px);
}
</style>