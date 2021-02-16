!function t(e,n,o){function i(r,s){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=n[r]={exports:{}};e[r][0].call(c.exports,function(t){var n=e[r][1][t];return i(n||t)},c,c.exports,t,e,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t,e,n){"use strict";var o,i,a=t("./validator-instructions").showInstructions,r=t("./visualizer"),s=t("./utils"),l=s.setPageContentHeight,c=s.toggleFooterPosition,u=s.logout,d=new r,f=function(){$("#validator-page-content").addClass("d-none"),c(),a()},v=function(){var t=document.getElementById("nav-username").innerText;localStorage.setItem("currentUser",JSON.stringify(t));var e=localStorage.getItem("validatorDetails");if(!e)return localStorage.setItem("validatorDetails",JSON.stringify([t])),void f();var n=JSON.parse(e);n.includes(t)||(n.push(t),localStorage.setItem("validatorDetails",JSON.stringify(n)),f())},m=window.AudioContext||window.webkitAudioContext;function g(){var t=document.getElementById("myCanvas"),e=document.querySelector("audio");o=o||new m,i=i||o.createMediaElementSource(e);var n=o.createAnalyser();i.connect(n),n.connect(o.destination),d.visualize(t,n)}var h=function(){var t=document.getElementById("my-audio"),e=$("#play"),n=$("#pause"),o=$("#replay"),i=$("#audioplayer-text");function a(t){t.children().removeAttr("opacity"),t.removeAttr("disabled")}function r(){var t=$("#like_button"),e=$("#dislike_button"),n=$("#skip_button");a(t),a(e),a(n)}t.addEventListener("ended",function(){r(),n.addClass("d-none"),o.removeClass("d-none"),i.text("Replay")}),e.on("click",function(){$("#default_line").addClass("d-none"),t.load(),e.addClass("d-none"),n.removeClass("d-none"),i.text("Pause"),t.play(),g()}),n.on("click",function(){n.addClass("d-none"),o.removeClass("d-none"),i.text("Replay"),r(),t.pause()}),o.on("click",function(){t.load(),o.addClass("d-none"),n.removeClass("d-none"),i.text("Pause"),t.play(),g()})},y=["लटक कर पैरों को मुक्त करने की एक नई कसरत बालकों के हाथ लग गई","जल्द ही पोलैंड में कोर्चार्क के रेडियो प्रोग्राम बहुत","उसने कहा क्योंकि उसमें दिल नहीं होगा जो सारे शरीर में खून भेजता"],p=0,C=0,b=function(t,e,n){t.addClass("animated ".concat(e)),t.on("animationend",function(){t.removeClass("animated ".concat(e)),t.off("animationend"),"function"==typeof n&&n()})};function w(t){var e=$("#sentenceLabel");e[0].innerText=y[t],b(e,"lightSpeedIn")}function x(){p<y.length-1&&(p++,B(),w(p))}var k=function(t,e){var n=t.children().children();n[0].setAttribute("fill",e[0]),n[1].setAttribute("fill",e[1]),n[2].setAttribute("fill",e[2])},F=function(){C++,document.getElementById("rect_".concat(C)).setAttribute("fill","#007BFF")};function S(t){t.children().attr("opacity","50%"),t.attr("disabled","disabled")}function B(){var t=$("#dislike_button"),e=$("#like_button"),n=$("#skip_button"),o=$("#audioplayer-text");k(t,["white","#007BFF","#343A40"]),k(e,["white","#007BFF","#343A40"]),n.removeAttr("style"),o.text("Play"),S(e),S(t),S(n),$("#replay").addClass("d-none"),$("#play").removeClass("d-none"),$("#default_line").removeClass("d-none")}function I(){$("#instructions-link").on("click",function(){f()}),$("#validator-instructions-modal").on("hidden.bs.modal",function(){$("#validator-page-content").removeClass("d-none"),c()});var t=$("#like_button"),e=$("#dislike_button"),n=$("#skip_button");t.hover(function(){k(t,["#bfddf5","#007BFF","#007BFF"])},function(){k(t,["white","#007BFF","#343A40"])}),e.hover(function(){k(e,["#bfddf5","#007BFF","#007BFF"])},function(){k(e,["white","#007BFF","#343A40"])}),e.mousedown(function(){k(e,["#007BFF","white","white"])}),t.mousedown(function(){k(t,["#007BFF","white","white"])}),e.on("click",function(){F(),x()}),t.on("click",function(){F(),x()}),n.on("click",function(){F(),x()}),n.hover(function(){n.css("border-color","#bfddf5")},function(){n.removeAttr("style")}),n.mousedown(function(){n.css("background-color","#bfddf5")})}$(document).ready(function(){c(),l();var t=document.getElementById("myCanvas");d.drawCanvasLine(t),B(),I(),v(),h(),w(p)}),$("#logout-1").on("click",u),e.exports={decideToShowPopUp:v,setSentenceLabel:w,setAudioPlayer:h,addListeners:I}},{"./utils":2,"./validator-instructions":3,"./visualizer":4}],2:[function(t,e,n){"use strict";e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),n=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},logout:function(){$("#nav-login").removeClass("d-none"),$("#nav-user").addClass("d-none"),document.getElementById("nav-username").innerText=void 0;var t=localStorage.getItem("currentUser"),e=JSON.parse(t);localStorage.removeItem("currentUser");var n=localStorage.getItem("validatorDetails"),o=JSON.parse(n),i=o.findIndex(function(t){return t===e}),a=o.slice(0,i).concat(o.slice(i+1,o.length));localStorage.setItem("validatorDetails",JSON.stringify(a)),document.getElementById("logout-2").click()}}},{}],3:[function(t,e,n){"use strict";e.exports={showInstructions:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:$("#validator-instructions-modal")).modal("show")}}},{}],4:[function(t,e,n){"use strict";function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,i;return e=t,(n=[{key:"setCanvasCtx",value:function(t){var e=t.getContext("2d"),n=t.width,o=t.height;return e.fillStyle="rgb(255, 255, 255, 0.8)",e.fillRect(0,0,n,o),e.lineWidth=2,e.strokeStyle="rgb(0,123,255)",{canvasCtx:e,canvasWidth:n,canvasHeight:o}}},{key:"visualize",value:function(t,e){var n=e.frequencyBinCount,o=new Uint8Array(n),i=this.setCanvasCtx;!function a(){requestAnimationFrame(a),e.getByteTimeDomainData(o);var r=i(t),s=r.canvasCtx,l=r.canvasWidth,c=r.canvasHeight;s.beginPath();for(var u=1*l/n,d=0,f=0;f<n;f++){var v=o[f]/128*c/2;0===f?s.moveTo(d,v):s.lineTo(d,v),d+=u}var m=c/2;s.lineTo(l,m),s.stroke()}()}},{key:"drawCanvasLine",value:function(t){var e=this.setCanvasCtx(t),n=e.canvasCtx,o=e.canvasWidth,i=e.canvasHeight/2;n.moveTo(0,i),n.lineTo(o,i),n.stroke()}}])&&o(e.prototype,n),i&&o(e,i),t}();e.exports=i},{}]},{},[1]);