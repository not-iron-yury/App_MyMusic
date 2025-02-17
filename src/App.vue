<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSongs, addSong } from './firebase/data';
import type { ISong } from './interfaces';
import AppList from './components/AppList.vue';
import AppCard from './components/AppCard.vue';

const songs = ref<ISong[]>([]);

const songsList: ISong[] = [
  {
    id: 1,
    title: 'Come As You Are',
    artist: 'Nirvana',
    year: 1991,
  },
  {
    id: 2,
    title: 'Californication',
    artist: 'Red Hot Chili Peppers',
    year: 1999,
  },
  {
    id: 3,
    title: 'Scar Tissue',
    artist: 'Red Hot Chili Peppers',
    year: 1999,
  },
  {
    id: 4,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    year: 1991,
  },
  {
    id: 5,
    title: 'Promises',
    artist: 'Cranberries ',
    year: 1999,
  },
  {
    id: 6,
    title: 'Sunset (Bird of Prey)',
    artist: 'Fatboy Slim',
    year: 2000,
  },
];

const isIncludesSongInList = (obj: ISong): boolean => {
  return songs.value.some((item: ISong) => item.id === obj.id && item.title === obj.title);
};

const addSongToList = async (song: ISong) => {
  if (!isIncludesSongInList(song)) {
    await addSong(song);
  } else {
    console.log('Эта песня уже есть в списке');
  }
};

onMounted(async () => await getSongs(songs));
/* ------------------------------------------------------- */
</script>

<template>
  <main class="main">
    <app-card :songs-list="songsList" @add-song="addSongToList" />
    <app-list :songs="songs" />
  </main>
</template>

<style lang="scss"></style>
