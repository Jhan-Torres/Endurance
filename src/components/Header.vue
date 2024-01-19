<template>
  <div class="bg-gray-900 p-0.5 md:p-0">
    <fwb-navbar class="bg-gray-900 max-w-screen-xl mx-auto">
      <template #logo>
        <fwb-navbar-logo alt="Endurance logo" image-url="/img/saturno.svg" link="#" class="animate-pulse">
          <h1 class="text-2xl tracking-wider font-normal font-title py-2 uppercase text-slate-100 lg:text-3xl">
            Endurance
          </h1>
        </fwb-navbar-logo>
      </template>
      <template #default="{ isShowMenu }">
        <!-- navbar for small pages -->
        <fwb-navbar-collapse :is-show-menu="isShowMenu" class="fixed top-10 right-0 z-10 md:hidden">
          <fwb-navbar-link is-active link="#">
            <span class="uppercase font-body font-bold">NOTES</span>
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            <span class="uppercase font-body font-bold">PASSWORDS</span>
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            <span class="uppercase font-body font-bold">BOOKS</span>
          </fwb-navbar-link>
        </fwb-navbar-collapse>

        <!-- navbar for medium and large pages -->
        <fwb-navbar-collapse :is-show-menu="isShowMenu" class="hidden md:flex">
          <fwb-navbar-link is-active link="#">
            <span class="uppercase font-body font-bold">NOTES</span>
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            <span class="uppercase font-body font-bold">PASSWORDS</span>
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            <span class="uppercase font-body font-bold">BOOKS</span>
          </fwb-navbar-link>
        </fwb-navbar-collapse>
      </template>
      <template #right-side>
        <fwb-button>
          <span class="font-body">Login</span>
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
  FwbNavbarLink,
  FwbNavbarLogo,
} from 'flowbite-vue'
</script>

<style scoped></style>
