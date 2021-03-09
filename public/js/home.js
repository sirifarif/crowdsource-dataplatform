!function e(t,a,r){function o(s,i){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!i&&l)return l(s,!0);if(n)return n(s,!0);throw new Error("Cannot find module '"+s+"'")}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){var a=t[s][1][e];return o(a||e)},d,d.exports,e,t,a,r)}return a[s].exports}for(var n="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,a){"use strict";var r=e("./home-page-charts"),o=r.generateIndiaMap,n=r.getStatistics,s=r.showByHoursChart,i=r.showBySpeakersChart,l=e("./utils").toggleFooterPosition,d=e("./speakerDetails"),c=d.validateUserName,u=d.testUserName,m=d.setSpeakerDetails,h=d.resetSpeakerDetails,g=d.setUserNameTooltip,v=d.setStartRecordBtnToolTipContent,p="aggregateDataCountByLanguage",f=[{value:"Assamese",id:"as",text:"অসমীয়া"},{value:"Bengali",id:"bn",text:"বাংলা"},{value:"English",id:"en",text:"English"},{value:"Gujarati",id:"gu",text:"ગુજરાતી"},{value:"Hindi",id:"hi",text:"हिन्दी"},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ"},{value:"Malayalam",id:"ml",text:"മലയാളം"},{value:"Marathi",id:"mr",text:"मराठी"},{value:"Odia",id:"or",text:"ଘୃଣା"},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ"},{value:"Tamil",id:"ta",text:"தமிழ்"},{value:"Telugu",id:"te",text:"తెలుగు"}],_=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};function b(e){var t=$("#say-loader"),a=$("#listen-loader");t.removeClass("d-none"),a.removeClass("d-none");var r=$("#say-p-3"),o=$("#listen-p-3"),n=localStorage.getItem(p),s=JSON.parse(n);if(console.log(s,"aggregateDetails"),s){var i=s&&s.find(function(t){return t.language===e});if(i){var l=i.total_contributions,d=i.total_validations;l&&r.text("".concat(l," hrs recorded in ").concat(e)),d&&o.text("".concat(d," hrs validated in ").concat(e))}else r.text("0 hr recorded in ".concat(e)),o.text("0 hr validated in ".concat(e));t.addClass("d-none"),a.addClass("d-none")}else _("/aggregate-data-count?byLanguage=true").then(function(n){localStorage.setItem(p,JSON.stringify(n.data));var s=n.data.find(function(t){return t.language===e});if(s){var i=s.total_contributions,l=s.total_validations;i&&r.text("".concat(i," hrs recorded in ").concat(e)),l&&o.text("".concat(l," hrs validated in ").concat(e))}else r.text("0 hr recorded in ".concat(e)),o.text("0 hr validated in ".concat(e));t.addClass("d-none"),a.addClass("d-none")}).catch(function(e){console.log(e)})}var k=function(e,t,a){var r=0,o=a.children();return o.each(function(a,o){o.getAttribute(e)===t&&(r=a)}),o[r]},C=function(e,t,a){var r=a.children(),o=-1;r.each(function(e,a){a.getAttribute("value")===t&&(o=e)}),a.find(".active").removeClass("active");var n=document.getElementById("6th_option"),s=f.find(function(e){return e.value===t});n.innerText=s.text,o<0?(n.classList.remove("d-none"),n.classList.add("active"),n.setAttribute("value",t)):(r[o].classList.add("active"),n.classList.remove("active"),n.classList.add("d-none"))},y=function(){var e=localStorage.getItem("contributionLanguage"),t=$("#say-listen-language"),a=$("#language-nav-bar");if(console.log("contribution lang: ",e),!e){var r=document.getElementById("home-page").getAttribute("default-lang"),o=k("id",r,t),n=o.getAttribute("value");return localStorage.setItem("contributionLanguage",n),b(n),void C(0,n,a)}k("value",e,t);b(e),C(0,e,a)};$(document).ready(function(){localStorage.removeItem("topLanguagesByHours"),localStorage.removeItem("topLanguagesBySpeakers"),localStorage.removeItem("aggregatedDataByState"),localStorage.removeItem(p);var e=$("#proceed-box"),t=e.parent(),a=document.querySelectorAll('input[name = "gender"]'),r=document.getElementById("age"),d=document.getElementById("mother-tongue"),f=$("#username"),_=f.next(),k=$("#tnc"),I="Odia";k.prop("checked",!1),l(),t.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto"}),function(){var e=$("#language-nav-bar"),t=$("#nav-bar-loader");[{value:"Hindi",id:"hi",text:"हिन्दी"},{value:"Marathi",id:"mr",text:"मराठी"},{value:"Bengali",id:"bn",text:"বাংলা"},{value:"Tamil",id:"ta",text:"தமிழ்"},{value:"Telugu",id:"te",text:"తెలుగు"}].forEach(function(t,a){e.append('<li class="nav-item px-lg-4 px-md-4 px-2 options" value='.concat(t.value,">").concat(t.text,"</li>"))}),t.addClass("d-none"),e.removeClass("d-none"),y()}();var x=localStorage.getItem("contributionLanguage"),N=$("#language-nav-bar");$("#say-listen-language").on("click",function(e){var t=e.target,a=t.getAttribute("value");x=a,localStorage.setItem("contributionLanguage",a),C(0,a,N),b(a)}),N.on("click",function(e){var t=e.target,a=t.getAttribute("value");x=a,localStorage.setItem("contributionLanguage",a);var r=$("#6th_option");(N.find(".active")||r).removeClass("active"),r.addClass("d-none"),t.classList.add("active"),b(a)}),$("#start_recording").on("click",function(){I=x}),$('[name="topLanguageChart"]').on("change",function(e){"hours"===e.target.value?s():i()}),m("speakerDetails",r,d,f),a.forEach(function(e){e.addEventListener("click",function(e){e.target.previous&&(e.target.checked=!1),e.target.previous=e.target.checked})}),v(f.val().trim(),t),k.change(function(){var a=f.val().trim();this.checked&&!u(a)?(e.removeAttr("disabled").removeClass("point-none"),t.tooltip("disable")):(v(a,t),e.prop("disabled","true").addClass("point-none"),t.tooltip("enable"))}),f.on("input focus",function(){c(f,_,k),g(f)}),e.on("click",function(){if(k.prop("checked")){var e=Array.from(a).filter(function(e){return e.checked}),t=e.length?e[0].value:"",o=f.val().trim().substring(0,12);if("English"===I&&(I="Odia"),u(o))return;var n={gender:t,age:r.value,motherTongue:d.value,userName:o,language:I};localStorage.setItem("speakerDetails",JSON.stringify(n)),location.href="/record"}}),$("#userModal").on("shown.bs.modal",function(){$("#resetBtn").on("click",h),f.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto",trigger:"focus"}),g(f)});var S=$("#say"),L=$("#listen"),A=$("#listen-p-2"),T=$("#say-p-2"),w=$("#say_container"),B=$("#listen_container");S.hover(function(){S.removeClass("col-lg-5"),L.removeClass("col-lg-5"),S.addClass("col-lg-6"),L.addClass("col-lg-4"),S.removeClass("col-md-5"),L.removeClass("col-md-5"),S.addClass("col-md-6"),L.addClass("col-md-4"),T.removeClass("d-none"),w.addClass("say-active")},function(){S.removeClass("col-lg-6"),L.removeClass("col-lg-4"),S.addClass("col-lg-5"),L.addClass("col-lg-5"),S.removeClass("col-md-6"),L.removeClass("col-md-4"),S.addClass("col-md-5"),L.addClass("col-md-5"),T.addClass("d-none"),w.removeClass("say-active")}),L.hover(function(){S.removeClass("col-lg-5"),L.removeClass("col-lg-5"),L.addClass("col-lg-6"),S.addClass("col-lg-4"),A.removeClass("d-none"),B.addClass("listen-active")},function(){S.removeClass("col-lg-4"),L.removeClass("col-lg-6"),S.addClass("col-lg-5"),L.addClass("col-lg-5"),A.addClass("d-none"),B.removeClass("listen-active")}),n(),o(),s()}),t.exports={performAPIRequest:_,updateHrsForSayAndListen:b,getDefaultTargettedDiv:k}},{"./home-page-charts":2,"./speakerDetails":3,"./utils":4}],2:[function(e,t,a){"use strict";function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var n="topLanguagesByHours",s="topLanguagesBySpeakers",i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return e>0&&(r+="".concat(e," hrs ")),t>0&&(r+="".concat(t," min ")),0===e&&0===t&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)},l=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(e/3600),r=e%3600,o=Math.floor(r/60),n=Math.round(r%60);return t?{hours:a,minutes:o,seconds:n}:{hours:a,minutes:o}},d=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})},c=[{id:"IN-TG",state:"Telangana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AN",state:"Andaman and Nicobar Islands",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AP",state:"Andhra Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AR",state:"Arunanchal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AS",state:"Assam",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-BR",state:"Bihar",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CT",state:"Chhattisgarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GA",state:"Goa",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GJ",state:"Gujarat",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HR",state:"Haryana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HP",state:"Himachal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JK",state:"Jammu & Kashmir",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JH",state:"Jharkhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KA",state:"Karnataka",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KL",state:"Kerala",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LD",state:"Lakshadweep",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MP",state:"Madhya Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MH",state:"Maharashtra",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MN",state:"Manipur",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CH",state:"Chandigarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PY",state:"Puducherry",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PB",state:"Punjab",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-RJ",state:"Rajasthan",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-SK",state:"Sikkim",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TN",state:"Tamil Nadu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TR",state:"Tripura",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UP",state:"Uttar Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UT",state:"Uttarakhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-WB",state:"West Bengal",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-OR",state:"Odisha",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DNDD",state:"Dadra and Nagar Haveli and Daman and Diu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-ML",state:"Meghalaya",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MZ",state:"Mizoram",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-NL",state:"Nagaland",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DL",state:"National Capital Territory of Delhi",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LK",state:"Ladakh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0}],u=void 0;function m(e,t,a){var o=am4core.create("speakers_hours_chart",am4charts.XYChart);h.chart=o;var n=r(e);n="total_speakers"===t?n.sort(function(e,t){return Number(e.total_speakers)<Number(t.total_speakers)?-1:1}):n.sort(function(e,t){return Number(e.total_contributions)<Number(t.total_contributions)?-1:1}),"total_speakers"!==t&&n.forEach(function(e){var t=l(60*Number(e.total_contributions)*60,!0),a=t.hours,r=t.minutes,o=t.seconds;e.total_contributions_text=i(a,r,o)}),o.data=n;var s=o.yAxes.push(new am4charts.CategoryAxis);s.dataFields.category=a,s.renderer.grid.template.location=0,s.renderer.cellStartLocation=.2,s.renderer.cellEndLocation=.8,s.renderer.grid.template.strokeWidth=0;var d=o.xAxes.push(new am4charts.ValueAxis);d.renderer.grid.template.strokeWidth=0,d.renderer.labels.template.disabled=!0,s.renderer.minGridDistance=25;var c=o.series.push(new am4charts.ColumnSeries);c.dataFields.valueX=t,c.dataFields.categoryY=a;var u=c.bullets.push(new am4charts.LabelBullet);u.label.text="total_speakers"===t?"{total_speakers}":"{total_contributions_text}",u.label.fontSize=14,u.label.horizontalCenter="left",u.label.dx=10,u.label.truncate=!1,u.label.hideOversized=!1;o.events.on("datavalidated",function(e){var t=e.target,a=t.yAxes.getIndex(0),r=35*t.data.length-a.pixelHeight,o=t.pixelHeight+r;t.svgContainer.htmlElement.style.height=o+"px"})}var h={};t.exports={generateIndiaMap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";d(""!==e?"/aggregate-data-count?byState=true&byLanguage=true":"/aggregate-data-count?byState=true").then(function(t){!function(e){var t,a=[].concat(c),r=$("#legendDiv"),o=Math.max.apply(Math,e.data.map(function(e){return Number(e.total_contributions)}));t=o>1?o/4:.25,a.forEach(function(t){var a=e.data.find(function(e){return t.state===e.state});if(a){var r=l(60*Number(a.total_contributions)*60,!0),o=r.hours,n=r.minutes,s=r.seconds,i=l(60*Number(a.total_validations)*60,!0),d=i.hours,c=i.minutes,u=i.seconds;t.contributed_time="".concat(o,"hrs ").concat(n,"mins ").concat(s,"sec"),t.validated_time="".concat(d,"hrs ").concat(c,"mins ").concat(u,"sec"),t.value=Number(a.total_contributions),t.total_speakers=a.total_speakers,t.id=t.id}else t.id=t.id,t.contributed_time="0 hrs",t.validated_time="0 hrs",t.value=0,t.total_speakers=0});var n=am4core.create("indiaMapChart",am4maps.MapChart),s=n.series.indexOf(u);s>-1&&n.series.removeIndex(s),n.geodataSource.url="https://cdn.amcharts.com/lib/4/geodata/json/india2020Low.json",n.projection=new am4maps.projections.Miller,u=new am4maps.MapPolygonSeries,n.seriesContainer.draggable=!1,n.seriesContainer.resizable=!1,n.chartContainer.wheelable=!1,n.maxZoomLevel=1,u.useGeodata=!0,u.data=a;var d=u.mapPolygons.template;d.tooltipHTML='<div><h6>{state}</h6> <div>{total_speakers} Speakers  <label style="margin-left: 32px">Contributed: <label style="margin-left: 8px">{contributed_time}</label></label></div> <div>Validated:  <label style="margin-left: 8px">{validated_time}</label></div></div>',d.nonScalingStroke=!0,d.strokeWidth=.5,d.fill=am4core.color("#fff"),d.states.create("hover").properties.fill=n.colors.getIndex(1).brighten(-.5),u.mapPolygons.template.adapter.add("fill",function(e,a){return a.dataItem?a.dataItem.value>=3*t?am4core.color("#4061BF"):a.dataItem.value>=2*t?am4core.color("#6B85CE"):a.dataItem.value>=t?am4core.color("#92A8E8"):a.dataItem.value>0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):e}),n.series.push(u);var m=$("#quarter .legend-val"),h=$("#half .legend-val"),g=$("#threeQuarter .legend-val"),v=$("#full .legend-val"),p=l(60*t*60,!1),f=p.hours,_=p.minutes,b=l(2*t*60*60,!1),k=b.hours,C=b.minutes,y=l(3*t*60*60,!1),I=y.hours,x=y.minutes;m.text("0 - ".concat(i(f,_))),h.text("".concat(i(f,_)," - ").concat(i(k,C))),g.text("".concat(i(k,C)," - ").concat(i(I,x))),v.text("> ".concat(i(I,x))),r.removeClass("d-none").addClass("d-flex")}(""!==e?function(e,t){var a={data:[]};return e.data.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&""!==e.state&&"anonymous"!==e.state.toLowerCase()&&a.data.push(e)}),a}(t,e):t)}).catch(function(e){console.log(e)})},showByHoursChart:function(){h.chart&&h.chart.dispose();var e=localStorage.getItem(n);e?m(JSON.parse(e).data,"total_contributions","language"):d("/top-languages-by-hours").then(function(e){localStorage.setItem(n,JSON.stringify(e)),m(e.data,"total_contributions","language")})},showBySpeakersChart:function(){h.chart&&h.chart.dispose();var e=localStorage.getItem(s);e?m(JSON.parse(e).data,"total_speakers","language"):d("/top-languages-by-speakers").then(function(e){localStorage.setItem(s,JSON.stringify(e)),m(e.data,"total_speakers","language")})},getStatistics:function(){var e=$("#speaker-data").find("#loader1, #loader2, #loader3"),t=$("#speakers-wrapper"),a=$("#speaker-value"),r=$("#hours-wrapper"),o=$("#hour-value"),n=$("#languages-wrapper"),s=$("#languages-value");e.removeClass("d-none"),r.addClass("d-none"),t.addClass("d-none"),n.addClass("d-none"),d("/aggregate-data-count").then(function(i){try{var d=l(60*Number(i.data[0].total_contributions)*60),c=d.hours,u=d.minutes,m=d.seconds;o.text("".concat(c,"h ").concat(u,"m ").concat(m,"s")),a.text(i.data[0].total_speakers),s.text(i.data[0].total_languages),e.addClass("d-none"),r.removeClass("d-none"),t.removeClass("d-none"),n.removeClass("d-none")}catch(e){console.log(e)}}).catch(function(e){console.log(e)})},calculateTime:l,formatTime:i}},{}],3:[function(e,t,a){"use strict";function r(e,t,a){var r=e.val().trim();o(r)?(e.addClass("is-invalid"),t.removeClass("d-none")):(e.removeClass("is-invalid"),t.addClass("d-none")),a.trigger("change")}var o=function(e){return/^[6-9]\d{9}$/.test(e)||/^\S+@\S+[\.][0-9a-z]+$/.test(e)};t.exports={testUserName:o,validateUserName:r,setSpeakerDetails:function(e,t,a,o){var n=localStorage.getItem(e);if(n){var s=JSON.parse(n),i=document.querySelector('input[name = "gender"][value="'+s.gender+'"]');i&&(i.checked=!0,i.previous=!0),t.value=s.age,a.value=s.motherTongue,o.val(s.userName?s.userName.trim().substring(0,12):""),r(o,o.next(),$("#tnc"))}},resetSpeakerDetails:function(){var e=document.getElementById("age"),t=document.getElementById("mother-tongue"),a=document.getElementById("username"),r=document.querySelector('input[name = "gender"]:checked');r&&(r.checked=!1),e.selectedIndex=0,t.selectedIndex=0,a.value=""},setUserNameTooltip:function(e){e.val().length>11?(e.tooltip("enable"),e.tooltip("show")):(e.tooltip("disable"),e.tooltip("hide"))},setStartRecordBtnToolTipContent:function(e,t){o(e)?t.attr("data-original-title","Please validate any error message before proceeding"):t.attr("data-original-title","Please agree to the Terms and Conditions before proceeding")}}},{}],4:[function(e,t,a){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var r in t)if(t[r].startsWith("ip=")){a=t[r].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})}}},{}]},{},[1]);