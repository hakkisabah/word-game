export const setUserConfiguration = ({ data, appHelper }) => {
  const { selectedLanguage } = data;
  const userLanguageFinal =
    selectedLanguage && selectedLanguage.length == 2 ? selectedLanguage : 'en';
  const langs = appHelper.languages();
  const detectedLanguage = {
    detectedLang: userLanguageFinal,
    [userLanguageFinal]: langs[userLanguageFinal],
    availableLangs: langs,
  };
  const { game } = data;
  const userConfiguration = {
    game,
    ...detectedLanguage,
    selectedLanguage: detectedLanguage.detectedLang,
  };
  return appHelper
    .updateUserConfiguration({ userConfiguration })
    .then((data) => {
      return data;
    });
};
