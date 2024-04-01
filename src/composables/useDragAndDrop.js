import { ref } from "vue";
import { useBooks } from "./useBooks";

const books = useBooks();
const itemDragged = ref({});
const showDropArea = ref(false);

export function useDragAndDrop() {

  function dragStart(item) {
    itemDragged.value = item;
    showDropArea.value = true;
  }

  //to drag and drop correctly 
  function dragOver(event) {
    event.preventDefault();
  }

  function dragLeave() {
    showDropArea.value = true;
  }

  function drop(itemDropped) {
    books.updateBook(itemDropped);
  }
  
  function dragEnd() {
    itemDragged.value = {};
    showDropArea.value = false;
  }

  return {
    showDropArea,
    itemDragged,
    dragStart,
    dragOver,
    dragLeave,
    dragEnd,
    drop,
  }
}