export default class WordGameApp {
  constructor(names) {
    this.names = names;
    this.currentName = '';
  }
  getNameAfterShuffle() {
    const totalNames = this.names.length;
    const selectedNameOrderNumber = Math.floor(Math.random() * totalNames);
    this.currentName = this.names[selectedNameOrderNumber];
    return this.currentName;
  }
  answerLoadedName(answer) {
    return answer === this.currentName ? true : false;
  }
}
