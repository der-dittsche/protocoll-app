<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a Note"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add a Note
          </button>
        </div>
      </div>
    </div>
    <NoteCollection
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteClicked="deleteNote"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NoteCollection from "@/components/Notes/NoteCollection.vue";

const newNote = ref("");
const newNoteRef = ref(null);

const notes = ref([
  {
    id: "id1",
    content:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam modi dolores consequuntur velit sunt officiis consectetur, maxime debitis harum recusandae ea saepe at doloremque odit iste ad exercitationem totam enim?",
  },
  {
    id: "id2",
    content:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam modi dolores consequuntur velit sunt officiis consectetur, maxime debitis harum recusandae ea saepe at doloremque odit iste ad exercitationem totam enim? Lorem ipsum, dolor sit amet consectetu pisicing elit. Quam modi dolores consequuntur velit sunt officiis consectetur, maxime debitis harum recusandae ea saepe at doloremque odit iste ad exercitationem totam enim?",
  },
  {
    id: "id3",
    content: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
]);

const addNote = () => {
  let currentDate = new Date().getTime(),
    id = currentDate.toString();

  let note = {
    id,
    content: newNote.value,
  };
  notes.value.unshift(note);

  newNote.value = "";
  newNoteRef.value.focus();
};

const deleteNote = (idToDelete) => {
  notes.value = notes.value.filter((note) => {
    return note.id !== idToDelete;
  });
};
</script>
