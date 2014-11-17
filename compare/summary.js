var svg;
var db_height = 150;
var db_width = 280;
var stroke_width = 2;
var db_y = 50;
var db_x = 10;
var ellipse_y = 30;

//Layer id, file nums,
var layer_datas = [
		   [0, {filenum:4, filesize:8}],
		   [1, {filenum:1730, filesize:3354}],
		   [2, {filenum:590, filesize:1223}],
		   [3, {filenum:0, filesize:0}],
		   [4, {filenum:0, filesize:0}],
		   [5, {filenum:0, filesize:0}],
		   [6, {filenum:0, filesize:0}]];
var bar_height = 30;
var bar_between = 10 + bar_height;
var bar_x_offset = 350;
var bar_y_offset = 30;

var w = 1000;
var h = 550;

var option_properties =
    [["error_if_exists"],
     ["create_if_missing"],
     ["env"],
     ["info_log"],
     ["max_open_files"],
     ["max_total_wal_size"],
     ["disableDataSync"],
     ["use_fsync"],
     ["max_log_file_size"],
     ["max_manifest_file_size"],
     ["log_file_time_to_roll"],
     ["keep_log_file_num"],
     ["allow_os_buffer"],
     ["allow_mmap_reads"],
     ["allow_mmap_writes"],
     ["create_missing_column_fmailies"],
     ["db_log_dir"],
     ["wal_dir"],
     ["table_cache_numshardbits"],
     ["table_cache_remove_scan_count_limit"],
     ["delete_obsolete_files_period_micros"],
     ["max_background_compactions"],
     ["max_background_flushes"],
     ["WAL_ttl_seconds"],
     ["WAL_size_limit_MB"],
     ["manifest_preallocation_size"],
     ["allow_os_buffer"],
     ["allow_mmap_reads"],
     ["allow_mmap_writes"],
     ["is_fd_close_on_exec"],
     ["skip_log_error_on_recovery"],
     ["stats_dump_period_sec"],
     ["advise_random_on_open"],
     ["access_hint_on_compaction_start"],
     ["use_adaptive_mutex"],
     ["rate_limiter"],
     ["bytes_per_sync"],
     ["comparator"],
     ["merge_operator"],
     ["compaction_filter"],
     ["compaction_filter_factory"],
     ["compaction_filter_factory_v2"],
     ["memtable_factory"],
     ["table_factory"],
     ["flush_block_policy_factory"],
     //["cache_index_and_filter_blocks"],
     //["index_type"],
     //["hash_index_allow_collision"],
     //["checksum"],
     //["no_block_cache"],
     //["block_cache"],
     //["block_cache_compressed"],
     //["block_size"],
     //["block"
     ["write_buffer_size"],
     ["max_write_buffer_number"],
     ["compression"],
     ["prefix_extractor"],
     ["num_levels"],
     ["min_write_buffer_number_to_merge"],
     ["purge_redundant_kvs_while_flush"],
     ["compression_opts.window_bits"],
     ["compression_opts.level"],
     ["compression_opts.strategy"],
     ["level0_file_num_compaction_trigger"],
     ["level0_slowdown_writes_trigger"],
     ["level0_stop_writes_trigger"],
     ["max_mem_compaction_level"],
     ["target_file_size_base"],
     ["target_file_size_multiplier"],
     ["max_bytes_for_level_base"],
     ["max_bytes_for_level_multiplier"],
     ["max_bytes_for_level_multiplier_addtl[0]"],
     ["max_bytes_for_level_multiplier_addtl[1]"],
     ["max_bytes_for_level_multiplier_addtl[2]"],
     ["max_bytes_for_level_multiplier_addtl[3]"],
     ["max_bytes_for_level_multiplier_addtl[4]"],
     ["max_bytes_for_level_multiplier_addtl[5]"],
     ["max_bytes_for_level_multiplier_addtl[6]"],
     ["max_sequential_skip_in_iterations"],
     ["expanded_compaction_factor"],
     ["source_compaction_factor"],
     ["max_grandparent_overlap_factor"],
     ["arena_block_size"],
     ["soft_rate_limit"],
     ["hard_rate_limit"],
     ["rate_limit_delay_max_milliseconds"],
     ["disable_auto_compactions"],
     ["purge_redundant_kvs_while_flush"],
     ["filter_deletes"],
     ["verify_checksums_in_compaction"],
     ["compaction_style"],
     ["compaction_options_universal.size_ratio"],
     ["compaction_options_universal.min_merge_width"],
     ["compaction_options_universal.max_merge_width"],
     ["compaction_options_universal.max_size_amplification_percent"],
     ["compaction_options_universal.compression_size_percent"],
     ["compaction_options_fifo.max_table_files_size"],
     ["table_properties_collectors"],
     ["inplace_update_support"],
     ["inplace_update_num_locks"],
     ["min_partial_merge_operands"],
     ["memtable_prefix_bloom_bits"],
     ["memtable_prefix_bloom_probes"],
     ["memtable_prefix_bloom_huge_page_tlb_size"],
     ["bloom_locality"],
     ["max_successive_merges"],
     ];

