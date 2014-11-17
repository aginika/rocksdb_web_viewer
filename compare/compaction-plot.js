function ConvertUNIXtoFormated(unix_val){
    return new Date(unix_val).toLocaleString();
}

$(function () {
	$('#event-timeline').highcharts({
        chart: {
		    type: 'columnrange',
			inverted: true,
			pinchType: 'y',
			zoomType: 'y'
			},
        title: {
            text: 'Rocksdb Behavior'
        },
        subtitle: {
            text: 'DBName : rocksdbtest'
        },
        xAxis: {
            categories: ['Flush', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5'],
		    minPadding: 0.1,
		    maxPadding: 0.1,
		    lineWidth: 0.5,
		    tickWidth: 0.5,
        },
        yAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
			    year: '%b',
			    millisecond: '%H:%M:%S.%L',
			    second: '%H:%M:%S',
			    minute: '%H:%M',
			    hour: '%H:%M',
            },
            title: {
                text: 'TimeLine'
	    },
        },
        plotOptions: {
		columnrange: {
			minPointLength: 1,
			pointPadding: 0,
			borderWidth: 0,
		    }
        },
	tooltip: {
		    valueSuffix: '',
			formatter:function(){
			return '<strong>'+this.series.name+'</strong><br/>'+'Start:  '+ConvertUNIXtoFormated(this.point.low)+'<br/>'+'For '+(this.point.high-this.point.low)/1000+'sec<br/>'+'Finish: '+ConvertUNIXtoFormated(this.point.high);
		    }
		},
        legend: {
            enabled: false
        },

        series: event_datas
    });
});
