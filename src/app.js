export default class WordGameApp {
  constructor(names) {
    this.names = names;
  }
  getNameAfterShuffle() {
    const totalNames = this.names.length;
    const selectedNameOrderNumber = Math.floor(Math.random() * totalNames);
    return this.names[selectedNameOrderNumber];
  }
}
