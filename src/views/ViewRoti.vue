<template>
  <div class="container">
    <div class="block has-text-centered">
      <div class="is-size-3 p-4">Select your class</div>
      <div class="select mb-4">
        <select>
          <SelectClasses
            v-for="attendee in storesAttendees.attendees"
            :key="attendee.id"
            :attendee="attendee"
          />
        </select>
      </div>
      <div class="container mb-4">
        <button class="button">Start a new Week</button>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="is-flex flex-direction-row is-justify-content-center">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Fulltime</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ListAttendees
            v-for="attendee in storesAttendees.attendees"
            :key="attendee.id"
            :attendee="attendee"
          />
        </tbody>
      </table>
    </div>
  </div>
  <div class="container">
    <div class="is-max-desktop is-primary">
      <Overview />
    </div>
  </div>
  <div class="container">
    <div class="is-max-desktop is-primary">
      <ModalCarusell />
    </div>
  </div>
  <div class="container">
    <div class="is-max-desktop is-primary">
      <Questions />
    </div>
  </div>
</template>

<script setup>
import { useStoreAttendees } from "@/stores/storeAttendees.js";
import Overview from "@/components/Attendees/Overview.vue";
import ModalCarusell from "@/components/Attendees/ModalCarusell.vue";
import Questions from "@/components/Attendees/Questions.vue";
import ListAttendees from "../components/Attendees/ListAttendees.vue";
import SelectClasses from "../components/Attendees/SelectClasses.vue";

const storesAttendees = useStoreAttendees();
</script>
