import { createRouter, createWebHashHistory } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth.js";
import ViewNotes from "@/views/ViewNotes.vue";
import ViewStats from "@/views/ViewStats.vue";
import ViewEditNote from "@/views/ViewEditNote.vue";
import ViewAuth from "@/views/ViewAuth.vue";
import ViewProfile from "@/views/ViewAttendeeInfo.vue";
import ViewRoti from "@/views/ViewRoti.vue";
import ViewAddAttendees from "@/views/ViewAddAttendees.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: ViewNotes,
  },
  {
    path: "/stats",
    name: "stats",
    component: ViewStats,
  },
  {
    path: "/editNote/:id",
    name: "editnote",
    component: ViewEditNote,
  },
  {
    path: "/auth",
    name: "auth",
    component: ViewAuth,
  },
  {
    path: "/profile",
    name: "profile",
    component: ViewProfile,
  },
  {
    path: "/roti",
    name: "roti",
    component: ViewRoti,
  },
  {
    path: "/addattendee",
    name: "addattendee",
    component: ViewAddAttendees,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();
  if (!storeAuth.user.id && to.name !== "auth") {
    return { name: "auth" };
  }
  if (storeAuth.user.id && to.name !== "auth") {
    return true;
  }
});

export default router;
