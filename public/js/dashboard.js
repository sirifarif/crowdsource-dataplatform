!function e(t,a,r){function n(s,i){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!i&&l)return l(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){var a=t[s][1][e];return n(a||e)},d,d.exports,e,t,a,r)}return a[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)n(r[s]);return n}({1:[function(e,t,a){"use strict";function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach(function(t){o(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var s=e("./home-page-charts").generateIndiaMap,i=$(".chart-row"),l=i.find(".loader"),d=i.find(".chart"),c=$("#timeline-loader"),u=$("#timeline-chart"),m={};function h(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=3600*e,r=Math.floor(a/3600),n=a%3600,o=Math.floor(n/60),s=parseInt(n%60);return t?{hours:r,minutes:o,seconds:s}:{hours:r,minutes:o}}function g(e,t){var a=[];return e.forEach(function(e){var r=e[t]?e:n(n({},e),{},o({},t,"Anonymous")),s=a.findIndex(function(e){return r[t].toLowerCase()===e[t].toLowerCase()});s>=0?(a[s].contributions+=r.contributions,a[s].speakers+=r.speakers):a.push(r)}),a}var p=function(e){var t=[];return["male","female","anonymous","others"].forEach(function(a){e.data.forEach(function(e){e.gender||(e.gender="anonymous"),a===e.gender&&t.push(n(n({},e),{},{gender:e.gender.charAt(0).toUpperCase()+e.gender.slice(1)}))})}),t};var f=function(e){m[e]&&(m[e].dispose(),delete m[e])},v=function(e,t){fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(e){c.hide().removeClass("d-flex"),u.removeClass("d-none"),y(e)}).catch(function(e){console.log(e)})};function b(e,t){Promise.all([fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)),fetch("/contributions/gender?language=".concat(e)),fetch("/contributions/age?language=".concat(e))]).then(function(e){return Promise.all(e.map(function(e){return e.json()}))}).then(function(t){try{l.hide().removeClass("d-flex"),d.removeClass("d-none");var a=p(t[1]),r=g(t[2].data,"age_group").sort(function(e,t){return Number(e.speakers)-Number(t.speakers)});y(t[0]),C(a),s(e),k(r),setTimeout(function(){fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"),fetch("https://fonts.googleapis.com/icon?family=Material+Icons"),fetch("css/notyf.min.css"),fetch("css/record.css")},2e3)}catch(e){console.log(e),l.show().addClass("d-flex"),d.addClass("d-none")}}).catch(function(e){console.log(e)})}var _=["#85A8F9","#B7D0FE","#316AFF","#294691"],k=function(e){var t=am4core.create("age-group-chart",am4charts.PieChart3D);t.data=e.slice(0,3).concat({age_group:"Others",speakers:e.slice(3).reduce(function(e,t){return e+Number(t.speakers)},0)}),t.paddingBottom=50,t.innerRadius=am4core.percent(40),t.depth=50,t.legend=new am4charts.Legend,t.legend.labels.template.fill=am4core.color("#000"),t.legend.valueLabels.template.fill=am4core.color("#000"),t.legend.labels.template.textDecoration="none",t.legend.valueLabels.template.textDecoration="none",t.legend.itemContainers.template.paddingTop=5,t.legend.itemContainers.template.paddingBottom=5,t.legend.labels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.align="right",t.legend.valueLabels.template.textAlign="start",t.legend.itemContainers.template.paddingLeft=20,t.legend.itemContainers.template.paddingRight=20;var a=t.series.push(new am4charts.PieSeries3D);a.labels.template.disabled=!0,a.ticks.template.disabled=!0,a.calculatePercent=!0,a.slices.template.tooltipText="{category}: [bold]{value.percent.formatNumber('#.0')}% ({value.value})[/]",a.dataFields.value="speakers",a.dataFields.depthValue="speakers",a.dataFields.category="age_group",a.slices.template.adapter.add("fill",function(e,t){return _[t.dataItem.index]}),m["age-group-chart"]=t},C=function(e){am4core.ready(function(){var t=am4core.create("gender-chart",am4charts.XYChart);e.forEach(function(e){var t=h(Number(e.hours_contributed),!0),a=t.hours,r=t.minutes,n=t.seconds;e.contributedHours=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return e>0&&(r+="".concat(e," hrs ")),t>0&&(r+="".concat(t," min ")),0===e&&0===t&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)}(a,r,n)}),t.data=e;var a=t.xAxes.push(new am4charts.CategoryAxis);a.dataFields.category="gender",a.renderer.minGridDistance=20,a.renderer.labels.template.fill="#000",a.renderer.grid.template.disabled=!0,a.renderer.labels.template.fontSize=12,a.renderer.grid.template.location=0;var r=t.yAxes.push(new am4charts.ValueAxis);r.min=0,r.renderer.labels.template.fill="#000",r.renderer.grid.template.strokeDasharray="3,3",r.renderer.labels.template.fontSize=12,r.title.text="Number of hours",r.title.fontSize=12;var n=t.series.push(new am4charts.ColumnSeries);n.dataFields.valueY="hours_contributed",n.dataFields.categoryX="gender";var o=n.columns.template;o.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{gender}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left;">Speakers: <label>{speakers}</label></div>\n            </div>',o.adapter.add("fill",function(e,t){return _[_.length-1-t.dataItem.index]}),o.adapter.add("stroke",function(e,t){return _[_.length-1-t.dataItem.index]}),m["gender-chart"]=t})},y=function(e){am4core.ready(function(){am4core.useTheme(am4themes_animated);for(var t=am4core.create("timeline-chart",am4charts.XYChart),a=e.data,r=0;r<a.length;r++){a[r].month||(a[r].month=3*a[r].quarter),a[r].duration=new Date(a[r].year,a[r].month-1,1),a[r].year=String(a[r].year);var n=h(Number(a[r].cumulative_contributions),!0),o=n.hours,s=n.minutes,i=n.seconds,l=h(Number(a[r].cumulative_validations),!0),d=l.hours,c=l.minutes,u=l.seconds;a[r].contributedHours="".concat(o,"hrs ").concat(s,"mins ").concat(i,"secs"),a[r].validatedHours="".concat(d,"hrs ").concat(c,"mins ").concat(u,"secs")}t.data=a;var g=t.xAxes.push(new am4charts.DateAxis);g.renderer.minGridDistance=10,g.renderer.grid.template.disabled=!0,g.renderer.baseGrid.disabled=!1,g.renderer.labels.template.fill="#000",g.title.text="Time",g.renderer.labels.template.fontSize=12,g.title.fontSize=12;var p=t.yAxes.push(new am4charts.ValueAxis);p.min=0,p.renderer.minGridDistance=50,p.renderer.grid.template.strokeDasharray="3,3",p.renderer.labels.template.fill="#000",p.title.text="Number of hours",p.renderer.labels.template.fontSize=12,p.title.fontSize=12;var f=t.series.push(new am4charts.LineSeries);f.dataFields.dateX="duration",f.dataFields.valueY="cumulative_contributions",f.strokeWidth=3,f.tensionX=.8,f.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{month}/{year}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left; font-style: italic;">Validated: <label>{validatedHours}</label></div>\n            </div>',f.tooltip.getFillFromObject=!1,f.tooltip.autoTextColor=!1,f.tooltip.background.fill=am4core.color("#F1F1F2"),f.tooltip.label.fill=am4core.color("#000000"),f.sequencedInterpolation=!0,f.stroke=am4core.color("#FCC232"),f.name="Recorded";var v=t.series.push(new am4charts.LineSeries);(v.dataFields.dateX="duration",v.dataFields.valueY="cumulative_validations",v.sequencedInterpolation=!0,v.tensionX=.8,v.strokeWidth=3,v.stroke=am4core.color("#83E661"),v.name="Validated",1===a.length)&&(f.bullets.push(new am4charts.CircleBullet).circle.fill=am4core.color("#FCC232"),v.bullets.push(new am4charts.CircleBullet).circle.fill=am4core.color("#83E661"));t.legend=new am4charts.Legend,t.legend.labels.template.fontSize=12,t.cursor=new am4charts.XYCursor,t.cursor.xAxis=g,m["timeline-chart"]=t})};t.exports={updateGraph:function(e,t,a){a?(f("timeline-chart"),c.show().addClass("d-flex"),u.addClass("d-none"),v(e,t)):(am4core.disposeAllCharts(),l.show().addClass("d-flex"),d.addClass("d-none"),c.addClass("d-none"),b(e,t))},buildGraphs:b,getOrderedGenderData:function(e){var t=[];return["Female","Male","Others","Anonymous"].forEach(function(a){e.forEach(function(e){if(a.toLowerCase()===e.gender.toLowerCase()){var r=t.findIndex(function(e){return a.toLowerCase()===e.gender.toLowerCase()});-1===r?t.push(e):t[r].count+=e.count}})}),t},getGenderData:p,getAgeGroupData:g,calculateTime:h}},{"./home-page-charts":3}],2:[function(e,t,a){"use strict";var r,n=e("./draw-chart"),o=n.updateGraph,s=n.calculateTime,i=e("./speakerDetails"),l=i.testUserName,d=i.setStartRecordBtnToolTipContent,c=e("./utils").toggleFooterPosition,u="",m=function(e){return fetch(e?"/aggregate-data-count?byLanguage=true":"/aggregate-data-count").then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})},h=function(e,t){localStorage.setItem("previousLanguage",t);var a={languages:0,speakers:0,contributions:0,validations:0};if(t){var r=e.filter(function(e){return e.language.toLowerCase()===t.toLowerCase()});a.speakers=parseInt(r[0].total_speakers),a.contributions=parseFloat(r[0].total_contributions),a.validations=parseFloat(r[0].total_validations)}else console.log(e),a.languages=parseInt(e[0].total_languages),a.speakers=parseInt(e[0].total_speakers),a.contributions=parseFloat(e[0].total_contributions),a.validations=parseFloat(e[0].total_validations);return a};function g(e){var t=$("#speaker-data"),a=t.find("#loader1"),n=t.find("#contribution-details"),i=t.find(".contribution-data"),l=$("#languages-wrapper"),d=$("#languages-value"),c=$("#speaker-value"),g=$("#contributed-value"),p=$("#validated-value"),f=$("#duration").find(".active")[0].dataset.value;m(e).then(function(t){try{var m=function(e,t){var a=!1;return!t||(e.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&(a=!0)}),a)}(t.data,e);if(t.last_updated_at?($("#data-updated").text(" ".concat(t.last_updated_at)),$("#data-updated").removeClass("d-none")):$("#data-updated").addClass("d-none"),m){a.removeClass("d-none"),l.addClass("d-none"),n.addClass("d-none"),o(e,f);var v=h(t.data,e),b=s(v.contributions.toFixed(3)),_=b.hours,k=b.minutes,C=b.seconds,y=s(v.validations.toFixed(3)),x=y.hours,I=y.minutes,N=y.seconds;v.languages?(d.text(v.languages),l.removeClass("d-none"),i.removeClass("col-12 col-md-4 col-lg-4 col-xl-4"),i.addClass("col-12 col-md-3 col-lg-3 col-xl-3")):(l.addClass("d-none"),i.removeClass("col-12 col-md-3 col-lg-3 col-xl-3"),i.addClass("col-12 col-md-4 col-lg-4 col-xl-4")),g.text("".concat(_,"h ").concat(k,"m ").concat(C,"s")),p.text("".concat(x,"h ").concat(I,"m ").concat(N,"s")),c.text(v.speakers),a.addClass("d-none"),n.removeClass("d-none")}else{var w=localStorage.getItem("previousLanguage");u=e,$("#language").val(w),$("#languageSelected").text(" ".concat(e,", ")),$("#no-data-found").removeClass("d-none"),r=setTimeout(function(){$("#no-data-found").addClass("d-none")},5e3)}}catch(e){console.log(e)}}).catch(function(e){console.log(e)})}$(document).ready(function(){localStorage.removeItem("previousLanguage");var e=$("#proceed-box"),t=e.parent(),a=$("#tnc"),n=document.querySelectorAll('input[name = "gender"]'),s=$("#username"),i=document.getElementById("mother-tongue"),m=document.getElementById("age");g(""),$("#language").on("change",function(e){g(e.target.value)}),$("#duration").on("click",function(e){var t=$("#duration").find("li.inactive"),a=$("#duration").find("li.active");t.removeClass("inactive").addClass("active"),a.removeClass("active").addClass("inactive");var r=e.target.dataset.value,n=$("#language option:selected").val();o(n,r,!0)}),$("#no-data-found").on("mouseenter touchstart",function(e){clearTimeout(r)}),$("#no-data-found").on("mouseleave touchend",function(e){r=setTimeout(function(){$("#no-data-found").addClass("d-none")},5e3)}),$("#contribute-now").on("click",function(e){localStorage.setItem("contributionLanguage",u)}),a.change(function(){var a=s.val().trim();this.checked&&!l(a)?(e.removeAttr("disabled").removeClass("point-none"),t.tooltip("disable")):(d(a,t),e.prop("disabled","true").addClass("point-none"),t.tooltip("enable"))}),e.on("click",function(){if(a.prop("checked")){var e=Array.from(n).filter(function(e){return e.checked}),t=e.length?e[0].value:"",r=s.val().trim().substring(0,12);if("English"===u&&(u="Odia"),l(r))return;var o={gender:t,age:m.value,motherTongue:i.value,userName:r,language:u};localStorage.setItem("speakerDetails",JSON.stringify(o)),location.href="/record"}}),c()})},{"./draw-chart":1,"./speakerDetails":4,"./utils":5}],3:[function(e,t,a){"use strict";function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return n(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var o="topLanguagesByHours",s="topLanguagesBySpeakers",i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return e>0&&(r+="".concat(e," hrs ")),t>0&&(r+="".concat(t," min ")),0===e&&0===t&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)},l=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(e/3600),r=e%3600,n=Math.floor(r/60),o=Math.round(r%60);return t?{hours:a,minutes:n,seconds:o}:{hours:a,minutes:n}},d=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})},c=[{id:"IN-TG",state:"Telangana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AN",state:"Andaman and Nicobar Islands",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AP",state:"Andhra Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AR",state:"Arunanchal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AS",state:"Assam",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-BR",state:"Bihar",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CT",state:"Chhattisgarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GA",state:"Goa",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GJ",state:"Gujarat",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HR",state:"Haryana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HP",state:"Himachal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JK",state:"Jammu & Kashmir",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JH",state:"Jharkhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KA",state:"Karnataka",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KL",state:"Kerala",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LD",state:"Lakshadweep",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MP",state:"Madhya Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MH",state:"Maharashtra",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MN",state:"Manipur",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CH",state:"Chandigarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PY",state:"Puducherry",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PB",state:"Punjab",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-RJ",state:"Rajasthan",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-SK",state:"Sikkim",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TN",state:"Tamil Nadu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TR",state:"Tripura",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UP",state:"Uttar Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UT",state:"Uttarakhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-WB",state:"West Bengal",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-OR",state:"Odisha",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DNDD",state:"Dadra and Nagar Haveli and Daman and Diu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-ML",state:"Meghalaya",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MZ",state:"Mizoram",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-NL",state:"Nagaland",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DL",state:"National Capital Territory of Delhi",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LK",state:"Ladakh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0}],u=void 0;function m(e,t,a){var n=am4core.create("speakers_hours_chart",am4charts.XYChart);h.chart=n;var o=r(e);o="total_speakers"===t?o.sort(function(e,t){return Number(e.total_speakers)<Number(t.total_speakers)?-1:1}):o.sort(function(e,t){return Number(e.total_contributions)<Number(t.total_contributions)?-1:1}),"total_speakers"!==t&&o.forEach(function(e){var t=l(60*Number(e.total_contributions)*60,!0),a=t.hours,r=t.minutes,n=t.seconds;e.total_contributions_text=i(a,r,n)}),n.data=o;var s=n.yAxes.push(new am4charts.CategoryAxis);s.dataFields.category=a,s.renderer.grid.template.location=0,s.renderer.cellStartLocation=.2,s.renderer.cellEndLocation=.8,s.renderer.grid.template.strokeWidth=0;var d=n.xAxes.push(new am4charts.ValueAxis);d.renderer.grid.template.strokeWidth=0,d.renderer.labels.template.disabled=!0,s.renderer.minGridDistance=25;var c=n.series.push(new am4charts.ColumnSeries);c.dataFields.valueX=t,c.dataFields.categoryY=a;var u=c.bullets.push(new am4charts.LabelBullet);u.label.text="total_speakers"===t?"{total_speakers}":"{total_contributions_text}",u.label.fontSize=14,u.label.horizontalCenter="left",u.label.dx=10,u.label.truncate=!1,u.label.hideOversized=!1;n.events.on("datavalidated",function(e){var t=e.target,a=t.yAxes.getIndex(0),r=35*t.data.length-a.pixelHeight,n=t.pixelHeight+r;t.svgContainer.htmlElement.style.height=n+"px"})}var h={};t.exports={generateIndiaMap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";d(""!==e?"/aggregate-data-count?byState=true&byLanguage=true":"/aggregate-data-count?byState=true").then(function(t){!function(e){var t,a=[].concat(c),r=$("#legendDiv"),n=Math.max.apply(Math,e.data.map(function(e){return Number(e.total_contributions)}));t=n>1?n/4:.25,a.forEach(function(t){var a=e.data.find(function(e){return t.state===e.state});if(a){var r=l(60*Number(a.total_contributions)*60,!0),n=r.hours,o=r.minutes,s=r.seconds,i=l(60*Number(a.total_validations)*60,!0),d=i.hours,c=i.minutes,u=i.seconds;t.contributed_time="".concat(n,"hrs ").concat(o,"mins ").concat(s,"sec"),t.validated_time="".concat(d,"hrs ").concat(c,"mins ").concat(u,"sec"),t.value=Number(a.total_contributions),t.total_speakers=a.total_speakers,t.id=t.id}else t.id=t.id,t.contributed_time="0 hrs",t.validated_time="0 hrs",t.value=0,t.total_speakers=0});var o=am4core.create("indiaMapChart",am4maps.MapChart),s=o.series.indexOf(u);s>-1&&o.series.removeIndex(s),o.geodataSource.url="https://cdn.amcharts.com/lib/4/geodata/json/india2020Low.json",o.projection=new am4maps.projections.Miller,u=new am4maps.MapPolygonSeries,o.seriesContainer.draggable=!1,o.seriesContainer.resizable=!1,o.chartContainer.wheelable=!1,o.maxZoomLevel=1,u.useGeodata=!0,u.data=a;var d=u.mapPolygons.template;d.tooltipHTML='<div><h6>{state}</h6> <div>{total_speakers} Speakers  <label style="margin-left: 32px">Contributed: <label style="margin-left: 8px">{contributed_time}</label></label></div> <div>Validated:  <label style="margin-left: 8px">{validated_time}</label></div></div>',d.nonScalingStroke=!0,d.strokeWidth=.5,d.fill=am4core.color("#fff"),d.states.create("hover").properties.fill=o.colors.getIndex(1).brighten(-.5),u.mapPolygons.template.adapter.add("fill",function(e,a){return a.dataItem?a.dataItem.value>=3*t?am4core.color("#4061BF"):a.dataItem.value>=2*t?am4core.color("#6B85CE"):a.dataItem.value>=t?am4core.color("#92A8E8"):a.dataItem.value>0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):e}),o.series.push(u);var m=$("#quarter .legend-val"),h=$("#half .legend-val"),g=$("#threeQuarter .legend-val"),p=$("#full .legend-val"),f=l(60*t*60,!1),v=f.hours,b=f.minutes,_=l(2*t*60*60,!1),k=_.hours,C=_.minutes,y=l(3*t*60*60,!1),x=y.hours,I=y.minutes;m.text("0 - ".concat(i(v,b))),h.text("".concat(i(v,b)," - ").concat(i(k,C))),g.text("".concat(i(k,C)," - ").concat(i(x,I))),p.text("> ".concat(i(x,I))),r.removeClass("d-none").addClass("d-flex")}(""!==e?function(e,t){var a={data:[]};return e.data.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&""!==e.state&&"anonymous"!==e.state.toLowerCase()&&a.data.push(e)}),a}(t,e):t)}).catch(function(e){console.log(e)})},showByHoursChart:function(){h.chart&&h.chart.dispose();var e=localStorage.getItem(o);e?m(JSON.parse(e).data,"total_contributions","language"):d("/top-languages-by-hours").then(function(e){localStorage.setItem(o,JSON.stringify(e)),m(e.data,"total_contributions","language")})},showBySpeakersChart:function(){h.chart&&h.chart.dispose();var e=localStorage.getItem(s);e?m(JSON.parse(e).data,"total_speakers","language"):d("/top-languages-by-speakers").then(function(e){localStorage.setItem(s,JSON.stringify(e)),m(e.data,"total_speakers","language")})},getStatistics:function(){var e=$("#speaker-data").find("#loader1, #loader2, #loader3"),t=$("#speakers-wrapper"),a=$("#speaker-value"),r=$("#hours-wrapper"),n=$("#hour-value"),o=$("#languages-wrapper"),s=$("#languages-value");e.removeClass("d-none"),r.addClass("d-none"),t.addClass("d-none"),o.addClass("d-none"),d("/aggregate-data-count").then(function(i){try{var d=l(60*Number(i.data[0].total_contributions)*60),c=d.hours,u=d.minutes,m=d.seconds;n.text("".concat(c,"h ").concat(u,"m ").concat(m,"s")),a.text(i.data[0].total_speakers),s.text(i.data[0].total_languages),e.addClass("d-none"),r.removeClass("d-none"),t.removeClass("d-none"),o.removeClass("d-none")}catch(e){console.log(e)}}).catch(function(e){console.log(e)})},calculateTime:l,formatTime:i}},{}],4:[function(e,t,a){"use strict";function r(e,t,a){var r=e.val().trim();n(r)?(e.addClass("is-invalid"),t.removeClass("d-none")):(e.removeClass("is-invalid"),t.addClass("d-none")),a.trigger("change")}var n=function(e){return/^[6-9]\d{9}$/.test(e)||/^\S+@\S+[\.][0-9a-z]+$/.test(e)};t.exports={testUserName:n,validateUserName:r,setSpeakerDetails:function(e,t,a,n){var o=localStorage.getItem(e);if(o){var s=JSON.parse(o),i=document.querySelector('input[name = "gender"][value="'+s.gender+'"]');i&&(i.checked=!0,i.previous=!0),t.value=s.age,a.value=s.motherTongue,n.val(s.userName?s.userName.trim().substring(0,12):""),r(n,n.next(),$("#tnc"))}},resetSpeakerDetails:function(){var e=document.getElementById("age"),t=document.getElementById("mother-tongue"),a=document.getElementById("username"),r=document.querySelector('input[name = "gender"]:checked');r&&(r.checked=!1),e.selectedIndex=0,t.selectedIndex=0,a.value=""},setUserNameTooltip:function(e){e.val().length>11?(e.tooltip("enable"),e.tooltip("show")):(e.tooltip("disable"),e.tooltip("hide"))},setStartRecordBtnToolTipContent:function(e,t){n(e)?t.attr("data-original-title","Please validate any error message before proceeding"):t.attr("data-original-title","Please agree to the Terms and Conditions before proceeding")}}},{}],5:[function(e,t,a){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var r in t)if(t[r].startsWith("ip=")){a=t[r].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})}}},{}]},{},[2]);