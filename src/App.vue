<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import { onMounted } from 'vue';

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'songs'));
  querySnapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
};

onMounted(async () => await getData());
</script>

<template></template>

<style lang="scss"></style>
