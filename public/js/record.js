!function e(t,n,o){function a(s,i){if(!n[s]){if(!t[s]){var d="function"==typeof require&&require;if(!i&&d)return d(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return a(n||e)},c,c.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)a(o[s]);return a}({1:[function(e,t,n){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0},{value:"Dogri",id:"doi",text:"डोगरी",hasLocaleText:!0,data:!1},{value:"Maithili",id:"mai",text:"Maithili",hasLocaleText:!0,data:!1},{value:"Urdu",id:"ur",text:"اردو",hasLocaleText:!0,data:!1},{value:"Konkani Roman",id:"kr",text:"Konkani Roman",hasLocaleText:!0,data:!1},{value:"Konkani DV",id:"kd",text:"Konkani DV",hasLocaleText:!0,data:!1},{value:"Manipuri BN",id:"mnibn",text:"Manipuri BN",hasLocaleText:!1,data:!1},{value:"Manipuri MM",id:"mnimm",text:"Manipuri MM",hasLocaleText:!1,data:!1},{value:"Santali OL",id:"satol",text:"Santali OL",hasLocaleText:!1,data:!1},{value:"Santali DV",id:"satdv",text:"Santali DV",hasLocaleText:!1,data:!1},{value:"Sanskrit",id:"sa",text:"Sanskrit",hasLocaleText:!0,data:!1}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(e,t,n){"use strict";var o=e("./utils"),a=o.setPageContentHeight,r=o.toggleFooterPosition,s=o.fetchLocationInfo,i=o.updateLocaleLanguagesDropdown,d="speakerDetails",c="currentIndex",l="skipCount";function u(e,t){return e<0?0:e>t?t:e}function g(e){return u(Number(localStorage.getItem(c)),e)}function m(e){return u(Number(localStorage.getItem(l)),e)}var h=function(e){document.getElementById("currentSentenceLbl").innerText=e},f=function(e){document.getElementById("totalSentencesLbl").innerText=e},v=function(){var e=crowdSource.sentences,t=$("#startRecord"),n=$("#startRecordRow"),o=$("#stopRecord"),a=$("#reRecord"),s=$("#visualizer"),i=$("#player"),u=$("#nextBtn"),v=u.parent(),p=$("#get-started"),S=$("#skipBtn"),x=$("#recording-row"),T=$("#recording-sign"),C=$(".progress-bar"),L=$("#page-content"),w=$("#audio-small-error"),y=document.getElementById("count-down"),N=e.length,I=g(N-1),b=m(N-1),E=($("footer"),["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Four dead, one more to go!","Yay! Done & Dusted!"]);4==e.length?E=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Yay! Done & Dusted!"]:3==e.length?E=["Let’s get started","We know you can do more! ","Just few more steps to go!","Yay! Done & Dusted!"]:2==e.length?E=["Let’s get started","Just few more steps to go!","Yay! Done & Dusted!"]:1==e.length&&(E=["Let’s get started","Yay! Done & Dusted!"]),v.tooltip({container:"body",placement:screen.availWidth>900?"right":"bottom"});var A,k,D,O,_,R,B=function(e,t,n){e.addClass("animated ".concat(t)),e.on("animationend",function(){e.removeClass("animated ".concat(t)),e.off("animationend"),"function"==typeof n&&n()})},M=function(e){C.width(20*e+"%"),C.prop("aria-valuenow",e)},P=function(t){var n=$("#sentenceLbl");n[0].innerText=e[t].sentence,B(n,"lightSpeedIn"),I&&M(I)},U=new Notyf({position:{x:"center",y:"top"},types:[{type:"success",className:"fnt-1-5"},{type:"error",duration:3500,className:"fnt-1-5"}]});P(I),h(I+1),f(N),t.add(a).on("click",function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){p.hide(),t.addClass("d-none"),S.prop("disabled",!0),n.removeClass("d-none"),o.removeClass("d-none"),x.removeClass("d-none"),T.removeClass("d-none"),a.addClass("d-none"),u.addClass("d-none"),i.addClass("d-none"),i.trigger("pause"),s.removeClass("d-none"),v.tooltip("disable"),w.addClass("d-none"),A=e;var r=window.AudioContext||window.webkitAudioContext;R&&R.close();var d=(R=new r).createAnalyser();(D=R.createMediaStreamSource(e)).connect(d),function(e,t){var n=e.getContext("2d"),o=t.frequencyBinCount,a=new Uint8Array(o),r=e.width,s=e.height;!function i(){requestAnimationFrame(i);t.getByteTimeDomainData(a);n.fillStyle="rgb(255, 255, 255, 0.8)";n.fillRect(0,0,r,s);n.lineWidth=2;n.strokeStyle="rgb(0,123,255)";n.beginPath();var d=1*r/o;var c=0;for(var l=0;l<o;l++){var u=a[l]/128,g=u*s/2;0===l?n.moveTo(c,g):n.lineTo(c,g),c+=d}n.lineTo(e.width,e.height/2);n.stroke()}()}(visualizer,d),(k=new Recorder(D,{numChannels:2})).record(),_=setTimeout(function(){y.classList.remove("d-none"),function(e,t){var n=document.getElementById("counter");n.innerHTML="0".concat(e),t.classList.remove("d-none");var o=setInterval(function(){n.innerText="0".concat(e),--e<0&&(clearInterval(o),t.classList.add("d-none"))},1e3)}(5,y)},15e3),O=setTimeout(function(){o.click()},21e3)}).catch(function(e){console.log(e),U.error("Sorry !!! We could not get access to your audio input device. Make sure you have given microphone access permission"),o.addClass("d-none"),u.addClass("d-none"),a.addClass("d-none"),T.addClass("d-none"),x.addClass("d-none"),i.addClass("d-none"),i.trigger("pause"),s.addClass("d-none"),w.addClass("d-none")})}),o.on("click",function(){var e=$("#startRecordRow");clearTimeout(O),clearTimeout(_),y.classList.add("d-none"),e.addClass("d-none"),o.addClass("d-none"),u.removeClass("d-none"),S.prop("disabled",!1),a.removeClass("d-none"),T.addClass("d-none"),x.addClass("d-none"),i.removeClass("d-none"),s.addClass("d-none"),k.stop(),A.getAudioTracks()[0].stop(),k.exportWAV(function(e){var t=(window.URL||window.webkitURL).createObjectURL(e);crowdSource.audioBlob=e,i.prop("src",t),i.on("loadedmetadata",function(){var e=i[0].duration;(function(e){return e<2?(v.tooltip("enable"),u.prop("disabled",!0).addClass("point-none"),w.removeClass("d-none"),!1):(v.tooltip("disable"),u.removeAttr("disabled").removeClass("point-none"),w.addClass("d-none"),!0)})(e)&&(crowdSource.audioDuration=e)})}),I===N-1&&p.text(E[N]).show()});var G=function(){location.href="/thank-you"};function H(e){var t=new FormData,n=JSON.parse(localStorage.getItem(d)),o=JSON.stringify({userName:n.userName,language:n.language});t.append("audio_data",crowdSource.audioBlob),t.append("speakerDetails",o),t.append("sentenceId",crowdSource.sentences[I].sentenceId),t.append("state",localStorage.getItem("state_region")||""),t.append("country",localStorage.getItem("country")||""),t.append("audioDuration",crowdSource.audioDuration),fetch("/upload",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){}).catch(function(e){console.log(e)}).then(function(t){e&&"function"==typeof e&&e()})}u.add(S).on("click",function(e){if("nextBtn"===e.target.id&&I<N-1?H():"skipBtn"===e.target.id&&(b++,localStorage.setItem(l,b),S.addClass("d-none")),I===N-1){"nextBtn"===e.target.id?H(G):setTimeout(G,2500),S.addClass("d-none"),r(),I++,B(L,"zoomOut",function(){return L.addClass("d-none")}),M(I);var o=JSON.parse(localStorage.getItem("sentences"));Object.assign(o,{sentences:[]}),localStorage.setItem("sentences",JSON.stringify(o)),localStorage.setItem(c,I),U.success("Congratulations!!! You have completed this batch of sentences"),$("#loader").show()}else I<N-1&&(P(++I),h(I+1),p.text(E[I]),localStorage.setItem(c,I),S.removeClass("d-none"));i.addClass("d-none"),i.trigger("pause"),u.addClass("d-none"),a.addClass("d-none"),n.removeClass("d-none"),t.removeClass("d-none")})};$(document).ready(function(){window.crowdSource={};var e=$("#instructionsModal"),t=$("#errorModal"),n=$("#loader"),o=$("#page-content"),u=$("#nav-user"),g=u.find("#nav-username"),m=localStorage.getItem("contributionLanguage");m&&i(m),s().then(function(e){return e.json()}).then(function(e){localStorage.setItem("state_region",e.regionName),localStorage.setItem("country",e.country)}).catch(console.log);try{var h=localStorage.getItem(d),f=JSON.parse(h),p=localStorage.getItem("sentences"),S=JSON.parse(p),x=Number(localStorage.getItem("count"));if(a(),e.on("hidden.bs.modal",function(){o.removeClass("d-none"),r()}),t.on("show.bs.modal",function(){e.modal("hide")}),t.on("hidden.bs.modal",function(){location.href="/#speaker-details"}),!f)return void(location.href="/#speaker-details");u.removeClass("d-none"),$("#nav-login").addClass("d-none"),g.text(f.userName);var T=S&&S.userName===f.userName&&S.language===f.language;T&&0!=S.sentences.length?(crowdSource.sentences=S.sentences,crowdSource.count=x,n.hide(),o.removeClass("d-none"),v()):(localStorage.removeItem(c),localStorage.removeItem(l),fetch("/sentences",{method:"POST",body:JSON.stringify({userName:f.userName,age:f.age,language:f.language,motherTongue:f.motherTongue,gender:f.gender}),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(t){T?(o.removeClass("d-none"),r()):e.modal("show"),crowdSource.sentences=t.data,crowdSource.count=Number(t.count),n.hide(),localStorage.setItem("sentences",JSON.stringify({userName:f.userName,sentences:t.data,language:f.language})),localStorage.setItem("count",t.count),v()}).catch(function(e){console.log(e),t.modal("show")}).then(function(){n.hide()}))}catch(e){console.log(e),t.modal("show")}}),t.exports={getCurrentIndex:g,getSkipCount:m,getValue:u,setCurrentSentenceIndex:h,setTotalSentenceIndex:f}},{"./utils":3}],3:[function(e,t,n){"use strict";var o=e("./constants"),a=o.HOUR_IN_SECONDS,r=o.SIXTY,s=o.ALL_LANGUAGES;var i=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){var e=localStorage.getItem("state_region")||"NOT_PRESENT",t=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==e&&"NOT_PRESENT"!==t&&e.length>0&&t.length>0?new Promise(function(n){n({regionName:e,country:t})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),n="";for(var o in t)if(t[o].startsWith("ip=")){n=t[o].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),n=s.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===n.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(e/a),o=e%a,s=Math.floor(o/r),i=Math.round(o%r);return t?{hours:n,minutes:s,seconds:i}:{hours:n,minutes:s}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o="";return e>0&&(o+="".concat(e," hrs ")),t>0&&(o+="".concat(t," min ")),0===e&&0===t&&n>0&&(o+="".concat(n," sec ")),o.substr(0,o.length-1)},getLocaleString:function(){i("/get-locale-strings").then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:i,showElement:function(e){e.removeClass("d-none")},hideElement:function(e){e.addClass("d-none")}}},{"./constants":1}]},{},[2]);
