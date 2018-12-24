// This script was built for the 2018 World Data Visualization Challange
// Specifically for the 'Good Goverment' data
// Dec 2018
// Paul Cunningham
// <><><><><><><><><><>

var margin = {top: 20, right: 20, bottom: 30, left: 50};
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var canvas = d3.select(".dataviz").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var background = canvas.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .attr("fill", d3.rgb(20,20,30))
  .attr("fill-opacity", 1)
  .attr("id", "Background");

//create group element
var paint = canvas.append("g");

// load histogram data
d3.csv("https://raw.githubusercontent.com/statsracecarstats/WorldDataVisualization/master/buckets.csv").then(function(s){
  var xorigin = 40; // x location for first graph
  var yorigin = 50; // y location for first graph
  var fs = 16; // font size
  var gap = 10; // gap between buckets
  var freqheight = 40; // height of freqaxis
  var countMax = d3.max(s, function(d) {return parseInt(d.Freq)});
  var freqaxis = d3.scaleLinear()
    .domain([0, countMax])
    .range([0, freqheight]);

  console.log(countMax)

  var output = paint.selectAll("g").data(s).enter();

  var pop = output
    .append("rect")
    .filter(function(d) {return d.Continent == "Asia"})
    .attr("class", "bars")
    .attr("x", function(d) {return d.Bucket*gap + xorigin})
    .attr("y", yorigin)
    .attr("height", function(d) {return freqaxis(d.Freq)})
    .attr("width", 7)
    .attr("fill", d3.rgb(11,117,208))
    .attr("id", "pop");

})
