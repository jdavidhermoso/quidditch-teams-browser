<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    $this->setLanguage();
    $this->load->view('home');
  }

  public function setLanguage()
  {
    $language = $this->input->post('lang');

    if (!$language) {
      if (!isset($_COOKIE['qtb_lang']) ) {
        setcookie('qtb_lang', 'spanish', time() + (86400 * 7));
      } else {
        setcookie('qtb_lang', $_COOKIE['qtb_lang'], time() + (86400 * 7));
      }
    } else {
      setcookie('qtb_lang2', $language, time() + (86400 * 7));
    }
  }
}
