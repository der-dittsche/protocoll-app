import { defineStore, acceptHMRUpdate } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/stores/firebase.js";

const notesCollectionRef = collection(db, "task-app");
const notesCollectionQuerry = query(
  notesCollectionRef,
  orderBy("date", "desc"),
  limit(5)
);

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;
      onSnapshot(notesCollectionQuerry, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        setTimeout(() => {
          this.notes = notes;
          this.notesLoaded = true;
        }, 2000);
      });
    },
    async addNote(NewNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: NewNoteContent,
        date,
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
        username: "Sascha Dietrich",
        show: true,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNoteCount: (state) => {
      return state.notes.length;
    },
    totalNoteCharacter: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot));
}
