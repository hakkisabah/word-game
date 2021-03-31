export const detectNames = (selectedLanguage) => {
  const selectWhatImport =
    selectedLanguage === 'tr' ? 'names.json' : selectedLanguage + '-names.json';
  return import(`../data/${selectWhatImport}`).then((names) => {
    return names;
  });
};
