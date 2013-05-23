<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
|-------------------------------
| Users Model
|-------------------------------
|
| Represents a user in the database
|
*/

class User_model extends CI_Model {


	public function __construct() {
		// Login control library
		$this->load->library('SimpleLoginSecure');
	}






	public function get($user_id) {
		$query = $this->db->get_where($this->view, array(
			'id' => $user_id
		));
		return $query->result_array();
	}




	public function get_session_data() {
		$user = $this->session->all_userdata();

		return array(
			'id' => $user['id'],
			'lastname' => $user['lastname'],
			'firstname' => $user['firstname'],
			'nick' => $user['nick'],
			'email' => $user['email'],
			'logged_in' => $user['logged_in']
		);
	}






	public function login($user_login, $user_pwd) {
		// Try to login user
		if ($this->simpleloginsecure->login($user_login, $user_pwd)) {
			$this->session->set_flashdata('login_success', "Bienvenue !");
			return true;
		}

		// Set an error to print out in case login fails and add info that needs to reappear in the form
		$this->session->set_flashdata(array(
			'user_login' => $user_login,
			'login_error' => "Votre combinaison email / mot de passe n'est pas valide"
		));

		return false;
	}






	public function logout() {
		$this->simpleloginsecure->logout();
	}






	public function create($user_login, $user_pwd) {
		if ($this->simpleloginsecure->create($user_login, $user_pwd)) {
			echo "w00t";
		}
		else {
			echo "boouh";
		}
	}

}


?>