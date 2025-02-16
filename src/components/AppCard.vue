<script setup lang="ts">
import type { ISong } from '../interfaces';
import { validateSongs } from '../validators';

const props = defineProps({
  songsList: {
    type: Array<ISong>,
    required: true,
    validator: validateSongs,
  },
});

const randomSong = props.songsList[Math.floor(Math.random() * props.songsList.length)];
</script>

<template>
  <section class="playlist">
    <v-card variant="tonal">
      <v-card-item>
        <v-card-title class="text-left">Player</v-card-title>
        <!-- <v-card-subtitle class="text-left">{{ props.subtitle }}</v-card-subtitle> -->
      </v-card-item>
      <v-card-text class="text-left song">
        <v-icon class="play" icon="mdi-play" />
        <div>
          <p class="song__title">{{ randomSong.title }}</p>
          <p>{{ randomSong.artist }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn>В избранное</v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<style scoped lang="scss">
.playlist {
  margin-bottom: 15px;
}
.song {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;

  &__title {
    font-size: 17px;
  }
}
.play {
  margin-right: 5px;
}
</style>
