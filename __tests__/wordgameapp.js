import WordGameApp from '../src/app.js';
import names from '../src/data/names.json';

const mockingForChainCorrectAnswer = (char) => {
  return names.find((name) => name[0] === char);
};
const mockingForChainWrongAnswer = (char) => {
  return names.find((name) => name[0] !== char);
};

describe('Word Game Instance', () => {
  const WordGame = new WordGameApp(names);
  let shuffledName = '';
  it('get names array from Instance variable', () => {
    expect(Array.isArray(WordGame.names)).toBe(true);
  });

  it('get word after shuffled', () => {
    shuffledName = WordGame.getNameAfterShuffle();
    expect(shuffledName).toMatch(/^[A-Za-zıİşŞöÖüÜçÇğ]+$/);
  });

  it('answer loaded name correctly', () => {
    const answerStartedWithInputLastChar =
      shuffledName[shuffledName.length - 1];
    expect(answerStartedWithInputLastChar).toEqual(
      mockingForChainCorrectAnswer(answerStartedWithInputLastChar)[0]
    );
  });

  it('answer name wrongly', () => {
    const answered = mockingForChainWrongAnswer(shuffledName);
    expect(WordGame.answerLoadedName(answered)).toBe(false);
  });

  it('answered name', () => {
    WordGame.findedNames[shuffledName] = 1;
    expect(typeof WordGame.answerLoadedName(shuffledName)).toEqual('string');
  });
});
