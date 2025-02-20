const {drawMap, getStatistics, showByHoursChart, showBySpeakersChart} = require('./home-page-charts');
const {toggleFooterPosition, updateLocaleLanguagesDropdown, getLocaleString, performAPIRequest} = require('./utils')
const {
    setSpeakerDetails,
    setStartRecordBtnToolTipContent,
    //setTNCOnChange,
    setUserModalOnShown,
    setUserNameOnInputFocus,
    setGenderRadioButtonOnClick,
    setStartRecordingBtnOnClick
} = require('./speakerDetails');

const {
    DEFAULT_CON_LANGUAGE,
    TOP_LANGUAGES_BY_HOURS,
    TOP_LANGUAGES_BY_SPEAKERS,
    AGGREGATED_DATA_BY_LANGUAGE,
    CONTRIBUTION_LANGUAGE,
    LOCALE_STRINGS,
    ALL_LANGUAGES
} = require('./constants');

const updateLocaleText = function (total_contributions, total_validations, language) {
    const $say_p_3 = $("#say-p-3");
    const $listen_p_3 = $("#listen-p-3");
    const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
    let hrsRecordedIn = localeStrings['hrs recorded in'];
    hrsRecordedIn = hrsRecordedIn.replace("%hours", total_contributions);
    hrsRecordedIn = hrsRecordedIn.replace("%language", language);
    $say_p_3.text(hrsRecordedIn);

    let hrsValidatedIn = localeStrings['hrs validated in'];
    hrsValidatedIn = hrsValidatedIn.replace("%hours", total_validations);
    hrsValidatedIn = hrsValidatedIn.replace("%language", language);
    $listen_p_3.text(hrsValidatedIn);
}

function updateHrsForSayAndListen(language) {
    const $sayLoader = $('#say-loader');
    const $listenLoader = $('#listen-loader');
    $sayLoader.removeClass('d-none');
    $listenLoader.removeClass('d-none');
    const aggregateDetails = JSON.parse(localStorage.getItem(AGGREGATED_DATA_BY_LANGUAGE));
    const totalInfo = aggregateDetails && aggregateDetails.find((element) => element.language === language);
    if (totalInfo) {
        updateLocaleText(totalInfo.total_contributions, totalInfo.total_validations, language);
    } else {
        updateLocaleText(0, 0, language);
    }
    $sayLoader.addClass('d-none');
    $listenLoader.addClass('d-none');
    updateLocaleLanguagesDropdown(language);
}

const getDefaultTargetedDiv = function (key, value, $sayListenLanguage) {
    let targetIndex = 0;
    const $sayListenLanguageItems = $sayListenLanguage.children();
    $sayListenLanguageItems.each(function (index, element) {
        if (element.getAttribute('value') === DEFAULT_CON_LANGUAGE) {
            targetIndex = index;
        }
    });
    $sayListenLanguageItems.each(function (index, element) {
        if (element.getAttribute(key) === value) {
            targetIndex = index;
        }
    });

    return $sayListenLanguageItems[targetIndex];
}

const setLangNavBar = (targetedDiv, top_lang, $languageNavBar) => {
    const allDivs = $languageNavBar.children();
    let targetedDivIndex = -1
    allDivs.each(function (index, element) {
        if (element.getAttribute('value') === top_lang) {
            targetedDivIndex = index;
        }
    });

    const previousActiveDiv = $languageNavBar.find('.active');
    previousActiveDiv.removeClass('active');
    const $6th_place = document.getElementById('6th_option');
    const lang = ALL_LANGUAGES.find(ele => ele.value === top_lang);
    $6th_place.innerText = lang.text;
    if (targetedDivIndex < 0) {
        $6th_place.classList.remove('d-none');
        $6th_place.classList.add('active');
        $6th_place.setAttribute('value', top_lang);
    } else {
        allDivs[targetedDivIndex].classList.add('active');
        $6th_place.classList.remove('active');
        $6th_place.classList.add('d-none');
    }
}

