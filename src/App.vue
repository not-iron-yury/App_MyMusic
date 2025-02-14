<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getData } from './firebase/data';
import type { ISong } from './interfaces';

const songs = ref<ISong[]>([]);

onMounted(async () => await getData(songs));

/* ------------------------------------------------------- */
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
