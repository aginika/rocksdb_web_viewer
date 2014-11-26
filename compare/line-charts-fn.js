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
	//console.log("One");
	//console.log(target_variables[0]);
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
	
	target_variables[0][1].data
	var target_datas = [];
	for(var i = 0; i < target_variables.length ;i++){
	    //	    if(layer_onoffs[i] == 1)
	    //		target_datas.push(target_variables[0][1].data[i])
	}
	console.log(target_datas);
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

	var datas = []
	for(var i = 0; i < target_variables[0][1].data.length; i++){
	    var data0 = {
                name: target_variables[0][1].title,
		type: 'line',
		yAxis: 1,
		data: target_variables[0][1].data[i].data,
		tooltip: {
		    valueSuffix: target_variables[0][1].suffix
		}
	    };
	    datas.push(data0);
	}
	for(var i = 0; i < target_variables[1][1].data.length; i++){
	    var data1 = {
                name: target_variables[1][1].title,
		type: 'line',
		yAxis: 0,
		data: target_variables[1][1].data[i].data,
		tooltip: {
		    valueSuffix: target_variables[1][1].suffix
		}
	    };
	    datas.push(data1);
	}

	dual_line_charts_template.series = datas;
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
    }else{
	layer_onoffs[target_layer] = 0;
    }
    updateCharts();
};
var data_type_colors = [];