const getDefaultLang = function (){
    const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
    const $sayListenLanguage = $('#say-listen-language');

    if (!contributionLanguage) {
        const $homePage = document.getElementById('home-page');
        const defaultLangId = $homePage.getAttribute('default-lang');
        const targetedDiv = getDefaultTargetedDiv('id', defaultLangId, $sayListenLanguage);
        const language = targetedDiv.getAttribute("value");
        localStorage.setItem(CONTRIBUTION_LANGUAGE, language);
        return language;
    }
    return contributionLanguage;
}

const setDefaultLang = function () {
    const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
    const $sayListenLanguage = $('#say-listen-language');
    const $languageNavBar = $('#language-nav-bar')
    const $navBarLoader = $('#nav-bar-loader');
    $navBarLoader.addClass('d-none');
    $languageNavBar.removeClass('d-none');

    if (!contributionLanguage) {
        const $homePage = document.getElementById('home-page');
        const defaultLangId = $homePage.getAttribute('default-lang');
        const targetedDiv = getDefaultTargetedDiv('id', defaultLangId, $sayListenLanguage);
        const language = targetedDiv.getAttribute("value");
        localStorage.setItem(CONTRIBUTION_LANGUAGE, language);
        updateHrsForSayAndListen(language);
        setLangNavBar(targetedDiv, language, $languageNavBar);
        return;
    }
    const targetedDiv = getDefaultTargetedDiv('value', contributionLanguage, $sayListenLanguage);
    updateHrsForSayAndListen(contributionLanguage);
    setLangNavBar(targetedDiv, contributionLanguage, $languageNavBar);
}

const clearLocalStorage = function () {
    localStorage.removeItem(TOP_LANGUAGES_BY_HOURS);
    localStorage.removeItem(TOP_LANGUAGES_BY_SPEAKERS);
    localStorage.removeItem(AGGREGATED_DATA_BY_LANGUAGE);
    localStorage.removeItem(LOCALE_STRINGS);
}

const getStatsSummary = function () {
    performAPIRequest('/stats/summary')
        .then(response => {
            drawMap({data: response.aggregate_data_by_state});
            localStorage.setItem(TOP_LANGUAGES_BY_HOURS, JSON.stringify(response.top_languages_by_hours));
            showByHoursChart();
            localStorage.setItem(TOP_LANGUAGES_BY_SPEAKERS, JSON.stringify(response.top_languages_by_speakers));
            localStorage.setItem(AGGREGATED_DATA_BY_LANGUAGE, JSON.stringify(response.aggregate_data_by_language));
            getStatistics(response.aggregate_data_count[0]);
            setDefaultLang();
            if(response.top_languages_by_hours.length === 0) {
                $("#bar_charts_container").hide();
                $("#view_all_btn").hide();
            } else {
                $("#bar_charts_container").show();
                $("#view_all_btn").show();
            }
        });
}

