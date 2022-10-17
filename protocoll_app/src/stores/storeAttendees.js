import { defineStore } from "pinia";

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
import { useStoreAuth } from "@/stores/storeAuth.js";

let attendeesCollectionRef;
let attendeesCollectionQuerry;
let getAttendeesSnapshot = null;

export const useStoreAttendees = defineStore("storeAttendees", {
  state: () => {
    return {
      attendees: [],
      attendeesLoaded: false,
    };
  },
  actions: {
    initUser() {
      const storeAuth = useStoreAuth();
      attendeesCollectionRef = collection(db, "roti");
      attendeesCollectionQuerry = query(attendeesCollectionRef);
      this.getAtendees();
    },
    async getAtendees() {
      this.attendeesLoaded = false;
      getAttendeesSnapshot = onSnapshot(
        attendeesCollectionQuerry,
        (querySnapshot) => {
          let attendees = [];
          querySnapshot.forEach((doc) => {
            let attendee = {
              id: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
              classes: doc.data().classes,
              fulltime: doc.data().fulltime,
            };
            attendees.push(attendee);
          });
          setTimeout(() => {
            this.attendees = attendees;
            this.attendeesLoaded = true;
          }, 2000);
        }
      );
    },
    async addAttendee(
      NewAttendeeFirstname,
      NewAttendeeLastname,
      NewAttendeeClasses,
      NewAttendeeFulltime
    ) {
      await addDoc(attendeesCollectionRef, {
        firstname: NewAttendeeFirstname,
        lastname: NewAttendeeLastname,
        classes: NewAttendeeClasses,
        fulltime: NewAttendeeFulltime,
      });
    },
    async deleteAttendee(idToDelete) {
      await deleteDoc(doc(attendeesCollectionRef, idToDelete));
    },
    async updateAttendee(id) {
      await updateDoc(doc(attendeesCollectionRef, id), {});
    },
    clearAttendees() {
      this.attendees = [];
      if (getAttendeesSnapshot) getAttendeesSnapshot(); // unsubscribe from any listener
    },
  },
  getters: {},
});
