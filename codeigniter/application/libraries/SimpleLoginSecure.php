<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once('phpass-0.1/PasswordHash.php');

define('PHPASS_HASH_STRENGTH', 8);
define('PHPASS_HASH_PORTABLE', false);

/**
 * SimpleLoginSecure Class
 *
 * Makes authentication simple and secure.
 *
 * Simplelogin expects the following database setup. If you are not using 
 * this setup you may need to do some tweaking.
 *   
 * 
 *   CREATE TABLE `users` (
 *     `user_id` int(10) unsigned NOT NULL auto_increment,
 *     `user_email` varchar(255) NOT NULL default '',
 *     `user_pass` varchar(60) NOT NULL default '',
 *     `user_date` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT 'Creation date',
 *     `user_modified` datetime NOT NULL default '0000-00-00 00:00:00',
 *     `user_last_login` datetime NULL default NULL,
 *     PRIMARY KEY  (`user_id`),
 *     UNIQUE KEY `user_email` (`user_email`),
 *   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 * 
 * @package   SimpleLoginSecure
 * @version   1.0.1
 * @author    Alex Dunae, Dialect <alex[at]dialect.ca>
 * @copyright Copyright (c) 2008, Alex Dunae
 * @license   http://www.gnu.org/licenses/gpl-3.0.txt
 * @link      http://dialect.ca/code/ci-simple-login-secure/
 * 
 * @modified Carl 20-12-2011	Changed database column names to fit the CitizenGame database
 */
class SimpleLoginSecure
{
	var $CI;
	var $user_table = 'users';
	var $user_view = 'view_users';

	/**
	 * Create a user account
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @param	bool
	 * @return	bool
	 */
	function create($user_email = '', $user_pass = '', $auto_login = false) 
	{
		$this->CI =& get_instance();

		//Make sure account info was sent
		if($user_email == '' OR $user_pass == '') {
			log_message('error', 'SimpleLoginSecure.create: Missing user email or user pass');
			return false;
		}

		//Check against user table
		$this->CI->db->where('email', $user_email); 
		$query = $this->CI->db->get_where($this->user_view);
		
		//user_email already exists
		if ($query->num_rows() > 0) {
			log_message('error', 'SimpleLoginSecure.create: Email already exists');
			return false;
		}

		//Hash user_pass using phpass
		$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);
		$user_pass_hashed = $hasher->HashPassword($user_pass);

		//Insert account into the database
		$data = array(
					'email' => $user_email,
					'pwd' => $user_pass_hashed,
					'created_at' => date('c'),
					'modified_at' => date('c'),
				);

		$this->CI->db->set($data); 

		//There was a problem! 
		if(!$this->CI->db->insert($this->user_table)) {
			log_message('error', 'SimpleLoginSecure.create: There was a problem while inserting data into the database');
			return false;
		}
				
		if($auto_login)
			$this->login($user_email, $user_pass);
		
		return true;
	}

	/**
	 * Login and sets session variables
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @return	bool
	 */
	function login($user_email = '', $user_pass = '') 
	{
		$this->CI =& get_instance();

		if($user_email == '' OR $user_pass == '') {
			log_message('error', 'SimpleLoginSecure.login: Missing email or password');
			return false;
		}


		//Check if already logged in
		if($this->CI->session->userdata('email') == $user_email) {
			log_message('debug', 'SimpleLoginSecure.login: User '.$user_email.' is already logged in');
			return true;
		}
		
		
		//Check against user table
		$this->CI->db->where('email', $user_email);
		$query = $this->CI->db->get_where($this->user_view);

		
		if ($query->num_rows() > 0) 
		{
			$user_data = $query->row_array(); 

			$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);

			if(!$hasher->CheckPassword($user_pass, $user_data['pwd'])) {
				log_message('error', 'SimpleLoginSecure.login: Password verification failed');
				return false;
			}

			//Destroy old session
			$this->CI->session->sess_destroy();
			
			//Create a fresh, brand new session
			$this->CI->session->sess_create();

			// @modified Carl 21-12-2011	Added session_id to query to link users and ci_sessions tables
			$query = 'UPDATE ' . $this->user_table  . 
				' SET last_login = NOW(), session_id = \'' . $this->CI->session->userdata('session_id') . 
				'\' WHERE id = ' . $user_data['id'];

			log_message('debug', 'SimpleLoginSecure.login: '.$query);

			$this->CI->db->simple_query($query);

			//Set session data
			unset($user_data['pwd']);
			// $user_data['user'] = $user_data['email']; // for compatibility with Simplelogin
			$user_data['logged_in'] = true;
			$this->CI->session->set_userdata($user_data);
			
			return true;
		} 
		else 
		{
			return false;
		}	

	}

	/**
	 * Logout user
	 *
	 * @access	public
	 * @return	void
	 */
	function logout() {
		$this->CI =& get_instance();
		
		$this->CI->db->simple_query('UPDATE '.$this->user_table.' SET session_id = \'\' where id = '.$this->CI->session->userdata('id'));

		$this->CI->session->sess_destroy();
	}

	/**
	 * Delete user
	 *
	 * @access	public
	 * @param integer
	 * @return	bool
	 */
	function delete($user_id) 
	{
		$this->CI =& get_instance();
		
		if(!is_numeric($user_id))
			return false;			

		return $this->CI->db->delete($this->user_table, array('id' => $user_id));
	}
	
}
?>
