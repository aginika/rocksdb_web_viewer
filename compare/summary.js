var option_properties =
    ["error_if_exists",
     "create_if_missing",
     "env",
     "info_log",
     "max_open_files",
     "max_total_wal_size",
     "disableDataSync",
     "use_fsync",
     "max_log_file_size",
     "max_manifest_file_size",
     "log_file_time_to_roll",
     "keep_log_file_num",
     "allow_os_buffer",
     "allow_mmap_reads",
     "allow_mmap_writes",
     "create_missing_column_fmailies",
     "db_log_dir",
     "wal_dir",
     "table_cache_numshardbits",
     "table_cache_remove_scan_count_limit",
     "delete_obsolete_files_period_micros",
     "max_background_compactions",
     "max_background_flushes",
     "WAL_ttl_seconds",
     "WAL_size_limit_MB",
     "manifest_preallocation_size",
     "allow_os_buffer",
     "allow_mmap_reads",
     "allow_mmap_writes",
     "is_fd_close_on_exec",
     "skip_log_error_on_recovery",
     "stats_dump_period_sec",
     "advise_random_on_open",
     "access_hint_on_compaction_start",
     "use_adaptive_mutex",
     "rate_limiter",
     "bytes_per_sync",
     "comparator",
     "merge_operator",
     "compaction_filter",
     "compaction_filter_factory",
     "compaction_filter_factory_v2",
     "memtable_factory",
     "table_factory",
     "flush_block_policy_factory",
     //"cache_index_and_filter_blocks",
     //"index_type",
     //"hash_index_allow_collision",
     //"checksum",
     //"no_block_cache",
     //"block_cache",
     //"block_cache_compressed",
     //"block_size",
     //"block"
     "write_buffer_size",
     "max_write_buffer_number",
     "compression",
     "prefix_extractor",
     "num_levels",
     "min_write_buffer_number_to_merge",
     "purge_redundant_kvs_while_flush",
     "compression_opts.window_bits",
     "compression_opts.level",
     "compression_opts.strategy",
     "level0_file_num_compaction_trigger",
     "level0_slowdown_writes_trigger",
     "level0_stop_writes_trigger",
     "max_mem_compaction_level",
     "target_file_size_base",
     "target_file_size_multiplier",
     "max_bytes_for_level_base",
     "max_bytes_for_level_multiplier",
     "max_bytes_for_level_multiplier_addtl[0]",
     "max_bytes_for_level_multiplier_addtl[1]",
     "max_bytes_for_level_multiplier_addtl[2]",
     "max_bytes_for_level_multiplier_addtl[3]",
     "max_bytes_for_level_multiplier_addtl[4]",
     "max_bytes_for_level_multiplier_addtl[5]",
     "max_bytes_for_level_multiplier_addtl[6]",
     "max_sequential_skip_in_iterations",
     "expanded_compaction_factor",
     "source_compaction_factor",
     "max_grandparent_overlap_factor",
     "arena_block_size",
     "soft_rate_limit",
     "hard_rate_limit",
     "rate_limit_delay_max_milliseconds",
     "disable_auto_compactions",
     "purge_redundant_kvs_while_flush",
     "filter_deletes",
     "verify_checksums_in_compaction",
     "compaction_style",
     "compaction_options_universal.size_ratio",
     "compaction_options_universal.min_merge_width",
     "compaction_options_universal.max_merge_width",
     "compaction_options_universal.max_size_amplification_percent",
     "compaction_options_universal.compression_size_percent",
     "compaction_options_fifo.max_table_files_size",
     "table_properties_collectors",
     "inplace_update_support",
     "inplace_update_num_locks",
     "min_partial_merge_operands",
     "memtable_prefix_bloom_bits",
     "memtable_prefix_bloom_probes",
     "memtable_prefix_bloom_huge_page_tlb_size",
     "bloom_locality",
     "max_successive_merges",
     ];

$(function(){
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
		var new_row = "<tr>";
		new_row += "<td bgcolor='#ffc585' align='center' style='word-wrap:break-word'>" + option_properties[i] + "</td>";
		if(option_datas_0[i] != option_datas_1[i]){
		    new_row += "<td bgcolor='#FFDDDD' align='center' width='120' style='word-wrap:break-word'>" + option_datas_0[i] + "</td>";
		    new_row += "<td bgcolor='#DDDDFF' align='center' width='120' style='word-wrap:break-word'>" + option_datas_1[i] + "</td>";
		}else{
		    new_row += "<td bgcolor='#EEEEEE' align='center' width='120' style='word-wrap:break-word' colspan='2'>" + option_datas_0[i] + "</td>";
		}
		new_row += "</tr>";
		$("#option_tables").append(new_row);
	    }
    });