import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export function fetchSongId(title) {
  return function (dispatch) {
    const localsongId = v4();
    dispatch(requestSong(title, localsongId));
    title = title.replace(' ', '_');
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&apikey=a80eae707a336946ca9e69739725bf8e').then(
      response => response.json(),
      error => console.log('An error has occured.', error)
    ).then(function(json) {
      console.log('check out the API response:', json);
    });
  };
}

export const requestSong = (title, localSongId) =>({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});
