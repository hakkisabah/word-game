import ElementProcess from './logic/ElementProcess';
export default class WordGameApp extends ElementProcess {
  constructor({ confiugredData, GameProps }) {
    super({
      confiugredData,
      process: {
        bodyLoaderLogic: GameProps.appCenter.bodyLoaderLogic,
        getElements: () =>
          GameProps.appCenter.getElements(GameProps.appHelper.elementDefines),
        sortAndCreateScore: GameProps.appCenter.sortAndCreateScore,
      },
    });
    this.GameProps = GameProps;
    this.recognition = new this.GameProps.appCenter.Recognition(this);
    this.names = [];
    this.GameProps.appCenter
      .detectNames(this.selectedLanguage)
      .then((names) => {
        this.names = names;
      });
    this.currentName = '';
    this.answeredName = null;
    this.findedNames = [];
    this.userScore = {};
    this.timeOut = 8;
    this.timeRemaining = this.timeOut;
    this.interval = {};
    this.intervalLoop = 1000;
  }
  languageSelectHandler() {
    this.$langs.addEventListener('change', (e) => {
      const data = this.GameProps.appCenter.getLocalStorage();
      data.selectedLanguage = e.target.value;
      this.GameProps.appCenter.setUserConfiguration({
        data,
        appHelper: this.GameProps.appHelper,
      });
      window.location.reload();
    });
  }
  handleStartGame() {
    this.$startButton.addEventListener('click', () => {
      this.$microphoneTestResult.textContent = '';
      const name = this.getNameAfterShuffle(this.names);
      this.writeLastFindedCorrectName(name);
      this.userScore = this.GameProps.appCenter.generateNewGameSession();
      this.recognition.start();
      this.GameProps.appCenter.switchButtonAndLanguage({
        $startButton: this.$startButton,
        $clearScoresButton: this.$clearScoresButton,
        $langs: this.$langs,
      });
    });
  }
  getNameAfterShuffle(names) {
    const totalNames = names.length;
    const selectedNameOrderNumber = Math.floor(Math.random() * totalNames);
    this.currentName = names[selectedNameOrderNumber];
    if (this.findedNames[this.currentName]) {
      this.getNameAfterShuffle();
    }
    return this.currentName;
  }
  answerResolver() {
    const isAnswerOk = this.GameProps.appCenter
      .gameLogic({
        props: {
          answer: this.answeredName,
          findedNames: this.findedNames,
          names: this.names,
          currentName: this.currentName,
        },
      })
      .answerLoadedName();
    if (isAnswerOk === true) {
      this.currentName = this.answeredName;
      this.writeLastFindedCorrectName(this.answeredName);
      this.findedNames.push({ [this.answeredName]: 1 });
      this.userScore.score++;
      this.resetGameOrState();
      this.recognition.start();
    } else {
      // Timer every seconds update this variable with setToScoreTimerMiliseconds method,
      // so we may reaching true score
      if (this.game[this.userScore.id] > 0) {
        this.game[this.userScore.id] = +`${this.userScore.score}.${
          this.game[this.userScore.id]
        }`;
        this.GameProps.appCenter.addScoreToApi({ game: this.game });
        this.renderScoreLine();
        this.userScore = {};
      }
      const resolveWrongStatus = this.GameProps.appCenter
        .recognizer()
        .recognizedAnswerResult({
          isAnswerOk,
          answeredName: this.answeredName,
          currentName: this.currentName,
          language: this.language,
          selectedLanguage: this.selectedLanguage,
        });
      this.writeWrongStatus(resolveWrongStatus);
      this.resetGameOrState(true);
    }
  }
  // this method useful for true score
  setToScoreTimerMiliseconds(interval) {
    this.game[this.userScore.id] = (interval * 60000) / 2 + interval * 15;
  }
  timer() {
    this.interval = setInterval(() => {
      this.setToScoreTimerMiliseconds(this.timeRemaining);
      this.timeRemaining -= 1;
      this.$timerEl.textContent = this.timeRemaining;
      if (this.timeRemaining < 1) {
        if (this.interval) {
          this.recognition.microphone.stop();
          this.answerResolver();
        }
      }
    }, this.intervalLoop);
  }
  resetGameOrState(isGameEnd = false) {
    this.timeRemaining = this.timeOut;
    this.$timerEl.textContent = this.timeRemaining;
    if (this.interval) {
      if (this.recognition) {
        this.recognition.microphone.stop();
      }
      clearInterval(this.interval);
    }
    this.answeredName = null;
    if (isGameEnd) {
      this.GameProps.appCenter.switchButtonAndLanguage({
        $startButton: this.$startButton,
        $clearScoresButton: this.$clearScoresButton,
        $langs: this.$langs,
      });
      this.findedNames = [];
    }
  }
  init() {
    // Providing us a try catch block before page loading from Recignition class
    // and users got pretty page load transition experience
    this.recognition
      .testSpeechRecognition()
      .then(() => {
        // Must be first
        this.bodyLoadTrigger();
        // Must be second
        this.nodesVariableTrigger();
        this.languageSelectHandler();
        this.handleStartGame();
        this.GameProps.appCenter.clearScoresButtonHandler({
          game: this.game,
          userScore: this.userScore,
          $clearScoresButton: this.$clearScoresButton,
          $userLastScore: this.$userLastScore,
          addScoreToApi: this.GameProps.appCenter.addScoreToApi,
        });
        this.$timerEl.textContent = this.timeOut;
        this.recognition.handleTestMicrophone();
      })
      .catch(() => this.bodyLoadTrigger());
  }
}
