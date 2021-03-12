!function e(t,a,r){function n(i,s){if(!a[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(o)return o(i,!0);throw new Error("Cannot find module '"+i+"'")}var d=a[i]={exports:{}};t[i][0].call(d.exports,function(e){var a=t[i][1][e];return n(a||e)},d,d.exports,e,t,a,r)}return a[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)n(r[i]);return n}({1:[function(e,t,a){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600}},{}],2:[function(e,t,a){"use strict";function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach(function(t){o(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i=e("./home-page-charts").generateIndiaMap,s=e("./utils"),l=s.calculateTime,d=s.formatTime,c=$(".chart-row"),u=c.find(".loader"),h=c.find(".chart"),m=$("#timeline-loader"),p=$("#timeline-chart"),f={};function g(e,t){var a=[];return e.forEach(function(e){var r=e[t]?e:n(n({},e),{},o({},t,"Anonymous")),i=a.findIndex(function(e){return r[t].toLowerCase()===e[t].toLowerCase()});i>=0?(a[i].contributions+=r.contributions,a[i].speakers+=r.speakers):a.push(r)}),a}var v=function(e){var t=[];return["male","female","anonymous","others"].forEach(function(a){e.data.forEach(function(e){e.gender||(e.gender="anonymous"),a===e.gender&&t.push(n(n({},e),{},{gender:e.gender.charAt(0).toUpperCase()+e.gender.slice(1)}))})}),t};var b=function(e){f[e]&&(f[e].dispose(),delete f[e])},_=function(e,t){fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(e){m.hide().removeClass("d-flex"),p.removeClass("d-none"),N(e)}).catch(function(e){console.log(e)})};function x(e,t){Promise.all([fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)),fetch("/contributions/gender?language=".concat(e)),fetch("/contributions/age?language=".concat(e))]).then(function(e){return Promise.all(e.map(function(e){return e.json()}))}).then(function(t){try{u.hide().removeClass("d-flex"),h.removeClass("d-none");var a=v(t[1]),r=g(t[2].data,"age_group").sort(function(e,t){return Number(e.speakers)-Number(t.speakers)});N(t[0]),C(a),i(e),y(r),setTimeout(function(){fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"),fetch("https://fonts.googleapis.com/icon?family=Material+Icons"),fetch("css/notyf.min.css"),fetch("css/record.css")},2e3)}catch(e){console.log(e),u.show().addClass("d-flex"),h.addClass("d-none")}}).catch(function(e){console.log(e)})}var k=["#85A8F9","#B7D0FE","#316AFF","#294691"],y=function(e){var t=am4core.create("age-group-chart",am4charts.PieChart3D);t.data=e.slice(0,3).concat({age_group:"Others",speakers:e.slice(3).reduce(function(e,t){return e+Number(t.speakers)},0)}),t.paddingBottom=50,t.innerRadius=am4core.percent(40),t.depth=50,t.legend=new am4charts.Legend,t.legend.labels.template.fill=am4core.color("#000"),t.legend.valueLabels.template.fill=am4core.color("#000"),t.legend.labels.template.textDecoration="none",t.legend.valueLabels.template.textDecoration="none",t.legend.itemContainers.template.paddingTop=5,t.legend.itemContainers.template.paddingBottom=5,t.legend.labels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.align="right",t.legend.valueLabels.template.textAlign="start",t.legend.itemContainers.template.paddingLeft=20,t.legend.itemContainers.template.paddingRight=20;var a=t.series.push(new am4charts.PieSeries3D);a.labels.template.disabled=!0,a.ticks.template.disabled=!0,a.calculatePercent=!0,a.slices.template.tooltipText="{category}: [bold]{value.percent.formatNumber('#.0')}% ({value.value})[/]",a.dataFields.value="speakers",a.dataFields.depthValue="speakers",a.dataFields.category="age_group",a.slices.template.adapter.add("fill",function(e,t){return k[t.dataItem.index]}),f["age-group-chart"]=t},C=function(e){am4core.ready(function(){var t=am4core.create("gender-chart",am4charts.XYChart);e.forEach(function(e){var t=l(60*Number(e.hours_contributed)*60,!0),a=t.hours,r=t.minutes,n=t.seconds;e.contributedHours=d(a,r,n)}),t.data=e;var a=t.xAxes.push(new am4charts.CategoryAxis);a.dataFields.category="gender",a.renderer.minGridDistance=20,a.renderer.labels.template.fill="#000",a.renderer.grid.template.disabled=!0,a.renderer.labels.template.fontSize=12,a.renderer.grid.template.location=0;var r=t.yAxes.push(new am4charts.ValueAxis);r.min=0,r.renderer.labels.template.fill="#000",r.renderer.grid.template.strokeDasharray="3,3",r.renderer.labels.template.fontSize=12,r.title.text="Number of hours",r.title.fontSize=12;var n=t.series.push(new am4charts.ColumnSeries);n.dataFields.valueY="hours_contributed",n.dataFields.categoryX="gender";var o=n.columns.template;o.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{gender}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left;">Speakers: <label>{speakers}</label></div>\n            </div>',o.adapter.add("fill",function(e,t){return k[k.length-1-t.dataItem.index]}),o.adapter.add("stroke",function(e,t){return k[k.length-1-t.dataItem.index]}),f["gender-chart"]=t})},N=function(e){am4core.ready(function(){am4core.useTheme(am4themes_animated);for(var t=am4core.create("timeline-chart",am4charts.XYChart),a=e.data,r=0;r<a.length;r++){a[r].month||(a[r].month=3*a[r].quarter),a[r].duration=new Date(a[r].year,a[r].month-1,1),a[r].year=String(a[r].year);var n=l(60*Number(a[r].cumulative_contributions)*60,!0),o=n.hours,i=n.minutes,s=n.seconds,d=l(60*Number(a[r].cumulative_validations)*60,!0),c=d.hours,u=d.minutes,h=d.seconds;a[r].contributedHours="".concat(o,"hrs ").concat(i,"mins ").concat(s,"secs"),a[r].validatedHours="".concat(c,"hrs ").concat(u,"mins ").concat(h,"secs")}t.data=a;var m=t.xAxes.push(new am4charts.DateAxis);m.renderer.minGridDistance=10,m.renderer.grid.template.disabled=!0,m.renderer.baseGrid.disabled=!1,m.renderer.labels.template.fill="#000",m.title.text="Time",m.renderer.labels.template.fontSize=12,m.title.fontSize=12;var p=t.yAxes.push(new am4charts.ValueAxis);p.min=0,p.renderer.minGridDistance=50,p.renderer.grid.template.strokeDasharray="3,3",p.renderer.labels.template.fill="#000",p.title.text="Number of hours",p.renderer.labels.template.fontSize=12,p.title.fontSize=12;var g=t.series.push(new am4charts.LineSeries);g.dataFields.dateX="duration",g.dataFields.valueY="cumulative_contributions",g.strokeWidth=3,g.tensionX=.8,g.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{month}/{year}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left; font-style: italic;">Validated: <label>{validatedHours}</label></div>\n            </div>',g.tooltip.getFillFromObject=!1,g.tooltip.autoTextColor=!1,g.tooltip.background.fill=am4core.color("#F1F1F2"),g.tooltip.label.fill=am4core.color("#000000"),g.sequencedInterpolation=!0,g.stroke=am4core.color("#FCC232"),g.name="Recorded";var v=t.series.push(new am4charts.LineSeries);(v.dataFields.dateX="duration",v.dataFields.valueY="cumulative_validations",v.sequencedInterpolation=!0,v.tensionX=.8,v.strokeWidth=3,v.stroke=am4core.color("#83E661"),v.name="Validated",1===a.length)&&(g.bullets.push(new am4charts.CircleBullet).circle.fill=am4core.color("#FCC232"),v.bullets.push(new am4charts.CircleBullet).circle.fill=am4core.color("#83E661"));t.legend=new am4charts.Legend,t.legend.labels.template.fontSize=12,t.cursor=new am4charts.XYCursor,t.cursor.xAxis=m,f["timeline-chart"]=t})};t.exports={updateGraph:function(e,t,a){a?(b("timeline-chart"),m.show().addClass("d-flex"),p.addClass("d-none"),_(e,t)):(am4core.disposeAllCharts(),u.show().addClass("d-flex"),h.addClass("d-none"),m.addClass("d-none"),x(e,t))},buildGraphs:x,getOrderedGenderData:function(e){var t=[];return["Female","Male","Others","Anonymous"].forEach(function(a){e.forEach(function(e){if(a.toLowerCase()===e.gender.toLowerCase()){var r=t.findIndex(function(e){return a.toLowerCase()===e.gender.toLowerCase()});-1===r?t.push(e):t[r].count+=e.count}})}),t},getGenderData:v,getAgeGroupData:g}},{"./home-page-charts":3,"./utils":4}],3:[function(e,t,a){"use strict";function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return n(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var o="topLanguagesByHours",i="topLanguagesBySpeakers",s=e("./utils"),l=s.calculateTime,d=s.formatTime,c=s.performAPIRequest,u=[{id:"IN-TG",state:"Telangana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AN",state:"Andaman and Nicobar Islands",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AP",state:"Andhra Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AR",state:"Arunanchal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AS",state:"Assam",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-BR",state:"Bihar",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CT",state:"Chhattisgarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GA",state:"Goa",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GJ",state:"Gujarat",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HR",state:"Haryana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HP",state:"Himachal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JK",state:"Jammu & Kashmir",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JH",state:"Jharkhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KA",state:"Karnataka",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KL",state:"Kerala",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LD",state:"Lakshadweep",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MP",state:"Madhya Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MH",state:"Maharashtra",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MN",state:"Manipur",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CH",state:"Chandigarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PY",state:"Puducherry",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PB",state:"Punjab",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-RJ",state:"Rajasthan",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-SK",state:"Sikkim",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TN",state:"Tamil Nadu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TR",state:"Tripura",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UP",state:"Uttar Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UT",state:"Uttarakhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-WB",state:"West Bengal",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-OR",state:"Odisha",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DNDD",state:"Dadra and Nagar Haveli and Daman and Diu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-ML",state:"Meghalaya",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MZ",state:"Mizoram",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-NL",state:"Nagaland",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DL",state:"National Capital Territory of Delhi",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LK",state:"Ladakh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0}],h=void 0,m=function(e){var t,a=[].concat(u),r=$("#legendDiv"),n=Math.max.apply(Math,e.data.map(function(e){return Number(e.total_contributions)}));t=n>1?n/4:.25,a.forEach(function(t){var a=e.data.find(function(e){return t.state===e.state});if(a){var r=l(60*Number(a.total_contributions)*60,!0),n=r.hours,o=r.minutes,i=r.seconds,s=l(60*Number(a.total_validations)*60,!0),d=s.hours,c=s.minutes,u=s.seconds;t.contributed_time="".concat(n,"hrs ").concat(o,"mins ").concat(i,"sec"),t.validated_time="".concat(d,"hrs ").concat(c,"mins ").concat(u,"sec"),t.value=Number(a.total_contributions),t.total_speakers=a.total_speakers,t.id=t.id}else t.id=t.id,t.contributed_time="0 hrs",t.validated_time="0 hrs",t.value=0,t.total_speakers=0});var o=am4core.create("indiaMapChart",am4maps.MapChart),i=o.series.indexOf(h);i>-1&&o.series.removeIndex(i),o.geodataSource.url="https://cdn.amcharts.com/lib/4/geodata/json/india2020Low.json",o.projection=new am4maps.projections.Miller,h=new am4maps.MapPolygonSeries,o.seriesContainer.draggable=!1,o.seriesContainer.resizable=!1,o.chartContainer.wheelable=!1,o.maxZoomLevel=1,h.useGeodata=!0,h.data=a;var s=h.mapPolygons.template;s.tooltipHTML='<div><h6>{state}</h6> <div>{total_speakers} Speakers  <label style="margin-left: 32px">Contributed: <label style="margin-left: 8px">{contributed_time}</label></label></div> <div>Validated:  <label style="margin-left: 8px">{validated_time}</label></div></div>',s.nonScalingStroke=!0,s.strokeWidth=.5,s.fill=am4core.color("#fff"),s.states.create("hover").properties.fill=o.colors.getIndex(1).brighten(-.5),h.mapPolygons.template.adapter.add("fill",function(e,a){return a.dataItem?a.dataItem.value>=3*t?am4core.color("#4061BF"):a.dataItem.value>=2*t?am4core.color("#6B85CE"):a.dataItem.value>=t?am4core.color("#92A8E8"):a.dataItem.value>0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):e}),o.series.push(h);var c=$("#quarter .legend-val"),m=$("#half .legend-val"),p=$("#threeQuarter .legend-val"),f=$("#full .legend-val"),g=l(60*t*60,!1),v=g.hours,b=g.minutes,_=l(2*t*60*60,!1),x=_.hours,k=_.minutes,y=l(3*t*60*60,!1),C=y.hours,N=y.minutes;c.text("0 - ".concat(d(v,b))),m.text("".concat(d(v,b)," - ").concat(d(x,k))),p.text("".concat(d(x,k)," - ").concat(d(C,N))),f.text("> ".concat(d(C,N))),r.removeClass("d-none").addClass("d-flex")};function p(e,t,a){var n=am4core.create("speakers_hours_chart",am4charts.XYChart);f.chart=n;var o=r(e);o="total_speakers"===t?o.sort(function(e,t){return Number(e.total_speakers)<Number(t.total_speakers)?-1:1}):o.sort(function(e,t){return Number(e.total_contributions)<Number(t.total_contributions)?-1:1}),"total_speakers"!==t&&o.forEach(function(e){var t=l(60*Number(e.total_contributions)*60,!0),a=t.hours,r=t.minutes,n=t.seconds;e.total_contributions_text=d(a,r,n)}),n.data=o;var i=n.yAxes.push(new am4charts.CategoryAxis);i.dataFields.category=a,i.renderer.grid.template.location=0,i.renderer.cellStartLocation=.2,i.renderer.cellEndLocation=.8,i.renderer.grid.template.strokeWidth=0;var s=n.xAxes.push(new am4charts.ValueAxis);s.renderer.grid.template.strokeWidth=0,s.renderer.labels.template.disabled=!0,i.renderer.minGridDistance=25;var c=n.series.push(new am4charts.ColumnSeries);c.dataFields.valueX=t,c.dataFields.categoryY=a;var u=c.bullets.push(new am4charts.LabelBullet);u.label.text="total_speakers"===t?"{total_speakers}":"{total_contributions_text}",u.label.fontSize=14,u.label.horizontalCenter="left",u.label.dx=10,u.label.truncate=!1,u.label.hideOversized=!1;n.events.on("datavalidated",function(e){var t=e.target,a=t.yAxes.getIndex(0),r=35*t.data.length-a.pixelHeight,n=t.pixelHeight+r;t.svgContainer.htmlElement.style.height=n+"px"})}var f={};t.exports={generateIndiaMap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";c(""!==e?"/aggregate-data-count?byState=true&byLanguage=true":"/aggregate-data-count?byState=true").then(function(t){var a=""!==e?function(e,t){var a={data:[]};return e.data.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&""!==e.state&&"anonymous"!==e.state.toLowerCase()&&a.data.push(e)}),a}(t,e):t;m(a)}).catch(function(e){console.log(e)})},showByHoursChart:function(){f.chart&&f.chart.dispose();var e=localStorage.getItem(o);p(JSON.parse(e),"total_contributions","language")},showBySpeakersChart:function(){f.chart&&f.chart.dispose();var e=localStorage.getItem(i);p(JSON.parse(e),"total_speakers","language")},getStatistics:function(e){var t=$("#speaker-data").find("#loader1, #loader2, #loader3"),a=$("#speakers-wrapper"),r=$("#speaker-value"),n=$("#hours-wrapper"),o=$("#hour-value"),i=$("#languages-wrapper"),s=$("#languages-value");t.removeClass("d-none"),n.addClass("d-none"),a.addClass("d-none"),i.addClass("d-none");var d=l(60*Number(e.total_contributions)*60),c=d.hours,u=d.minutes,h=d.seconds;o.text("".concat(c,"h ").concat(u,"m ").concat(h,"s")),r.text(e.total_speakers),s.text(e.total_languages),t.addClass("d-none"),n.removeClass("d-none"),a.removeClass("d-none"),i.removeClass("d-none")},drawMap:m}},{"./utils":4}],4:[function(e,t,a){"use strict";var r=e("./constants"),n=r.HOUR_IN_SECONDS,o=r.SIXTY,i=[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0}];var s=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var r in t)if(t[r].startsWith("ip=")){a=t[r].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),a=i.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===a.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(a.value,' class="dropdown-item" href="/changeLocale/').concat(a.id,'">').concat(a.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(e/n),r=e%n,i=Math.floor(r/o),s=Math.round(r%o);return t?{hours:a,minutes:i,seconds:s}:{hours:a,minutes:i}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return e>0&&(r+="".concat(e," hrs ")),t>0&&(r+="".concat(t," min ")),0===e&&0===t&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)},getLocaleString:function(){s("/get-locale-strings").then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:s}},{"./constants":1}]},{},[2]);
