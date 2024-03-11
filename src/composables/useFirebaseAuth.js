//imports from firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
//imports from firebase file
import { auth } from '@/firebase';

export function useFirebaseAuth() {
  //manage user login
  function userLogin(userCredentials) {
    //authenticate
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then(() => {
      alert("login succed");
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  //manage user logout
  function userLogout() {
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("session finished")
    }).catch((error) => {
      // An error happened.
      alert(error)
    });
  }

  return {
    userLogin,
    userLogout,
  }
}