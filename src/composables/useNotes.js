import { 
  collection, 
  onSnapshot, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  query, 
  orderBy
} from "firebase/firestore";
import { db } from '@/firebase';
import { ref } from "vue";

export function useNotes() {
  //firebase refs
  const notesCollectionRef = collection(db, 'notes');
  const notesCollectionQuery = query(notesCollectionRef, orderBy('category', 'asc'));
  
  //data refs
  const notesList = ref([]);
  const showSpinner = ref(true);

  //set all notes stored on firebase, it works automatically
  onSnapshot(notesCollectionQuery, (querySnapshot) => {
    const fbNotes = [];
    querySnapshot.forEach((doc) => {
      //data of every doc(note)
      const note = {
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        category: doc.data().category,
      }
      fbNotes.push(note);
    });
    notesList.value = fbNotes;
    showSpinner.value = false
  });

  //add new note
  async function addNote(note) {
    // Add a new document with a generated id to firebase.
    await addDoc(notesCollectionRef, note);
  }

  async function deleteNote(noteId) {
    //delete a document with its id from firebase. 
    await deleteDoc(doc(notesCollectionRef, noteId));
  }

  async function updateNote(note, noteId) {
    //update a document with its id and fields modified, from firebase
    await updateDoc(doc(notesCollectionRef, noteId), note);
  }

  return {
    notesList,
    showSpinner,
    addNote,
    deleteNote,
    updateNote,
  }
}

