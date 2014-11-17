var target_variables = [];

var simple_line_charts_template = {
    chart: {
    },
    title: {
	text: 'FileNums Change'
    },
    subtitle: {
	text: 'RocksDB Visualizer'
    },
    xAxis: {
	type: 'datetime',
	dateTimeLabelFormats: { // don't display the dummy year
	    month: '%e. %b',
	    year: '%b',
	    millisecond: '%H:%M:%S.%L',
	    second: '%H:%M:%S',
	    minute: '%H:%M',
	    hour: '%H:%M'
	},
	title: {
	    text: 'TimeLine'
	}
    },
    yAxis: {
	title: {
	    text: 'File Nums'
	},
	min: 0
    },
    tooltip: {
	headerFormat: '<b>{series.name}</b><br>',
	pointFormat: '{point.x:%b/%e-%H:%M:%S.%L}: {point.y} files'
    }
};

var dual_line_charts_template = {
    chart: {
	zoomType: 'xy'
    },
    subtitle: {
	text: 'RocksDB Visualizer'
    },
    xAxis: {
	type: 'datetime',
	dateTimeLabelFormats: { // don't display the dummy year
	    month: '%e. %b',
	    year: '%b',
	    millisecond: '%H:%M:%S.%L',
	    second: '%H:%M:%S',
	    minute: '%H:%M',
	    hour: '%H:%M'
	},
	title: {
	    text: 'TimeLine'
	}
    },
    tooltip: {
		shared: true
    },
};


var target_dictionary;

var updateCharts = function(){
    //if it is one
    if(target_variables.length == 1){
	var chart = $('#amount-of-writes').highcharts().destroy();
	//set Title
	simple_line_charts_template.title = {text: target_variables[0][1].title};

	//set ToolTip
	var tooltip_value =  {
	    headerFormat: '<b>{series.name}</b><br>',
	    pointFormat: '{point.x:%b/%e-%H:%M:%S.%L}: {point.y} '+target_variables[0][1].suffix
	}
	//set yAxis
	simple_line_charts_template.yAxis.title.text = target_variables[0][1].title
	
	simple_line_charts_template.series = target_variables[0][1].data;
	$('#amount-of-writes').highcharts(simple_line_charts_template);
    }
    //if it is two
    else if(target_variables.length == 2){
	var chart = $('#amount-of-writes').highcharts().destroy();
	//set Title
	dual_line_charts_template.title = {text: target_variables[0][1].title + " & " + target_variables[1][1].title};
	//set yAxis
	target_variables[0][1].yAxis.opposite = false;
	target_variables[1][1].yAxis.opposite = true;
	dual_line_charts_template.yAxis = [target_variables[1][1].yAxis,
					   target_variables[0][1].yAxis,
					   ];

	var data1 = {
                name: target_variables[0][1].title,
		type: 'line',
		yAxis: 1,
		data: target_variables[0][1].data[0].data,
		tooltip: {
		    valueSuffix: target_variables[0][1].suffix
		}
	    };

	var data2 = {
                name: target_variables[1][1].title,
		type: 'line',
		yAxis: 0,
		data: target_variables[1][1].data[0].data,
		tooltip: {
		    valueSuffix: target_variables[1][1].suffix
		}
	    };
	dual_line_charts_template.series = [data1, data2];
	console.log(dual_line_charts_template);
	$('#amount-of-writes').highcharts(dual_line_charts_template);	
    }
    
};


var addNewVariable = function(){
    if(this.checked){
	target_variables.push([this.id, target_dictionary[this.id]]);
	if(target_variables.length > 2){
	    var poped_item = target_variables.shift();   
	    $("#"+poped_item[0]).prop("checked", false);
	} 
	console.log("Checked num: " + target_variables.length);
	console.log(target_variables);
	updateCharts();
    }else{
	var target_id = -1;
	for(i = 0; i < target_variables.length; i++){
	    if (target_variables[i][0] == this.id){
		target_id = i;
		break;
	    }
	}
	target_variables.splice(target_id, 1);
	console.log(target_variables);
	console.log("Not Checked num:" + target_variables.length);
	updateCharts();
    }
};

var layer_onoffs=[1,1,1,1,1,1,1];
var addNewLayer = function(){
    var target_layer = this.getAttribute("layer");
    if(this.checked){
	layer_onoffs[target_layer] = 1;
	console.log(target_layer + " is added");
    }else{
	layer_onoffs[target_layer] = 0;
	console.log(target_layer + " is deleted");
    }
    console.log(layer_onoffs);
};
    
