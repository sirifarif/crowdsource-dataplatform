!function e(t,a,n){function o(i,s){if(!a[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var c=a[i]={exports:{}};t[i][0].call(c.exports,function(e){var a=t[i][1][e];return o(a||e)},c,c.exports,e,t,a,n)}return a[i].exports}for(var r="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,t,a){"use strict";function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach(function(t){r(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i=$(".chart-row"),s=i.find(".loader"),l=i.find(".chart"),c=(i.find('[data-toggle="popover"]'),$("body"),$("#timeline-loader")),d=$("#timeline-chart"),u={};function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return e>0&&(n+="".concat(e," hrs ")),t>0&&(n+="".concat(t," min ")),0===e&&0===t&&a>0&&(n+="".concat(a," sec ")),n.substr(0,n.length-1)}function g(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=3600*e,n=Math.floor(a/3600),o=a%3600,r=Math.floor(o/60),i=parseInt(o%60);return t?{hours:n,minutes:r,seconds:i}:{hours:n,minutes:r}}function f(e,t){var a=[];return e.forEach(function(e){var n=e[t]?e:o(o({},e),{},r({},t,"Anonymous")),i=a.findIndex(function(e){return n[t].toLowerCase()===e[t].toLowerCase()});i>=0?(a[i].contributions+=n.contributions,a[i].speakers+=n.speakers):a.push(n)}),a}var p=function(e){var t=[];return["male","female","anonymous","others"].forEach(function(a){e.data.forEach(function(e){e.gender||(e.gender="anonymous"),a===e.gender&&t.push(o(o({},e),{},{gender:e.gender.charAt(0).toUpperCase()+e.gender.slice(1)}))})}),t};var h=function(e){u[e]&&(u[e].dispose(),delete u[e])},v=function(e,t){fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(e){c.hide().removeClass("d-flex"),d.removeClass("d-none"),k(e)}).catch(function(e){console.log(e)})},b=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};function C(e,t){Promise.all([fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)),fetch("/contributions/gender?language=".concat(e)),fetch("/contributions/age?language=".concat(e))]).then(function(e){return Promise.all(e.map(function(e){return e.json()}))}).then(function(t){try{s.hide().removeClass("d-flex"),l.removeClass("d-none");var a=p(t[1]),n=f(t[2].data,"age_group").sort(function(e,t){return Number(e.speakers)-Number(t.speakers)});k(t[0]),w(a),S(e),y(n),setTimeout(function(){fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"),fetch("https://fonts.googleapis.com/icon?family=Material+Icons"),fetch("css/notyf.min.css"),fetch("css/record.css")},2e3)}catch(e){console.log(e),s.show().addClass("d-flex"),l.addClass("d-none")}}).catch(function(e){console.log(e)})}var x=["#85A8F9","#B7D0FE","#316AFF","#294691"],y=function(e){var t=am4core.create("age-group-chart",am4charts.PieChart3D);t.data=e.slice(0,3).concat({age_group:"Others",speakers:e.slice(3).reduce(function(e,t){return e+Number(t.speakers)},0)}),t.paddingBottom=50,t.innerRadius=am4core.percent(40),t.depth=50,t.legend=new am4charts.Legend,t.legend.labels.template.fill=am4core.color("#000"),t.legend.valueLabels.template.fill=am4core.color("#000"),t.legend.labels.template.textDecoration="none",t.legend.valueLabels.template.textDecoration="none",t.legend.itemContainers.template.paddingTop=5,t.legend.itemContainers.template.paddingBottom=5,t.legend.labels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.align="right",t.legend.valueLabels.template.textAlign="start",t.legend.itemContainers.template.paddingLeft=20,t.legend.itemContainers.template.paddingRight=20;var a=t.series.push(new am4charts.PieSeries3D);a.labels.template.disabled=!0,a.ticks.template.disabled=!0,a.calculatePercent=!0,a.slices.template.tooltipText="{category}: [bold]{value.percent.formatNumber('#.0')}% ({value.value})[/]",a.dataFields.value="speakers",a.dataFields.depthValue="speakers",a.dataFields.category="age_group",a.slices.template.adapter.add("fill",function(e,t){return x[t.dataItem.index]}),u["age-group-chart"]=t},w=function(e){am4core.ready(function(){var t=am4core.create("gender-chart",am4charts.XYChart);e.forEach(function(e){var t=g(Number(e.hours_contributed),!0),a=t.hours,n=t.minutes,o=t.seconds;e.contributedHours=m(a,n,o)}),t.data=e;var a=t.xAxes.push(new am4charts.CategoryAxis);a.dataFields.category="gender",a.renderer.minGridDistance=20,a.renderer.labels.template.fill="#000",a.renderer.grid.template.disabled=!0,a.renderer.labels.template.fontSize=12,a.renderer.grid.template.location=0;var n=t.yAxes.push(new am4charts.ValueAxis);n.min=0,n.renderer.labels.template.fill="#000",n.renderer.grid.template.strokeDasharray="3,3",n.renderer.labels.template.fontSize=12,n.title.text="Number of hours",n.title.fontSize=12;var o=t.series.push(new am4charts.ColumnSeries);o.dataFields.valueY="hours_contributed",o.dataFields.categoryX="gender";var r=o.columns.template;r.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{gender}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left;">Speakers: <label>{speakers}</label></div>\n            </div>',r.adapter.add("fill",function(e,t){return x[x.length-1-t.dataItem.index]}),r.adapter.add("stroke",function(e,t){return x[x.length-1-t.dataItem.index]}),u["gender-chart"]=t})},k=function(e){am4core.ready(function(){am4core.useTheme(am4themes_animated);for(var t=am4core.create("timeline-chart",am4charts.XYChart),a=e.data,n=0;n<a.length;n++){a[n].month||(a[n].month=3*a[n].quarter),a[n].duration=new Date(a[n].year,a[n].month-1,1),a[n].year=String(a[n].year);var o=g(Number(a[n].cumulative_contributions),!0),r=o.hours,i=o.minutes,s=o.seconds,l=g(Number(a[n].cumulative_validations),!0),c=l.hours,d=l.minutes,m=l.seconds;a[n].contributedHours="".concat(r,"hrs ").concat(i,"mins ").concat(s,"secs"),a[n].validatedHours="".concat(c,"hrs ").concat(d,"mins ").concat(m,"secs")}t.data=a;var f=t.xAxes.push(new am4charts.DateAxis);f.renderer.minGridDistance=10,f.renderer.grid.template.disabled=!0,f.renderer.baseGrid.disabled=!1,f.renderer.labels.template.fill="#000",f.title.text="Time",f.renderer.labels.template.fontSize=12,f.title.fontSize=12;var p=t.yAxes.push(new am4charts.ValueAxis);p.min=0,p.renderer.minGridDistance=50,p.renderer.grid.template.strokeDasharray="3,3",p.renderer.labels.template.fill="#000",p.title.text="Number of hours",p.renderer.labels.template.fontSize=12,p.title.fontSize=12;var h=t.series.push(new am4charts.LineSeries);h.dataFields.dateX="duration",h.dataFields.valueY="cumulative_contributions",h.strokeWidth=3,h.tensionX=.8,h.tooltipHTML='\n            <div>\n                <h6 style="text-align: left; font-weight: bold">{month}/{year}</h6>\n                <div>Contributed: <label>{contributedHours}</label></div>\n                <div style="text-align: left; font-style: italic;">Validated: <label>{validatedHours}</label></div>\n            </div>',h.tooltip.getFillFromObject=!1,h.tooltip.autoTextColor=!1,h.tooltip.background.fill=am4core.color("#F1F1F2"),h.tooltip.label.fill=am4core.color("#000000"),h.sequencedInterpolation=!0,h.stroke=am4core.color("#FCC232"),h.name="Recorded";var v=t.series.push(new am4charts.LineSeries);v.dataFields.dateX="duration",v.dataFields.valueY="cumulative_validations",v.sequencedInterpolation=!0,v.tensionX=.8,v.strokeWidth=3,v.stroke=am4core.color("#83E661"),v.name="Validated",t.legend=new am4charts.Legend,t.legend.labels.template.fontSize=12,t.cursor=new am4charts.XYCursor,t.cursor.xAxis=f,u["timeline-chart"]=t})};function S(e){var t=!!e;b("/aggregate-data-count?byState=true&byLanguage=".concat(t)).then(function(a){!function(e){var t,a=$("#legendDiv"),n=Math.max.apply(Math,e.data.map(function(e){return Number(e.total_contributions)}));t=n>1?n/4:.25,e.data.forEach(function(e){var t=g(Number(e.total_contributions),!0),a=t.hours,n=t.minutes,o=t.seconds,r=g(Number(e.total_validations),!0),i=r.hours,s=r.minutes,l=r.seconds;e.contributed_time="".concat(a,"hrs ").concat(n,"mins ").concat(o,"sec"),e.validated_time="".concat(i,"hrs ").concat(s,"mins ").concat(l,"sec"),e.value=Number(e.total_contributions),e.id=e.state});var o=am4core.create("indiaMapChart",am4maps.MapChart);o.geodataSource.url="./js/states_india_geo.json",o.projection=new am4maps.projections.Miller;var r=new am4maps.MapPolygonSeries;o.seriesContainer.draggable=!1,o.seriesContainer.resizable=!1,o.maxZoomLevel=1,r.useGeodata=!0,r.data=e.data;var i=r.mapPolygons.template;i.tooltipHTML='<div><h6>{state}</h6> <div>{total_speakers} Speakers  <label style="margin-left: 32px">{contributed_time}</label></div> <div>Validated:  <label style="margin-left: 16px">{validated_time}</label></div></div>',i.nonScalingStroke=!0,i.strokeWidth=.5,i.fill=am4core.color("#fff"),i.states.create("hover").properties.fill=o.colors.getIndex(1).brighten(-.5),r.mapPolygons.template.adapter.add("fill",function(e,a){return a.dataItem?a.dataItem.value>=3*t?am4core.color("#4061BF"):a.dataItem.value>=2*t?am4core.color("#6B85CE"):a.dataItem.value>=t?am4core.color("#92A8E8"):a.dataItem.value>=0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):e}),o.series.push(r);var s=$("#quarter .legend-val"),l=$("#half .legend-val"),c=$("#threeQuarter .legend-val"),d=$("#full .legend-val"),u=g(t,!0),f=u.hours,p=u.minutes,h=u.seconds,v=g(2*t,!0),b=v.hours,C=v.minutes,x=v.seconds,y=g(3*t,!0),w=y.hours,k=y.minutes,S=y.seconds;s.text("0 - ".concat(m(f,p,h))),l.text("".concat(m(f,p,h)," - ").concat(m(b,C,x))),c.text("".concat(m(b,C,x)," - ").concat(m(w,k,S))),d.text("> ".concat(m(w,k,S))),a.removeClass("d-none").addClass("d-flex")}(t?function(e,t){var a={data:[]};return e.data.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&""!==e.state&&"anonymous"!==e.state.toLowerCase()&&a.data.push(e)}),a}(a,e):a)}).catch(function(e){console.log(e)})}t.exports={updateGraph:function(e,t,a){a?(h("timeline-chart"),c.show().addClass("d-flex"),d.addClass("d-none"),v(e,t)):(am4core.disposeAllCharts(),s.show().addClass("d-flex"),l.addClass("d-none"),c.addClass("d-none"),C(e,t))},buildGraphs:C,getOrderedGenderData:function(e){var t=[];return["Female","Male","Others","Anonymous"].forEach(function(a){e.forEach(function(e){if(a.toLowerCase()===e.gender.toLowerCase()){var n=t.findIndex(function(e){return a.toLowerCase()===e.gender.toLowerCase()});-1===n?t.push(e):t[n].count+=e.count}})}),t},getGenderData:p,getAgeGroupData:f,calculateTime:g,generateIndiaMap:S}},{}],2:[function(e,t,a){"use strict";var n,o=e("./draw-chart"),r=o.updateGraph,i=o.calculateTime,s=e("./speakerDetails"),l=s.testUserName,c=s.setStartRecordBtnToolTipContent,d=e("./utils").toggleFooterPosition,u="",m=function(e){return fetch("/aggregate-data-count?byLanguage=".concat(!!e)).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})},g=function(e,t){localStorage.setItem("previousLanguage",t);var a={languages:0,speakers:0,contributions:0,validations:0};if(t){var n=e.filter(function(e){return e.language.toLowerCase()===t.toLowerCase()});a.speakers=parseInt(n[0].total_speakers),a.contributions=parseFloat(n[0].total_contributions),a.validations=parseFloat(n[0].total_validations)}else e.forEach(function(e){a.languages++,a.speakers+=parseInt(e.total_speakers),a.contributions+=parseFloat(e.total_contributions),a.validations+=parseFloat(e.total_validations)});return a};function f(e){var t=$("#speaker-data"),a=t.find("#loader1"),o=t.find("#contribution-details"),s=t.find(".contribution-data"),l=$("#languages-wrapper"),c=$("#languages-value"),d=$("#speaker-value"),f=$("#contributed-value"),p=$("#validated-value"),h=$("#duration").find(".active")[0].dataset.value;m(e).then(function(t){try{var m=function(e,t){var a=!1;return!t||(e.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&(a=!0)}),a)}(t.data,e);if(t.last_updated_at?($("#data-updated").text(" ".concat(t.last_updated_at)),$("#data-updated").removeClass("d-none")):$("#data-updated").addClass("d-none"),m){a.removeClass("d-none"),l.addClass("d-none"),o.addClass("d-none"),r(e,h);var v=g(t.data,e),b=i(v.contributions.toFixed(3)),C=b.hours,x=b.minutes,y=b.seconds,w=i(v.validations.toFixed(3)),k=w.hours,S=w.minutes,L=w.seconds;v.languages?(c.text(v.languages),l.removeClass("d-none"),s.removeClass("col-12 col-md-4 col-lg-4 col-xl-4"),s.addClass("col-12 col-md-3 col-lg-3 col-xl-3")):(l.addClass("d-none"),s.removeClass("col-12 col-md-3 col-lg-3 col-xl-3"),s.addClass("col-12 col-md-4 col-lg-4 col-xl-4")),f.text("".concat(C,"h ").concat(x,"m ").concat(y,"s")),p.text("".concat(k,"h ").concat(S,"m ").concat(L,"s")),d.text(v.speakers),a.addClass("d-none"),o.removeClass("d-none")}else{var I=localStorage.getItem("previousLanguage");u=e,$("#language").val(I),$("#languageSelected").text(" ".concat(e,", ")),$("#no-data-found").removeClass("d-none"),n=setTimeout(function(){$("#no-data-found").addClass("d-none")},5e3)}}catch(e){console.log(e)}}).catch(function(e){console.log(e)})}$(document).ready(function(){localStorage.removeItem("previousLanguage");var e=$("#proceed-box"),t=e.parent(),a=$("#tnc"),o=document.querySelectorAll('input[name = "gender"]'),i=$("#username"),s=document.getElementById("mother-tongue"),m=document.getElementById("age");f(""),$("#language").on("change",function(e){f(e.target.value)}),$("#duration").on("click",function(e){var t=$("#duration").find("li.inactive"),a=$("#duration").find("li.active");t.removeClass("inactive").addClass("active"),a.removeClass("active").addClass("inactive");var n=e.target.dataset.value,o=$("#language option:selected").val();r(o,n,!0)}),$("#no-data-found").on("mouseenter touchstart",function(e){clearTimeout(n)}),$("#no-data-found").on("mouseleave touchend",function(e){n=setTimeout(function(){$("#no-data-found").addClass("d-none")},5e3)}),$("#contribute-now").on("click",function(e){localStorage.setItem("contributionLanguage",u)}),a.change(function(){var a=i.val().trim();this.checked&&!l(a)?(e.removeAttr("disabled").removeClass("point-none"),t.tooltip("disable")):(c(a,t),e.prop("disabled","true").addClass("point-none"),t.tooltip("enable"))}),e.on("click",function(){if(a.prop("checked")){var e=Array.from(o).filter(function(e){return e.checked}),t=e.length?e[0].value:"",n=i.val().trim().substring(0,12);if("English"!==u&&"Gujrati"!==u||(u="Odia"),l(n))return;var r={gender:t,age:m.value,motherTongue:s.value,userName:n,language:u};localStorage.setItem("speakerDetails",JSON.stringify(r)),location.href="/record"}}),d()})},{"./draw-chart":1,"./speakerDetails":3,"./utils":4}],3:[function(e,t,a){"use strict";function n(e,t,a){var n=e.val().trim();o(n)?(e.addClass("is-invalid"),t.removeClass("d-none")):(e.removeClass("is-invalid"),t.addClass("d-none")),a.trigger("change")}var o=function(e){return/^[6-9]\d{9}$/.test(e)||/^\S+@\S+[\.][0-9a-z]+$/.test(e)};t.exports={testUserName:o,validateUserName:n,setSpeakerDetails:function(e,t,a,o){var r=localStorage.getItem(e);if(r){var i=JSON.parse(r),s=document.querySelector('input[name = "gender"][value="'+i.gender+'"]');s&&(s.checked=!0,s.previous=!0),t.value=i.age,a.value=i.motherTongue,o.val(i.userName?i.userName.trim().substring(0,12):""),n(o,o.next(),$("#tnc"))}},resetSpeakerDetails:function(){var e=document.getElementById("age"),t=document.getElementById("mother-tongue"),a=document.getElementById("username"),n=document.querySelector('input[name = "gender"]:checked');n&&(n.checked=!1),e.selectedIndex=0,t.selectedIndex=0,a.value=""},setUserNameTooltip:function(e){e.val().length>11?(e.tooltip("enable"),e.tooltip("show")):(e.tooltip("disable"),e.tooltip("hide"))},setStartRecordBtnToolTipContent:function(e,t){o(e)?t.attr("data-original-title","Please validate any error message before proceeding"):t.attr("data-original-title","Please agree to the Terms and Conditions before proceeding")}}},{}],4:[function(e,t,a){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var n in t)if(t[n].startsWith("ip=")){a=t[n].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})}}},{}]},{},[2]);