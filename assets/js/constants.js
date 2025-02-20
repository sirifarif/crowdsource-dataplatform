const DEFAULT_CON_LANGUAGE = "Hindi";
const AUDIO_DURATION = 6;
const SIXTY = 60;
const HOUR_IN_SECONDS = 3600;
const TOP_LANGUAGES_BY_HOURS = "topLanguagesByHours";
const TOP_LANGUAGES_BY_SPEAKERS = "topLanguagesBySpeakers";
const AGGREGATED_DATA_BY_LANGUAGE =  "aggregateDataCountByLanguage";
const LOCALE_STRINGS = 'localeString';
const CONTRIBUTION_LANGUAGE = "contributionLanguage";
const ALL_LANGUAGES = [
    {value: "Assamese",id: "as", text: "অসমীয়া", hasLocaleText: false, data:true},
    {value: "Bengali", id: "bn", text: "বাংলা", hasLocaleText: false,data:true},
    {value: "English", id: "en", text: "English", hasLocaleText: true,data:true},
    {value: "Gujarati", id: "gu", text: "ગુજરાતી", hasLocaleText: false,data:true},
    {value: "Hindi", id: "hi", text: "हिंदी", hasLocaleText: true,data:true},
    {value: "Kannada", id: "kn", text: "ಕನ್ನಡ", hasLocaleText: false,data:true},
    {value: "Malayalam", id: "ml", text: "മലയാളം", hasLocaleText: false,data:true},
    {value: "Marathi", id: "mr", text: "मराठी", hasLocaleText: false,data:true},
    {value: "Odia", id: "or", text: "ଓଡିଆ", hasLocaleText: false,data:true},
    {value: "Punjabi", id: "pa", text: "ਪੰਜਾਬੀ", hasLocaleText: false,data:true},
    {value: "Tamil", id: "ta", text: "தமிழ்", hasLocaleText: true,data:true},
    {value: "Telugu", id: "te", text: "తెలుగు", hasLocaleText: false,data:true}];

module.exports = {
    DEFAULT_CON_LANGUAGE,
    AUDIO_DURATION,
    SIXTY,
    HOUR_IN_SECONDS,
    ALL_LANGUAGES,
    TOP_LANGUAGES_BY_HOURS,
    TOP_LANGUAGES_BY_SPEAKERS,
    AGGREGATED_DATA_BY_LANGUAGE,
    LOCALE_STRINGS,
    CONTRIBUTION_LANGUAGE
}
