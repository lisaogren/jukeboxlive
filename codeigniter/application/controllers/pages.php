<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
|---------------------------
| Pages controller
|---------------------------
|
| Loads the main pages of the site using the base view
|
*/

class Pages extends CI_Controller {

	// Load common functionalities
	public function __construct() {
		parent::__construct();

		$this->load->model('user_model');
	}


	public function index() {
		$data = array();

		$this->load->view('base', $data);
	}


	// admin controller
	public function admin($page) {
		
	}

}

?>