$(document).ready(function () {
    clearLocalStorage();
    getLocaleString();
    const speakerDetailsKey = 'speakerDetails';
    const $startRecordBtn = $('#proceed-box');
    const $startRecordBtnTooltip = $startRecordBtn.parent();
    const age = document.getElementById('age');
    const motherTongue = document.getElementById('mother-tongue');
    const $userName = $('#username');
    //const $tncCheckbox = $('#tnc');
    let sentenceLanguage = DEFAULT_CON_LANGUAGE;

   // $tncCheckbox.prop('checked', false);

    toggleFooterPosition();
    let top_lang = getDefaultLang();

    const $languageNavBar = $('#language-nav-bar');
    const $sayListenLanguage = $('#say-listen-language');

    $sayListenLanguage.on('click', (e) => {
        const targetedDiv = e.target;
        const language = targetedDiv.getAttribute("value");
        if (top_lang !== language) {
            top_lang = language;
            localStorage.setItem(CONTRIBUTION_LANGUAGE, language);
            document.cookie = `i18n=en`;
            window.location.href = "/";
            setLangNavBar(targetedDiv, language, $languageNavBar);
            updateHrsForSayAndListen(language);
        }
    })

    $languageNavBar.on('click', (e) => {
        const targetedDiv = e.target;
        const language = targetedDiv.getAttribute('value');
        if (top_lang !== language) {
            localStorage.setItem(CONTRIBUTION_LANGUAGE, language);
            top_lang = language;
            const $6th_place = $('#6th_option')
            const previousActiveDiv = $languageNavBar.find('.active') || $6th_place;
            previousActiveDiv.removeClass('active');
            $6th_place.addClass('d-none');
            targetedDiv.classList.add('active');
            updateHrsForSayAndListen(language);
            document.cookie = `i18n=en`;
            window.location.href = "/";
        }
    });

    $('#start_recording').on('click', () => {
        sentenceLanguage = top_lang;
        localStorage.setItem(CONTRIBUTION_LANGUAGE, top_lang);
    });

    $('[name="topLanguageChart"]').on('change', (event) => {
        if (event.target.value === 'hours') {
            showByHoursChart();
        } else {
            showBySpeakersChart();
        }
    });

    setSpeakerDetails(speakerDetailsKey, age, motherTongue, $userName);
    setGenderRadioButtonOnClick();
    setStartRecordBtnToolTipContent($userName.val().trim(), $startRecordBtnTooltip);
    //setTNCOnChange($userName, $startRecordBtnTooltip);
    setUserNameOnInputFocus();
    setStartRecordingBtnOnClick();
    setUserModalOnShown($userName);

    const $say = $('#say');
    const $listen = $('#listen');
    const $listen_p_2 = $('#listen-p-2');
    const $say_p_2 = $('#say-p-2');
    const $say_container = $('#say_container');
    const $listen_container = $('#listen_container');
    $say.hover(() => {
        $say.removeClass('col-lg-5');
        $listen.removeClass('col-lg-5');
        $say.addClass('col-lg-6');
        $listen.addClass('col-lg-4');
        $say.removeClass('col-md-5');
        $listen.removeClass('col-md-5');
        $say.addClass('col-md-6');
        $listen.addClass('col-md-4');
        $say_p_2.removeClass('d-none');
        $say_container.addClass('say-active');
    }, () => {
        $say.removeClass('col-lg-6');
        $listen.removeClass('col-lg-4');
        $say.addClass('col-lg-5');
        $listen.addClass('col-lg-5');
        $say.removeClass('col-md-6');
        $listen.removeClass('col-md-4');
        $say.addClass('col-md-5');
        $listen.addClass('col-md-5');
        $say_p_2.addClass('d-none');
        $say_container.removeClass('say-active');
    });

    $listen.hover(() => {
        $say.removeClass('col-lg-5');
        $listen.removeClass('col-lg-5');
        $listen.addClass('col-lg-6');
        $say.addClass('col-lg-4');
        $listen_p_2.removeClass('d-none');
        $listen_container.addClass('listen-active');
    }, () => {
        $say.removeClass('col-lg-4');
        $listen.removeClass('col-lg-6');
        $say.addClass('col-lg-5');
        $listen.addClass('col-lg-5');
        $listen_p_2.addClass('d-none');
        $listen_container.removeClass('listen-active');
    });

    $('input[name = "gender"]').on('change', function() {
        const selectedGender = document.querySelector(
            'input[name = "gender"]:checked'
        );
        const options = $("#transgender_options");
        if(selectedGender.value === "others") {
            options.removeClass("d-none");
        } else {
            options.addClass("d-none");
        }
    });

    getStatsSummary();
});

module.exports = {
    updateHrsForSayAndListen,
    getDefaultTargetedDiv,
    setLangNavBar
};
