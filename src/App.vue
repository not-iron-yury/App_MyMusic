<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import { onMounted, ref } from 'vue';

interface ISong {
  artist: string;
  title: string;
  year: number;
}

const songs = ref<ISong[]>([]);

const getData = async <T extends ISong>(): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, 'songs'));
  return querySnapshot.docs.map(doc => doc.data() as T);
};

onMounted(async (): Promise<void> => {
  songs.value = await getData();
});
</script>

<template>
  <main>
    <v-card class="mx-auto pa-2 text-center" max-width="400">
      <v-list>
        <v-list-subheader class="justify-center">MY MUSIC</v-list-subheader>

        <v-list-item v-for="(item, i) in songs" :key="i" :value="item" color="primary" rounded="shaped">
          <template v-slot:prepend>
            <v-icon class="mdi mdi-play-circle-outline opacity-30"></v-icon>
          </template>

          <v-list-item-title v-text="item.title" class="text-left"></v-list-item-title>
          <p class="text-left">{{ item.artist }}</p>
        </v-list-item>
      </v-list>
    </v-card>
  </main>
</template>

<style lang="scss"></style>
