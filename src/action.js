import { API_URL, isLocal } from './constans';

// ---------------------
// Locally ---------------------
// ---------------------
export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('wordGameData')) || [];
};

export const setLocalStorage = (data) => {
  localStorage.setItem('wordGameData', JSON.stringify(data));
};
export const removeLocalStorage = () => {
  localStorage.removeItem('wordGameData');
};

// ---------------------
// Remotely ---------------------
// ---------------------
export const getDataFromApi = () => {
  if (isLocal) {
    // Local
    return new Promise((resolve) => resolve(getLocalStorage()));
  } else {
    // Remote
    return fetch(API_URL)
      .then((data) => data.json())
      .then((data) => data);
  }
};

export const addScoreToApi = ({ game }) => {
  if (isLocal) {
    // Local
    let currentData = getLocalStorage();
    currentData.game = game;
    setLocalStorage(currentData);
    return new Promise((resolve) => resolve(game));
  } else {
    // Remote
    return fetch(API_URL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
  }
};

export const updateUserConfiguration = ({ userConfiguration }) => {
  if (isLocal) {
    // Local
    removeLocalStorage();
    setLocalStorage(userConfiguration);
    return new Promise((resolve) => resolve(userConfiguration));
  } else {
    // Remote
    return fetch(`${API_URL}/${userConfiguration.id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userConfiguration }),
    });
  }
};
