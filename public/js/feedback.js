!function e(t,n,a){function o(r,c){if(!n[r]){if(!t[r]){var s="function"==typeof require&&require;if(!c&&s)return s(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=n[r]={exports:{}};t[r][0].call(l.exports,function(e){var n=t[r][1][e];return o(n||e)},l,l.exports,e,t,n,a)}return n[r].exports}for(var i="function"==typeof require&&require,r=0;r<a.length;r++)o(a[r]);return o}({1:[function(e,t,n){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(e,t,n){"use strict";var a=e("./utils"),o=a.toggleFooterPosition,i=a.setPageContentHeight;function r(){window.history.back()}function c(){var e=$("#feedback_failure_msg"),t={feedback:$("#feedback_description").val(),subject:$("#feedback_subject").val(),language:localStorage.getItem("contributionLanguage")};fetch("/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(t){200===t.statusCode?(e.addClass("d-none"),$("#feedback_form").hide(),$("#feedback_thank_you_screen").removeClass("d-none")):e.removeClass("d-none")})}var s=function(){var e=$("#feedback_description").val(),t=$("#feedback_subject").val(),n=$("#submit_btn");t&&t.trim().length>0&&e&&e.trim().length>0?n.attr("disabled",!1):n.attr("disabled",!0)};$(document).ready(function(){o(),i();$("#count_message").html("0 / 1000"),$("#feedback_description").on("keyup",function(){var e=$("#feedback_description").val().length;$("#count_message").html(e+" / 1000"),s()}),$("#submit_btn").on("click",c),$("#back_btn").on("click",r),$("#feedback_subject").on("keyup",function(){s()}),$("#submit_btn").attr("disabled",!0)})},{"./utils":4}],3:[function(e,t,n){"use strict";var a=e("./utils").updateLocaleLanguagesDropdown,o=e("./constants").ALL_LANGUAGES,i=function(e){var t=location.href.split("/"),n=t[t.length-1];r("i18n",e,1),location.href="/".concat(e,"/").concat(n)};function r(e,t,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var o="expires="+a.toGMTString();document.cookie=e+"="+t+";"+o+";path=/"}function c(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var o=n[a];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}t.exports={checkCookie:function(){return""!=c("i18n")},getCookie:c,setCookie:r,changeLocale:i,showLanguagePopup:function(){document.getElementById("toggle-content-language").click()},redirectToLocalisedPage:function(){var e=c("i18n"),t=location.href.split("/"),n=t[t.length-2];if($("#home-page").attr("default-lang",e),n!=e)i(e);else{var r=o.find(function(t){return t.id===e});r&&a(r.value)}}}},{"./constants":1,"./utils":4}],4:[function(e,t,n){"use strict";var a=e("./constants"),o=a.HOUR_IN_SECONDS,i=a.SIXTY,r=a.ALL_LANGUAGES,c=e("./locale").getCookie;var s=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){var e=localStorage.getItem("state_region")||"NOT_PRESENT",t=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==e&&"NOT_PRESENT"!==t&&e.length>0&&t.length>0?new Promise(function(n){n({regionName:e,country:t})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),n="";for(var a in t)if(t[a].startsWith("ip=")){n=t[a].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),n=r.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===n.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(e/o),a=e%o,r=Math.floor(a/i),c=Math.round(a%i);return t?{hours:n,minutes:r,seconds:c}:{hours:n,minutes:r}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a="";return e>0&&(a+="".concat(e," hrs ")),t>0&&(a+="".concat(t," min ")),0===e&&0===t&&n>0&&(a+="".concat(n," sec ")),a.substr(0,a.length-1)},getLocaleString:function(){var e=c("i18n");s("/get-locale-strings/".concat(e)).then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:s,showElement:function(e){e.removeClass("d-none")},hideElement:function(e){e.addClass("d-none")},setFooterPosition:function(){var e=$("#page-content").outerHeight();$("body").outerHeight()<=e+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":3}]},{},[2]);
