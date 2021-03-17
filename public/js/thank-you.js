!function t(e,a,n){function o(i,s){if(!a[i]){if(!e[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var c=a[i]={exports:{}};e[i][0].call(c.exports,function(t){var a=e[i][1][t];return o(a||t)},c,c.exports,t,e,a,n)}return a[i].exports}for(var r="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,a){"use strict";e.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0},{value:"Dogri",id:"doi",text:"डोगरी",hasLocaleText:!0,data:!1},{value:"Maithili",id:"mai",text:"Maithili",hasLocaleText:!0,data:!1},{value:"Urdu",id:"ur",text:"اردو",hasLocaleText:!0,data:!1},{value:"Konkani Roman",id:"kr",text:"Konkani Roman",hasLocaleText:!0,data:!1},{value:"Konkani DV",id:"kd",text:"Konkani DV",hasLocaleText:!0,data:!1},{value:"Manipuri BN",id:"mnibn",text:"Manipuri BN",hasLocaleText:!0,data:!1},{value:"Manipuri MM",id:"mnimm",text:"Manipuri MM",hasLocaleText:!1,data:!1},{value:"Santali OL",id:"satol",text:"Santali OL",hasLocaleText:!1,data:!1},{value:"Santali DV",id:"satdv",text:"Santali DV",hasLocaleText:!1,data:!1},{value:"Sanskrit",id:"sa",text:"Sanskrit",hasLocaleText:!0,data:!1}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,e,a){"use strict";e.exports={api_url:"http://localhost:8080"}},{}],3:[function(t,e,a){"use strict";var n=t("./fetch"),o=t("./constants"),r=(o.AUDIO_DURATION,o.SIXTY),i=o.HOUR_IN_SECONDS,s=t("./utils"),l=s.setPageContentHeight,c=s.toggleFooterPosition,u=s.updateLocaleLanguagesDropdown,d="currentIndex",h=Number(localStorage.getItem(d)),g=localStorage.getItem("speakerDetails"),f=JSON.parse(g),m=($("footer"),function(t){$("#user-contribution").html(t)});function p(){var t=Number(localStorage.getItem("skipCount"));return Number(localStorage.getItem("count"))+Number(localStorage.getItem(d))-t}if(f)if(h<5)location.href="/#start-record";else{$("#nav-user").removeClass("d-none"),$("#nav-login").addClass("d-none"),$("#nav-username").text(f.userName);var v=$("#hour-value");l(),m(p()),n("/getDetails/".concat(f.language)).then(function(t){if(t.ok)return t.json();throw Error(t.statusText||"HTTP error")}).then(function(t){localStorage.setItem("speakersData",JSON.stringify(t)),T(t)}).catch(function(t){console.log(t)}).then(function(){v.next().addClass("d-none")})}else location.href="/#start-record";var x=function(t){var e,a,n,o,r=$("#total-progress"),s=(o=11,innerWidth<576?(a=70.5-1.333*(e=576-innerWidth)/100,n=75.2-.4*e/100):innerWidth<1200?(a=70.5-.5*(e=1200-innerWidth)/100,n=75.75-.25*e/100):innerWidth<2e3?(a=71.5-.1*(e=2e3-innerWidth)/100,o=12-.1*e/100,n=innerWidth<1500?75.2:75.5-.003*e/100):(a=71.5+.1*(e=innerWidth-2e3)/100,o=12,n=75.8),{totalProgressBarWidth:a,totalProgressBarBulbWidth:o,totalProgressBarBulbLeft:n}),l=t/(100*i)*100;l>=100?(r.next().css({width:s.totalProgressBarBulbWidth+"%",left:s.totalProgressBarBulbLeft+"%"}),r.width(100*s.totalProgressBarWidth/100+"%"),$("#total-progress").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){var t=0,e=setInterval(function(){t>=100&&clearInterval(e),r.next().css("background","linear-gradient(to right, #007bff 0%, #007bff ".concat(t,"%, transparent 0%)")),t+=5},30)})):r.width(l*s.totalProgressBarWidth/100+"%")},T=function(t){try{var e=$("#hour-value"),a=Number(t.find(function(t){return 1===t.index}).duration),n=Math.floor(a/i),o=a%i,s=Math.floor(o/r),l=Math.ceil(o%r);e.text("".concat(n,"h ").concat(s,"m ").concat(l,"s")),x(a)}catch(t){console.log(t)}},L=function(t){var e=Math.floor(t/i),a=t%i;return{hours:e,minutes:Math.floor(a/r),seconds:Math.ceil(a%r)}},b=function(t,e){var a="I've contributed towards building open language repository for India on http://bhaashadaan.nplt.in You and I can make a difference by donating our voices that can help machines learn our language and interact with us through great lingusitic applications. Our ".concat(t," language ranks ").concat(e," on Bhaashadaan. Do your bit and empower the language?");$("#whatsapp_share").attr("href","https://api.whatsapp.com/send?text=".concat(a)),$("#twitter_share").attr("href","https://twitter.com/intent/tweet?text=".concat(a)),$("#linkedin_share").attr("href","https://www.linkedin.com/shareArticle?mini=true&url=https://bhaashadaan.nplt.in&title=I've contributed towards building open language repository for India on http://bhaashadaan.nplt.in&summary=".concat(a))};$(document).ready(function(){c();var t=localStorage.getItem("contributionLanguage");t&&u(t),n("/stats/summary?aggregateDataByLanguage=true").then(function(t){return t.json()}).then(function(t){var e=t.aggregate_data_by_language.sort(function(t,e){return Number(t.total_contributions)>Number(e.total_contributions)?-1:1}),a=L(3600*Number(e[0].total_contributions)),n=a.hours,o=a.minutes,r=a.seconds;$("#highest_language_time").text("".concat(n,"hrs ").concat(o,"min ").concat(r,"sec"));var i=localStorage.getItem("contributionLanguage"),s=e.findIndex(function(t){return t.language.toLowerCase()===i.toLowerCase()}),l=$("#contribute_language_time");if(s>-1){var c=L(3600*Number(e[s].total_contributions)),u=c.hours,d=c.minutes,h=c.seconds;l.text("".concat(u,"hrs ").concat(d,"min ").concat(h,"sec"))}else l.text("0 hrs");$("#languageId").text(e[0].language),$("#languageChoiceId").text(i),b(i,s>-1?s+1:e.length+1)})}),e.exports={setUserContribution:m,getTotalSentencesContributed:p}},{"./constants":1,"./fetch":4,"./utils":5}],4:[function(t,e,a){"use strict";var n,o=(n=t("node-fetch"))&&n.__esModule?n:{default:n};var r=t("./env-api").api_url;e.exports=function(t){for(var e=arguments.length,a=new Array(e>1?e-1:0),n=1;n<e;n++)a[n-1]=arguments[n];return t.startsWith("/")?o.default.apply(void 0,[r+t].concat(a)):o.default.apply(void 0,[t].concat(a))}},{"./env-api":2,"node-fetch":6}],5:[function(t,e,a){"use strict";var n=t("./constants"),o=n.HOUR_IN_SECONDS,r=n.SIXTY,i=n.ALL_LANGUAGES,s=t("./fetch");var l=function(t){return s(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),a=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){var t=localStorage.getItem("state_region")||"NOT_PRESENT",e=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==t&&"NOT_PRESENT"!==e&&t.length>0&&e.length>0?new Promise(function(a){a({regionName:t,country:e})}):s("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),a="";for(var n in e)if(e[n].startsWith("ip=")){a=e[n].replace("ip=","");break}return 0!==a.length?s("/location-info?ip=".concat(a)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){alert(t);var e=$("#localisation_dropdown"),a=i.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===a.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="#" locale="en">English</a>'):e.html('<a id="english" class="dropdown-item" href="#" locale="en">English</a>\n        <a id='.concat(a.value,' class="dropdown-item" href="#" locale="').concat(a.id,'">').concat(a.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(t/o),n=t%o,i=Math.floor(n/r),s=Math.round(n%r);return e?{hours:a,minutes:i,seconds:s}:{hours:a,minutes:i}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return t>0&&(n+="".concat(t," hrs ")),e>0&&(n+="".concat(e," min ")),0===t&&0===e&&a>0&&(n+="".concat(a," sec ")),n.substr(0,n.length-1)},getLocaleString:function(){l("/get-locale-strings").then(function(t){localStorage.setItem("localeString",JSON.stringify(t))})},performAPIRequest:l,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")}}},{"./constants":1,"./fetch":4}],6:[function(t,e,a){"use strict";var n=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n)return n;throw new Error("unable to locate global object")}();e.exports=a=n.fetch,n.fetch&&(a.default=n.fetch.bind(n)),a.Headers=n.Headers,a.Request=n.Request,a.Response=n.Response},{}]},{},[3]);