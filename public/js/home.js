!function e(t,a,n){function r(l,i){if(!a[l]){if(!t[l]){var c="function"==typeof require&&require;if(!i&&c)return c(l,!0);if(o)return o(l,!0);throw new Error("Cannot find module '"+l+"'")}var s=a[l]={exports:{}};t[l][0].call(s.exports,function(e){var a=t[l][1][e];return r(a||e)},s,s.exports,e,t,a,n)}return a[l].exports}for(var o="function"==typeof require&&require,l=0;l<n.length;l++)r(n[l]);return r}({1:[function(e,t,a){"use strict";function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach(function(t){l(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i=$("#chart-row"),c=i.find(".loader"),s=i.find(".chart"),d=i.find('[data-toggle="popover"]'),u=$("body");function g(e){var t=[];return["Female","Male","Others","Anonymous"].forEach(function(a){e.forEach(function(e){if(a.toLowerCase()===e.gender.toLowerCase()){var n=t.findIndex(function(e){return a.toLowerCase()===e.gender.toLowerCase()});-1===n?t.push(e):t[n].count+=e.count}})}),t}function m(e,t){var a=[];return e.forEach(function(e){var n,r=e[t]?e:(l(n={},t,"Anonymous"),l(n,"count",e.count),n),o=a.findIndex(function(e){return r[t].toLowerCase()===e[t].toLowerCase()});o>=0?a[o].count+=r.count:a.push(r)}),a}function f(e){$.fn.popover.Constructor.Default.whiteList.table=[],$.fn.popover.Constructor.Default.whiteList.tbody=[],$.fn.popover.Constructor.Default.whiteList.tr=[],$.fn.popover.Constructor.Default.whiteList.td=[],fetch("/getAllInfo/".concat(e)).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(e){try{c.hide().removeClass("d-flex"),s.removeClass("d-none");var t=m(e.ageGroups,"age_group").sort(function(e,t){return Number(e.count)-Number(t.count)});b(t);var a=e.motherTongues.reduce(function(e,t){return e+Number(t.count)},0),n=m(e.motherTongues,"mother_tongue").sort(function(e,t){return Number(t.count)-Number(e.count)});C(n.slice(0,4),a,"mother-tongue-chart",!0),C(n,a,"modal-chart");var r=e.genderData.map(function(e){return e.gender?o(o({},e),{},{gender:e.gender.charAt(0).toUpperCase()+e.gender.slice(1)}):{gender:"Anonymous",count:e.count}}),l=g(r),i=new p;y(l),h(d.eq(0),i.createTableWithTwoColumns(n,"mother_tongue")),h(d.eq(1),i.createTableWithTwoColumns(t,"age_group")),h(d.eq(2),i.createTableWithOneColumn(r,"gender")),innerWidth<992&&$("#modal-chart-wrapper").find(".modal-dialog").addClass("w-90"),setTimeout(function(){fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"),fetch("https://fonts.googleapis.com/icon?family=Material+Icons"),fetch("css/notyf.min.css"),fetch("css/record.css")},2e3)}catch(e){console.log(e),c.show().addClass("d-flex"),s.addClass("d-none")}}).catch(function(e){console.log(e)})}var p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,a,r;return t=e,(a=[{key:"createColumn",value:function(e,t){return'<div class="'.concat(t,'">')+'<table class="table table-sm table-borderless mb-0"><tbody>'+e.join("")+"</tbody></table></div>"}},{key:"createTableWithTwoColumns",value:function(e,t){var a=e.length,n=Math.ceil(a/2),r=this.createTableRows(e.slice(0,n),t),o=this.createTableRows(e.slice(n,a),t);return'<div class="row">'+this.createColumn(r,"col-6")+this.createColumn(o,"col-6")+"</div>"}},{key:"createTableRows",value:function(e,t){return e.map(function(e){return"<tr><td>".concat(e[t],"</td><td>").concat(e.count,"</td></tr>")})}},{key:"createTableWithOneColumn",value:function(e,t){var a=this.createTableRows(e,t);return'<div class="row">'.concat(this.createColumn(a,"col"),"</div>")}}])&&n(t.prototype,a),r&&n(t,r),e}(),h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"<div></div>";e.on("mouseenter focus",function(){e.attr("data-content",t),e.popover("show"),u.children(".popover").on("mouseleave blur",function(){setTimeout(function(){u.children(".popover").find(":hover").length||e.is(":hover")||e.popover("hide")},300)})}).on("mouseleave blur",function(){setTimeout(function(){u.children(".popover").find(":hover").length||e.is(":hover")||e.popover("hide")},300)}),e.on("shown.bs.popover",function(){var e=u.children(".popover")[0];setTimeout(function(){var t=e.getBoundingClientRect();t.height+t.y>innerHeight&&e.scrollIntoView(!1)},0)})},v=["#3f80ff","#4D55A5","#735dc6","#68b7dc"],b=function(e){var t=am4core.create("age-group-chart",am4charts.PieChart3D);t.data=e.slice(0,3).concat({age_group:"Others",count:e.slice(3).reduce(function(e,t){return e+Number(t.count)},0)}),t.paddingBottom=50,t.innerRadius=am4core.percent(40),t.depth=50,t.legend=new am4charts.Legend,t.legend.labels.template.fill=am4core.color("#74798c"),t.legend.valueLabels.template.fill=am4core.color("#74798c"),t.legend.labels.template.textDecoration="none",t.legend.valueLabels.template.textDecoration="none",t.legend.itemContainers.template.paddingTop=5,t.legend.itemContainers.template.paddingBottom=5,t.legend.labels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.align="right",t.legend.valueLabels.template.textAlign="start";var a=t.series.push(new am4charts.PieSeries3D);a.labels.template.disabled=!0,a.ticks.template.disabled=!0,a.calculatePercent=!0,a.slices.template.tooltipText="{category}: [bold]{value.percent.formatNumber('#.0')}% ({value.value})[/]",a.dataFields.value="count",a.dataFields.depthValue="count",a.dataFields.category="age_group",a.slices.template.adapter.add("fill",function(e,t){return v[t.dataItem.index]})},C=function(e,t,a,n){var r=am4core.create(a,am4charts.XYChart3D);r.data=e;var o=r.xAxes.push(new am4charts.CategoryAxis);o.dataFields.category="mother_tongue",o.renderer.labels.template.rotation=270,o.renderer.labels.template.hideOversized=!1,o.renderer.minGridDistance=10,o.renderer.labels.template.horizontalCenter="right",o.renderer.labels.template.verticalCenter="middle",o.renderer.labels.template.fill="#74798c",o.renderer.grid.template.disabled=!0;var l=r.yAxes.push(new am4charts.ValueAxis);l.renderer.labels.template.fill="#74798c",l.renderer.grid.template.disabled=!1,l.renderer.baseGrid.disabled=!0;var i=r.series.push(new am4charts.ColumnSeries3D);i.dataFields.valueY="count",i.dataFields.categoryX="mother_tongue",i.calculatePercent=!0;var c=i.columns.template;c.tooltipText="{categoryX} : [bold]@@@% ({valueY.value})[/]",i.tooltip.label.adapter.add("text",function(e,a){return a.dataItem&&e?e.replace("@@@",(100*a.dataItem.valueY/t).toFixed(1)):""}),c.adapter.add("fill",function(e,t){return n?v[t.dataItem.index]:r.colors.getIndex(t.dataItem.index)})},y=function(e){am4core.ready(function(){var t=am4core.create("gender-chart",am4charts.XYChart3D);t.paddingBottom=30,t.paddingTop=5,t.data=e;var a=t.xAxes.push(new am4charts.CategoryAxis);a.dataFields.category="gender",a.renderer.minGridDistance=20,a.renderer.inside=!1,a.renderer.labels.template.fill="#74798c",a.renderer.grid.template.disabled=!0;var n=a.renderer.labels.template;n.rotation=-90,n.horizontalCenter="left",n.verticalCenter="middle",n.dy=10,n.inside=!1;var r=t.yAxes.push(new am4charts.ValueAxis);r.renderer.grid.template.disabled=!1,r.renderer.labels.template.fill="#74798c",r.renderer.baseGrid.disabled=!0;var o=t.series.push(new am4charts.ConeSeries);o.calculatePercent=!0,o.dataFields.valueY="count",o.dataFields.categoryX="gender",o.columns.template.tooltipText="{categoryX} : [bold]{valueY.percent.formatNumber('#.0')}% ({valueY.value})[/]";var l=o.columns.template;l.adapter.add("fill",function(e,t){return v[v.length-1-t.dataItem.index]}),l.adapter.add("stroke",function(e,t){return v[v.length-1-t.dataItem.index]})})};t.exports={Table:p,updateGraph:function(e){am4core.disposeAllCharts(),c.show().addClass("d-flex"),s.addClass("d-none"),f(e)},buildGraphs:f,getOrderedGenderData:g,getFormattedData:m}},{}],2:[function(e,t,a){"use strict";var n=e("./draw-chart"),r=n.updateGraph,o=n.buildGraphs,l=e("./utils").toggleFooterPosition,i=e("./speakerDetails"),c=i.validateUserName,s=i.testUserName,d=i.setSpeakerDetails,u=i.resetSpeakerDetails,g=i.setUserNameTooltip,m=i.setStartRecordBtnToolTipContent;function f(e){document.getElementById("start-record").innerText="START RECORDING IN ".concat(e.toUpperCase())}function p(e){var t=6*e,a=t%3600;return{hours:Math.floor(t/3600),minutes:Math.floor(a/60),seconds:a%60}}var h=function(e){return fetch("/getDetails/".concat(e)).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};function v(e){var t=$("#say-loader"),a=$("#listen-loader");t.removeClass("d-none"),a.removeClass("d-none");var n=localStorage.getItem("aggregateDataCountByLanguage"),r=JSON.parse(n).find(function(t){return t.language===e}),o=$("#say-p-3"),l=$("#listen-p-3");if(r){var i=r.total_contributions,c=r.total_validations;i&&o.text("".concat(i," hrs are recorded in ").concat(e)),c&&l.text("".concat(c," hrs are validated in ").concat(e))}else o.text("0 hr is recorded in ".concat(e)),l.text("0 hr is validated in ".concat(e));t.addClass("d-none"),a.addClass("d-none")}function b(e){var t=$("#speaker-data").find("#loader1,#loader2"),a=$("#speakers-wrapper"),n=$("#speaker-value"),r=$("#hours-wrapper"),o=$("#hour-value");t.removeClass("d-none"),r.addClass("d-none"),a.addClass("d-none"),h(e).then(function(e){try{var l=p(e.find(function(e){return 1===e.index}).count),i=l.hours,c=l.minutes,s=l.seconds;o.text("".concat(i,"h ").concat(c,"m ").concat(s,"s")),n.text(e.find(function(e){return 0===e.index}).count),t.addClass("d-none"),r.removeClass("d-none"),a.removeClass("d-none"),localStorage.setItem("speakersData",JSON.stringify(e))}catch(e){console.log(e)}}).catch(function(e){console.log(e)})}var C=function(){fetch("/aggregate-data-count?byLanguage=".concat(!0)).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")}).then(function(e){localStorage.setItem("aggregateDataCountByLanguage",JSON.stringify(e.data))}).catch(function(e){console.log(e)})},y=function(e,t,a){var n=a.children(),r=-1;n.each(function(e,a){a.getAttribute("value")===t&&(r=e)}),a.find(".active").removeClass("active");var o=document.getElementById("6th_option");r<0?(o.innerText=t,o.classList.remove("d-none"),o.classList.add("active"),o.setAttribute("value",t)):(n[r].classList.add("active"),o.classList.add("d-none"))},x=function(){var e=$("#language-nav-bar"),t=e.children(),a=$("#nav-bar-loader");fetch("/top-languages-by-hours").then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")}).then(function(n){console.log(n.data),n.data.forEach(function(e,a){t[a].setAttribute("value",e.language),t[a].innerText=e.language}),a.addClass("d-none"),e.removeClass("d-none")}).catch(function(e){console.log(e)})};$(document).ready(function(){var e,t=$("#proceed-box"),a=t.parent(),n=document.querySelectorAll('input[name = "gender"]'),i=document.getElementById("age"),p=document.getElementById("mother-tongue"),h=$("#username"),w=h.next(),T=$("#tnc"),k="Odia";T.prop("checked",!1),l(),a.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto"}),x();var D=$("#language-nav-bar"),O=$("#say-listen-language"),I=function(e,t){var a=0;return t.children().each(function(t,n){n.getAttribute("id")===e&&(a=t)}),t.children()[a]}(document.getElementById("home-page").getAttribute("default-lang"),O);console.log(I,"default targetted div"),e=I.getAttribute("value"),y(0,e,D),v(e),O.on("click",function(t){var a=t.target;e=a.getAttribute("value"),y(0,e,D),v(e)}),D.on("click",function(t){var a=t.target;e=a.getAttribute("value"),D.find(".active").removeClass("active"),$("#6th_option").addClass("d-none"),a.classList.add("active"),v(e)}),$("#start_recording").on("click",function(){k="Hindi"===e||"Odia"===e?e:"Hindi"}),C();var A="Odia";$("#language").on("change",function(e){b(A=e.target.value),f(A),r(A)}),$("#start-record").on("click",function(){k=A}),d("speakerDetails",i,p,h),n.forEach(function(e){e.addEventListener("click",function(e){e.target.previous&&(e.target.checked=!1),e.target.previous=e.target.checked})}),m(h.val().trim(),a),T.change(function(){var e=h.val().trim();this.checked&&!s(e)?(t.removeAttr("disabled").removeClass("point-none"),a.tooltip("disable")):(m(e,a),t.prop("disabled","true").addClass("point-none"),a.tooltip("enable"))}),h.on("input focus",function(){c(h,w,T),g(h)}),t.on("click",function(){if(T.prop("checked")){var e=Array.from(n).filter(function(e){return e.checked}),t=e.length?e[0].value:"",a=h.val().trim().substring(0,12);if(s(a))return;var r={gender:t,age:i.value,motherTongue:p.value,userName:a,language:k};localStorage.setItem("speakerDetails",JSON.stringify(r)),location.href="/record"}}),$("#userModal").on("shown.bs.modal",function(){$("#resetBtn").on("click",u),h.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto",trigger:"focus"}),g(h)});var L=$("#say"),P=$("#listen"),S=$("#listen-p-2"),N=$("#say-p-2");L.hover(function(){L.removeClass("col-lg-5"),P.removeClass("col-lg-5"),L.addClass("col-lg-6"),P.addClass("col-lg-4"),N.removeClass("d-none")},function(){L.removeClass("col-lg-6"),P.removeClass("col-lg-4"),L.addClass("col-lg-5"),P.addClass("col-lg-5"),N.addClass("d-none")}),P.hover(function(){L.removeClass("col-lg-5"),P.removeClass("col-lg-5"),P.addClass("col-lg-6"),L.addClass("col-lg-4"),S.removeClass("d-none")},function(){L.removeClass("col-lg-4"),P.removeClass("col-lg-6"),L.addClass("col-lg-5"),P.addClass("col-lg-5"),S.addClass("d-none")}),f("Odia"),b("Odia"),o("Odia")}),t.exports={updateLanguageInButton:f,updateLanguage:b,calculateTime:p,fetchDetail:h}},{"./draw-chart":1,"./speakerDetails":3,"./utils":4}],3:[function(e,t,a){"use strict";function n(e,t,a){var n=e.val().trim();r(n)?(e.addClass("is-invalid"),t.removeClass("d-none")):(e.removeClass("is-invalid"),t.addClass("d-none")),a.trigger("change")}var r=function(e){return/^[6-9]\d{9}$/.test(e)||/^\S+@\S+[\.][0-9a-z]+$/.test(e)};t.exports={testUserName:r,validateUserName:n,setSpeakerDetails:function(e,t,a,r){var o=localStorage.getItem(e);if(o){var l=JSON.parse(o),i=document.querySelector('input[name = "gender"][value="'+l.gender+'"]');i&&(i.checked=!0,i.previous=!0),t.value=l.age,a.value=l.motherTongue,r.val(l.userName?l.userName.trim().substring(0,12):""),n(r,r.next(),$("#tnc"))}},resetSpeakerDetails:function(){var e=document.getElementById("age"),t=document.getElementById("mother-tongue"),a=document.getElementById("username"),n=document.querySelector('input[name = "gender"]:checked');n&&(n.checked=!1),e.selectedIndex=0,t.selectedIndex=0,a.value=""},setUserNameTooltip:function(e){e.val().length>11?(e.tooltip("enable"),e.tooltip("show")):(e.tooltip("disable"),e.tooltip("hide"))},setStartRecordBtnToolTipContent:function(e,t){r(e)?t.attr("data-original-title","Please validate any error message before proceeding"):t.attr("data-original-title","Please agree to the Terms and Conditions before proceeding")}}},{}],4:[function(e,t,a){"use strict";t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("http://ip-api.com/json/?fields=country,regionName")}}},{}]},{},[2]);