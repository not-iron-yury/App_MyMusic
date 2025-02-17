import { collection, query, onSnapshot, addDoc, getDocs, deleteDoc, where } from 'firebase/firestore';
import { Ref } from 'vue';
import { db } from '../firebase/config';
import type { ISong } from '../interfaces';

const DB_NAME = 'songs';

// Вариант 2-1
// ref (для полноты)
export const getSongs = async (songs: Ref<ISong[]>, isLoading: Ref<boolean>) => {
  isLoading.value = true;
  const q = query(collection(db, DB_NAME));

  onSnapshot(q, querySnapshot => {
    const newData = <ISong[]>[];
    querySnapshot.forEach(doc => {
      newData.push(doc.data() as ISong);
    });
    songs.value = newData;
    isLoading.value = false;
  });
};

export const addSong = async (song: ISong) => {
  await addDoc(collection(db, DB_NAME), song);
};

export const deleteSong = async (title: string) => {
  const q = query(collection(db, 'songs'), where('title', '==', title));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => deleteDoc(doc.ref));
};

/* ------------------------------------------------------- */
// Другие варианты функции getSongs
// Вариант 1
// Обыкновенная загрузка данных из БД
// ключевой метод - getDocs
//
// const songs = ref<ISong[]>([]);
//
// const getSongs = async <T extends ISong>(): Promise<T[]> => {
//   const querySnapshot = await getDocs(collection(db, 'songs'));
//   return querySnapshot.docs.map(doc => doc.data() as T);
// };

/* ------------------------------------------------------- */

// Вариант 2
// Загрузка данных из БД с realtime updates
// ключевой метод - onSnapshot
// reactive

// const songs = <ISong[]>reactive([]);

/* ------------- */

// // Оптимизированный подход
// const getSongs = async (songs: Ref<ISong[]>) => {
//   const q = query(collection(db, 'songs'));
//   onSnapshot(q, querySnapshot => {
//     const updateData = querySnapshot.docs; // определяем длинну нового массива
//     const lenUptData = updateData.length;
//     songs.length = updateData.length; // приводим длинну songs к актуальному значению
//     // обновляем массив songs поэлементно
//     for (let i = 0; i < lenUptData; i++) {
//       songs[i] = updateData[i].data() as ISong;
//     }
//   });
// };

/* ------------- */

// Читабельный поход
// const getSongs = async (songs: Ref<ISong[]>) => {
//   const q = query(collection(db, 'songs'));
//   onSnapshot(q, querySnapshot => {
//     songs.length = 0; // удаляем из массива songs все элементы
//     // заново заполняем songs
//     querySnapshot.forEach(doc => {
//       songs.push(doc.data() as ISong);
//     });
//   });
// };

// onMounted(async () => await getSongs());

/* ------------------------------------------------------- */
