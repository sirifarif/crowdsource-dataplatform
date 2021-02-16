!function e(t,n,o){function i(r,s){if(!n[r]){if(!t[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=n[r]={exports:{}};t[r][0].call(c.exports,function(e){var n=t[r][1][e];return i(n||e)},c,c.exports,e,t,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){"use strict";var o,i,a=e("./validator-instructions").showInstructions,r=e("./visualizer"),s=e("./utils"),l=s.setPageContentHeight,c=s.toggleFooterPosition,u=s.logout,d=new r,f=function(){$("#validator-page-content").addClass("d-none"),c(),a()},v=function(){var e=document.getElementById("nav-username").innerText;localStorage.setItem("currentUser",JSON.stringify(e));var t=localStorage.getItem("validatorDetails");if(!t)return localStorage.setItem("validatorDetails",JSON.stringify([e])),void f();var n=JSON.parse(t);n.includes(e)||(n.push(e),localStorage.setItem("validatorDetails",JSON.stringify(n)),f())},m=window.AudioContext||window.webkitAudioContext;function g(){var e=document.getElementById("myCanvas"),t=document.querySelector("audio");o=o||new m,i=i||o.createMediaElementSource(t);var n=o.createAnalyser();i.connect(n),n.connect(o.destination),d.visualize(e,n)}var h=function(){var e=document.getElementById("my-audio"),t=$("#play"),n=$("#pause"),o=$("#replay"),i=$("#audioplayer-text");function a(e){e.children().removeAttr("opacity"),e.removeAttr("disabled")}function r(){var e=$("#like_button"),t=$("#dislike_button"),n=$("#skip_button");a(e),a(t),a(n)}e.addEventListener("ended",function(){r(),n.addClass("d-none"),o.removeClass("d-none"),i.text("Replay")}),t.on("click",function(){$("#default_line").addClass("d-none"),e.load(),t.addClass("d-none"),n.removeClass("d-none"),i.text("Pause"),e.play(),g()}),n.on("click",function(){n.addClass("d-none"),o.removeClass("d-none"),i.text("Replay"),r(),e.pause()}),o.on("click",function(){e.load(),o.addClass("d-none"),n.removeClass("d-none"),i.text("Pause"),e.play(),g()})},y=["लटक कर पैरों को मुक्त करने की एक नई कसरत बालकों के हाथ लग गई","जल्द ही पोलैंड में कोर्चार्क के रेडियो प्रोग्राम बहुत","उसने कहा क्योंकि उसमें दिल नहीं होगा जो सारे शरीर में खून भेजता"],p=0,C=0,b=function(e,t,n){e.addClass("animated ".concat(t)),e.on("animationend",function(){e.removeClass("animated ".concat(t)),e.off("animationend"),"function"==typeof n&&n()})};function w(e){var t=$("#sentenceLabel");t[0].innerText=y[e],b(t,"lightSpeedIn")}function k(){p<y.length-1&&(p++,S(),w(p))}var x=function(e,t){var n=e.children().children();n[0].setAttribute("fill",t[0]),n[1].setAttribute("fill",t[1]),n[2].setAttribute("fill",t[2])},F=function(){C++,document.getElementById("rect_".concat(C)).setAttribute("fill","#007BFF")};function B(e){e.children().attr("opacity","50%"),e.attr("disabled","disabled")}function S(){var e=$("#dislike_button"),t=$("#like_button"),n=$("#skip_button"),o=$("#audioplayer-text");x(e,["white","#007BFF","#343A40"]),x(t,["white","#007BFF","#343A40"]),n.removeAttr("style"),o.text("Play"),B(t),B(e),B(n),$("#replay").addClass("d-none"),$("#play").removeClass("d-none"),$("#default_line").removeClass("d-none")}function A(){$("#instructions-link").on("click",function(){f()}),$("#validator-instructions-modal").on("hidden.bs.modal",function(){$("#validator-page-content").removeClass("d-none"),c()});var e=$("#like_button"),t=$("#dislike_button"),n=$("#skip_button");e.hover(function(){x(e,["#bfddf5","#007BFF","#007BFF"])},function(){x(e,["white","#007BFF","#343A40"])}),t.hover(function(){x(t,["#bfddf5","#007BFF","#007BFF"])},function(){x(t,["white","#007BFF","#343A40"])}),t.mousedown(function(){x(t,["#007BFF","white","white"])}),e.mousedown(function(){x(e,["#007BFF","white","white"])}),t.on("click",function(){F(),k()}),e.on("click",function(){F(),k()}),n.on("click",function(){F(),k()}),n.hover(function(){n.css("border-color","#bfddf5")},function(){n.removeAttr("style")}),n.mousedown(function(){n.css("background-color","#bfddf5")})}$(document).ready(function(){c(),l();var e=document.getElementById("myCanvas");d.drawCanvasLine(e),S(),A(),v(),h(),w(p)}),$("#logout-1").on("click",u),t.exports={decideToShowPopUp:v,setSentenceLabel:w,setAudioPlayer:h,addListeners:A}},{"./utils":2,"./validator-instructions":3,"./visualizer":4}],2:[function(e,t,n){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},logout:function(){console.log("here"),$("#nav-login").removeClass("d-none"),$("#nav-user").addClass("d-none"),document.getElementById("nav-username").innerText=void 0;var e=localStorage.getItem("currentUser"),t=JSON.parse(e);localStorage.removeItem("currentUser"),delete localStorage.validatorDetails[t],document.getElementById("logout-2").click()}}},{}],3:[function(e,t,n){"use strict";t.exports={showInstructions:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:$("#validator-instructions-modal")).modal("show")}}},{}],4:[function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,(n=[{key:"setCanvasCtx",value:function(e){var t=e.getContext("2d"),n=e.width,o=e.height;return t.fillStyle="rgb(255, 255, 255, 0.8)",t.fillRect(0,0,n,o),t.lineWidth=2,t.strokeStyle="rgb(0,123,255)",{canvasCtx:t,canvasWidth:n,canvasHeight:o}}},{key:"visualize",value:function(e,t){var n=t.frequencyBinCount,o=new Uint8Array(n),i=this.setCanvasCtx;!function a(){requestAnimationFrame(a),t.getByteTimeDomainData(o);var r=i(e),s=r.canvasCtx,l=r.canvasWidth,c=r.canvasHeight;s.beginPath();for(var u=1*l/n,d=0,f=0;f<n;f++){var v=o[f]/128*c/2;0===f?s.moveTo(d,v):s.lineTo(d,v),d+=u}var m=c/2;s.lineTo(l,m),s.stroke()}()}},{key:"drawCanvasLine",value:function(e){var t=this.setCanvasCtx(e),n=t.canvasCtx,o=t.canvasWidth,i=t.canvasHeight/2;n.moveTo(0,i),n.lineTo(o,i),n.stroke()}}])&&o(t.prototype,n),i&&o(t,i),e}();t.exports=i},{}]},{},[1]);