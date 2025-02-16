<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getData } from './firebase/data';
import type { ISong } from './interfaces';
import AppList from './components/AppList.vue';
import AppCard from './components/AppCard.vue';

const songs = ref<ISong[]>([]);

const songsList: ISong[] = [
  {
    id: 10,
    title: 'Scar Tissue',
    artist: 'Red Hot Chili Peppers',
    year: 1999,
  },
  {
    id: 11,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    year: 1991,
  },
  {
    id: 12,
    title: 'Promises',
    artist: 'Cranberries ',
    year: 1999,
  },
  {
    id: 13,
    title: 'Sunset (Bird of Prey)',
    artist: 'Fatboy Slim',
    year: 2000,
  },
];

onMounted(async () => await getData(songs));

/* ------------------------------------------------------- */
</script>

<template>
  <main>
    <app-card :songs-list="songsList" />
    <app-list :songs="songs" />
  </main>
</template>

<style lang="scss"></style>
