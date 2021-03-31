export const generateNewGameSession = () => {
  return {
    // https://gist.github.com/gordonbrander/2230317
    id: Math.random().toString(36).substr(2, 9),
    score: 0,
  };
};
