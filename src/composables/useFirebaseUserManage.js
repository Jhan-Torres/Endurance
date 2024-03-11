import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
//imports from firebase file
import { auth } from '@/firebase';

export function useFirebaseUserManage() {
  const state = ref('');

  function getUserSessionState() {
    console.log("inside state");
  }

  console.log("inside userManage");

  return {
    getUserSessionState,
  }
}