var on = true;
function onoffcolumns(){
    var target = $(".nondiff")
    if(on){
	$(".nondiff").fadeOut();
	$("#onoffcolumn")[0].textContent = "Show all";
    }else{
	$(".nondiff").fadeIn();
	$("#onoffcolumn")[0].textContent = "Show Only Diff";
    }
    on = !on;
}

var tooltips_state = true;
function onofftooltips(){
    console.log("hey");
    if(tooltips_state){
	$("table").tooltip('disable');
	$("#onofftooltip")[0].textContent = "Show tooltip";
    }
    else{
	$("table").tooltip('enable');
	$("#onofftooltip")[0].textContent = "Hide tooltip";
    }
    tooltips_state = !tooltips_state;
}

var move_layer = true;
function move_layers(){
    if(move_layer){
	translate_layers(0, function(d,i){return bar_y_offset + (bar_height + 5)*i}, function(d,i){return bar_y_offset + (bar_height + 5)*i + 20});
	translate_layers(1, function(d,i){return bar_y_offset + (bar_height + 5)*7 + 10 + (bar_height + 5)*i},
			 function(d,i){return bar_y_offset + (bar_height + 5)*7 + 10 + (bar_height + 5)*i + 20});
	$("#movelayers")[0].textContent = "Each Layer";
    }else{
	translate_layers(0, function(d, i){return i * (bar_height + bar_between) + bar_y_offset;}, function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 20;});
	translate_layers(1, function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 33;},
			 function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 20 + 33;});
	$("#movelayers")[0].textContent = "Each DB";
    }
    move_layer = !move_layer;
}

function translate_layers(id, layers_translate_func, labels_translate_func)
{
    svg.selectAll(".base_layers"+id).transition().duration(2000).attr("y",layers_translate_func);
    svg.selectAll(".f_layers"+id).transition().duration(2000).attr("y",layers_translate_func);
    svg.selectAll(".filenum_labels"+id).transition().duration(2000).attr("y",labels_translate_func);
    var opacity = 1;
    if(id == 1 && $(".layer_labels"+id)[0].getAttribute("opacity") == 1)
	opacity = 0;
    svg.selectAll(".layer_labels"+id).transition().duration(2000).attr("y",labels_translate_func).attr("opacity", opacity);
}



