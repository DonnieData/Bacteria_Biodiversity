function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

// "newSample" equivalant to "this.value" in html
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

// takes in sample(ID number) when dropdown menu option is selected 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    // asign meta deta to variable 
    var metadata = data.metadata;
    // filter metadata array, for objects whos id's match the sample(ID number) input
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // select first item of array 
    var result = resultArray[0];
    // select demographic panel (div id="sample-metadata")
    var PANEL = d3.select("#sample-metadata");
    // ensure panel content is cleared so new information is displayed based on selection
    PANEL.html("");
    // print location
    Object.entries(result).forEach(([key, value]) =>
      {PANEL.append("h6").text(key.toUpperCase() +':' + value);});
  
  });
}

