// This script was built for the 2018 World Data Visualization Challange
// Specifically for the 'Good Goverment' data
// Dec 2018
// Paul Cunningham
// <><><><><><><><><><>

var margin = {top: 20, right: 20, bottom: 30, left: 50};
  width = 1150 - margin.left - margin.right,
  height = 1400 - margin.top - margin.bottom;

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
d3.csv("https://raw.githubusercontent.com/statsracecarstats/WorldDataVisualization/master/Merged_buckets.csv").then(function(s){
  // <><>< Indvidual Plot definition variables ><><>
  var xorigin = 330; // x location for first graph
  var yorigin = 60; // y location for first graph
  var fs = 16; // font size
  var gap = 10; // gap between buckets
  var freqheight = 55; // height of freqaxis
  // <><>< Axis definition ><><>
  var vaxisoffset = 5; // in x direction how far axis is off from yorigin
  var vaxisend = 2; // half the size of the butt end
  var vaxistextoffset = 2; // offset of text from axis
  var cattextline = 13; // vertical line hieght for category information
  var catoffset = 0; // where to start category information from xorigin
  // set up range for buckets (1-10)
  var bucketaxis=d3.scaleLinear()
    .domain([1, 11])
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

  // build vertical axis
  var axis = canvas.append("g")
    .append("path")
    .attr("class", "maxis")
    .attr("d", axisline(Vaxispath))
    .attr("id", "vertaxis");

  // add text for axis
  var axistxt = canvas.append("g").append("a")
    .append("text")
    .attr("class", "textaxis")
    .attr("x", xorigin - vaxisoffset - vaxisend - vaxistextoffset)
    .attr("y", yorigin + freqheight)
    .text("0%");

  var axistxt = canvas.append("g").append("a")
    .append("text")
    .attr("class", "textaxis")
    .attr("x", xorigin - vaxisoffset - vaxisend - vaxistextoffset)
    .attr("y", yorigin)
    .attr("alignment-baseline", "mathematical")
    .text("100%");

  // build horizontal axis
  var axish = canvas.append("g")
    .append("path")
    .attr("class", "maxis")
    .attr("d", axisline(Haxispath))
    .attr("id", "hortaxis");

  //<><>< assemble graphs ><><><>
  // filter for Country

  var i; // iteratvie value for for loop of continents
  var c; // iterative value for for loop of categories

  for (c = 0; c<=11 ; c++) {
    switch(c) {
      case 0:
        var filtercat = "Population"; // category to find in data set
        var line1 = "Population"; //first line to display
        var unit = "People"; // unit of measure
        var unitoffset = 0; // horizontal offset as a factor of gap
      break;
      case 1:
        var filtercat = "Surface Area (Km2)";
        var line1 = "Surface Area";
        var unit = "km\u00B2"; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
      break;
      case 2:
        var filtercat = "GINI Index";
        var line1 = "GINI Index";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
      break;
      case 3:
        var filtercat = "Happy Planet Index";
        var line1 = "Happy Planet Index";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
      break;
      case 4:
        var filtercat = "Human Development Index";
        var line1 = "Human Development Index";
        var unit = ""; // unit of measure
        var unitoffset = 1; // horizontal offset as a factor of gap
      break;
      case 5:
        var filtercat = "World Happiness Report Score";
        var line1 = "World Happiness Report Score";
        var unit = ""; // unit of measure
      break;
      case 6:
        var filtercat = "Sustainable Economic Development Assessment (SEDA)";
        var line1 = "Sustainable Economic Development Assessment";
        var unit = "";
      break;
      case 7:
        var filtercat = "GDP (Billions PPP)"
        var line1 = "GDP";
        var unit = "Billions PPP";
      break;
      case 8:
        var filtercat = "GDP per Capita (PPP)"
        var line1 = "GDP per Capita";
        var unit = "PPP";
      break;
      case 9:
        var filtercat = "GDP Growth (Annual %)"
        var line1 = "GDP Growth";
        var unit = "Annual %";
      break;
      case 10:
        var filtercat = "Health Expenditure % of GDP"
        var line1 = "Health Expenditure";
        var unit = "% of GDP";
      break;
      case 11:
        var filtercat = "Health Expenditure Per Person"
        var line1 = "Health Expenditure per Person";
        var unit = "$";
      break;
    } // switch c
    console.log(filtercat + " " + filtercat.length)
    for (i = 0; i<=6; i++) {
      switch(i) {
        case 0:
          var filterval = "UN Security Council";
          var titleoffset = -7;
          var filterCountry = "China";
          var Countryfill = d3.rgb(249, 252, 60);
          break;
        case 1:
          var filterval = "Africa";
          var titleoffset = 36;
          var filterCountry = "Nigeria"
          var Countryfill = d3.rgb(208, 11, 116);
          break;
        case 2:
          var filterval = "Asia";
          var titleoffset = 40;
          var filterCountry = "Japan";
          var Countryfill = d3.rgb(116, 208, 11);
          break;
        case 3:
          var filterval = "Europe";
          var titleoffset = 36;
          var filterCountry = "Norway";
          var Countryfill = d3.rgb(178, 42, 212);
          break;
        case 4:
          var filterval = "North America";
          var titleoffset = 10;
          var filterCountry = "Canada"
          var Countryfill = d3.rgb(222,136,15);
          break;
        case 5:
          var filterval = "South America";
          var titleoffset = 9;
          var filterCountry = "Peru";
          var Countryfill = d3.rgb(212, 71, 79);
          break;
        case 6:
          var filterval = "Oceania";
          var titleoffset = 32;
          var filterCountry = "Australia"
          var Countryfill = d3.rgb(11,117,208);
          break;
      } // switch (i)
      // filt data set for just continent data
      var filt = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Bucket != "No Data" && d.Country == "Continent"});
      // filterCountry, data set for that Country
      var filtCountry = s.filter(function(d) {return d.Continent == filterval &&
        d.Category == filtercat && d.Bucket != "No Data" && d.Country == filterCountry});

      // sum of all entries in buckets
      var cumulative = d3.sum(filt, function(d) {return parseInt(d.Freq)});

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
    // highlight country within the graph
    if(filtCountry.length == 1 && filtCountry.Bucket != "No Data"){
      var cntry = canvas.append("g")
        .append("path")
        .attr("class", "CountryArea")
        .attr("d", area([{"Bucket":filtCountry[0].Bucket, "Freq":filtCountry[0].Freq},{"Bucket":parseInt(filtCountry[0].Bucket)+1, "Freq":0}]))
        .attr("id", "CountryArea" + filtercat)
        .style("fill", Countryfill.brighter(0.8))
        .attr("transform", "translate(" + (10*gap + graphgap)*i + "," + (freqheight + vertgap) * c + ")");
    };// if statment to check if country is empty


    // put continent titles for first loop through categories
    if (c == 0){
      var conthead = output
        .append("text")
        .attr("class", "heading")
        .attr("x", (10*gap + graphgap)*i + xorigin + titleoffset)
        .attr("y", yorigin - headingoffset * 2)
        .attr("text-anchor", "start")
        .text(function (d) {return d.Continent});
      var contheadpop = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", (10*gap + graphgap)*i + xorigin + 25)
        .attr("y", yorigin - headingoffset)
        .style("text-anchor", "start")
        .text(cumulative + " Countries");

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

    for (descrip = 3; descrip <=4; descrip++){
      switch (filtdescrip[descrip].Continent) {
        case "Oceania":
          var shortcont = "O"
        break;
        case "Africa":
          var shortcont = "Af"
        break;
        case "Asia":
          var shortcont = "As"
        break;
        case "Europe":
          var shortcont = "E"
        break;
        case "North America":
          var shortcont = "NA"
        break;
        case "South America":
          var shortcont = "SA"
        break;
        case "UN Security Council":
          var shortcont = "UN"
        break;
      } // swtich for shorthand continent

      // add descriptive data to the category information
      var binfo = output
        .append("text")
        .attr("class", "heading2")
        .attr("x", xorigin - titleoffset - catoffset - unitoffset)
        .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4 + cattextline * (descrip-2))
        .text("Min: " + filtdescrip[descrip-3].Freq + " (" + shortcont + ": " + filtdescrip[descrip].Freq + ")");

  }//for loop descrip
    var binfo = output
      .append("text")
      .attr("class", "heading2")
      .attr("x", xorigin - titleoffset - catoffset - unitoffset)
      .attr("y", (freqheight + vertgap) * c + yorigin + freqheight/4 + cattextline * 3)
      .text("Bucket Range: " + filtdescrip[2].Freq + " " + unit);

  };// for loop, c


})// call back function for csv (s)
