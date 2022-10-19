<template>
  <option>{{ attendee.classes }}</option>
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
