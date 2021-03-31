import WordGameApp from '../src/app.js';
import names from '../src/data/names.json';
import enNames from '../src/data/en-names.json';
import { appCenter, appHelper } from '../src/helpers/importreturner';
const mockingForChainCorrectAnswer = (char) => {
  return names.find((name) => name[0] === char);
};
const mockingForChainWrongAnswer = (char) => {
  return names.find((name) => name[0] !== char);
};
const GameProps = {
  appCenter,
  appHelper,
};
const props = {
  answer: null,
  findedNames: [],
  names: names,
  currentName: '',
};
const confiugredData = {
  language: {
    detectedLang: 'en',
  },
  game: {},
};
describe('Word Game Instance', () => {
  const WordGame = new WordGameApp({ confiugredData, GameProps });
  let shuffledName = '';
  it('get names array from Instance variable', () => {
    props.names = names;
    expect(Array.isArray(props.names)).toBe(true);
  });

  it('checking each name characters for Turkish', () => {
    for (let i = 0; i < names.length; i++) {
      expect(names[i]).toMatch(/^[A-Za-zıİşŞöÖüÜçÇğ]+$/);
    }
  });

  it('checking each name characters for English', () => {
    for (let i = 0; i < enNames.length; i++) {
      expect(enNames[i]).toMatch(/^[A-Za-z]+$/);
    }
  });

  it('get word after shuffled for Turkish', () => {
    shuffledName = WordGame.getNameAfterShuffle(names);
    expect(shuffledName).toMatch(/^[A-Za-zıİşŞöÖüÜçÇğ]+$/);
  });

  it('get word after shuffled for English', () => {
    shuffledName = WordGame.getNameAfterShuffle(enNames);
    expect(shuffledName).toMatch(/^[A-Za-z]+$/);
  });

  it('answer loaded name correctly', () => {
    const answerStartedWithInputLastChar =
      shuffledName[shuffledName.length - 1];
    expect(answerStartedWithInputLastChar).toEqual(
      mockingForChainCorrectAnswer(answerStartedWithInputLastChar)[0]
    );
  });

  it('answer name wrongly', () => {
    props.answer = mockingForChainWrongAnswer(shuffledName[0]);
    expect(GameProps.appCenter.gameLogic({ props }).answerLoadedName()).toBe(
      false
    );
  });

  it('answered name', () => {
    WordGame.findedNames.push({ [WordGame.currentName]: 1 });
    props.answer = shuffledName;
    props.findedNames = WordGame.findedNames;
    expect(
      typeof GameProps.appCenter.gameLogic({ props }).answerLoadedName()
    ).toEqual('string');
  });
});
