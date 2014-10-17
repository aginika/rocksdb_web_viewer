$(function () {
	$('#amount-of-writes').highcharts({
		chart: {
			},
		    title: {
		    text: 'FileNums Change'
			},
		    subtitle: {
		    text: 'Chart of Layers'
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
			},

		    series: [file_nums_L0, file_nums_L1,file_nums_L2]
		    });
    });