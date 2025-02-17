import type { ISong } from './interfaces';

export function validateSongs(songs: Array<ISong>): boolean {
  // проверка, что songs является массивом
  if (!Array.isArray(songs)) {
    return false;
  }

  // поэлементная валидация массива
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    if (!validateSong(song)) {
      return false;
    }
  }

  return true;
}

export function validateSong(song: ISong): boolean {
  // соответствие свойств объекта своему типу
  if (
    typeof song.artist !== 'string' ||
    typeof song.title !== 'string' ||
    typeof song.year !== 'number' ||
    typeof song.id !== 'number'
  ) {
    return false;
  }

  // пустые строки
  if (!song.artist.trim() || !song.title.trim()) {
    return false;
  }

  // диапазон допустимых дат
  if (song.year < 1900 || song.year > new Date().getFullYear()) {
    return false;
  }

  return true;
}
