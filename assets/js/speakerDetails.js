const {DEFAULT_CON_LANGUAGE,CONTRIBUTION_LANGUAGE,ALL_LANGUAGES} = require('./constants');

function validateUserName($userName, $userNameError) {
    const userNameValue = $userName.val().trim();
    if (testUserName(userNameValue)) {
        $userName.addClass('is-invalid');
        $userNameError.removeClass('d-none');
    } else {
        $userName.removeClass('is-invalid');
        $userNameError.addClass('d-none');
    }
    // $tncCheckbox.trigger('change');
}

function resetSpeakerDetails() {
    const age = document.getElementById('age');
    const motherTongue = document.getElementById('mother-tongue');
    const userName = document.getElementById('username');
    const selectedGender = document.querySelector(
        'input[name = "gender"]:checked'
    );
    if (selectedGender) selectedGender.checked = false;
    age.selectedIndex = 0;
    motherTongue.selectedIndex = 0;
    userName.value = '';
}

const testUserName = (val) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^\S+@\S+[\.][0-9a-z]+$/;
    return mobileRegex.test(val) || emailRegex.test(val);
};

function setUserNameTooltip($userName) {
    if ($userName.val().length > 11) {
        $userName.tooltip('enable');
        $userName.tooltip('show');
    } else {
        $userName.tooltip('disable');
        $userName.tooltip('hide');
    }
}

const setStartRecordBtnToolTipContent = (userName, $startRecordBtnTooltip) => {
    if (testUserName(userName)) {
        $startRecordBtnTooltip.attr(
            'data-original-title',
            'Please validate any error message before proceeding'
        );
    }
    //  else {
    //     $startRecordBtnTooltip.attr(
    //         'data-original-title',
    //         'Please agree to the Terms and Conditions before proceeding'
    //     );
    // }
};

const setSpeakerDetails = (speakerDetailsKey, age, motherTongue, $userName) => {
    const speakerDetailsValue = localStorage.getItem(speakerDetailsKey);
    if (speakerDetailsValue) {
        const parsedSpeakerDetails = JSON.parse(speakerDetailsValue);
        const genderRadio = document.querySelector(
            'input[name = "gender"][value="' + parsedSpeakerDetails.gender + '"]'
        );
        if(['male', 'female'].indexOf(parsedSpeakerDetails.gender) > -1) {
            if (genderRadio) {
                genderRadio.checked = true;
                genderRadio.previous = true;
            }
        } else if (parsedSpeakerDetails.gender !== "") {
            const genderRadio = document.querySelector(
                'input[name = "gender"][value="others"]'
            );
            if(genderRadio) {
                genderRadio.checked = true;
                genderRadio.previous = true;
            }
            const transGenderRadio = document.querySelector(
                'input[name = "trans_gender"][value="' + parsedSpeakerDetails.gender + '"]'
            );
            if (transGenderRadio) {
                $("#transgender_options").removeClass("d-none");
                transGenderRadio.checked = true;
                transGenderRadio.previous = true;

            }
        }
        age.value = parsedSpeakerDetails.age;
        motherTongue.value = parsedSpeakerDetails.motherTongue;
        $userName.val(
            parsedSpeakerDetails.userName
                ? parsedSpeakerDetails.userName.trim().substring(0, 12)
                : ''
        );
        validateUserName($userName, $userName.next());
    }
};

// const setTNCOnChange = function ($userName, $startRecordBtnTooltip) {
//     const $tncCheckbox = $('#tnc');
//     const $startRecordBtn = $('#proceed-box');
//     $tncCheckbox.change(function () {
//         const userNameValue = $userName.val().trim();
//         if (this.checked && !testUserName(userNameValue)) {
//             $startRecordBtn.removeAttr('disabled').removeClass('point-none');
//             $startRecordBtnTooltip.tooltip('disable');
//         } else {
//             setStartRecordBtnToolTipContent(userNameValue, $startRecordBtnTooltip);
//             $startRecordBtn.prop('disabled', 'true').addClass('point-none');
//             $startRecordBtnTooltip.tooltip('enable');
//         }
//     });
// };

const setUserModalOnShown = function ($userName) {
    $('#userModal').on('shown.bs.modal', function () {
        $('#resetBtn').on('click', resetSpeakerDetails);
        $userName.tooltip({
            container: 'body',
            placement: screen.availWidth > 500 ? 'right' : 'auto',
            trigger: 'focus',
        });
        setUserNameTooltip($userName);
    });
}

const setUserNameOnInputFocus = function () {
    const $userName = $('#username');
    const $userNameError = $userName.next();
    // const $tncCheckbox = $('#tnc');
    $userName.on('input focus', () => {
        validateUserName($userName, $userNameError);
        setUserNameTooltip($userName);
    });
}

const setGenderRadioButtonOnClick = function () {
    const genderRadios = document.querySelectorAll('input[name = "gender"]');
    genderRadios.forEach((element) => {
        element.addEventListener('click', (e) => {
            if (e.target.previous) {
                e.target.checked = false;
            }
            e.target.previous = e.target.checked;

        });
    });
}

const setStartRecordingBtnOnClick = function () {
    const speakerDetailsKey = 'speakerDetails';
    const $startRecordBtn = $('#proceed-box');
    //const $tncCheckbox = $('#tnc');
    const genderRadios = document.querySelectorAll('input[name = "gender"]');
    const transGenderRadios = document.querySelectorAll('input[name = "trans_gender"]');
    const $userName = $('#username');
    const age = document.getElementById('age');
    const motherTongue = document.getElementById('mother-tongue');
    $startRecordBtn.on('click', () => {
        const checkedGender = Array.from(genderRadios).filter((el) => el.checked);
        let genderValue = checkedGender.length ? checkedGender[0].value : '';
        if (genderValue === "others") {
            const transGender = Array.from(transGenderRadios).filter((el) => el.checked);
            genderValue = transGender.length ? transGender[0].value : '';
        }
        const userNameValue = $userName.val().trim().substring(0, 12);
        let contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
        const selectedLanguage = ALL_LANGUAGES.find(e=>e.value === contributionLanguage);
        if (! selectedLanguage.data) contributionLanguage = DEFAULT_CON_LANGUAGE;
        if (testUserName(userNameValue)) {
            return;
        }
        const speakerDetails = {
            gender: genderValue,
            age: age.value,
            motherTongue: motherTongue.value,
            userName: userNameValue,
            language: contributionLanguage,
        };
        localStorage.setItem(speakerDetailsKey, JSON.stringify(speakerDetails));
        localStorage.setItem(CONTRIBUTION_LANGUAGE, contributionLanguage);
        location.href = '/record';
    });
}

module.exports = {
    testUserName,
    validateUserName,
    setSpeakerDetails,
    resetSpeakerDetails,
    setUserNameTooltip,
    setStartRecordBtnToolTipContent,
    // setTNCOnChange,
    setUserModalOnShown,
    setUserNameOnInputFocus,
    setGenderRadioButtonOnClick,
    setStartRecordingBtnOnClick
};