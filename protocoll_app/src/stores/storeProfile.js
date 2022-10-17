import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "@/stores/firebase.js";
import { useStoreAuth } from "@/stores/storeAuth.js";

let profileCollectionRef;
let profileCollectionQuerry;
let getProfileSnapshot = null;

export const useStoreProfile = defineStore("storeProfile", {
  state: () => {
    return {
      profile: [],
      profileLoaded: false,
    };
  },
  actions: {
    initUser() {
      const storeAuth = useStoreAuth();
      profileCollectionRef = collection(
        db,
        "task-app",
        storeAuth.user.id,
        "profile"
      );
      profileCollectionQuerry = query(profileCollectionRef);
      this.getProfileInfo();
    },
    async getProfileInfo() {
      this.profileLoaded = false;
      getProfileSnapshot = onSnapshot(
        profileCollectionQuerry,
        (querySnapshot) => {
          let profiles = [];
          querySnapshot.forEach((doc) => {
            let info = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              githubname: doc.data().githubname,
              classes: doc.data().classes,
              fulltime: doc.data().fulltime,
            };
            profiles.push(info);
          });
          setTimeout(() => {
            this.profile = profiles;
            this.profileLoaded = true;
          }, 2000);
        }
      );
    },
    async addProfileInfo(NewProfileGitName) {
      await addDoc(profileCollectionRef, {
        content: NewProfileGitName,
      });
    },
    async deleteProfileInfo(idToDelete) {
      await deleteDoc(doc(profileCollectionRef, idToDelete));
    },
    async updateProfileInfo(id, contentGitName) {
      await updateDoc(doc(notesCollectionRef, id), {
        githubname: contentGitName,
      });
    },
    clearProfileInfo() {
      this.notes = [];
      if (getProfileSnapshot) getProfileSnapshot(); // unsubscribe from any listener
    },
  },
  getters: {},
});
