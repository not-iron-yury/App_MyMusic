import { collection, query, onSnapshot } from 'firebase/firestore';
import { Ref } from 'vue';
import { db } from '../firebase/config';
import type { ISong } from '../interfaces';

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

/* ------------------------------------------------------- */

// Вариант 2
// Загрузка данных из БД с realtime updates
// ключевой метод - onSnapshot
// reactive

// const songs = <ISong[]>reactive([]);

/* ------------- */

// // Оптимизированный подход
// const getData = async (songs: Ref<ISong[]>) => {
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
// const getData = async (songs: Ref<ISong[]>) => {
//   const q = query(collection(db, 'songs'));
//   onSnapshot(q, querySnapshot => {
//     songs.length = 0; // удаляем из массива songs все элементы
//     // заново заполняем songs
//     querySnapshot.forEach(doc => {
//       songs.push(doc.data() as ISong);
//     });
//   });
// };

// onMounted(async () => await getData());

/* ------------------------------------------------------- */

// Вариант 2-1
// ref (для полноты)

const getData = async (songs: Ref<ISong[]>) => {
  const q = query(collection(db, 'songs'));

  onSnapshot(q, querySnapshot => {
    const newData = <ISong[]>[];
    querySnapshot.forEach(doc => {
      newData.push(doc.data() as ISong);
    });
    songs.value = newData;
  });
};

export { getData };
