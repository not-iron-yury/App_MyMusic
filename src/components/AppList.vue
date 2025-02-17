<script setup lang="ts">
import { deleteSong } from '../firebase/data';
import type { ISong } from '../interfaces';
import { validateSongs, isBoolean } from '../validators';

const prop = defineProps({
  songs: {
    type: Array<ISong>,
    required: true,
    validator: validateSongs,
  },
  isLoading: {
    type: Boolean,
    required: true,
    validator: isBoolean,
  },
});
</script>

<template>
  <v-card class="mx-auto pa-2 text-center" max-width="400">
    <v-list>
      <v-list-subheader class="justify-center">MY MUSIC</v-list-subheader>
      <span v-if="isLoading" class="loader">ЗагрузОчка</span>
      <div v-else>
        <v-list-item v-for="(item, i) in prop.songs" :key="i" :value="item" color="primary" rounded="shaped">
          <template v-slot:prepend>
            <v-icon class="mdi mdi-play-circle-outline opacity-30"></v-icon>
          </template>

          <template v-slot:append>
            <v-icon class="mdi mdi-close opacity-20" @click="deleteSong(item.title)"></v-icon>
          </template>

          <v-list-item-title v-text="item.title" class="text-left font-weight-medium opacity-60"></v-list-item-title>
          <p class="text-left text-subtitle-2">{{ item.artist }}</p>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>
<style>
.loader {
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
