export class Recognition {
  constructor(app) {
    this.app = app;
    this.microphone = null;
  }
  start() {
    this._handleRecognition();
  }
  _handleRecognition() {
    // We declare that we are the _createRecognition function
    let recognition = this._createRecognition(this._handleRecognition);
    let recognizedAnswer = '';
    const recognitionHandlerController = (() =>
      this.app.GameProps.appCenter.recognitionHandlerHelper({
        app: this.app,
        recognition,
      }))();

    // start every handling
    recognitionHandlerController.start();

    // Event Handlers
    recognition.onstart = function () {
      recognitionHandlerController.timer();
    };
    recognition.onspeechstart = () => {
      recognitionHandlerController.openLoading();
    };
    recognition.onspeechend = () => {
      recognitionHandlerController.setCurrentName(recognizedAnswer);
      recognitionHandlerController.answerResolver();
      recognition = null;
      recognitionHandlerController.closeLoading();
    };
    recognition.onresult = (event) => {
      let current = event.resultIndex;
      // eslint-disable-next-line prefer-destructuring
      let { transcript } = event.results[current][0];
      const arrangedAnswer = transcript
        .toLocaleLowerCase(this.app.selectedLanguage)
        .replace(' ', '');

      // Add the current transcript to the contents of our Note.
      // There is a weird bug on mobile, where everything is repeated twice.
      // There is no official solution so far so we have to handle an edge case.
      let mobileRepeatBug =
        current == 1 &&
        event.results[current][0].transcript == event.results[0][0].transcript;

      // https://demo.tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript/app.js
      if (!mobileRepeatBug) {
        recognizedAnswer = arrangedAnswer;
      }
    };
    // replacement of variable
    this.microphone = {
      stop: () => recognition.stop(),
    };
  }
  _createRecognition(caller) {
    // Still we can check caller for increasing security so we know how to control our restrictions
    if (caller === Recognition.prototype['_handleRecognition']) {
      let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = new SpeechRecognition();
      recognition.lang = this.app.language.availableLangs[
        this.app.selectedLanguage
      ].globalDefine;
      recognition.continuous = false;
      // interimResults  and maxAlternatives options is need using for speechend event
      // after onresult event completed with global variable
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      return recognition;
    } else {
      alert(
        this.app.language.availableLangs[this.app.selectedLanguage]
          .notPossibleAlert
      );
    }
  }
  testSpeechRecognition() {
    return new Promise((resolve, reject) => {
      try {
        // Microsoft Edge => 89.0.774.63 does not work stable
        if (/Edg/.test(navigator.userAgent) === false) {
          // Test for browser
          let SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          let recognition = new SpeechRecognition();
          this.app.isBrowserSupported = true;
          resolve(recognition);
        } else {
          this.app.isBrowserSupported = false;
          alert(
            this.app.language.availableLangs[this.app.selectedLanguage]
              .browserSupportAlert
          );
          reject(false);
        }
      } catch (e) {
        this.app.isBrowserSupported = false;
        alert(
          this.app.language.availableLangs[this.app.selectedLanguage]
            .browserSupportAlert
        );
        reject(false);
      }
    });
  }
  handleTestMicrophone() {
    this.app.$testMicrophone.addEventListener('click', () => {
      this.testSpeechRecognition().then((recognition) => {
        recognition.start();
        recognition.onstart = () => {
          this.app.renderMicrophoneTestResult();
        };
        recognition.onresult = (event) => {
          let current = event.resultIndex;
          // eslint-disable-next-line prefer-destructuring
          let { transcript } = event.results[current][0];
          const arrangedAnswer = transcript
            .toLocaleLowerCase(this.app.selectedLanguage)
            .replace(' ', '');
          this.app.renderMicrophoneTestResult(arrangedAnswer);
        };
      });
    });
  }
}
