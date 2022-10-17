<template>
  <div class="profile_information">
    <div class="box">
      Your Profile Informations<br /><br />
      <br /><br />
      <div v-for="info in storeProfile.profile" :key="storeProfile.id">
        <p>Name: {{ info.name }}</p>
        <p>E-Mail: {{ info.email }}</p>
        <p>Github Name: {{ info.github }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreProfile } from "@/stores/storeProfile.js";

const storeProfile = useStoreProfile();
</script>
