// Use D3 library to read in samples.json
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Create a function to generate the horizontal bar chart and display metadata
  function generateCharts(sampleId) {
    // Filter the data to get the selected sample
    var sampleData = data.samples.filter(sample => sample.id == sampleId)[0];
    var metadata = data.metadata.filter(sample => sample.id == sampleId)[0];
    
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
    
    // Create the bubble chart
    var bubbleData = [{
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
        color: sampleData.otu_ids,
        size: sampleData.sample_values
      }
    }];
    
    var bubbleLayout = {
      xaxis: {title: 'OTU ID'},
      hovermode: 'closest',
      margin: {t: 30}
    };
    
    // Plot the bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
    // Display the sample metadata
    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }
  
  // Create the dropdown menu
  var dropdown = d3.select("#selDataset");
  data.names.forEach(name => {
    dropdown.append("option").text(name).property("value", name);
  });
  
  // Call the generateCharts function with the initial sample ID
  generateCharts(data.names[0]);
  
  // Create an event listener for the dropdown menu
  dropdown.on("change", function() {
    var selectedSample = d3.select(this).property("value");
    generateCharts(selectedSample);
  });
  
}).catch(error => console.log(error));
