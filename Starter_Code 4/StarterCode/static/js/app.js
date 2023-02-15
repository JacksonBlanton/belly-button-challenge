const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let sHovertext = [];
let sValues = [];
let sLabels = [];
let samples = [];

// Fetch  JSON data
let data = d3.json(url);

data.then(function(data_filters) {

    // Pull first subject's data
    sValues = data_filters.samples[0].sample_values;
    sLabels = data_filters.samples[0].otu_labels;
    sHovertext = data_filters.samples[0].otu_ids;
    
    // Make list of dictionaries for samples 
    samples = data_filters.samples;


    // Build initial plot using a function
    function init() {
        let data = [{
            y: sValues,
            x: sHovertext,
            type: "bar",
            orientation: "h",
            hovertext: sLabels
      
        }]

    // make initial plot
        Plotly.newPlot("BarChart", data)}
    });

    // create drop down m enu
    let dropDownMenu = data_filters["samples"].map(item => item.id);

    // Add the options 
    for (let i =0; i< dropDownMenu.length; i++) {
        var x = document.getElementById("selDataset");
        var option = document.createElement("option");
        option.text = dropDownMenu[i];
        option.value = dropDownMenu[i];
        x.add(option);
      
    };