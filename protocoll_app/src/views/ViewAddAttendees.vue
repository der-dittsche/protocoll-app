<template>
  <div class="card">
    <div class="is-size-3 p-4">Add a new Attendee</div>
    <form @submit.prevent="addAttendee">
      <table class="table">
        <tbody>
          <tr>
            <td>FirstName</td>
            <td>
              <input
                v-model="newAttendeeFirstname"
                class="textarea"
                type="text"
                placeholder="type Firstname"
                ref="newAttendeeFirstnamePick"
              />
            </td>
          </tr>
          <tr>
            <td>Lastname</td>
            <td>
              <input
                v-model="newAttendeeLastname"
                class="textarea"
                type="text"
                placeholder="type Lastname"
              />
            </td>
          </tr>
          <tr>
            <td>Class</td>
            <td>
              <div class="select">
                <select v-model="newAttendeeClasses">
                  <option value="September 2022">September 2022</option>
                  <option value="August 2022">August 2022</option>
                  <option value="July 2022">July 2022</option>
                  <option value="June 2022">Juni 2022</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Fulltime</td>
            <td>
              <div class="select">
                <select v-model="newAttendeeFulltime">
                  <option :value="true">Fulltime</option>
                  <option :value="false">Parttime</option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="button mb-4">
        <button
          @click="addAttende"
          :disabled="
            !(newAttendeeFirstname && newAttendeeLastname && newAttendeeClasses)
          "
          class="button is-link has-background-success"
        >
          Add Attendee
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAttendees } from "@/stores/storeAttendees.js";

const storeAttendees = useStoreAttendees();

const newAttendeeFirstname = ref("");
const newAttendeeLastname = ref("");
const newAttendeeClasses = ref("");
const newAttendeeFulltime = ref("");
const newAttendeeFirstnamePick = ref(null);

const addAttende = () => {
  storeAttendees.addAttendee(
    newAttendeeFirstname.value,
    newAttendeeLastname.value,
    newAttendeeClasses.value,
    newAttendeeFulltime.value
  );
  newAttendeeFirstname.value = "";
  newAttendeeLastname.value = "";
  newAttendeeClasses.value = "";
  newAttendeeFulltime.value = "";
  newAttendeeFirstnamePick.value.focus();
};
</script>
