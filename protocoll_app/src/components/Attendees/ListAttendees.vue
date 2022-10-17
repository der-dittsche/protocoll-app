<template>
  <tr>
    <td>{{ attendee.firstname }} {{ attendee.lastname }}</td>
    <td>{{ attendee.classes }}</td>
    <td>{{ attendee.fulltime }}</td>
    <td>
      <label class="checkbox">
        <input type="checkbox" />
      </label>
    </td>
  </tr>
</template>

<script setup>
import { useStoreAttendees } from "@/stores/storeAttendees.js";

const storeAttendees = useStoreAttendees();

const props = defineProps({
  attendee: {
    type: Object,
    required: true,
  },
});
</script>
