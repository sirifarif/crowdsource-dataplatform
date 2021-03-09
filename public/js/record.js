!function e(t,n,o){function a(s,d){if(!n[s]){if(!t[s]){var i="function"==typeof require&&require;if(!d&&i)return i(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return a(n||e)},c,c.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)a(o[s]);return a}({1:[function(e,t,n){"use strict";var o=e("./utils"),a=o.setPageContentHeight,r=o.toggleFooterPosition,s=o.fetchLocationInfo,d="speakerDetails",i="currentIndex",c="skipCount";function l(e,t){return e<0?0:e>t?t:e}function u(e){return l(Number(localStorage.getItem(i)),e)}function g(e){return l(Number(localStorage.getItem(c)),e)}var m=function(e){document.getElementById("currentSentenceLbl").innerText=e},f=function(e){document.getElementById("totalSentencesLbl").innerText=e},h=function(){var e=crowdSource.sentences,t=$("#startRecord"),n=$("#startRecordRow"),o=$("#stopRecord"),a=$("#reRecord"),s=$("#visualizer"),l=$("#player"),h=$("#nextBtn"),p=h.parent(),v=$("#get-started"),C=$("#skipBtn"),w=$("#recording-row"),S=$("#recording-sign"),y=$(".progress-bar"),b=$("#page-content"),I=$("#audio-small-error"),x=e.length,N=u(x-1),k=g(x-1),T=$("footer"),D=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Four dead, one more to go!","Yay! Done & Dusted!"];4==e.length?D=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Yay! Done & Dusted!"]:3==e.length?D=["Let’s get started","We know you can do more! ","Just few more steps to go!","Yay! Done & Dusted!"]:2==e.length?D=["Let’s get started","Just few more steps to go!","Yay! Done & Dusted!"]:1==e.length&&(D=["Let’s get started","Yay! Done & Dusted!"]),p.tooltip({container:"body",placement:screen.availWidth>900?"right":"bottom"});var L,O,J,B,R,A=function(e,t,n){e.addClass("animated ".concat(t)),e.on("animationend",function(){e.removeClass("animated ".concat(t)),e.off("animationend"),"function"==typeof n&&n()})},P=function(e){y.width(20*e+"%"),y.prop("aria-valuenow",e)},W=function(t){var n=$("#sentenceLbl");n[0].innerText=e[t].sentence,A(n,"lightSpeedIn"),N&&P(N)},Y=function(e){var t=$("#graphbar"),n=$("#time-value"),o=6*(crowdSource.count+e-k),a=o>=1800,r=a?o:1800-o,s=Math.floor(r/60),d=r%60;n.text("".concat(s,"m ").concat(d,"s")),a&&n.siblings("p").text("We are loving it!");var i=42/1800*o;t.height(i+"em")},H=new Notyf({position:{x:"center",y:"top"},types:[{type:"success",className:"fnt-1-5"},{type:"error",duration:3500,className:"fnt-1-5"}]});!function(e){var t=$("#time-progress"),n=e.outerHeight(),o=t.css("bottom");Number(o.substring(0,o.length-2))&&t.css("bottom",n+"px")}(T),W(N),m(N+1),f(x),Y(N),t.add(a).on("click",function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){v.hide(),n.addClass("d-none"),o.removeClass("d-none"),w.removeClass("d-none"),S.removeClass("d-none"),a.addClass("d-none"),h.addClass("d-none"),l.addClass("d-none"),l.trigger("pause"),s.removeClass("d-none"),p.tooltip("disable"),I.addClass("d-none"),L=e;var t=window.AudioContext||window.webkitAudioContext;R&&R.close();var r=(R=new t).createAnalyser();(J=R.createMediaStreamSource(e)).connect(r),function(e,t){var n=e.getContext("2d"),o=t.frequencyBinCount,a=new Uint8Array(o),r=e.width,s=e.height;!function d(){requestAnimationFrame(d);t.getByteTimeDomainData(a);n.fillStyle="rgb(255, 255, 255, 0.8)";n.fillRect(0,0,r,s);n.lineWidth=2;n.strokeStyle="rgb(0,123,255)";n.beginPath();var i=1*r/o;var c=0;for(var l=0;l<o;l++){var u=a[l]/128,g=u*s/2;0===l?n.moveTo(c,g):n.lineTo(c,g),c+=i}n.lineTo(e.width,e.height/2);n.stroke()}()}(visualizer,r),(O=new Recorder(J,{numChannels:2})).record(),B=setTimeout(function(){o.click()},21e3)}).catch(function(e){console.log(e),H.error("Sorry !!! We could not get access to your audio input device. Make sure you have given microphone access permission"),n.removeClass("d-none"),o.addClass("d-none"),h.addClass("d-none"),a.addClass("d-none"),S.addClass("d-none"),w.addClass("d-none"),l.addClass("d-none"),l.trigger("pause"),s.addClass("d-none"),I.addClass("d-none")})}),o.on("click",function(){clearTimeout(B),n.addClass("d-none"),o.addClass("d-none"),h.removeClass("d-none"),a.removeClass("d-none"),S.addClass("d-none"),w.addClass("d-none"),n.addClass("d-none"),l.removeClass("d-none"),s.addClass("d-none"),O.stop(),L.getAudioTracks()[0].stop(),O.exportWAV(function(e){var t=(window.URL||window.webkitURL).createObjectURL(e);crowdSource.audioBlob=e,l.prop("src",t),l.on("loadedmetadata",function(){var e=l[0].duration;e<2?(p.tooltip("enable"),h.prop("disabled",!0).addClass("point-none"),I.removeClass("d-none")):(p.tooltip("disable"),h.removeAttr("disabled").removeClass("point-none"),I.addClass("d-none"))})}),N===x-1&&v.text(D[x]).show()});var j=function(){location.href="/thank-you"};function q(e){var t=new FormData,n=JSON.parse(localStorage.getItem(d)),o=JSON.stringify({userName:n.userName,language:n.language});t.append("audio_data",crowdSource.audioBlob),t.append("speakerDetails",o),t.append("sentenceId",crowdSource.sentences[N].sentenceId),t.append("state",localStorage.getItem("state_region")||""),t.append("country",localStorage.getItem("country")||""),fetch("/upload",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){}).catch(function(e){console.log(e)}).then(function(t){e&&"function"==typeof e&&e()})}h.add(C).on("click",function(e){if("nextBtn"===e.target.id&&N<x-1?(q(),Y(N+1)):"skipBtn"===e.target.id&&(k++,localStorage.setItem(c,k),C.addClass("d-none")),N===x-1){"nextBtn"===e.target.id?q(j):setTimeout(j,2500),C.addClass("d-none"),r(),N++,A(b,"zoomOut",function(){return b.addClass("d-none")}),P(N);var t=JSON.parse(localStorage.getItem("sentences"));Object.assign(t,{sentences:[]}),localStorage.setItem("sentences",JSON.stringify(t)),localStorage.setItem(i,N),H.success("Congratulations!!! You have completed this batch of sentences"),$("#loader").show()}else N<x-1&&(W(++N),m(N+1),v.text(D[N]),localStorage.setItem(i,N),C.removeClass("d-none"));l.addClass("d-none"),l.trigger("pause"),h.addClass("d-none"),a.addClass("d-none"),n.removeClass("d-none")})};$(document).ready(function(){window.crowdSource={};var e=$("#instructionsModal"),t=$("#errorModal"),n=$("#loader"),o=$("#page-content"),l=$("#nav-user"),u=l.find("#nav-username");s().then(function(e){return e.json()}).then(function(e){localStorage.setItem("state_region",e.regionName),localStorage.setItem("country",e.country)}).catch(console.log);try{var g=localStorage.getItem(d),m=JSON.parse(g),f=localStorage.getItem("sentences"),p=JSON.parse(f),v=Number(localStorage.getItem("count"));if(a(),e.on("hidden.bs.modal",function(){o.removeClass("d-none"),r()}),t.on("show.bs.modal",function(){e.modal("hide")}),t.on("hidden.bs.modal",function(){location.href="/#speaker-details"}),!m)return void(location.href="/#speaker-details");l.removeClass("d-none"),$("#nav-login").addClass("d-none"),u.text(m.userName);var C=p&&p.userName===m.userName&&p.language===m.language;C&&0!=p.sentences.length?(crowdSource.sentences=p.sentences,crowdSource.count=v,n.hide(),o.removeClass("d-none"),h()):(localStorage.removeItem(i),localStorage.removeItem(c),fetch("/sentences",{method:"POST",body:JSON.stringify({userName:m.userName,age:m.age,language:m.language,motherTongue:m.motherTongue,gender:m.gender}),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(t){C?(o.removeClass("d-none"),r()):e.modal("show"),crowdSource.sentences=t.data,crowdSource.count=Number(t.count),n.hide(),localStorage.setItem("sentences",JSON.stringify({userName:m.userName,sentences:t.data,language:m.language})),localStorage.setItem("count",t.count),h()}).catch(function(e){console.log(e),t.modal("show")}).then(function(){n.hide()}))}catch(e){console.log(e),t.modal("show")}}),t.exports={getCurrentIndex:u,getSkipCount:g,getValue:l,setCurrentSentenceIndex:m,setTotalSentenceIndex:f}},{"./utils":2}],2:[function(e,t,n){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),n="";for(var o in t)if(t[o].startsWith("ip=")){n=t[o].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(e,t){t("Ip Address not available")})})}}},{}]},{},[1]);