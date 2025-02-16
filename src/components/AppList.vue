<script setup lang="ts">
import type { ISong } from '../interfaces';
import { validateSongs } from '../validators';

const prop = defineProps({
  songs: {
    type: Array<ISong>,
    required: true,
    validator: validateSongs,
  },
});
</script>
<template>
  <v-card class="mx-auto pa-2 text-center" max-width="400">
    <v-list>
      <v-list-subheader class="justify-center">MY MUSIC</v-list-subheader>

      <v-list-item v-for="(item, i) in prop.songs" :key="i" :value="item" color="primary" rounded="shaped">
        <template v-slot:prepend>
          <v-icon class="mdi mdi-play-circle-outline opacity-30"></v-icon>
        </template>

        <v-list-item-title v-text="item.title" class="text-left font-weight-medium opacity-60"></v-list-item-title>
        <p class="text-left text-subtitle-2">{{ item.artist }}</p>
      </v-list-item>
    </v-list>
  </v-card>
</template>
