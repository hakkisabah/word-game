import { generateNewGameSession } from '../helpers/game';
import { Recognition } from '../logic/Recognition';
import { setUserConfiguration } from '../helpers/language';
import { addScoreToApi, getLocalStorage, getDataFromApi } from '../action';
import { detectNames } from '../helpers/names';
import {
  switchButtonAndLanguage,
  clearScoresButtonHandler,
  gameLogic,
  recognizer,
} from '../helpers/app';
import {
  bodyLoaderLogic,
  getElements,
  sortAndCreateScore,
} from '../helpers/elementprocess';
export const appCenter = {
  generateNewGameSession,
  Recognition,
  setUserConfiguration,
  addScoreToApi,
  getLocalStorage,
  detectNames,
  switchButtonAndLanguage,
  clearScoresButtonHandler,
  gameLogic,
  recognizer,
  bodyLoaderLogic,
  getElements,
  sortAndCreateScore,
};

import { updateUserConfiguration } from '../action';
import { languages } from '../languages';
import { elementDefines } from './defines';
export const appHelper = {
  updateUserConfiguration,
  languages,
  elementDefines,
  getDataFromApi,
};
