<template>
  <div 
    class="bg-gray-900 p-0.5 md:p-0"
  >
    <fwb-navbar 
      class="bg-gray-900 max-w-screen-xl mx-auto"
    >
      <template #logo>
        <fwb-navbar-logo 
          alt="Endurance logo" 
          image-url="/img/saturno.svg" 
          class="animate-pulse"
        >
          <h1 
            class="text-2xl tracking-wider font-normal font-title py-2 uppercase text-slate-100 lg:text-3xl"
          >
            Endurance
          </h1>
        </fwb-navbar-logo>
      </template>
      <template 
        #default="{ isShowMenu }">
        <!-- navbar for small pages -->
        <fwb-navbar-collapse 
          :is-show-menu="isShowMenu" 
          class="fixed top-10 right-0 z-10 md:hidden"
        >
          
          <router-link 
            v-for="(route, index) in routes"
            :key="index"
            class="rounded-lg"
            :to="route.name"
          >
            <span>a</span>
          </router-link>
          <router-link
            class="rounded-lg"
            to="/books"
            >
            <font-awesome-icon :icon="['fas', 'book']" class="ml-2"/>
            <span 
            class="uppercase font-body font-black py-1 mx-3 text-lg"
            >
            books
            </span>
          </router-link>
          <router-link
            class="rounded-lg"
            to="/notes"
          >
            <font-awesome-icon :icon="['fas', 'note-sticky']" class="ml-2"/>
            <span 
            class="uppercase font-body font-black py-1 mx-3 text-lg"
            >
            notes
            </span>
          </router-link>
          <router-link
            class="rounded-lg"
            to="/passwords"
          >
            <font-awesome-icon :icon="['fas', 'key']" class="ml-2"/>
            <span 
              class="uppercase font-body font-black py-1 mx-3 text-lg"
            >
            passwords
            </span>
          </router-link>
        </fwb-navbar-collapse>

        <!-- navbar for medium and large pages -->
        <fwb-navbar-collapse 
          :is-show-menu="isShowMenu" 
          class="hidden md:flex"
        >
          <router-link
            to="/books"
            >
            <span 
            class="uppercase font-body font-black"
            >
            books
            </span>
          </router-link>
          <router-link
            to="/notes"
          >
            <span 
            class="uppercase font-body font-black"
            >
            notes
            </span>
          </router-link>
          <router-link
            to="/passwords"
          >
            <span 
              class="uppercase font-body font-black"
            >
            passwords
            </span>
          </router-link>
        </fwb-navbar-collapse>
      </template>
      <template #right-side>
        <fwb-button>
          <span class="font-body font-light">Login</span>
        </fwb-button>
      </template>
    </fwb-navbar>
  </div>
</template>

<script setup>
import {
  FwbButton,
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLogo,
} from 'flowbite-vue'

import { RouterLink } from 'vue-router';

//web site rutes array, which contains route's name and its icons respectively according to fontawesome library
const routes = [
  {
    name: 'books',
    icon: 'book'
  },
  {
    name: 'notes',
    icon: 'note-sticky'
  },
  {
    name: 'passwords',
    icon: 'key'
  }
]

</script>

<style scoped>
  /* to manage vue-router styles which are added automatically */
  .router-link-active {
    color: cornflowerblue;
  }

  /* background color to active route on small pages only */
  @media only screen and (width < 768px ){ 
    .router-link-active {
      background-color: rgb(215, 223, 220);
    }
  }

  /* when we have child routes */
  /* .router-link-exact-active {
    color: red;
  } */
</style>
