var svg;
var db_height = 150;
var db_width = 280;
var stroke_width = 2;
var db_y = 50;
var db_x = 10;
var ellipse_y = 30;

//Layer id, file nums,
var layer_datas_0 = [
		     [0, {filenum:4, filesize:8}],
		     [1, {filenum:1730, filesize:3354}],
		     [2, {filenum:590, filesize:1223}],
		     [3, {filenum:0, filesize:0}],
		     [4, {filenum:0, filesize:0}],
		     [5, {filenum:0, filesize:0}],
		     [6, {filenum:0, filesize:0}]];

var layer_datas_1 = [
		     [0, {filenum:10, filesize:19}],
		     [1, {filenum:1630, filesize:2349}],
		     [2, {filenum:690, filesize:1207}],
		     [3, {filenum:2, filesize:1000}],
		     [4, {filenum:4, filesize:10}],
		     [5, {filenum:0, filesize:0}],
		     [6, {filenum:0, filesize:0}]];
var bar_height = 30;
var bar_between = 10 + bar_height;
var bar_x_offset = 350;
var bar_y_offset = 30;

var w = 1000;
var h = 550;

var option_properties =
    [["error_if_exists",""],
     ["create_if_missing",""],
     ["env",""],
     ["info_log",""],
     ["max_open_files","RocksDB keeps all file descriptors in a table cache. If number of file descriptors exceeds max_open_files, some files are evicted from table cache and their file descriptors closed. This means that every read must go through the table cache to lookup the file needed. Set max_open_files to -1 to always keep all files open, which avoids expensive table cache calls."],
     ["max_total_wal_size",""],
     ["disableDataSync",""],
     ["use_fsync",""],
     ["max_log_file_size",""],
     ["max_manifest_file_size",""],
     ["log_file_time_to_roll",""],
     ["keep_log_file_num",""],
     ["allow_os_buffer"," If false, we will not buffer files in OS cache"],
     ["allow_mmap_reads",""],
     ["allow_mmap_writes",""],
     ["create_missing_column_fmailies",""],
     ["db_log_dir",""],
     ["wal_dir",""],
     ["table_cache_numshardbits","This option controls table cache sharding. Increase it if table cache mutex is contended."],
     ["table_cache_remove_scan_count_limit",""],
     ["delete_obsolete_files_period_micros",""],
     ["max_background_compactions","the maximum number of concurrent background compactions. Default is 1, but to fully utilize your CPU and storage you might want to increase this to approximately number of cores in the system."],
     ["max_background_flushes","the maximum number of concurrent flush operations. It is usually good enough to set this to 1."],
     ["WAL_ttl_seconds",""],
     ["WAL_size_limit_MB",""],
     ["manifest_preallocation_size",""],
     ["allow_os_buffer",""],
     ["allow_mmap_reads",""],
     ["allow_mmap_writes",""],
     ["is_fd_close_on_exec",""],
     ["skip_log_error_on_recovery",""],
     ["stats_dump_period_sec",""],
     ["advise_random_on_open",""],
     ["access_hint_on_compaction_start",""],
     ["use_adaptive_mutex",""],
     ["rate_limiter",""],
     ["bytes_per_sync",""],
     ["comparator",""],
     ["merge_operator",""],
     ["compaction_filter",""],
     ["compaction_filter_factory",""],
     ["compaction_filter_factory_v2",""],
     ["memtable_factory","Defines the memtable. "],
     ["table_factory","Defines the table format"],
     ["flush_block_policy_factory",""],
     //["cache_index_and_filter_blocks",""],
     //["index_type",""],
     //["hash_index_allow_collision",""],
     //["checksum",""],
     //["no_block_cache",""],
     //["block_cache",""],
     //["block_cache_compressed",""],
     //["block_size",""],
     //["block"
     ["write_buffer_size","the size of a single memtable. Once memtable exceeds this size, it is marked immutable and a new one is created."],
     ["max_write_buffer_number","the maximum number of memtables, both active and immutable. If the active memtable fills up and the total number of memtables is larger than max_write_buffer_number we stall further writes. This may happen if the flush process is slower than the write rate."],
     ["compression",""],
     ["prefix_extractor","A SliceTransform object that defines key prefixes. Key prefixes are then used to perform some interesting optimizations"],
     ["num_levels","It is safe for num_levels to be bigger than expected number of levels in the database. Some higher levels may be empty, but this will not impact performance in any way. Only change this option if you expect your number of levels will be greater than 7"],
     ["min_write_buffer_number_to_merge","he minimum number of memtables to be merged before flushing to storage. For example, if this option is set to 2, immutable memtables are only flushed when there are two of them - a single immutable memtable will never be flushed. If multiple memtables are merged together, less data may be written to storage since two updates are merged to a single key."],
     ["purge_redundant_kvs_while_flush",""],
     ["compression_opts.window_bits",""],
     ["compression_opts.level",""],
     ["compression_opts.strategy",""],
     ["level0_file_num_compaction_trigger","Once level 0 reaches this number of files, L0->L1 compaction is triggered."],
     ["level0_slowdown_writes_trigger","When the number of level 0 files is greater than the slowdown limit, writes are stalled. "],
     ["level0_stop_writes_trigger","When the number is greater than stop limit, writes are fully stopped until compaction is done."],
     ["max_mem_compaction_level",""],
     ["target_file_size_base"," Files in level 1 will have target_file_size_base bytes. Increasing target_file_size_base will reduce total number of database files, which is generally a good thing."],
     ["target_file_size_multiplier","Each next levels file size will be target_file_size_multiplier bigger than previous one. However, by default target_file_size_multiplier is 1, so files in all L1..Lmax levels are equal."],
     ["max_bytes_for_level_base","total size of level 1. As mentioned, we recommend that this be around the size of level 0"],
     ["max_bytes_for_level_multiplier","Each subsequent level is max_bytes_for_level_multiplier larger than previous one. The default is 10 and we do not recommend changing that."],
     ["max_bytes_for_level_multiplier_addtl[0]",""],
     ["max_bytes_for_level_multiplier_addtl[1]",""],
     ["max_bytes_for_level_multiplier_addtl[2]",""],
     ["max_bytes_for_level_multiplier_addtl[3]",""],
     ["max_bytes_for_level_multiplier_addtl[4]",""],
     ["max_bytes_for_level_multiplier_addtl[5]",""],
     ["max_bytes_for_level_multiplier_addtl[6]",""],
     ["max_sequential_skip_in_iterations",""],
     ["expanded_compaction_factor",""],
     ["source_compaction_factor",""],
     ["max_grandparent_overlap_factor",""],
     ["arena_block_size",""],
     ["soft_rate_limit","In level style compaction, each level has a compaction score. When a compaction score is greater than 1, compaction is triggered. If the score for any level exceeds the soft_rate_limit, writes are slowed down."],
     ["hard_rate_limit","If a score exceeds hard_rate_limit, writes are stopped until compaction for that level reduces its score."],
     ["rate_limit_delay_max_milliseconds",""],
     ["disable_auto_compactions",""],
     ["purge_redundant_kvs_while_flush",""],
     ["filter_deletes",""],
     ["verify_checksums_in_compaction",""],
     ["compaction_style",""],
     ["compaction_options_universal.size_ratio",""],
     ["compaction_options_universal.min_merge_width",""],
     ["compaction_options_universal.max_merge_width",""],
     ["compaction_options_universal.max_size_amplification_percent","Size amplification as defined by amount of additional storage needed (in percentage) to store a byte of data in the database. Default is 200, which means that a 100 byte database could require up to 300 bytes of storage."],
     ["compaction_options_universal.compression_size_percent","Percentage of data in the database that is compressed. Older data is compressed, newer data is not compressed. If set to -1 (default), all data is compressed."],
     ["compaction_options_fifo.max_table_files_size",""],
     ["table_properties_collectors",""],
     ["inplace_update_support",""],
     ["inplace_update_num_locks",""],
     ["min_partial_merge_operands",""],
     ["memtable_prefix_bloom_bits",""],
     ["memtable_prefix_bloom_probes",""],
     ["memtable_prefix_bloom_huge_page_tlb_size",""],
     ["bloom_locality",""],
     ["max_successive_merges",""],
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
    svg.selectAll(".base_layers"+id).transition().duration(1000).attr("y",layers_translate_func);
    svg.selectAll(".f_layers"+id).transition().duration(1000).attr("y",layers_translate_func);
    svg.selectAll(".filenum_labels"+id).transition().duration(1000).attr("y",labels_translate_func);
    var opacity = 1;
    if(id == 1 && $(".layer_labels"+id)[0].getAttribute("opacity") == 1)
	opacity = 0;
    svg.selectAll(".layer_labels"+id).transition().duration(1000).attr("y",labels_translate_func).attr("opacity", opacity);
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
		
		new_row += "<td bgcolor='#ffc585' align='center' style='word-wrap:break-word' title='" + option_properties[i][1] +"'>" + option_properties[i][0] + "</td>";
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

	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext("2d");
	  ctx.font = "18px Arial bold selif";        
	  //var db_name_width = ctx.measureText(db_name).width;

	  var filenum_labels = svg.selectAll(".filenum_labels"+id)
	      .data(layer_datas)
	      .enter()
	      .append("text")
	      .attr("class", "filenum_labels"+id)
	      .attr("x", function(d){if(d[1].filesize*1.0/max_file_size < 0.5){return layers_width_max * d[1].filesize * 1.0/max_file_size + bar_x_offset + 5;}
		      else{return layers_width_max * d[1].filesize * 1.0/max_file_size + bar_x_offset - ctx.measureText(bytes_string(d[1].filesize)+"B("+d[1].filenum+"files)").width;}})
	      .attr("y", function(d, i){return i * (bar_height + bar_between) + bar_y_offset + 20;})
	      .text(function(d){return bytes_string(d[1].filesize)+"B("+d[1].filenum+"files)";})
	      .attr("font-weight", "bold")
	      .attr("font-family", "selif")
	      .attr("font-style", "italic")
	      .attr("font-size", "16px");

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

      draw_layers(0, layer_datas_0, bar_height, bar_between, bar_x_offset, bar_y_offset, "#ffdddd", "#ff4444", "#ff9999", "#ff4444", true);
      draw_layers(1, layer_datas_1, bar_height, bar_between, bar_x_offset, bar_y_offset + bar_height + 3, "#ddddff", "#4444ff", "#9999ff", "#4444ff", false);

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