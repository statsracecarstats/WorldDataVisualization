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
  var xorigin = 240; // x location for first graph
  var yorigin = 150; // y location for first graph
  var fs = 16; // font size
  var gap = 10; // gap between buckets
  var freqheight = 40; // height of freqaxis
  var countMax = d3.max(s, function(d) {return parseInt(d.Freq)});
  var freqaxis = d3.scaleLinear()
    .domain([0, countMax])
    .range([freqheight + yorigin, yorigin]);

  var bucketaxis=d3.scaleLinear()
    .domain([1, 10])
    .range([xorigin, 10*gap+xorigin]);

  console.log(countMax);

  var outputEurope = paint.selectAll("g").data(s).enter()
    .filter(function(d) {return d.Continent == "Europe"});

  var pathline = d3.line()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y(function(d) {return freqaxis(d.Freq)});

  var pop = outputEurope
    .append("path")
    .attr("class", "dist")
    .attr("d",  pathline)
    .attr("fill", "none")
    .attr("id", "pop");

  var popc = outputEurope
    .append("circle")
    .attr("cx", function(d) {return bucketaxis(d.Bucket)})
    .attr("cy", function(d) {return freqaxis(d.Freq)})
    .attr("fill", "blue")
    .attr("id", "dots")
    .attr("r", 3);



})
