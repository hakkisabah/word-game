export const getElements = (elementDefines) => {
  const definedElementIdsObject = elementDefines();
  const definedElementsReady = {};
  const elements = Object.keys(definedElementIdsObject);
  for (let i = 0; i < elements.length; i++) {
    definedElementsReady[elements[i]] = document.querySelector(
      definedElementIdsObject[elements[i]]
    );
  }
  return definedElementsReady;
};

export const bodyLoaderLogic = (elementProcess) => {
  document.body.innerHTML =
    elementProcess.isBrowserSupported === true
      ? loadPage(elementProcess)
      : loadUnsupportedPage(elementProcess);
};
const loadPage = (elementProcess) => {
  return `
    ${elementProcess.writeOverlay()}
    <div class="container main">
      <div class="game">
        <div class="row p-3">
          <div class='col-md-12 d-flex d-align-items-center justify-content-center'>
            <select id='langs'>
            ${listLangs(elementProcess.language)}
            </select>
          </div>
        ${elementProcess.writeMicrophoneTestButton()}
         <div id='microphone-test-result' class="col-md-12 text-center p-4"></div>
          <div class="col-md-12 text-center">
          ${elementProcess.writeModal()}
          </div>
          <div class="col-md-12 text-center">
          ${elementProcess.writeGameInfo()}
          </div>
        </div>
        <div class="row p-3">
          <div id="score-board" class="col-md-12">
            <div class="col-md-12 table-responsive-md">
           <table id="user-last-score" class="table rounded table-striped overflow-auto">
           <!-- Dynamically filling by renderScoreLine() method -->
           </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  <script src="bundle.js"></script>
`;
};
const listLangs = (langs) => {
  const langsKey = Object.keys(langs.availableLangs);
  let options = '';
  for (let i = 0; i < langsKey.length; i++) {
    options += `<option value="${langsKey[i]}" ${
      langsKey[i] == langs.selectedLanguage ? 'selected' : ''
    }>${langsKey[i]}</option>`;
  }
  return options;
};
const loadUnsupportedPage = (elementProcess) => {
  return `<div class="container main"><div class="game text-center">
        <p>${
          elementProcess.language.availableLangs[
            elementProcess.language.selectedLanguage
          ].browserSupportAlert
        }</p>
        <p>${
          elementProcess.language.availableLangs[
            elementProcess.language.selectedLanguage
          ].gameNotAvailable
        }</p></div></div>
<script src="bundle.js"></script>
`;
};

export const sortAndCreateScore = ({ game }) => {
  let lines = '';
  let sortedScore = [];
  for (let id in game) {
    sortedScore.push([id, game[id]]);
  }
  // decrement
  const sortingProcess = sortedScore.sort((a, b) => b[1] - a[1]);
  for (let j = 0; j < sortingProcess.length; j++) {
    // eslint-disable-next-line prefer-destructuring
    const scoreId = sortingProcess[j][0];
    // eslint-disable-next-line prefer-destructuring
    const score = sortingProcess[j][1];
    lines += `<tr score-id='${scoreId}'><td>${scoreId}</td><td>${score}</td></tr>`;
  }
  return lines;
};
