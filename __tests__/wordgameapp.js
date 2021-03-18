import WordGameApp from '../src/app.js';
import names from '../src/data/names.json';

describe('Word Game Instance', () => {
  const WordGame = new WordGameApp(names);
  let shuffledName = '';
  it('Get names array from Instance variable', () => {
    expect(Array.isArray(WordGame.names)).toBe(true);
  });
  it('Load Instance', () => {
    shuffledName = WordGame.getNameAfterShuffle();
    expect(shuffledName).toMatch(/^[A-Za-zıİşŞöÖüÜçÇğ]+$/);
  });
  it('Answer loaded name correctly', () => {
    const answered = WordGame.answerLoadedName(shuffledName);
    expect(answered).toBe(true);
  });
  it('Answer loaded name wrongly', () => {
    const answered = WordGame.answerLoadedName('wrong answer');
    expect(answered).toBe(false);
  });
});
