export const gameLogic = ({ props }) => {
  const answerLoadedName = () => {
    const { answer } = props;
    const isAnswerOk = checkAnswer(answer);
    // if isAnswerOk is string, we know this because answered before
    if (typeof isAnswerOk === 'string') {
      return isAnswerOk;
    }
    return isAnswerOk ? true : false;
  };
  const checkAnswer = (answer) => {
    // check if it has already been finded by user
    const isFindedN = isFinded(answer);
    if (!isFindedN) {
      // if not find name from db
      const findedAnswer = _findAnswer(answer);
      // Check availability for game rules if is find
      const findedAnswerCheckLastCharEquality = findedAnswer
        ? _checkLastChar(findedAnswer)
        : false;
      if (findedAnswerCheckLastCharEquality) {
        return true;
      } else {
        return false;
      }
    } else {
      // if already voiced name return as string for another method
      return answer;
    }
  };
  const isFinded = () => {
    const { answer, findedNames } = props;
    return findedNames.find((name) => {
      // We need key name
      return Object.keys(name)[0] === answer ? answer : false;
    });
  };
  const _findAnswer = () => {
    let findedAnswer = null;
    const { names, answer } = props;
    for (let i = 0; i < names.length; i++) {
      if (names[i] == answer) {
        findedAnswer = answer;
      }
    }
    return findedAnswer;
  };
  const _checkLastChar = (findedAnswer) => {
    const { currentName } = props;
    const current = currentName[currentName.length - 1];
    // eslint-disable-next-line prefer-destructuring
    const finded = findedAnswer[0];
    return current === finded ? finded : false;
  };
  return {
    answerLoadedName,
  };
};

export const clearScoresButtonHandler = ({
  game,
  userScore,
  $clearScoresButton,
  $userLastScore,
  addScoreToApi,
}) => {
  $clearScoresButton.addEventListener('click', () => {
    Object.keys(game).forEach((id) => delete game[id]);
    userScore = {};
    addScoreToApi({ game });
    $userLastScore.innerHTML = '';
  });
};

export const switchButtonAndLanguage = ({
  $startButton,
  $clearScoresButton,
  $langs,
}) => {
  let startBtn = $startButton.style;
  let clearBtn = $clearScoresButton.style;
  let langSelect = $langs.style;
  if (startBtn.display == 'none') {
    startBtn.display = 'block';
    clearBtn.display = 'block';
    langSelect.display = 'block';
  } else {
    startBtn.display = 'none';
    clearBtn.display = 'none';
    langSelect.display = 'none';
  }
};

export const recognizer = () => {
  const recognizeFalsing = ({
    currentName,
    answeredName,
    language,
    selectedLanguage,
  }) => {
    // checking last and first char, if chars equal then it mean voiced name not find
    return currentName[currentName.length - 1] == answeredName[0]
      ? language.availableLangs[selectedLanguage].appPhrases.notFind
      : language.availableLangs[selectedLanguage].appPhrases.rulesNotMet;
  };
  const recognizedAnswerResult = ({
    isAnswerOk,
    answeredName,
    currentName,
    language,
    selectedLanguage,
  }) => {
    return answeredName
      ? `${
          typeof isAnswerOk === 'string'
            ? language.availableLangs[selectedLanguage].appPhrases
                .repeatedAnswer
            : recognizeFalsing({
                currentName,
                answeredName,
                language,
                selectedLanguage,
              })
        }=> ${answeredName}`
      : language.availableLangs[selectedLanguage].appPhrases.notRecognized;
  };
  return {
    recognizedAnswerResult,
  };
};