$(function () {
	data_type_colors["filenum"]    = ["#FF33FF","#FF33FF","#EE2FEE","#DD23DD","#CC1FCC","#BB11BB","#AA0FAA","#990299"];
	data_type_colors["inputnmb"]   = ["#00CCFF","#00C5EE","#00C1DD","#00BCCF","#00B2BF","#00A0AF","#00809F","#00708F"];
	data_type_colors["inputnp1mb"] = ["#FF9900","#FF9900","#EE8800","#DD7700","#CC6600","#BB5500","#AA4400","#993300"];
	data_type_colors["outputmb"]   = ["#FFFF55","#FFFF55","#EEEE4F","#DDCC44","#CCBB3F","#BBAA33","#AA992F","#998822"];
	data_type_colors["readam"]     = ["#22FFFF","#22FFFF","#22EEEE","#22DDDD","#22CCCC","#22BBBB","#22AAAA","#229999"];
	data_type_colors["writeam"]    = ["#17F9AD","#17F9AD","#17F9A3","#17F99B","#17F992","#17F98B","#17F982","#17F97D"];
	data_type_colors["readbytes"]  = ["#C9FF2F","#C9FF2F","#C1FF2F","#B9FF2F","#B1FF2F","#A9FF2F","#A1FF2F","#99FF2F"];
	data_type_colors["writebytes"] = ["#FFD700","#FFD700","#EED700","#DDD700","#CCD700","#BBD700","#AAD700","#99D700",];

	file_nums_L0_0.color = data_type_colors["filenum"][1];
	file_nums_L1_0.color = data_type_colors["filenum"][2];
	file_nums_L2_0.color = data_type_colors["filenum"][3];
	input_file_n_mb_datas_L1_0.color  = data_type_colors["inputnmb"][1];
	input_file_n_mb_datas_L2_0.color  = data_type_colors["inputnmb"][2];
	input_file_np1_mb_datas_L1_0.color = data_type_colors["inputnp1mb"][1];
	input_file_np1_mb_datas_L2_0.color = data_type_colors["inputnp1mb"][2];
	output_file_mb_datas_L1_0.color = data_type_colors["outputmb"][1];
	output_file_mb_datas_L2_0.color = data_type_colors["outputmb"][2];
	read_am_datas_L1_0.color =  data_type_colors["readam"][1];
	read_am_datas_L2_0.color =  data_type_colors["readam"][2];
	write_am_datas_L1_0.color =  data_type_colors["writeam"][1];
	write_am_datas_L2_0.color =  data_type_colors["writeam"][2];
	read_datas_L1_0.color = data_type_colors["readbytes"][1];
	read_datas_L2_0.color = data_type_colors["readbytes"][2];
	write_datas_L1_0.color = data_type_colors["writebytes"][1];
	write_datas_L2_0.color = data_type_colors["writebytes"][2];

	target_dictionary = {
	    filenum: {
		title: "Filenums Changes",
		suffix: " files",
		data:[file_nums_L0_0, file_nums_L1_0, file_nums_L2_0],
		yAxis:{
		    labels: {
			format: '{value} files',
			style: {
			    color: data_type_colors["filenum"][0]//Highcharts.getOptions().colors[0]
			}
		    },
		    title: {
			text: 'FileNum',
			style: {
			    color: data_type_colors["filenum"][0]//Highcharts.getOptions().colors[0]
			}
		    }},
	    },
	    inputnmb: {
		title: "InputFile N MB",
		suffix: " MB",
		data:[input_file_n_mb_datas_L1_0,
		      input_file_n_mb_datas_L2_0],
		yAxis:{
		    labels: {
			format: '{value} MB',
			style: {
			    color: data_type_colors["inputnmb"][0]//Highcharts.getOptions().colors[1]
			}
		    },
		    title: {
			text: 'Size',
			style: {
			    color: data_type_colors["inputnmb"][0]//Highcharts.getOptions().colors[1]
			}
		    }},
	    },
	    inputnp1mb: {
		title: "InputFile Np1 MB",
		data:[input_file_np1_mb_datas_L1_0,
		      input_file_np1_mb_datas_L2_0],
		suffix: " MB",
		yAxis:
		{
		    labels: {
			format: '{value} MB',
			style: {
			    color: data_type_colors["inputnp1mb"][0]//"#FFCCAA"//Highcharts.getOptions().colors[2]
			}
		    },
		    title: {
			text: 'FileNum',
			style: {
			    color: data_type_colors["inputnp1mb"][0]//"#FFCCAA"//Highcharts.getOptions().colors[2]
			}
		    }},
	    },
	    outputmb: {
		title: "OutputFile MB",
		data : [output_file_mb_datas_L1_0,
			output_file_mb_datas_L2_0],
		suffix: " MB",
		yAxis:
		{
		    labels: {
			format: '{value} MB',
			style: {
			    color: data_type_colors["outputmb"][0]//"#AACCAA"//Highcharts.getOptions().colors[3]
			}
		    },
		    title: {
			text: 'Size',
			style: {
			    color: data_type_colors["outputmb"][0]//"#FFCCAA"//Highcharts.getOptions().colors[3]
			}
		    }},
	    },
	    readam: {
		title:"Read Amplify",
		suffix: " times",
		data: [read_am_datas_L1_0,
		       read_am_datas_L2_0],
		yAxis:
		{
		    labels: {
			format: '{value} times',
			style: {
			    color: data_type_colors["readam"][0]//Highcharts.getOptions().colors[4]
			}
		    },
		    title: {
			text: 'Ampilfy',
			style: {
			    color: data_type_colors["readam"][0]//Highcharts.getOptions().colors[4]
			}
		    }},
	    },
	    writeam: {
		title:"Write Amplify",
		suffix: " times",
		data: [write_am_datas_L1_0,
		       write_am_datas_L2_0],
		yAxis:
		{
		    labels: {
			format: '{value} times',
			style: {
			    color: data_type_colors["writeam"][0]//Highcharts.getOptions().colors[5]
			}
		    },
		    title: {
			text: 'Amplify',
			style: {
			    color: data_type_colors["writeam"][0]//Highcharts.getOptions().colors[5]
			}
		    }},
	    },
	    readbytes: {
		title:"Read Bytes",
		suffix: " MB/s",
		data: [read_datas_L1_0,
		       read_datas_L2_0],
		yAxis:
		{
		    labels: {
			format: '{value} MB/s',
			style: {
			    color: data_type_colors["readbytes"][0]//Highcharts.getOptions().colors[6]
			}
		    },
		    title: {
			text: 'Read Bytes/s',
			style: {
			    color: data_type_colors["readbytes"][0]//Highcharts.getOptions().colors[6]
			}
		    }},
	    },
	    writebytes: {
		title:"Write Amplify",
		suffix: " MB/s",
		data: [write_datas_L1_0,
		       write_datas_L2_0],
		yAxis:
		{
		    labels: {
			format: '{value} MB/s',
			style: {
			    color: data_type_colors["writebytes"][0]//Highcharts.getOptions().colors[7]
			}
		    },
		    title: {
			text: 'Write Bytes/s',
			style: {
			    color: data_type_colors["writebytes"][0]//Highcharts.getOptions().colors[7]
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

	
	
	simple_line_charts_template.series = [file_nums_L0_0, file_nums_L1_0,file_nums_L2_0];

	$('#amount-of-writes').highcharts(simple_line_charts_template);
    });