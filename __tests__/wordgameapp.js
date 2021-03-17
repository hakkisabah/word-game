import WordGameApp from 'app.js';
import names from '../src/data/names.json';

describe('Word Game Instance', () => {
  it('Load Instance', () => {
    const WordGame = new WordGameApp(names);
    const shuffledNames = WordGame.shuffleNames();
    expect(shuffledNames).toMatch(/^[A-Za-zıİşŞöÖüÜçÇğ]+$/);
  });
});
