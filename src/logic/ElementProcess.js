export default class ElementProcess {
  constructor({ confiugredData, process }) {
    this.language = confiugredData;
    this.process = process;
    this.selectedLanguage = this.language.detectedLang;
    this.game = confiugredData.game;
    this.isBrowserSupported = '';
  }
  bodyLoadTrigger() {
    this.process.bodyLoaderLogic(this);
  }
  nodesVariableTrigger() {
    this.generateVariableForMainNodes(this.process.getElements());
  }
  generateVariableForMainNodes(nodes) {
    // We create and fill variables for elements node
    const mainNodes = Object.keys(nodes);
    for (let i = 0; i < mainNodes.length; i++) {
      this[`${mainNodes[i]}`] = nodes[mainNodes[i]];
    }
  }
  writeWrongStatus(status) {
    this.$answerStatus.innerHTML = `<p class='text-wrap'>${status}</p>`;
  }
  writeLastFindedCorrectName(lastFindedCorrectName) {
    this.$answerStatus.textContent = this.language.availableLangs[
      this.selectedLanguage
    ].guessNextOne;
    this.$currentNameEl.textContent = `${
      this.language.availableLangs[this.selectedLanguage].appPhrases.startWith
    }${lastFindedCorrectName}`;
  }
  writeOverlay() {
    return `<div id="overlay">
            <div id="loading-text">${
              this.language.availableLangs[this.selectedLanguage]
                .listeningAndSearching
            }</div>
            </div>`;
  }
  writeMicrophoneTestButton() {
    return `
          <div class='col-md-12 text-center p-4'>
            <button id='test-microphone' class="btn btn-secondary">${
              this.language.availableLangs[this.selectedLanguage].testMicrophone
            }</button>
          </div>`;
  }
  renderMicrophoneTestResult(arrangedAnswer = false) {
    this.$microphoneTestResult.innerHTML = `${
      arrangedAnswer
        ? this.language.availableLangs[this.selectedLanguage]
            .testMicrophoneAfter
        : this.language.availableLangs[this.selectedLanguage]
            .testMicrophoneBefore
    }
          ${arrangedAnswer ? '<strong>' + arrangedAnswer + '</strong>' : ''}
   `;
  }
  writeModal() {
    return `            
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-light" data-toggle="modal" data-target="#instructionsModal">
              ${
                this.language.availableLangs[this.selectedLanguage]
                  .rulesAndRequirements
              }
            </button>
            <!-- Modal -->
            <div class="modal fade" id="instructionsModal" tabindex="-1" aria-labelledby="instructionsModalLabel" aria-hidden="true">
              <div class="modal-dialog dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="instructionsModalLabel">${
                      this.language.availableLangs[this.selectedLanguage]
                        .gameInstructions
                    }</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  ${this.defaultModalBodyForInstructions()}
                  </div>
                </div>
              </div>
            </div>`;
  }
  defaultModalBodyForInstructions() {
    return `<div class='col-md-12'>
                      <h2>${
                        this.language.availableLangs[this.selectedLanguage]
                          .requirementsExplanation.title
                      }</h2>
                      <hr>
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .requirementsExplanation.req1
                      }</p>
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .requirementsExplanation.req2
                      }</p>                      
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .requirementsExplanation.req3
                      }</p>
           </div>
           <div class='col-md-12'>
                      <h2>${
                        this.language.availableLangs[this.selectedLanguage]
                          .rulesExplanation.title
                      }</h2>
                      <hr>
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .rulesExplanation.rule1
                      }</p>
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .rulesExplanation.rule2
                      }</p>
                      <p>${
                        this.language.availableLangs[this.selectedLanguage]
                          .rulesExplanation.rule3
                      }</p>
          </div>`;
  }
  writeGameInfo() {
    return `
            <h2 id="current-name" class="p-3">${
              this.language.availableLangs[this.selectedLanguage].gameInfo
                .currentName
            }</h2>
            <h2 id="timer"></h2>
            <div id="answer-status" class="col-md-12 text-center badge text-break"></div>
            <div class='d-flex d-align-items-center justify-content-center'>
            <button id="start" type="button" class="btn btn-dark">${
              this.language.availableLangs[this.selectedLanguage].gameInfo
                .startButton
            }</button>
            <button id="clear" type="button" class="btn btn-dark ml-2">${
              this.language.availableLangs[this.selectedLanguage].gameInfo
                .clearScoresButton
            }</button>
            
            </div>`;
  }
  renderScoreLine() {
    const sortedAndCreatedScore = this.process.sortAndCreateScore({
      game: this.game,
    });
    this.$userLastScore.innerHTML = `
              <thead>
                <tr>
                  <th scope="col">${
                    this.language.availableLangs[this.selectedLanguage]
                      .userTableForLastScore.gameId
                  }</th>
                  <th scope="col">${
                    this.language.availableLangs[this.selectedLanguage]
                      .userTableForLastScore.score
                  }</th>
                </tr>
              </thead>
            <tbody id="user-last-score-body">${sortedAndCreatedScore}</tbody>`;
  }
}
