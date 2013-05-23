<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
|-------------------------------
| Video Model
|-------------------------------
|
| Represents a video in the database
|
*/

class Video_model extends CI_Model {

	var $table = 'tvdj_videos';

	public function __construct() {
		
	}

	/**
	 * Retrieve a video or a list of videos from the database
	 * @param 
	 */
	public function get($section_id, $video_id = false) {
		if ($video_id !== false) {
			$query = $this->db->get_where($this->table, array(
				'id' => $video_id,
				'section_id' => $section_id
			));
			return $query->row_array();
		}

		$query = $this->db->get_where($this->table, array(
			'deleted' => false,
			'section_id' => $section_id
		));
		return $query->result_array();
	}


}

?>