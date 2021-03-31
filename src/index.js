import 'bootstrap/dist/css/bootstrap.min.css';
import WordGameApp from './app';
import './styles/main.css';
import { appCenter, appHelper } from './helpers/importreturner';
const GameProps = {
  appCenter,
  appHelper,
};
GameProps.appHelper.getDataFromApi().then((data) => {
  const navigatorLang =
    window.navigator.language[0] + window.navigator.language[1];
  if (data.length < 1) {
    data = {
      game: {},
      selectedLanguage: navigatorLang,
    };
  }
  GameProps.appCenter
    .setUserConfiguration({
      data,
      appHelper,
    })
    .then((confiugredData) => {
      const Game = new WordGameApp({ confiugredData, GameProps });
      Game.init();
    });
});
