define(["knockout", "dataAccess", "initialData", "d3", "io"], function (ko, dataAccess, initialData, d3, io) {
    
    var self = null;
    var reaches = initialData.ReachesInitialData;

    var initialize = function (that) {
        self = that;
        ko.applyBindings(self, document.getElementById('reachContainer'));
        createGraph();
    },

    addNewItem = function () {
        var socket = io.connect('http://localhost:3000');
        socket.emit('Push New Reach');
        socket.on('Add New Reach', function (data) {
            reaches.push(data);
            createGraph();            
        });
    },

    graphContainer = null,

    createGraph = function () {
        
        var diameter = 960,
            format = d3.format(",d"),
            color = d3.scale.linear().domain([0, 100000]).range(['orange', 'green']),
            xScale = d3.scale.linear().domain([0, 100000]).range([0, diameter]),
            yScale = d3.scale.linear().domain([0, 100000]).range([0, diameter]);

        if (graphContainer !== null) {
            graphContainer.remove();
        }

        var svg = d3.select("#reachContainer")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        graphContainer = svg;
        

        var node = svg.selectAll(".node")
            .data(self.Reaches)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d, i) {
                if (d.post_impressions_organic !== undefined &&
                    d.post_impressions_viral !== undefined &&
                    d.post_impressions_paid !== undefined) {

                    var negativeImpression = d.post_impressions_viral[0].value + d.post_impressions_paid[0].value;
                    return "translate(" + xScale(d.post_impressions_organic[0].value) + "," + yScale(negativeImpression) + ")";
                }
                return "translate(0, 0)";
            });

        node.append("title")
            .text(function (d) {
                if (d.post_impressions_organic !== undefined &&
                    d.post_impressions_viral !== undefined &&
                    d.post_impressions_paid !== undefined) {
                    var total = " Total Impressions = " + format(d.post_impressions[0].value);
                    var paidImpresions = "\n Paid Impressions = " + format(d.post_impressions_paid[0].value);
                    var organicImpresions = "\n Organic Impressions = " + format(d.post_impressions_organic[0].value);
                    var viralImpresions = "\n Viral Impressions = " + format(d.post_impressions_viral[0].value);

                    return total + organicImpresions + paidImpresions + viralImpresions;
                }
                return '';
            });

        node.append("circle")
            .attr("r", function (d) {
                if (d.post_impressions !== undefined) {
                    return d.post_impressions[0].value / 1000;
                }
                return 0;
            })
            .style("fill", function (d, i) {
                if (d.post_impressions_organic !== undefined) {
                    return color(d.post_impressions_organic[0].value);
                }
                return color(0);
            });
    };  

    return {
        Initialize: initialize,
        AddNewItem: addNewItem,
        Reaches: reaches
    };
});