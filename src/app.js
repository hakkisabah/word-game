export default class WordGameApp {
  constructor(names) {
    this.names = names;
    this.currentName = '';
    this.findedNames = [];
  }
  getNameAfterShuffle() {
    const totalNames = this.names.length;
    const selectedNameOrderNumber = Math.floor(Math.random() * totalNames);
    this.currentName = this.names[selectedNameOrderNumber];
    if (this.findedNames[this.currentName]) {
      this.getNameAfterShuffle();
    }
    return this.currentName;
  }
  answerLoadedName(answer) {
    const isAnswerOk = this.checkAnswer(answer);
    // if isAnswerOk is string, we know this because answered before
    if (typeof isAnswerOk === 'string') {
      return isAnswerOk;
    }
    return isAnswerOk ? true : false;
  }
  checkAnswer(answer) {
    if (!this.findedNames[answer]) {
      const findedAnswer = this._findAnswer(answer);
      const findedAnswerCheckLastCharEquality = findedAnswer
        ? this._checkLastChar(findedAnswer)
        : false;
      if (findedAnswerCheckLastCharEquality) {
        this.findedNames[findedAnswer] = 1;
        return true;
      } else {
        return false;
      }
    } else {
      return answer;
    }
  }
  _findAnswer(answer) {
    return this.names.find((name) => {
      return name === answer;
    });
  }
  _checkLastChar(findedAnswer) {
    return this.currentName[this.currentName.length - 1] === findedAnswer[0];
  }
}