$(function(){
	$("table").tooltip(
			   {position: {
				   my: 'left top', at: 'right bottom', collision: 'none'
				       }});
	option_datas_0.splice(option_datas_0.indexOf("manifest"), 1);
	option_datas_0.splice(option_datas_0.indexOf("from"), 1);
	option_datas_0.splice(option_datas_0.indexOf("for"), 1);
	option_datas_0.splice(option_datas_0.indexOf("options:"), 1);
	option_datas_1.splice(option_datas_1.indexOf("manifest"), 1);
	option_datas_1.splice(option_datas_1.indexOf("from"), 1);
	option_datas_1.splice(option_datas_1.indexOf("for"), 1);
	option_datas_1.splice(option_datas_1.indexOf("options:"), 1);

	var option_num = option_datas_0.length;
	for(var i = 0; i < option_num; i++)
	    {
		var new_row = "";
		if(option_datas_0[i] != option_datas_1[i]){
		    new_row += "<tr class='diff'>";
		}
		else{
		    new_row += "<tr class='nondiff'>";
		}
		
		new_row += "<td bgcolor='#ffc585' align='center' style='word-wrap:break-word' title='" + option_properties[i][0] +"'>" + option_properties[i][0] + "</td>";
		if(option_datas_0[i] != option_datas_1[i]){
		    new_row += "<td bgcolor='#FFDDDD' align='center' width='120' style='word-wrap:break-word' class='diff_cell'>" + option_datas_0[i] + "</td>";
		    new_row += "<td bgcolor='#DDDDFF' align='center' width='120' style='word-wrap:break-word' class='diff_cell'>" + option_datas_1[i] + "</td>";
		}else{
		    new_row += "<td bgcolor='#EEEEEE' align='center' width='120' style='word-wrap:break-word' colspan='2' class='nondiff_cell'>" + option_datas_0[i] + "</td>";
		}
		new_row += "</tr>";
		$("#option_tables").append(new_row);
	    }

      svg = d3.select("#svg-content")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      //Draw DB
      function draw_db(db_height, db_width, stroke_width, db_y, db_x, ellipse_y, latest_statistics, fill_color, db_name){
	  var db_rects = svg.selectAll("db_rects")
	      .data([1])
	      .enter()
	      .append("rect")
	      .attr("width", db_width)
	      .attr("height", db_height)
	      .attr("x", db_x)
	      .attr("y", db_y)
	      .attr("fill", fill_color)
	      .attr("stroke-width", stroke_width)
	      .attr("stroke", "black");
	  var db_ellipses = svg.selectAll("db_ellipse")
	      .data([db_y, db_y + db_height])
	      .enter()
	      .append("ellipse")
	      .attr("cx", db_x + db_width/2)
	      .attr("cy", function(d){return d;})
	      .attr("rx", db_width/2)
	      .attr("ry", ellipse_y)
	      .attr("fill", fill_color)
	      .attr("stroke-width", stroke_width)
	      .attr("stroke", "black");
	  var db_rects2 = svg.selectAll("db_rects2")
	      .data([1])
	      .enter()
	      .append("rect")
	      .attr("width", db_width - 2*stroke_width/2)
	      .attr("height", db_height/2)
	      .attr("x", db_x + stroke_width/2)
	      .attr("y", db_y + db_height/2)
	      .attr("fill", fill_color);
	  
	  //DB and Text .
	  var text_datas = [["Run Time: ", latest_statistics[0],"(sec)"],
			    ["Writes  : ", latest_statistics[1],"(times)"],
			    ["Batches : ", latest_statistics[2],"(times)"],
			    ["Ingest  : ", latest_statistics[3],"(GB)"],
			    ["Flush   : ", latest_statistics[4],"(GB)"]];
	  var db_text = svg.selectAll(".db_text")
	      .data(text_datas)
	      .enter()
	      .append("text")
	      //	      .attr("class", "db_text")
	      .attr("x", db_x + 30)
	      .attr("y", function(d, i){return db_y + 60 + i * 25;})
	      .text(function(d){return d[0]+d[1]+d[2];})
	      .attr("font-weight", "bold")
	      .attr("font-family", "selif");

	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext("2d");
	  ctx.font = "30px Arial bold selif";        
	  var db_name_width = ctx.measureText(db_name).width;

	  //DB Name
	  var db_name_text = svg.selectAll(".db_name_text")
	      .data([db_name])
	      .enter()
	      .append("text")
	      .attr("x", db_x + db_width/2 - db_name_width/2 - 10)
	      .attr("y", db_y + ellipse_y/2 - 15/2)
	      .text(function(d){return d;})
	      .attr("font-weight", "bold")
	      .attr("font-family", "selif")
	      .attr("font-size","30px");
      }

      //draw db1
      draw_db(db_height, db_width, stroke_width, db_y, db_x, ellipse_y, latest_statistics_total_datas_0, "#ff9999", "dbbench1");
      //draw db2
      draw_db(db_height, db_width, stroke_width, db_y + db_height + ellipse_y * 2 + 100, db_x, ellipse_y, latest_statistics_total_datas_1, "#9999ff", "dbbench2");

      //Memory Picture
//      var memory_x = 20;
 //     var memory_y = 20;
  //    var memory_width = 280;
  ///    var memory_height = 60;
  //    var memory_base = svg.selectAll("memory_base")
//      .data([1])
//      .enter()
///      .append("rect")
///      .attr("width", memory_width)
 ///     .attr("height", memory_height)
  ///    .attr("x", memory_x)
  //    .attr("y", memory_y)
  //    .attr("fill", "#00aa00");
 // /    var memory_piece = svg.selectAll("memory_piece")
//      .data([1,1,1,1])
 //     .enter()
   //   .append("rect")
     // .attr("width", memory_height - 20)
//      .attr("height", memory_height - 20)
  //    .attr("x", function(d,i){return memory_x + 20 + (memory_height+5) * i;})
   //   .attr("y", memory_y + 10)
    //  .attr("fill", "#555555");

      function draw_layers(id, layer_datas, bar_height, bar_between, bar_x_offset, bar_y_offset, base_color, base_border_color, layer_color, layer_border_color, show_label){
	  var base_layers = svg.selectAll(".base_layers"+id)
	      .data(layer_datas)
	      .enter()
	      .append("rect");
      
	  var layers_width_max = w * 0.55;
	  base_layers
	      .attr("class", "base_layers"+id)
	      .attr("width", layers_width_max)
	      .attr("height", bar_height)
	      .attr("x", bar_x_offset)
	      .attr("y", function(d, i){return i * (bar_height + bar_between) + bar_y_offset;})
	      .attr("fill", base_color)
	      .attr("stroke-width", 2)
	      .attr("stroke", base_border_color);
	  
	  var max_file_num = 4 + 1730 + 590;
	  var max_file_size = 8 + 3354 + 1223;

	  var layers_by_filesize = svg.selectAll(".f_layers"+id)
	      .data(layer_datas)
	      .enter()
	      .append("rect");

	  layers_by_filesize
	      .attr("class", "f_layers"+id)
	      .attr("width", function(d){return layers_width_max * d[1].filesize * 1.0/max_file_size;})
	      .attr("height", 30)
	      .attr("x", bar_x_offset)
	      .attr("y", function(d, i){return i * (bar_height + bar_between) + bar_y_offset;})
	      .attr("fill", layer_color)
	      .attr("stroke-width", 2)
	      .attr("stroke", layer_border_color);
	  
	  function bytes_string(filesize){
	      if(filesize/1000 < 1){
		  return filesize+"M";
	      }
	      else if(filesize/(1000*1000) <1 ){
		  return filesize/1000+"G";
	      }
	      else if(filesize/(1000*1000*1000) <1) {
		  return filesize/1000/1000+"T";
	      }
	  }

	  var filenum_labels = svg.selectAll(".filenum_labels"+id)
	      .data(layer_datas)
	      .enter()
	      .append("text")
	      .attr("class", "filenum_labels"+id)
	      .attr("x", function(d){if(d[1].filesize*1.0/max_file_size < 0.5){return layers_width_max * d[1].filesize * 1.0/max_file_size + bar_x_offset + 5;}
		      else{return layers_width_max * d[1].filesize * 1.0/max_file_size + bar_x_offset - 115;}})
	      .attr("y", function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 20;})
	      .text(function(d){return bytes_string(d[1].filesize)+"B("+d[1].filenum+"files)";})
	      .attr("font-weight", "bold")
	      .attr("font-family", "selif")
	      .attr("font-style", "italic");

	  var visibility = 1;
	  if(!show_label){
	      visibility = 0;
	  }
	  var layer_labels = svg.selectAll(".layer_labels"+id)
	      .data(layer_datas)
	      .enter()
	      .append("text")
	      .attr("class", "layer_labels"+id)
	      .attr("x", bar_x_offset - 25)
	      .attr("y", function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 20;})
	      .attr("opacity", visibility)
	      .text(function(d){return "L"+d[0];})
	      .attr("font-weight", "bold")
	      .attr("font-family", "selif");

	  //var bar = svg.selectAll(".bar_")
	 //     .data([1])
	  //    .enter()
	   //   .append("rect")
//	      .attr("width",400)
//	      .attr("height",30)
//	      .attr("x", bar_x_offset - 80)
//	      .attr("fill", "#ff0000")
//	      .transition().duration(2000).attr("x",400).attr("fill", "#0000ff").remove();
      }

      draw_layers(0, layer_datas, bar_height, bar_between, bar_x_offset, bar_y_offset, "#ffdddd", "#ff4444", "#ff9999", "#ff4444", true);
      draw_layers(1, layer_datas, bar_height, bar_between, bar_x_offset, bar_y_offset + bar_height + 3, "#ddddff", "#4444ff", "#9999ff", "#4444ff", false);

      var marker = svg.append("defs").append("marker")
	  .attr({
		  'id': "arrowhead",
		  'refX': 0,
		  'refY': 2,
		  'markerWidth': 40,
		  'markerHeight': 40,
		  'orient': "auto"
	      });
      marker.append("path")
	  .attr({
		  d: "M 0,0 V 10 L4,2 Z",
		      fill: "steelblue"
		      });
	  
      });