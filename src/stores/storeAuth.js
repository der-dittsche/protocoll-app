import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/stores/firebase.js";
import { useStoreNotes } from "@/stores/storeNotes.js";
import { useStoreProfile } from "@/stores/storeProfile.js";
import { useStoreAttendees } from "@/stores/storeAttendees.js";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    initUser() {
      const storeNotes = useStoreNotes();
      const storeProfile = useStoreProfile();
      const storeAttendees = useStoreAttendees();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          storeNotes.initUser();
          storeProfile.initUser();
          storeAttendees.initUser();
        } else {
          this.user = {};
          this.router.replace("/auth");
          storeNotes.clearNotes();
          storeProfile.clearProfileInfo();
          storeAttendees.clearAttendees();
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log("error.message", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log("You are logout");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  getters: {},
});
