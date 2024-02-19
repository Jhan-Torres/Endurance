import { readonly } from "vue";

export function useBooksCategories() {
  //In: Nothing
  //Out: Array of categories names used on Books page

  return [
    'Astronomy',
    'Hacking',
    'Life Style',
    'Programming',
    'Psychology',
    'Research',
    'Science',
    'Others',
  ]
}

export function useNotesCategories() {
  //In: Nothing
  //Out: Array of categories names used on Notes page
  
  return [
    { name: 'Course' },
    { name: 'Entertainment' },
    { name: 'Hacking' },
    { name: 'Medicine' },
    { name: 'Research' },
    { name: 'Programming' },
    { name: 'Tools' },
    { name: 'Others' },
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
    'Course' : 'bg-[#5f83b4]',
    'Entertainment' : 'bg-[#8e87c1]',
    'Hacking' : 'bg-[#2c4875]',
    'Medicine' : 'bg-[#91bef2]',
    'Research' : 'bg-[#8a508f]',
    'Programming' : 'bg-[#ffd380]',
    'Tools' : 'bg-[#ffe9c0]',
    'Others' : 'bg-[#e8a0a8]'
  }
}

export function useBooksColors() {
  //In: Nothing
  //Out: Object of category:color (hexadecimal) used to differentiate between books categories
  
  return {
    'Astronomy' : 'bg-[#00202e]',
    'Life Style' : 'bg-[#003f5c]',
    'Hacking' : 'bg-[#2c4875]',
    'Psychology' : 'bg-[#91bef2]',
    'Research' : 'bg-[#8a508f]',
    'Programming' : 'bg-[#ffd380]',
    'Science' : 'bg-[#ffe9c0]',
    'Others' : 'bg-[#e8a0a8]'
  }
}