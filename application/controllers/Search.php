<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Search extends CI_Controller {
  public function __construct()
  {
    parent::__construct();

    $this->load->model("Search_teams_model");
  }

  public function index()
  {
  }

  public function short()
  {
    $str = explode(" ", $this->input->get('str'));
    $result = $this->Search_teams_model->shortSearch($str);
    echo json_encode($result);
    die();

  }
}
