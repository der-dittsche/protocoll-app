<template>
  <div class="profile_information">
    <div class="box">
      Your Profile Informations<br /><br />
      <br /><br />
      <div v-for="profi in profile" :key="id">
        <p>Name: {{ profi.name }}</p>
        <p>E-Mail: {{ profi.email }}</p>
        <p>Github Name: {{ profi.github }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreAuth } from "@/stores/storeAuth.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/stores/firebase.js";
import { onMounted, ref } from "vue";

const storeAuth = useStoreAuth();

const profile = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(
    collection(db, "task-app", storeAuth.user.id, "profile")
  );
  let fbprofile = [];
  querySnapshot.forEach((doc) => {
    const info = {
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      github: doc.data().githubname,
    };
    fbprofile.push(info);
  });
  profile.value = fbprofile;
});
</script>
