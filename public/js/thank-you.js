!function t(e,n,a){function o(i,s){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var u=n[i]={exports:{}};e[i][0].call(u.exports,function(t){var n=e[i][1][t];return o(n||t)},u,u.exports,t,e,n,a)}return n[i].exports}for(var r="function"==typeof require&&require,i=0;i<a.length;i++)o(a[i]);return o}({1:[function(t,e,n){"use strict";e.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,e,n){"use strict";var a=t("./constants"),o=(a.AUDIO_DURATION,a.SIXTY),r=a.HOUR_IN_SECONDS,i=t("./utils"),s=i.setPageContentHeight,c=i.toggleFooterPosition,u=i.updateLocaleLanguagesDropdown,l="currentIndex",g="skipCount",h="count",d=function(t){$("#user-contribution").html(t)};function f(){var t=Number(localStorage.getItem(g));return Number(localStorage.getItem(h))+Number(localStorage.getItem(l))-t}var m=function(t){var e,n,a,o,i=$("#total-progress"),s=(o=11,innerWidth<576?(n=70.5-1.333*(e=576-innerWidth)/100,a=75.2-.4*e/100):innerWidth<1200?(n=70.5-.5*(e=1200-innerWidth)/100,a=75.75-.25*e/100):innerWidth<2e3?(n=71.5-.1*(e=2e3-innerWidth)/100,o=12-.1*e/100,a=innerWidth<1500?75.2:75.5-.003*e/100):(n=71.5+.1*(e=innerWidth-2e3)/100,o=12,a=75.8),{totalProgressBarWidth:n,totalProgressBarBulbWidth:o,totalProgressBarBulbLeft:a}),c=t/(100*r)*100;c>=100?(i.next().css({width:s.totalProgressBarBulbWidth+"%",left:s.totalProgressBarBulbLeft+"%"}),i.width(100*s.totalProgressBarWidth/100+"%"),$("#total-progress").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){var t=0,e=setInterval(function(){t>=100&&clearInterval(e),i.next().css("background","linear-gradient(to right, #007bff 0%, #007bff ".concat(t,"%, transparent 0%)")),t+=5},30)})):i.width(c*s.totalProgressBarWidth/100+"%")},v=function(t){var e=Math.floor(t/r),n=t%r;return{hours:e,minutes:Math.floor(n/o),seconds:Math.ceil(n%o)}},p=function(t,e){var n="I've contributed towards building open language repository for India on https://boloindia.nplt.in You and I can make a difference by donating our voices that can help machines learn our language and interact with us through great lingusitic applications. Our ".concat(t," language ranks ").concat(e," on BoloIndia. Do your bit and empower the language?");$("#whatsapp_share").attr("href","https://api.whatsapp.com/send?text=".concat(n)),$("#twitter_share").attr("href","https://twitter.com/intent/tweet?text=".concat(n)),$("#linkedin_share").attr("href","https://www.linkedin.com/shareArticle?mini=true&url=https://boloindia.nplt.in&title=I've contributed towards building open language repository for India on https://boloindia.nplt.in&summary=".concat(n))};$(document).ready(function(){var t=Number(localStorage.getItem(l)),e=JSON.parse(localStorage.getItem("speakerDetails"));if(e)if(t<5)location.href="/#start-record";else{$("#nav-user").removeClass("d-none"),$("#nav-login").addClass("d-none"),$("#nav-username").text(e.userName);var n=$("#hour-value");s();var a=f();d(a),fetch("/getDetails/".concat(e.language)).then(function(t){if(t.ok)return t.json();throw Error(t.statusText||"HTTP error")}).then(function(t){localStorage.setItem("speakersData",JSON.stringify(t)),function(t){try{var e=$("#hour-value"),n=Number(t.find(function(t){return 1===t.index}).duration),a=Math.floor(n/r),i=n%r,s=Math.floor(i/o),c=Math.ceil(i%o);e.text("".concat(a,"h ").concat(s,"m ").concat(c,"s")),m(n)}catch(t){console.log(t)}}(t)}).catch(function(t){console.log(t)}).then(function(){n.next().addClass("d-none")})}else location.href="/#start-record";c();var i=localStorage.getItem("contributionLanguage");i&&u(i),fetch("/stats/summary?aggregateDataByLanguage=true").then(function(t){return t.json()}).then(function(t){var e=t.aggregate_data_by_language.sort(function(t,e){return Number(t.total_contributions)>Number(e.total_contributions)?-1:1}),n=v(3600*Number(e[0].total_contributions)),a=n.hours,o=n.minutes,r=n.seconds;$("#highest_language_time").text("".concat(a,"hrs ").concat(o,"min ").concat(r,"sec"));var i=$("#highest_language_progress"),s=3600*Number(e[0].total_contributions)/36e4*100;i.css("width","".concat(s,"%"));var c=localStorage.getItem("contributionLanguage"),u=e.findIndex(function(t){return t.language.toLowerCase()===c.toLowerCase()}),l=$("#contribute_language_time"),g=$("#contribute_language_progress");if(u>-1){var h=e[u].total_contributions,d=v(3600*Number(h)),f=d.hours,m=d.minutes,x=d.seconds;l.text("".concat(f,"hrs ").concat(m,"min ").concat(x,"sec"));var L=3600*Number(h)/36e4*100;g.css("width","".concat(L,"%"))}else l.text("0 hrs"),l.css("right",0),g.css("width","0%");$("#languageId").text(e[0].language),$("#languageChoiceId").text(c),p(c,u>-1?u+1:e.length+1)})}),e.exports={setUserContribution:d,getTotalSentencesContributed:f}},{"./constants":1,"./utils":4}],3:[function(t,e,n){"use strict";var a=t("./utils").updateLocaleLanguagesDropdown,o=t("./constants").ALL_LANGUAGES,r=function(t){var e=location.href.split("/"),n=e[e.length-1];i("i18n",t,1),location.href="/".concat(t,"/").concat(n)};function i(t,e,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var o="expires="+a.toGMTString();document.cookie=t+"="+e+";"+o+";path=/"}function s(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var o=n[a];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return""}e.exports={checkCookie:function(){return""!=s("i18n")},getCookie:s,setCookie:i,changeLocale:r,showLanguagePopup:function(){document.getElementById("toggle-content-language").click()},redirectToLocalisedPage:function(){var t=s("i18n"),e=location.href.split("/"),n=e[e.length-2];if($("#home-page").attr("default-lang",t),n!=t)r(t);else{var i=o.find(function(e){return e.id===t});i&&a(i.value)}}}},{"./constants":1,"./utils":4}],4:[function(t,e,n){"use strict";var a=t("./constants"),o=a.HOUR_IN_SECONDS,r=a.SIXTY,i=a.ALL_LANGUAGES,s=t("./locale").getCookie;var c=function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),n=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){var t=localStorage.getItem("state_region")||"NOT_PRESENT",e=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==t&&"NOT_PRESENT"!==e&&t.length>0&&e.length>0?new Promise(function(n){n({regionName:t,country:e})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),n="";for(var a in e)if(e[a].startsWith("ip=")){n=e[a].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){var e=$("#localisation_dropdown"),n=i.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===n.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(t/o),a=t%o,i=Math.floor(a/r),s=Math.round(a%r);return e?{hours:n,minutes:i,seconds:s}:{hours:n,minutes:i}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a="";return t>0&&(a+="".concat(t," hrs ")),e>0&&(a+="".concat(e," min ")),0===t&&0===e&&n>0&&(a+="".concat(n," sec ")),a.substr(0,a.length-1)},getLocaleString:function(){var t=s("i18n");c("/get-locale-strings/".concat(t)).then(function(t){localStorage.setItem("localeString",JSON.stringify(t))})},performAPIRequest:c,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")},setFooterPosition:function(){var t=$("#page-content").outerHeight();$("body").outerHeight()<=t+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":3}]},{},[2]);
