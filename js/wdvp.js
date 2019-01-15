// This script was built for the 2018 World Data Visualization Challange
// Specifically for the 'Good Goverment' data
// Dec 2018
// Paul Cunningham
// <><><><><><><><><><>

var h = 2780;
var w = 1650;

var margin = {top: 0, right: 0, bottom: 0, left: 0};
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

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
d3.csv("https://raw.githubusercontent.com/statsracecarstats/WorldDataVisualization/master/Merged_buckets_UTF2.csv").then(function(s){
  // <><>< Indvidual Plot definition variables ><><>
  var xorigin = 335; // x location for first graph
  var yorigin = 260; // y location for first graph
  var fs = 16; // font size
  var gap = 10; // gap between buckets
  var freqheight = 55; // height of freqaxis
  //country colors
  var Countrycolor0 = d3.rgb(249, 252, 60);
  var Countrycolor1 = d3.rgb(116, 208, 11);
  var Countrycolor2 = d3.rgb(11,117,208);
  var Countrycolor3 = d3.rgb(178, 42, 212);
  var Countrycolor4 = d3.rgb(208, 11, 116);
  var Countrycolor5 = d3.rgb(212, 71, 79);
  var Countrycolor6 = d3.rgb(222,136,15);
  var countryoffsety = 100;
  // <><>< Title Variables ><><>
  var titley = 50;
  var titlex = xorigin + 100;
  var toffset = 23;
  var poffsety = 17;
  var poffsetx = 220;
  // <><>< Key Variables ><><>
  var keyi = 10;
  var keyc = -2.5;
  // <><>< Axis definition ><><>
  var vaxisoffset = 5; // in x direction how far axis is off from yorigin
  var vaxisend = 2; // half the size of the butt end
  var vaxistextoffset = 2; // offset of text from axis
  var cattextline = 13; // vertical line hieght for category information
  var catoffset = 0; // where to start category information from xorigin
  // set up range for buckets (1-10)
  var bucketaxis=d3.scaleLinear()
    .domain([0, 11])
    .range([xorigin, 10*gap+xorigin]);

  // <><>< heading variables ><><>
  var headingoffset = 10;
  // Vertical axis path - path for vertical axis
  var Vaxispath = [{"x": xorigin-(vaxisoffset+vaxisend), "y": freqheight+yorigin},
                  {"x": xorigin-(vaxisoffset-vaxisend), "y": freqheight+yorigin},
                  {"x": xorigin-vaxisoffset, "y": freqheight+yorigin},
                  {"x": xorigin-vaxisoffset, "y": yorigin},
                  {"x": xorigin-(vaxisoffset-vaxisend), "y": yorigin},
                  {"x": xorigin-(vaxisoffset+vaxisend), "y": yorigin}];
  var Haxispath = [{"x": bucketaxis(1), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(1), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(2), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(2), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(2), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(3), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(3), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(3), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(4), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(4), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(4), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(5), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(5), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(5), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(6), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(6), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(6), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(7), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(7), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(7), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(8), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(8), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(8), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(9), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(9), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(9), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(10), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(10), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(10), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(11), "y": freqheight + yorigin + vaxisoffset},
                  {"x": bucketaxis(11), "y": freqheight + yorigin + vaxisoffset - vaxisend},
                  {"x": bucketaxis(11), "y": freqheight + yorigin + vaxisoffset}];
  //<><>< Overall sheet definition variables ><><>
  var graphgap = 15; // gap between graphs
  var vertgap = 20; // gap between graphs in vertical direction

  //line fucntion
  var line = d3.line()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y(function(d) {return freqaxis(d.Freq)})
    .curve(d3.curveStepAfter);

  var linend = d3.line()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y(function(d) {return freqaxis(d.Freq)})
    .curve(d3.curveLinear);


  //area function
  var area = d3.area()
    .x(function(d) {return bucketaxis(d.Bucket)})
    .y1(function(d) {return freqaxis(d.Freq)})
    .y0(freqheight + yorigin)
    .curve(d3.curveStepAfter);
  // <><><><>< Vertical axis Assembly ><><><><>
  // line fucntion for axis
  var axisline = d3.line()
    .x(function(d) {return d.x})
    .y(function(d) {return d.y});


  //title
  var title = canvas.append("g")
    .append("text")
    .attr("class", "heading3")
    .attr("x", titlex)
    .attr("y", titley)
    .text("Measuring ");

  for(t=0; t <= 6; t++){
    switch(t){
      case 0:
        var sc = Countrycolor0;
        var titxt = "Wo";
      break;
      case 1:
        var sc = Countrycolor1;
        var titxt = "rl";
      break;
      case 2:
        var sc = Countrycolor2;
        var titxt = "d Go";
      break;
      case 3:
        var sc = Countrycolor3;
        var titxt = "ve";
      break;
      case 4:
        var sc = Countrycolor4;
        var titxt = "rn";
      break;
      case 5:
        var sc = Countrycolor5;
        var titxt = "me";
      break;
      case 6:
        var sc = Countrycolor6;
        var titxt = "nts";
      break;
    };// swtich t

    title.append("tspan")
    .text(titxt)
    .style("fill", sc);
  }// for loop t
  //overall description paragraph
  var p = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", xorigin - poffsetx)
    .attr("y", titley + toffset)
    .style("text-anchor", "start")
    .style("font-size", 13)
    .text("Data shown for 195 countries from 31 measures ranging from physical characteristics to economic indexes and happiness surveys. Each measure is binned into 10 equal sized buckets and each");

  var p = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", xorigin - poffsetx)
    .attr("y", titley + toffset + poffsety)
    .style("text-anchor", "start")
    .style("font-size", 13)
    .text(" country is placed in a bucket based on its value for the measure. One country from each continent is highlighted so you can trace it through each category to see what correlations may exist.");


  // set key x and y locations
  var keyx = (10*gap + graphgap) * keyi + xorigin;
  var keyy = (freqheight + vertgap) * keyc + yorigin
  // build vertical axis
  var axis = canvas.append("g")
    .append("path")
    .attr("class", "maxis")
    .attr("d", axisline(Vaxispath))
    .attr("id", "vertaxis")
    .attr("transform", "translate(" + (10*gap + graphgap) * keyi + "," + (freqheight + vertgap) * keyc + ")");

  // add Key title
  var keytitle = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading3")
    .attr("x", keyx -40)
    .attr("y", keyy - freqheight/2)
    .text("Key")
    //.style("font-weight", 700)
    .style("text-anchor", "middle")
    .style("font-size", 30);
  //key outline
  var keyoutline = canvas.append("g")
    .append("rect")
    .attr("x", keyx - 200)
    .attr("y", keyy - freqheight/2 - 31)
    .attr("width", 340)
    .attr("height", 236)
    .attr("stroke", d3.rgb(200,200,200))
    .attr("stroke-width", 0.8)
    .attr("fill", "none")
    .attr("rx", 6)
    .attr("ry", 6);
  //titles
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*2)
    .text("Measure Name");
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*3)
    .style("text-anchor", "start")
    .text("(-) signifies lower value");
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*4)
    .style("text-anchor", "start")
    .text(" is better");
  var keymm = canvas.append("g")
    .append("text")
    .attr("class", "heading")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*6)
    .style("text-anchor", "start")
    .text("Min");
  keymm.append("tspan")
    .attr("class", "heading2")
    .text(" and ");
  keymm.append("tspan")
    .text("Max");
  keymm.append("tspan")
    .attr("class", "heading2")
    .text(" values");

  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*7)
    .style("text-anchor", "start")
    .text("listed with country");
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*8)
    .style("text-anchor", "start")
    .text("that reprsents the value");
  var keyBr = canvas.append("g")
    .append("text")
    .attr("class", "heading")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*10)
    .style("text-anchor", "start")
    .text("Bucket Range:");
  keyBr.append("tspan")
    .attr("class", "heading2")
    .text(" difference");
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*11)
    .style("text-anchor", "start")
    .text("between each bucket");
  // definition of adj avg bucket
  var keyadj = canvas.append("g")
    .append("text")
    .attr("class", "heading")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*15)
    .style("text-anchor", "start")
    .text("Adj avg Bucket: ");
  keyadj.append("tspan")
    .attr("class", "heading2")
    .text("Measures denoted with '(-)' have their bucket")
  var keyoutline = canvas.append("g")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - 180)
    .attr("y", keyy - freqheight/2 + 12*16)
    .style("text-anchor", "start")
    .text("value inverted (i.e 10=1, 9=2) to calculate the average");


  // add key information
  //No data label
  var keyND = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .text("No Data")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + keyx + "," + (keyy + freqheight + vaxisoffset*2) + ") rotate(75)");
  //country highlight
  var keyND = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .text("Focus Country's")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + (keyx+6.8*gap) + "," + (keyy + freqheight - 14) + ") rotate(-60)");
  var keyND = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .text("bucket is highlighted")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + (keyx+6.8*gap + 12) + "," + (keyy + freqheight - 10) + ") rotate(-60)");
  //x axis label
  var keyxaxis = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx + gap*2.5)
    .attr("y", keyy + freqheight+vaxisoffset*4)
    .text("Buckets 1 - 10")
    .style("text-anchor", "start");
  // y axis label, line 1
  var keyyaxis = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .text("Percent of Countries")
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (keyx - vaxisoffset*10) + "," + (keyy + freqheight/1.9) + ") rotate(-90)");
  // y axis label, line 2
  var keyyaxis = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .text("from Continent")
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (keyx - vaxisoffset*7) + "," + (keyy + freqheight/1.9) + ") rotate(-90)");
  // Descriptive information
  var keyyaxis = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - vaxisoffset*4)
    .attr("y", keyy + freqheight*2.15)
    .text("Min value found in bucket 1")
    .style("text-anchor", "start");
  var keyyaxis = canvas.append("g").append("a")
    .append("text")
    .attr("class", "heading2")
    .attr("x", keyx - vaxisoffset*4)
    .attr("y", keyy + freqheight*2.35)
    .text("Max value found in bucket 10")
    .style("text-anchor", "start");




  var axistxt = canvas.append("g").append("a")
    .append("text")
    .attr("class", "textaxis")
    .attr("x", keyx - vaxisoffset - vaxisend - vaxistextoffset)
    .attr("y", keyy + freqheight)
    .text("0%");

  var axistxt = canvas.append("g").append("a")
    .append("text")
    .attr("class", "textaxis")
    .attr("x", keyx - vaxisoffset - vaxisend - vaxistextoffset)
    .attr("y", keyy)
    .attr("alignment-baseline", "mathematical")
    .text("100%");
  // build horizontal axis
  var axish = canvas.append("g")
    .append("path")
    .attr("class", "maxis")
    .attr("d", axisline(Haxispath))
    .attr("id", "hortaxis")
    .attr("transform", "translate(" + (10*gap + graphgap) * keyi + "," + (freqheight + vertgap) * keyc + ")");

  //<><>< assemble graphs ><><><>
  // filter for Country

  var i; // iteratvie value for for loop of continents
  var c; // iterative value for for loop of categories

  for (c = 0; c <= 30; c++) {
    switch(c) {
      case 0:
        var filtercat = "Population"; // category to find in data set
        var line1 = "Population"; //first line to display
        var unit = "People"; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
        var line2 = "A count of permanent residents.";
        var line3 = "";
        var line4 = "Data collected in 2018 by Wolrd Bank [1]";
        var link = "https://data.worldbank.org/indicator/SP.POP.TOTL"
      break;
      case 1:
        var filtercat = "Surface Area (Km2)";
        var line1 = "Surface Area";
        var unit = "km\u00B2"; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
        var line2 = "Measure of land area within";
        var line3 = " the country's borders.";
        var line4 = "Data collected in 2018 by CIA World Factbook [2]";
        var link = "https://www.cia.gov/library/publications/the-world-factbook/fields/2147.html#al"
      break;
      case 2:
        var filtercat = "GINI Index";
        var line1 = "GINI Index (-)";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
        var line2 = "Measure of the degree of inequality in the distribution of family income.";
        var line3 = "The tighter a country's income distribution, the lower its GINI index.";
        var line4 = "Data collected by CIA World Factbook [3]";
        var link = "https://www.cia.gov/library/publications/the-world-factbook/rankorder/2172rank.html";
      break;
      case 3:
        var filtercat = "Happy Planet Index";
        var line1 = "Happy Planet Index";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
        var line2 = "Measure of sustainable well-being for all. The index is calculated by dividing the sum";
        var line3 = " of Well-being, Life Expectancy, and Inequality of Outcomes by Ecological Footprint.";
        var line4 = "Data collected in 2016 by Happy Planet Index [4]";
        var link = "http://happyplanetindex.org/";
      break;
      case 4:
        var filtercat = "Human Development Index";
        var line1 = "Human Development Index";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
        var line2 = "Summary measure of the average achievement in dimensions of human development:";
        var line3 = " a long healthy life, being knowledgeable, and standard of living.";
        var line4 = "Data collected in 2017 by World Happiness Report [5]";
        var link = "http://worldhappiness.report/ed/2018/";
      break;
      case 5:
        var filtercat = "World Happiness Report Score";
        var line1 = "World Happiness Report Score";
        var unit = ""; // unit of measure
        var line2 = "Survey on the state of global happiness. Happiness score is based on the pooled results";
        var line3 = " from the Gallup World Poll surveys from 2015-2017 (scores range from 0-10).";
        var line4 = "Data collected in 2017 by World Happiness Report [6]";
        var link = "http://hdr.undp.org/en/data#";
      break;
      case 6:
        var filtercat = "Sustainable Economic Development Assessment (SEDA)";
        var line1 = "Sustainable Economic Development Assessment";
        var unit = "";
        var line2 = "Score for a country to provide insight into the relative well-being of a country's";
        var line3 = " citizens and how effectively a country converts wealth into well-being.";
        var line4 = "Data collected in 2017 by Boston Consulting Group [7]";
        var link = "https://www.bcg.com/en-gb/publications/interactives/seda-2018-guide.aspx";
      break;
      case 7:
        var filtercat = "GDP (Billions PPP)";
        var line1 = "GDP";
        var unit = "Billion PPP";
        var line2 = "Monetary measure of the market value of all ";
        var line3 = " final goods and services produced.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 8:
        var filtercat = "GDP per Capita (PPP)";
        var line1 = "GDP per Capita";
        var unit = "PPP";
        var line2 = "GDP per person living in a country.";
        var line3 = "";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 9:
        var filtercat = "GDP Growth (Annual %)";
        var line1 = "GDP Growth";
        var unit = "Annual %";
        var line2 = "Annual growth of GDP. ";
        var line3 = "";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 10:
        var filtercat = "Health Expenditure % of GDP";
        var line1 = "Health Expenditure";
        var unit = "% of GDP";
        var line2 = "Level of current health expenditure expressed as percentage";
        var line3 = " of GDP. Does Not include capital health expenditures.";
        var line4 = "Data collected in in 2015 by World Bank [9]";
        var link = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS";
      break;
      case 11:
        var filtercat = "Health Expenditure Per Person";
        var line1 = "Health Expenditure per Person";
        var unit = "$";
        var line2 = "Level of current health expenditure expressed per person.";
        var line3 = " Does Not include capital health expenditures.";
        var line4 = "Data collected in in 2015 by World Bank [10]";
        var link = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PP.CD";
      break;
      case 12:
        var filtercat = "Education Expenditure% Of Gdp";
        var line1 = "Education Expenditure";
        var unit = "% of GDP";
        var line2 = "Goverment expenditure on education (current, capital, and transfers)";
        var line3 = " expressed as a percentage of GDP.";
        var line4 = "Data collected in in 2014 by World Bank [11]";
        var link = "https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?view=chart";
      break;
      case 13:
        var filtercat = "Education Expenditure Per Person ";
        var line1 = "Education Expenditure per Person";
        var unit = "$";
        var line2 = "Goverment expenditure on education (current, capital, and transfers)";
        var line3 = " expressed per person.";
        var line4 = "Calculated by information is beautiful using 2014 data[12]";
        var link = "https://docs.google.com/spreadsheets/d/11LhOlwsloUuA495r-04IDwciMqNrLwWGpveqpF61WXU/edit#gid=0";
      break;
      case 14:
        var filtercat = "School Life Expectancy (Years)";
        var line1 = "School Life Expectancy";
        var unit = "Years";
        var line2 = "Average time spent in school,";
        var line3 = " primary to tertiary.";
        var line4 = "Data collected in in 2018 by CIA World Factbook [13]";
        var link = "https://www.cia.gov/library/publications/the-world-factbook/fields/2205.html#202";
      break;
      case 15:
        var filtercat = "Unemployment (%)";
        var line1 = "Unemployment (-)";
        var unit = "%";
        var line2 = "Percent of working age population that does not";
        var line3 = " have a full-time job.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 31:
        var filtercat = "Government Spending Score";
        var line1 = "Government Spending Score";
        var unit = "";
        var line2 = "Score measuring the burden of government spending,";
        var line3 = " the lower the score the better.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 16:
        var filtercat = "Government Expenditure (% Of Gdp)";
        var line1 = "Government Expenditure";
        var unit = "% of GDP";
        var line2 = "Amount government spends expressed";
        var line3 = " as a percent of the country's GDP.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 17:
        var filtercat = "Political Rights Score ";
        var line1 = "Political Rights Score (-)";
        var unit = "";
        var line2 = "Score that represents overall freedom of a country's politcal system.";
        var line3 = " 1 representing the greatest degree of freedom and 7 being the least.";
        var line4 = "Data collected in in 2017 by Freedom House [14]";
        var link = "https://freedomhouse.org/content/freedom-world-data-and-resources";
      break;
      case 18:
        var filtercat = "Civil Liberties Score ";
        var line1 = "Civil Liberties Score (-)";
        var unit = "";
        var line2 = "Score that represents overall presence and protection of a country's civl liberties.";
        var line3 = " 1 representing the greatest degree of civil liberties and 7 being the least.";
        var line4 = "Data collected in in 2017 by Freedom House [14]";
        var link = "https://freedomhouse.org/content/freedom-world-data-and-resources";
      break;
      case 19:
        var filtercat = "Political Stability & Absence Of Violence";
        var line1 = "Political Stability & Absence Of Violence";
        var unit = "";
        var line2 = "Measure of the likelihood of political instability and/or ";
        var line3 = " politically-motivated violence, including terrorism."
        var line4 = "Data collected in in 2017 by World Bank [15]";
        var link = "http://info.worldbank.org/governance/wgi/#home";
      break;
      case 20:
        var filtercat = "Government Effectiveness";
        var line1 = "Government Effectiveness";
        var unit = "";
        var line2 = "Measure of quality of public and civil services. Along with quality of policy formulation";
        var line3 = " and implementation and the credibility of the governments commitments to such policies."
        var line4 = "Data collected in in 2017 by World Bank [15]";
        var link = "http://info.worldbank.org/governance/wgi/#home";
      break;
      case 21:
        var filtercat = "Regulatory Quality";
        var line1 = "Regulatory Quality";
        var unit = "";
        var line2 = "Measure of the governments ability to formulate and implement sound policies and";
        var line3 = " regulations that permit and promote private sector development."
        var line4 = "Data collected in in 2017 by World Bank [15]";
        var link = "http://info.worldbank.org/governance/wgi/#home";
      break;
      case 22:
        var filtercat = "Rule Of Law";
        var line1 = "Rule Of Law";
        var unit = "";
        var line2 = "Measure of agents confidence in rules of socitety and extent to which they follow them. Specifically";
        var line3 = "quality of contract enforcement, property rights, police, and the courts; as well as likelihood of crime."
        var line4 = "Data collected in in 2017 by World Bank [15]";
        var link = "http://info.worldbank.org/governance/wgi/#home";
      break;
      case 23:
        var filtercat = "Control Of Corruption";
        var line1 = "Control Of Corruption";
        var unit = "";
        var line2 = "Measure of extent to which public power is exercised for private gain, including both petty and";
        var line3 = "  grand forms of corruption, as well as 'capture' of the state by elites and private interests."
        var line4 = "Data collected in in 2017 by World Bank [15]";
        var link = "http://info.worldbank.org/governance/wgi/#home";
      break;
      case 24:
        var filtercat = "Judicial Effectiveness Score";
        var line1 = "Judicial Effectiveness Score";
        var unit = "";
        var line2 = "Score made from average scores of judicial independence, quality of the judicial";
        var line3 = " process, and likelihood of obtaining favorable judicial decisions";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 25:
        var filtercat = "Government Integrity Score";
        var line1 = "Government Integrity Score";
        var unit = "";
        var line2 = "Score made from average scores of public trust in politicians, irregular payments and ";
        var line3 = " bribes, transparency of government, and absence of and perception of corruption.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 26:
        var filtercat = "Property Rights Score";
        var line1 = "Property Rights Score";
        var unit = "";
        var line2 = "Score assesses the extent to which a country's legal framework allows individuals to accumulate";
        var line3 = " private property freely. The more effective the legal protection of property the higher the score.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 27:
        var filtercat = "Tax Burden Score";
        var line1 = "Tax Burden Score";
        var unit = "";
        var line2 = "Score made from average of top marginal tax rate on individual income, top marginal";
        var line3 = " tax rate on corporate income, and total tax bruden as percent of GDP.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 28:
        var filtercat = "Overall Economic Freedom Score";
        var line1 = "Overall Economic Freedom Score";
        var unit = "";
        var line2 = "Score made from the average of 12 measures focused on rule of law, "
        var line3 = " government size, regulatory efficiency, and market openness.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 29:
        var filtercat = "Financial Freedom Score";
        var line1 = "Financial Freedom Score";
        var unit = "";
        var line2 = "Indicator of banking efficiency as well as a measure of independence from";
        var line3 = " government control and interference in the financial sector.";
        var line4 = "Data collected in in 2018 by Heritage Foundation [8]";
        var link = "https://www.heritage.org/index/explore";
      break;
      case 30:
        var filtercat = "Women Mps (% Of All Mps)";
        var line1 = "Women MPs";
        var unit = "% Of All MPs";
        var line2 = "Percentage of women in parliament, based on total";
        var line3 = "  number of parliamentary seats available.";
        var line4 = "Data collected in in 2017 by World Bank [16]";
        var link = "https://data.worldbank.org/indicator/SG.GEN.PARL.ZS";
      break;
    } // switch c
    for (i = 0; i<=6; i++) {
      switch(i) {
        case 0:
          var filterval = "UN Security Council";
          var titleoffset = -7;
          var filterCountry = "China";
          var Countryfill = Countrycolor0;
          var countryoffsetx = 37;
          var cline = ["Largest Population &",
            "Highest GDP.",
            "Poor Political Rights &",
            "Civil Lib scores.",
            "Adj avg Bucket: 5.3"];
          var ba = 1.4;
          break;
        case 1:
          var filterval = "Africa";
          var titleoffset = 36;
          var filterCountry = "Rwanda"
          var Countryfill = Countrycolor1;
          var countryoffsetx = 30;
          var cline = ["Highest proportion of ",
            "Women MPs. Good ",
            "Econ & Govt Scores.",
            "Poor ppls rights scores.",
            "Adj avg Bucket: 4.6"];
          var ba = 0.8;
          break;
        case 2:
          var filterval = "Asia";
          var titleoffset = 40;
          var filterCountry = "Singapore";
          var Countryfill = Countrycolor2;
          var countryoffsetx = 30;
          var cline = ["Top in Govt Effectiven-",
            "ess, Regulatory Qaulity,",
            "Property Rights, &",
            "Econonmic Freedom.",
            "Adj avg Bucket: 7.1"];
          var ba = 0.8;
          break;
        case 3:
          var filterval = "Europe";
          var titleoffset = 36;
          var filterCountry = "Norway";
          var Countryfill = Countrycolor3;
          var countryoffsetx = 30;
          var cline = ["Best Human Dev & ",
            "SEDA scores & Highest",
            "Edu expense/ person.",
            "Low Tax Burdern.",
            "Adj avg Bucket: 7.9"];
          var ba = 0.8;
          break;
        case 4:
          var filterval = "North America";
          var titleoffset = 10;
          var filterCountry = "Costa Rica"
          var Countryfill = Countrycolor4;
          var countryoffsetx = 30;
          var cline = ["Top score in Happy",
            "Planet Index & Good",
            "scores in Happines.",
            "Low GDP per Capita.",
            "Adj avg Bucket: 5.9"];
          var ba = 0.8;
          break;
        case 5:
          var filterval = "South America";
          var titleoffset = 9;
          var filterCountry = "Venezuela";
          var Countryfill = Countrycolor5;
          var countryoffsetx = 30;
          var cline = ["Avg in Happiness &",
            "Human Development.",
            "Poor in Corruption &",
            "Law and Order scores.",
            "Adj avg Bucket: 3.25"];
          var ba = 0.8;
          break;
        case 6:
          var filterval = "Oceania";
          var titleoffset = 32;
          var filterCountry = "Australia"
          var Countryfill = Countrycolor6;
          var countryoffsetx = 30;
          var cline = ["Largest country",
            "in Oceania.",
            "Poor score in Happy",
            "Planet Index.",
            "Adj avg Bucket: 7.4"];
          var ba = 0.8;
          break;
      } // switch (i)
      // filt data set for just continent data
      var filt = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Bucket != "No Data" && d.Country == "Continent"});
      // get the no Data set too
      var filtND = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Country == "Continent"});
      // filtOnlyND gets just the "No Data" data
      var filtOnlyND = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Bucket == "No Data" && d.Country == "Continent"});
      // filterCountry, data set for that Country
      var filtCountry = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Bucket != "No Data" && d.Country == filterCountry});
      // sum of all entries in buckets
      var cumulative = d3.sum(filtND, function(d) {return parseInt(d.Freq)});

    // set up range for frequency based on total number of entires (displaying ratio)
    var freqaxis = d3.scaleLinear()
      .domain([0, cumulative])
      .range([freqheight + yorigin, yorigin]);

    // data bount object in g
    var output = paint.selectAll("g").data(filt).enter();

    //area display
    var popA = canvas.append("g")
      .append("path")
      .attr("class", "distArea")
      .attr("d", area(filt))
      .attr("id", "popF" + filterval)
      .style("fill", Countryfill)
      .attr("transform", "translate(" + (10*gap + graphgap) * i + "," + (freqheight + vertgap) * c + ")");
    // line dsiplay
    var pop = canvas.append("g")
      .append("path")
      .attr("class", "dist")
      .attr("d",  line(filt))
      .attr("id", "pop" + filterval)
      .style("stroke", Countryfill)
      .attr("transform", "translate(" + (10*gap + graphgap)*i + "," + (freqheight + vertgap) * c + ")");
    //line for no data
    if(filtOnlyND.length == 1){
      var dl = [{"Bucket": 0, "Freq": 0},
        {"Bucket": 0, "Freq": parseInt(filtOnlyND[0].Freq)},
        {"Bucket": 1, "Freq": parseInt(filtOnlyND[0].Freq)},
        {"Bucket": 1, "Freq": 0}];
    } else {
      var dl = [{"Bucket": 0, "Freq": 0}, {"Bucket": 1, "Freq": 0}];
    }
    var popND = canvas.append("g")
      .append("path")
      .attr("class", "dist")
      .attr("d", linend(dl))
      .attr("id", "NoData" + filterval)
      .style("stroke", Countryfill)
      .attr("stroke-dasharray", ("2, 1"))
      .attr("transform", "translate(" + (10*gap + graphgap) * i + "," + (freqheight + vertgap) * c + ")");

    // highlight country within the graph
    if(filtCountry.length == 1 && filtCountry.Bucket != "No Data"){
      var cntry = canvas.append("g")
        .append("path")
        .attr("class", "CountryArea")
        .attr("d", area([{"Bucket":filtCountry[0].Bucket, "Freq":filtCountry[0].Freq},{"Bucket":parseInt(filtCountry[0].Bucket)+1, "Freq":0}]))
        .attr("id", "CountryArea" + filtercat)
        .style("fill", Countryfill.brighter(ba))
        .attr("transform", "translate(" + (10*gap + graphgap)*i + "," + (freqheight + vertgap) * c + ")");
    };// if statment to check if country is empty


    //build Key using GINI index dat
    if (c == 2 && i == 4){
      //area display
      var popA = canvas.append("g")
        .append("path")
        .attr("class", "distArea")
        .attr("d", area(filt))
        .attr("id", "popF" + filterval)
        .style("fill", Countryfill)
        .attr("transform", "translate(" + (10*gap + graphgap) * keyi + "," + (freqheight + vertgap) * keyc + ")");
      // line dsiplay
      var pop = canvas.append("g")
        .append("path")
        .attr("class", "dist")
        .attr("d",  line(filt))
        .attr("id", "pop" + filterval)
        .style("stroke", Countryfill)
        .attr("transform", "translate(" + (10*gap + graphgap)*keyi + "," + (freqheight + vertgap) * keyc + ")");
      //line for no data
      if(filtOnlyND.length == 1){
        var dl = [{"Bucket": 0, "Freq": 0},
          {"Bucket": 0, "Freq": parseInt(filtOnlyND[0].Freq)},
          {"Bucket": 1, "Freq": parseInt(filtOnlyND[0].Freq)},
          {"Bucket": 1, "Freq": 0}];
      } else {
        var dl = [{"Bucket": 0, "Freq": 0}, {"Bucket": 1, "Freq": 0}];
      }
      var popND = canvas.append("g")
        .append("path")
        .attr("class", "dist")
        .attr("d", linend(dl))
        .attr("id", "NoData" + filterval)
        .style("stroke", Countryfill)
        .attr("stroke-dasharray", ("2, 1"))
        .attr("transform", "translate(" + (10*gap + graphgap) * keyi + "," + (freqheight + vertgap) * keyc + ")");

      // highlight country within the graph
      if(filtCountry.length == 1 && filtCountry.Bucket != "No Data"){
        var cntry = canvas.append("g")
          .append("path")
          .attr("class", "CountryArea")
          .attr("d", area([{"Bucket":filtCountry[0].Bucket, "Freq":filtCountry[0].Freq},{"Bucket":parseInt(filtCountry[0].Bucket)+1, "Freq":0}]))
          .attr("id", "CountryArea" + filtercat)
          .style("fill", Countryfill.brighter(ba))
          .attr("transform", "translate(" + (10*gap + graphgap)*keyi + "," + (freqheight + vertgap) *keyc + ")");
      };// if statment to check if country is empty
    }

    // put continent titles for first loop through categories
    if (c == 0){
      var conthead = output
        .append("text")
        .attr("class", "heading")
        .attr("x", (10*gap + graphgap)*i + xorigin + 5*gap)
        .attr("y", yorigin - headingoffset * 2 - countryoffsety)
        .attr("text-anchor", "middle")
        .style("fill", Countryfill)
        .text(function (d) {return d.Continent});
      var contheadpop = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", (10*gap + graphgap)*i + xorigin + 5*gap)
        .attr("y", yorigin - headingoffset - countryoffsety)
        .style("text-anchor", "middle")
        .text(cumulative + " Countries");
      // country Profiles
      var countryname = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", (10*gap + graphgap)*i + xorigin + 5*gap)
        .attr("y", yorigin - countryoffsety + vertgap * 0.92)
        .style("text-anchor", "middle")
        .style("fill", Countryfill)
        .style("font-size", 12)
        .text(filterCountry);
      for (cc = 0; cc <= 4; cc++){
        var countryname = output
          .append("text")
          .attr("class", "heading2")
          .attr("x", (10*gap + graphgap)*i + xorigin)
          .attr("y", yorigin - countryoffsety + headingoffset*(cc+3))
          .style("text-anchor", "start")
          .text(cline[cc]);
      }// for loop cc


    }; // end if statement for headings

  };// for loop, i
  // Creat Row headings for the catagories. two lines for the longer titles
    var cathead = output
      .append("text")
      .attr("class", "heading")
      .attr("x", xorigin - titleoffset)
      .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4)
      .attr("text-anchor", "end")
      .text(line1);

    // filtdescrip, descriptive data on select category
    var filtdescrip = s.filter(function(d) {return d.Category == filtercat &&
      d.Country == "Summary"});

    //simple variable for text output below in for loop
    var mm = ["Min: ", "Max: "];
    //for loop to create min and max outputsfor the cat info
    for (descrip = 3; descrip <=4; descrip++){
      switch (filtdescrip[descrip].Continent) {
        case "Oceania":
          var mfill = Countrycolor6;
        break;
        case "Africa":
          var mfill = Countrycolor1;
        break;
        case "Asia":
          var mfill = Countrycolor2;
        break;
        case "Europe":
          var mfill = Countrycolor3;
        break;
        case "North America":
          var mfill = Countrycolor4;
        break;
        case "South America":
          var mfill = Countrycolor5;
        break;
        case "UN Security Council":
          var mfill = Countrycolor0;
        break;
      } // swtich for shorthand continent

      // add descriptive data to the category information
      var binfo1 = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", xorigin - titleoffset - catoffset - unitoffset)
        .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4 + cattextline * (descrip-2))
        .text(mm[descrip-3] + filtdescrip[descrip-3].Freq + " " + unit + " (");
      //add the country name with specific color
      binfo1.append("tspan")
        .text(filtdescrip[descrip].Freq)
        .style("fill", mfill);
      // add the close parathese
      binfo1.append("tspan").text(")" )

  }//for loop descrip
    var binfo2 = output
      .append("text")
      .attr("class", "heading2")
      .attr("x", xorigin - titleoffset - catoffset - unitoffset)
      .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4 + cattextline * 3)
      .text("Bucket Range: " + filtdescrip[2].Freq + " " + unit);

    //add categorical descrip information
    for (d = 0; d<=2; d++){
      switch (d) {
        case 0:
          var txt = line2;
        break;
        case 1:
          var txt = line3;
        break;
        case 2:
          var txt = line4;
        break;
      } // switch on d

      var dinfo1 = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", xorigin + (10*gap + graphgap)*i + titleoffset)
        .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4 + cattextline * d)
        .style("text-anchor", "start")
        .text(txt);
    }// d for loop

  };// for loop, c
  // put title for countries
  var fchead = output
    .append("text")
    .attr("class", "heading")
    .attr("x", xorigin - titleoffset)
    .attr("y", (freqheight + vertgap) * (-1) + yorigin + freqheight/4)
    .attr("text-anchor", "end")
    .text("Focus Country");

})// call back function for csv (s)
var reftext = ["[1] 'Total Population'. The World Bank, 2017, https://data.worldbank.org/indicator/SP.POP.TOTL",
"[2] 'Surface Area'. CIA World Factbook, 2018, https://www.cia.gov/library/publications/the-world-factbook/fields/2147.html#al",
"[3] 'GINI Index'. CIA World Factbook, 2018, https://www.cia.gov/library/publications/the-world-factbook/rankorder/2172rank.html",
"[4] 'Happy Planet Index'. Happy Planet Index, 2016, http://happyplanetindex.org/",
"[5] 'Human Development Index'. World Happiness Report, 2017, http://worldhappiness.report/ed/2018/",
"[6] 'World Happiness Report'. World Happiness Report, 2017, http://hdr.undp.org/en/data#",
"[7] 'Sustainable Economic Devlopment Assessment'. Boston Consulting Group, 2017, https://www.bcg.com/en-gb/publications/interactives/seda-2018-guide.aspx",
"[8] 'Economic Index'. Heritage Foundation, 2018, https://www.heritage.org/index/explore",
"[9] 'Health Expenditure as a percent of GDP'. World Bank, 2015, https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS",
"[10] 'Health Expenditure per Person'. World Bank, 2015, https://data.worldbank.org/indicator/SH.XPD.CHEX.PP.CD",
"[11] 'Education Expenditure as a percent of GDP'. World Bank, 2014, https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?view=chart",
"[12] 'WDVP Datasets'. Information is Beautiful, 2018, https://docs.google.com/spreadsheets/d/11LhOlwsloUuA495r-04IDwciMqNrLwWGpveqpF61WXU/edit#gid=0",
"[13] 'School Life Expectancy'. CIA World Factbook, 2018, https://www.cia.gov/library/publications/the-world-factbook/fields/2205.html#202",
"[14] 'Freedom in the World Data and Resources'. Freedom House, 2017, https://freedomhouse.org/content/freedom-world-data-and-resources",
"[15] 'The Worldwide Governance Indicators (WGI) project'. World Bank, 2017, http://info.worldbank.org/governance/wgi/#home",
"[16] 'Proportion of seats held by women in national parliaments (%)'. World Bank, 2017, https://data.worldbank.org/indicator/SG.GEN.PARL.ZS"];
for (r=0; r<=17; r++){
  var ref = canvas.append("g")
    .append("text")
    .attr("class", "reftxt")
    .attr("x", w-20)
    .attr("y",h - 190 + 12*r)
    .text(reftext[r]);
}; // for loop r

var signature = canvas.append("g")
  .append("text")
  .attr("class", "reftxt")
  .attr("x", 10)
  .attr("y",h-40)
  .style("text-anchor", "start")
  .text("Created by Paul Cunningham");
var signature = canvas.append("g")
  .append("text")
  .attr("class", "reftxt")
  .attr("x", 10)
  .attr("y",h-40 + 12)
  .style("text-anchor", "start")
  .text("Jan 2019");
var signature = canvas.append("g")
  .append("text")
  .attr("class", "reftxt")
  .attr("x", 10)
  .attr("y",h-40 + 12*2)
  .style("text-anchor", "start")
  .text("statsracecarstats@gmail.com");
