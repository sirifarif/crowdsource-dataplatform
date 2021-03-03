!function e(t,r,a){function n(i,l){if(!r[i]){if(!t[i]){var s="function"==typeof require&&require;if(!l&&s)return s(i,!0);if(o)return o(i,!0);throw new Error("Cannot find module '"+i+"'")}var c=r[i]={exports:{}};t[i][0].call(c.exports,function(e){var r=t[i][1][e];return n(r||e)},c,c.exports,e,t,r,a)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<a.length;i++)n(a[i]);return n}({1:[function(e,t,r){"use strict";function a(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach(function(t){i(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=$(".chart-row"),s=l.find(".loader"),c=l.find(".chart");l.find('[data-toggle="popover"]'),$("body");function u(e,t){var r=[];return e.forEach(function(e){var a=e[t]?e:o(o({},e),{},i({},t,"Anonymous")),n=r.findIndex(function(e){return a[t].toLowerCase()===e[t].toLowerCase()});n>=0?(r[n].contributions+=a.contributions,r[n].speakers+=a.speakers):r.push(a)}),r}var d=function(e){var t=[];return["male","female","anonymous","others"].forEach(function(r){e.data.forEach(function(e){e.gender||(e.gender="anonymous"),r===e.gender&&t.push(o(o({},e),{},{gender:e.gender.charAt(0).toUpperCase()+e.gender.slice(1)}))})}),t};function m(e,t){$.fn.popover.Constructor.Default.whiteList.table=[],$.fn.popover.Constructor.Default.whiteList.tbody=[],$.fn.popover.Constructor.Default.whiteList.tr=[],$.fn.popover.Constructor.Default.whiteList.td=[],Promise.all([fetch("/timeline?language=".concat(e,"&timeframe=").concat(t)),fetch("/contributions/gender?language=".concat(e)),fetch("/contributions/age?language=".concat(e))]).then(function(e){return Promise.all(e.map(function(e){return e.json()}))}).then(function(e){try{s.hide().removeClass("d-flex"),c.removeClass("d-none");var t=d(e[1]),r=u(e[2].data,"age_group").sort(function(e,t){return Number(e.speakers)-Number(t.speakers)});g(e[0]),b(t),h(r),setTimeout(function(){fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"),fetch("https://fonts.googleapis.com/icon?family=Material+Icons"),fetch("css/notyf.min.css"),fetch("css/record.css")},2e3)}catch(e){console.log(e),s.show().addClass("d-flex"),c.addClass("d-none")}}).catch(function(e){console.log(e)})}var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n;return t=e,(r=[{key:"createColumn",value:function(e,t){return'<div class="'.concat(t,'">')+'<table class="table table-sm table-borderless mb-0"><tbody>'+e.join("")+"</tbody></table></div>"}},{key:"createTableWithTwoColumns",value:function(e,t){var r=e.length,a=Math.ceil(r/2),n=this.createTableRows(e.slice(0,a),t),o=this.createTableRows(e.slice(a,r),t);return'<div class="row">'+this.createColumn(n,"col-6")+this.createColumn(o,"col-6")+"</div>"}},{key:"createTableRows",value:function(e,t){return e.map(function(e){return"<tr><td>".concat(e[t],"</td><td>").concat(e.count,"</td></tr>")})}},{key:"createTableWithOneColumn",value:function(e,t){var r=this.createTableRows(e,t);return'<div class="row">'.concat(this.createColumn(r,"col"),"</div>")}}])&&a(t.prototype,r),n&&a(t,n),e}(),p=["#85A8F9","#B7D0FE","#316AFF","#294691"],h=function(e){var t=am4core.create("age-group-chart",am4charts.PieChart3D);t.data=e.slice(0,3).concat({age_group:"Others",speakers:e.slice(3).reduce(function(e,t){return e+Number(t.speakers)},0)}),t.paddingBottom=50,t.innerRadius=am4core.percent(40),t.depth=50,t.legend=new am4charts.Legend,t.legend.labels.template.fill=am4core.color("#74798c"),t.legend.valueLabels.template.fill=am4core.color("#74798c"),t.legend.labels.template.textDecoration="none",t.legend.valueLabels.template.textDecoration="none",t.legend.itemContainers.template.paddingTop=5,t.legend.itemContainers.template.paddingBottom=5,t.legend.labels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.states.getKey("active").properties.textDecoration="line-through",t.legend.valueLabels.template.align="right",t.legend.valueLabels.template.textAlign="start";var r=t.series.push(new am4charts.PieSeries3D);r.labels.template.disabled=!0,r.ticks.template.disabled=!0,r.calculatePercent=!0,r.slices.template.tooltipText="{category}: [bold]{value.percent.formatNumber('#.0')}% ({value.value})[/]",r.dataFields.value="speakers",r.dataFields.depthValue="speakers",r.dataFields.category="age_group",r.slices.template.adapter.add("fill",function(e,t){return p[t.dataItem.index]})},b=function(e){am4core.ready(function(){var t=am4core.create("gender-chart",am4charts.XYChart);t.data=e;var r=t.xAxes.push(new am4charts.CategoryAxis);r.dataFields.category="gender",r.renderer.minGridDistance=20,r.renderer.labels.template.fill="#000",r.renderer.grid.template.disabled=!0,r.renderer.baseGrid.disabled=!1,r.renderer.labels.template.fontSize=12;var a=t.yAxes.push(new am4charts.ValueAxis);a.renderer.grid.template.disabled=!1,a.renderer.labels.template.fill="#000",a.renderer.grid.template.strokeDasharray="3,3",a.renderer.labels.template.fontSize=12,a.title.text="Number of hours",a.title.fontSize=12;var n=t.series.push(new am4charts.ColumnSeries);n.calculatePercent=!0,n.dataFields.valueY="speakers",n.dataFields.categoryX="gender",n.columns.template.tooltipText="{categoryX} : [bold]{valueY.percent.formatNumber('#.0')}% ({valueY.value})[/]";var o=n.columns.template;o.adapter.add("fill",function(e,t){return p[p.length-1-t.dataItem.index]}),o.adapter.add("stroke",function(e,t){return p[p.length-1-t.dataItem.index]})})},g=function(e){am4core.ready(function(){am4core.useTheme(am4themes_animated);for(var t=am4core.create("timeline-chart",am4charts.XYChart),r=e.data,a=0;a<r.length;a++)r[a].duration=new Date(r[a].year,r[a].month-1,1);t.data=r;var n=t.xAxes.push(new am4charts.DateAxis);n.renderer.minGridDistance=10,n.renderer.grid.template.disabled=!0,n.renderer.baseGrid.disabled=!1,n.renderer.labels.template.fill="#000",n.title.text="Time",n.renderer.labels.template.fontSize=12,n.title.fontSize=12;var o=t.yAxes.push(new am4charts.ValueAxis);o.min=0,o.renderer.minGridDistance=50,o.renderer.grid.template.strokeDasharray="3,3",o.renderer.labels.template.fill="#000",o.title.text="Number of hours",o.renderer.labels.template.fontSize=12,o.title.fontSize=12,t.numberFormatter.numberFormat="#a";var i=t.series.push(new am4charts.LineSeries);i.dataFields.dateX="duration",i.dataFields.valueY="cumulative_contributions",i.strokeWidth=3,i.tensionX=.8,i.tooltipText="Contributions: {cumulative_contributions} Validations: {cumulative_validations}",i.sequencedInterpolation=!0,i.stroke=am4core.color("#FCC232"),i.name="Recorded";var l=t.series.push(new am4charts.LineSeries);l.dataFields.dateX="duration",l.dataFields.valueY="cumulative_validations",l.sequencedInterpolation=!0,l.tensionX=.8,l.strokeWidth=3,l.stroke=am4core.color("#83E661"),l.name="Validated",t.legend=new am4charts.Legend,t.legend.labels.template.fontSize=12,t.cursor=new am4charts.XYCursor,t.cursor.xAxis=n})};t.exports={Table:f,updateGraph:function(e,t){am4core.disposeAllCharts(),s.show().addClass("d-flex"),c.addClass("d-none"),m(e,t)},buildGraphs:m,getOrderedGenderData:function(e){var t=[];return["Female","Male","Others","Anonymous"].forEach(function(r){e.forEach(function(e){if(r.toLowerCase()===e.gender.toLowerCase()){var a=t.findIndex(function(e){return r.toLowerCase()===e.gender.toLowerCase()});-1===a?t.push(e):t[a].count+=e.count}})}),t},getGenderData:d,getAgeGroupData:u}},{}]},{},[1]);