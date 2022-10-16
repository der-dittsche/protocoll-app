import { defineStore, acceptHMRUpdate } from "pinia";

import { auth } from "@/stores/firebase.js";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {};
  },
  actions: {},
  getters: {},
});
