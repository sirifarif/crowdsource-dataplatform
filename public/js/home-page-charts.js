!function t(e,a,r){function s(o,n){if(!a[o]){if(!e[o]){var d="function"==typeof require&&require;if(!n&&d)return d(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=a[o]={exports:{}};e[o][0].call(l.exports,function(t){var a=e[o][1][t];return s(a||t)},l,l.exports,t,e,a,r)}return a[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(t,e,a){"use strict";function r(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}var i="topLanguagesByHours",o="topLanguagesBySpeakers",n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return t>0&&(r+="".concat(t," hrs ")),e>0&&(r+="".concat(e," min ")),0===t&&0===e&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)},d=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(t/3600),r=t%3600,s=Math.floor(r/60),i=Math.round(r%60);return e?{hours:a,minutes:s,seconds:i}:{hours:a,minutes:s}},l=[{id:"IN-TG",state:"Telangana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AN",state:"Andaman and Nicobar Islands",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AP",state:"Andhra Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AR",state:"Arunanchal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AS",state:"Assam",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-BR",state:"Bihar",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CT",state:"Chhattisgarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GA",state:"Goa",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GJ",state:"Gujarat",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HR",state:"Haryana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HP",state:"Himachal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JK",state:"Jammu & Kashmir",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JH",state:"Jharkhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KA",state:"Karnataka",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KL",state:"Kerala",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LD",state:"Lakshadweep",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MP",state:"Madhya Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MH",state:"Maharashtra",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MN",state:"Manipur",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CH",state:"Chandigarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PY",state:"Puducherry",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PB",state:"Punjab",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-RJ",state:"Rajasthan",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-SK",state:"Sikkim",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TN",state:"Tamil Nadu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TR",state:"Tripura",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UP",state:"Uttar Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UT",state:"Uttarakhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-WB",state:"West Bengal",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-OR",state:"Odisha",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DNDD",state:"Dadra and Nagar Haveli and Daman and Diu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-ML",state:"Meghalaya",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MZ",state:"Mizoram",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-NL",state:"Nagaland",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DL",state:"National Capital Territory of Delhi",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LK",state:"Ladakh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0}],u=void 0,c=function(t){var e,a=[].concat(l),r=$("#legendDiv"),s=Math.max.apply(Math,t.data.map(function(t){return Number(t.total_contributions)}));e=s>1?s/4:.25,a.forEach(function(e){var a=t.data.find(function(t){return e.state===t.state});if(a){var r=d(60*Number(a.total_contributions)*60,!0),s=r.hours,i=r.minutes,o=r.seconds,n=d(60*Number(a.total_validations)*60,!0),l=n.hours,u=n.minutes,c=n.seconds;e.contributed_time="".concat(s,"hrs ").concat(i,"mins ").concat(o,"sec"),e.validated_time="".concat(l,"hrs ").concat(u,"mins ").concat(c,"sec"),e.value=Number(a.total_contributions),e.total_speakers=a.total_speakers,e.id=e.id}else e.id=e.id,e.contributed_time="0 hrs",e.validated_time="0 hrs",e.value=0,e.total_speakers=0});var i=am4core.create("indiaMapChart",am4maps.MapChart),o=i.series.indexOf(u);o>-1&&i.series.removeIndex(o),i.geodataSource.url="https://cdn.amcharts.com/lib/4/geodata/json/india2020Low.json",i.projection=new am4maps.projections.Miller,u=new am4maps.MapPolygonSeries,i.seriesContainer.draggable=!1,i.seriesContainer.resizable=!1,i.chartContainer.wheelable=!1,i.maxZoomLevel=1,u.useGeodata=!0,u.data=a;var c=u.mapPolygons.template;c.tooltipHTML='<div><h6>{state}</h6> <div>{total_speakers} Speakers  <label style="margin-left: 32px">Contributed: <label style="margin-left: 8px">{contributed_time}</label></label></div> <div>Validated:  <label style="margin-left: 8px">{validated_time}</label></div></div>',c.nonScalingStroke=!0,c.strokeWidth=.5,c.fill=am4core.color("#fff"),c.states.create("hover").properties.fill=i.colors.getIndex(1).brighten(-.5),u.mapPolygons.template.adapter.add("fill",function(t,a){return a.dataItem?a.dataItem.value>=3*e?am4core.color("#4061BF"):a.dataItem.value>=2*e?am4core.color("#6B85CE"):a.dataItem.value>=e?am4core.color("#92A8E8"):a.dataItem.value>0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):t}),i.series.push(u);var h=$("#quarter .legend-val"),m=$("#half .legend-val"),_=$("#threeQuarter .legend-val"),p=$("#full .legend-val"),v=d(60*e*60,!1),b=v.hours,f=v.minutes,g=d(2*e*60*60,!1),k=g.hours,N=g.minutes,I=d(3*e*60*60,!1),y=I.hours,x=I.minutes;h.text("0 - ".concat(n(b,f))),m.text("".concat(n(b,f)," - ").concat(n(k,N))),_.text("".concat(n(k,N)," - ").concat(n(y,x))),p.text("> ".concat(n(y,x))),r.removeClass("d-none").addClass("d-flex")};function h(t,e,a){var s=am4core.create("speakers_hours_chart",am4charts.XYChart);m.chart=s;var i=r(t);i="total_speakers"===e?i.sort(function(t,e){return Number(t.total_speakers)<Number(e.total_speakers)?-1:1}):i.sort(function(t,e){return Number(t.total_contributions)<Number(e.total_contributions)?-1:1}),"total_speakers"!==e&&i.forEach(function(t){var e=d(60*Number(t.total_contributions)*60,!0),a=e.hours,r=e.minutes,s=e.seconds;t.total_contributions_text=n(a,r,s)}),s.data=i;var o=s.yAxes.push(new am4charts.CategoryAxis);o.dataFields.category=a,o.renderer.grid.template.location=0,o.renderer.cellStartLocation=.2,o.renderer.cellEndLocation=.8,o.renderer.grid.template.strokeWidth=0;var l=s.xAxes.push(new am4charts.ValueAxis);l.renderer.grid.template.strokeWidth=0,l.renderer.labels.template.disabled=!0,o.renderer.minGridDistance=25;var u=s.series.push(new am4charts.ColumnSeries);u.dataFields.valueX=e,u.dataFields.categoryY=a;var c=u.bullets.push(new am4charts.LabelBullet);c.label.text="total_speakers"===e?"{total_speakers}":"{total_contributions_text}",c.label.fontSize=14,c.label.horizontalCenter="left",c.label.dx=10,c.label.truncate=!1,c.label.hideOversized=!1;s.events.on("datavalidated",function(t){var e=t.target,a=e.yAxes.getIndex(0),r=35*e.data.length-a.pixelHeight,s=e.pixelHeight+r;e.svgContainer.htmlElement.style.height=s+"px"})}var m={};e.exports={generateIndiaMap:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})})(""!==t?"/aggregate-data-count?byState=true&byLanguage=true":"/aggregate-data-count?byState=true").then(function(e){var a=""!==t?function(t,e){var a={data:[]};return t.data.forEach(function(t){t.language.toLowerCase()===e.toLowerCase()&&""!==t.state&&"anonymous"!==t.state.toLowerCase()&&a.data.push(t)}),a}(e,t):e;c(a)}).catch(function(t){console.log(t)})},showByHoursChart:function(){m.chart&&m.chart.dispose();var t=localStorage.getItem(i);h(JSON.parse(t),"total_contributions","language")},showBySpeakersChart:function(){m.chart&&m.chart.dispose();var t=localStorage.getItem(o);h(JSON.parse(t),"total_speakers","language")},getStatistics:function(t){var e=$("#speaker-data").find("#loader1, #loader2, #loader3"),a=$("#speakers-wrapper"),r=$("#speaker-value"),s=$("#hours-wrapper"),i=$("#hour-value"),o=$("#languages-wrapper"),n=$("#languages-value");e.removeClass("d-none"),s.addClass("d-none"),a.addClass("d-none"),o.addClass("d-none");var l=d(60*Number(t.total_contributions)*60),u=l.hours,c=l.minutes,h=l.seconds;i.text("".concat(u,"h ").concat(c,"m ").concat(h,"s")),r.text(t.total_speakers),n.text(t.total_languages),e.addClass("d-none"),s.removeClass("d-none"),a.removeClass("d-none"),o.removeClass("d-none")},calculateTime:d,formatTime:n,drawMap:c}},{}]},{},[1]);