<script setup lang="ts">
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/config';
import { onMounted, reactive, ref } from 'vue';

interface ISong {
  artist: string;
  title: string;
  year: number;
}

/* ------------------------------------------------------- */

// Вариант 1
// Обыкновенная загрузка данных из БД
// ключевой метод - getDocs
//
// const songs = ref<ISong[]>([]);
//
// const getData = async <T extends ISong>(): Promise<T[]> => {
//   const querySnapshot = await getDocs(collection(db, 'songs'));
//   return querySnapshot.docs.map(doc => doc.data() as T);
// };
//
// onMounted(async (): Promise<void> => {
//   songs.value = await getData();
// });

/* ------------------------------------------------------- */

// Вариант 2
// Загрузка данных из БД с realtime updates
// ключевой метод - onSnapshot

const songs = <ISong[]>reactive([]);

// Оптимизированный подход
const getData = async (): Promise<void> => {
  const q = query(collection(db, 'songs'));
  onSnapshot(q, querySnapshot => {
    const updateData = querySnapshot.docs; // определяем длинну нового массива
    const lenUptData = updateData.length;
    songs.length = updateData.length; // приводим длинну songs к актуальному значению
    // обновляем массив songs поэлементно
    for (let i = 0; i < lenUptData; i++) {
      songs[i] = updateData[i].data() as ISong;
    }
  });
};

/* --------------------------- */

// Читабельный поход
// const getData = async (): Promise<void> => {
//   const q = query(collection(db, 'songs'));
//   onSnapshot(q, querySnapshot => {
//     songs.length = 0; // удаляем из массива songs все элементы
//     // заново заполняем songs
//     querySnapshot.forEach(doc => {
//       songs.push(doc.data() as ISong);
//     });
//   });
// };

onMounted(async (): Promise<void> => {
  await getData();
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
