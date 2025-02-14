<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getData } from './firebase/data';
import type { ISong } from './interfaces';
import AppList from './components/AppList.vue';

const songs = ref<ISong[]>([]);

onMounted(async () => await getData(songs));

/* ------------------------------------------------------- */
</script>

<template>
  <main>
    <app-list :songs="songs" />
  </main>
</template>

<style lang="scss"></style>
