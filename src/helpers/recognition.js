export const recognitionHandlerHelper = ({ app, recognition }) => {
  const setCurrentName = (name) => {
    app.answeredName = name;
  };
  const answerResolver = () => {
    recognition.stop();
    app.answerResolver();
  };
  const timer = () => {
    app.timer();
  };
  const start = () => {
    recognition.start();
  };
  const openLoading = () => {
    openLoadingTrigger(app.$overlay);
  };
  const closeLoading = () => {
    closeLoadingTrigger(app.$overlay);
  };
  return {
    setCurrentName,
    answerResolver,
    timer,
    start,
    openLoading,
    closeLoading,
  };
};
const openLoadingTrigger = ($overlay) => {
  $overlay.style.display = 'block';
  $overlay.classList.add('d-flex');
  $overlay.classList.add('d-align-items-center');
  $overlay.classList.add('justify-content-center');
};

const closeLoadingTrigger = ($overlay) => {
  $overlay.style.display = 'none';
  $overlay.classList.remove('d-flex');
  $overlay.classList.remove('d-align-items-center');
  $overlay.classList.remove('justify-content-center');
};
