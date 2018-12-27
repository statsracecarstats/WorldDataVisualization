// This script was built for the 2018 World Data Visualization Challange
// Specifically for the 'Good Goverment' data
// Dec 2018
// Paul Cunningham
// <><><><><><><><><><>

var margin = {top: 20, right: 20, bottom: 30, left: 50};
  width = 1000 - margin.left - margin.right,
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
  // <><>< Indvidual Plot definition variables ><><>
  var xorigin = 40; // x location for first graph
  var yorigin = 60; // y location for first graph
  var fs = 16; // font size
  var gap = 10; // gap between buckets
  var freqheight = 40; // height of freqaxis
  //<><>< Overall sheet definition variables ><><>
  var graphgap = 15; // gap between graphs
  // set up range for buckets (1-10)
  var bucketaxis=d3.scaleLinear()
    .domain([1, 10])
    .range([xorigin, 10*gap+xorigin]);

  //line fucntion
  var line = d3.line()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y(function(d) {return freqaxis(d.Freq)})
    .curve(d3.curveMonotoneX);

  //area function
  var area = d3.area()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y1(function(d) {return freqaxis(d.Freq)})
    .y0(freqheight + yorigin)
    .curve(d3.curveMonotoneX);

  var i; //iteratvie value for for loop

  for (i = 0; i<=6; i++) {
    switch(i) {
      case 0:
        var filterval = "UN Security Council";
        break;
      case 1:
        var filterval = "Asia";
        break;
      case 2:
        var filterval = "Africa"
        break;
      case 3:
        var filterval = "Europe"
        break;
      case 4:
        var filterval = "North America"
        break;
      case 5:
        var filterval = "South America"
        break;
      case 6:
        var filterval = "Oceania"
        break;
    } // switch (i)
  // sum of all entries in buckets
  var cumulative = d3.sum(s.filter(function(d) {return d.Continent == filterval}),
    function(d) {return parseInt(d.Freq)});
  // set up range for frequency based on total number of entires (displaying ratio)
  var freqaxis = d3.scaleLinear()
    .domain([0, cumulative])
    .range([freqheight + yorigin, yorigin]);
  console.log(cumulative);
  console.log(filterval);
  // data bount object in g
  var output = paint.selectAll("g").data(s).enter()
    .filter(function(d) {return d.Continent == filterval});

  //area display
  var popA = canvas.append("g")
    .append("path")
    .attr("class", "distArea")
    .attr("d", area(s.filter(function(d) {return d.Continent == filterval})))
    .attr("id", "popF" + filterval)
    .attr("transform", "translate(" + (10*gap + graphgap)*i + ",0)");
  // line dsiplay
  var pop = canvas.append("g")
    .append("path")
    .attr("class", "dist")
    .attr("d",  line(s.filter(function(d) {return d.Continent == filterval})))
    .attr("id", "pop" + filterval)
    .attr("transform", "translate(" + (10*gap + graphgap)*i + ",0)");

  }// for loop, i


})// call back function for csv (s)
