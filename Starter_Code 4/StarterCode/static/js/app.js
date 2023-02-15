// Use D3 library to read in samples.json
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Create a function to generate the horizontal bar chart
  function generateBarChart(sampleId) {
    // Filter the data to get the selected sample
    var sampleData = data.samples.filter(sample => sample.id == sampleId)[0];
    
    // Get the top 10 OTUs and reverse the order for the bar chart
    var top10Values = sampleData.sample_values.slice(0, 10).reverse();
    var top10Ids = sampleData.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id);
    var top10Labels = sampleData.otu_labels.slice(0, 10).reverse();
    
    // Create the bar chart
    var trace1 = {
      x: top10Values,
      y: top10Ids,
      text: top10Labels,
      type: "bar",
      orientation: "h"
    };
    var data1 = [trace1];
    var layout1 = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
    Plotly.newPlot("bar", data1, layout1);
  }
  
  // Create the dropdown menu
  var dropdown = d3.select("#selDataset");
  data.names.forEach(name => {
    dropdown.append("option").text(name).property("value", name);
  });
  
  // Call the generateBarChart function with the initial sample ID
  generateBarChart(data.names[0]);
  
  // Create an event listener for the dropdown menu
  dropdown.on("change", function() {
    var selectedSample = d3.select(this).property("value");
    generateBarChart(selectedSample);
  });
  
}).catch(error => console.log(error));