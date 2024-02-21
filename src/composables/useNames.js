import { readonly } from "vue";

export function useBooksCategories() {
  //In: Nothing
  //Out: Array of categories names used on Books page

  return [
    'astronomy',
    'hacking',
    'life style',
    'programming',
    'psychology',
    'research',
    'science',
    'others',
  ]
}

export function useNotesCategories() {
  //In: Nothing
  //Out: Array of categories names used on Notes page
  
  return [
    { name: 'course' },
    { name: 'entertainment' },
    { name: 'hacking' },
    { name: 'medicine' },
    { name: 'research' },
    { name: 'programming' },
    { name: 'tools' },
    { name: 'others' },
  ]
}

export function useBooksTableHeads() {
  //In: Nothing
  //Out: Array of heads names used on Books page table

  return [
    'Title',
    'Autor',
    'Category',
    '', //empty space on table head
  ]
}

export function useNotesColors() {
  //In: Nothing
  //Out: Object of category:color (hexadecimal) used to differentiate between notes categories
  
  return {
    'course' : 'bg-[#5f83b4]',
    'entertainment' : 'bg-[#8e87c1]',
    'hacking' : 'bg-[#2c4875]',
    'medicine' : 'bg-[#91bef2]',
    'research' : 'bg-[#8a508f]',
    'programming' : 'bg-[#ffd380]',
    'tools' : 'bg-[#ffe9c0]',
    'others' : 'bg-[#e8a0a8]'
  }
}

export function useBooksColors() {
  //In: Nothing
  //Out: Object of category:color (hexadecimal) used to differentiate between books categories
  
  return {
    'astronomy' : 'bg-[#00202e]',
    'life style' : 'bg-[#003f5c]',
    'hacking' : 'bg-[#2c4875]',
    'psychology' : 'bg-[#91bef2]',
    'research' : 'bg-[#8a508f]',
    'programming' : 'bg-[#ffd380]',
    'science' : 'bg-[#ffe9c0]',
    'others' : 'bg-[#e8a0a8]'
  }
}