$(function () {
	target_dictionary = {
	    filenum: {
		title: "Filenums Changes",
		suffix: " files",
		data:[file_nums_L1, file_nums_L2],
		yAxis:{
		    labels: {
			format: '{value} files',
			style: {
			    color: Highcharts.getOptions().colors[0]
			}
		    },
		    title: {
			text: 'FileNum',
			style: {
			    color: Highcharts.getOptions().colors[0]
			}
		    }},
	    },
	    inputnmb: {
		title: "InputFile N MB",
		suffix: " MB",
		data:[input_file_n_mb_datas_L1,
		      input_file_n_mb_datas_L2],
		yAxis:{
		    labels: {
			format: '{value} MB',
			style: {
			    color: Highcharts.getOptions().colors[1]
			}
		    },
		    title: {
			text: 'Size',
			style: {
			    color: Highcharts.getOptions().colors[1]
			}
		    }},
	    },
	    inputnp1mb: {
		title: "InputFile Np1 MB",
		data:[input_file_np1_mb_datas_L1,
		      input_file_np1_mb_datas_L2],
		suffix: " MB",
		yAxis:
		{
		    labels: {
			format: '{value} MB',
			style: {
			    color: Highcharts.getOptions().colors[2]
			}
		    },
		    title: {
			text: 'FileNum',
			style: {
			    color: Highcharts.getOptions().colors[2]
			}
		    }},
	    },
	    outputmb: {
		title: "OutputFile MB",
		data : [output_file_mb_datas_L1,
			output_file_mb_datas_L2],
		suffix: " MB",
		yAxis:
		{
		    labels: {
			format: '{value} MB',
			style: {
			    color: Highcharts.getOptions().colors[3]
			}
		    },
		    title: {
			text: 'Size',
			style: {
			    color: Highcharts.getOptions().colors[3]
			}
		    }},
	    },
	    readam: {
		title:"Read Amplify",
		suffix: " times",
		data: [read_am_datas_L1,
		       read_am_datas_L2],
		yAxis:
		{
		    labels: {
			format: '{value} times',
			style: {
			    color: Highcharts.getOptions().colors[4]
			}
		    },
		    title: {
			text: 'Ampilfy',
			style: {
			    color: Highcharts.getOptions().colors[4]
			}
		    }},
	    },
	    writeam: {
		title:"Write Amplify",
		suffix: " times",
		data: [write_am_datas_L1,
		       write_am_datas_L2],
		yAxis:
		{
		    labels: {
			format: '{value} times',
			style: {
			    color: Highcharts.getOptions().colors[5]
			}
		    },
		    title: {
			text: 'Amplify',
			style: {
			    color: Highcharts.getOptions().colors[5]
			}
		    }},
	    },
	    readbytes: {
		title:"Read Bytes",
		suffix: " MB/s",
		data: [read_datas_L1,
		       read_datas_L2],
		yAxis:
		{
		    labels: {
			format: '{value} MB/s',
			style: {
			    color: Highcharts.getOptions().colors[6]
			}
		    },
		    title: {
			text: 'Read Bytes/s',
			style: {
			    color: Highcharts.getOptions().colors[6]
			}
		    }},
	    },
	    writebytes: {
		title:"Write Amplify",
		suffix: " MB/s",
		data: [write_datas_L1,
		       write_datas_L2],
		yAxis:
		{
		    labels: {
			format: '{value} MB/s',
			style: {
			    color: Highcharts.getOptions().colors[7]
			}
		    },
		    title: {
			text: 'Write Bytes/s',
			style: {
			    color: Highcharts.getOptions().colors[7]
			}
		    }},
	    },
	};

	$("#filenum")[0].onchange = addNewVariable;
	$("#inputnmb")[0].onchange = addNewVariable;
	$("#inputnp1mb")[0].onchange = addNewVariable;
	$("#outputmb")[0].onchange = addNewVariable;
	$("#readam")[0].onchange = addNewVariable;
	$("#writeam")[0].onchange = addNewVariable;
	$("#readbytes")[0].onchange = addNewVariable;
	$("#writebytes")[0].onchange = addNewVariable;

	$("#L0_check")[0].onchange = addNewLayer;
	$("#L1_check")[0].onchange = addNewLayer;
	$("#L2_check")[0].onchange = addNewLayer;
	$("#L3_check")[0].onchange = addNewLayer;
	$("#L4_check")[0].onchange = addNewLayer;
	$("#L5_check")[0].onchange = addNewLayer;
	$("#L6_check")[0].onchange = addNewLayer;

	
	
	simple_line_charts_template.series = [file_nums_L0, file_nums_L1,file_nums_L2];

	$('#amount-of-writes').highcharts(simple_line_charts_template);
    });