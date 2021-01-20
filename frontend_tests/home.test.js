const fetchMock = require('fetch-mock')
const {
    updateLanguageInButton,
    updateLanguage,
    calculateTime,
    testUserName,
    fetchDetail,
    validateUserName
} = require('../assets/js/home');
const {readFileSync} = require('fs');
const {stringToHTML, flushPromises} = require('./utils');

document.body = stringToHTML(
    readFileSync(`${__dirname}/../views/home.ejs`, 'UTF-8')
);
describe('updateLanguageInButton', () => {
    test('should update innerText of start record btn for given language', () => {
        updateLanguageInButton('hindi');
        expect(document.getElementById('start-record').innerText).toEqual(
            'START RECORDING IN HINDI'
        );
    });
});

describe('updateLanguage', () => {
    test('should update speakers count and num of hours recorded on home page', (done) => {
        const language = 'Hindi';
        fetchMock.get(`getDetails/${language}`, [
            {count: 7, index: 0},
            {count: 5, index: 1},
        ], {overwriteRoutes: true});

        const speakerValue = document.getElementById('speaker-value');

        updateLanguage(language);
        flushPromises().then(() => {
            expect(speakerValue.innerHTML).toEqual('7');
            done();
        });
    });
});

describe('Fetch Details', () => {
    test('should give details for given language if server responds ok', () => {
        const language = 'Hindi'
        fetchMock.get(`getDetails/${language}`, {count: 5},{overwriteRoutes:true});
        fetchDetail(language).then((data) => {
            expect(data).toEqual({count: 5});
        });
    });
});

describe('calculateTime', () => {
    test('should calculate time in hours,min and sec for given sentence count', () => {
        expect(calculateTime(27)).toEqual({hours: 0, minutes: 2, seconds: 42});
    });
});

describe('testUserName', () => {
    test('should give true for given mobile number of 10-digits start from 6-9', () => {
        expect(testUserName('9818181818')).toEqual(true);
    });

    test('should give false for given mobile number of less than 10-digits', () => {
        expect(testUserName('981818181')).toEqual(false);
    });

    test('should give false for given mobile number of more than 10-digits', () => {
        expect(testUserName('98181818188')).toEqual(false);
    });

    test('should give false for given mobile number of than 10-digits not start from 6-9', () => {
        expect(testUserName('58181818188')).toEqual(false);
    });

    test('should give true for given emailId start with string followed by @<String>.<String>', () => {
        expect(testUserName('abc@gmail.com')).toEqual(true);
    });

    test('should give true for given emailId with string followed by @<String>.<digits>', () => {
        expect(testUserName('abc@gmail.123')).toEqual(true);
    });

    test('should give false for given emailId not having "@"', () => {
        expect(testUserName('abcgmail.com')).toEqual(false);
    });

    test('should give false for given emailId not having "."', () => {
        expect(testUserName('abc@gmailcom')).toEqual(false);
    });
});


describe('validateUserName', () => {
    test('should show username when username is valid', () => {
        const $userName = $('#username');
        $userName.val = () => "abc@gmail.com";
        const $userNameError = $userName.next();
        const $tncCheckbox = $('#tnc');
        validateUserName($userName, $userNameError, $tncCheckbox);

        expect($userName.hasClass('is-invalid')).toEqual(true);
        expect($userNameError.hasClass('d-none')).toEqual(false);
    });

    test('should show error when username is not valid', () => {
        const $userName = $('#username');
        const $userNameError = $userName.next();
        const $tncCheckbox = $('#tnc');
        validateUserName($userName, $userNameError, $tncCheckbox);

        expect($userName.hasClass('is-invalid')).toEqual(false);
        expect($userNameError.hasClass('d-none')).toEqual(true);
    });
});
