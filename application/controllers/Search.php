<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Search extends CI_Controller
{
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

  public function team()
  {
    $id = $this->input->get('id');
    $result = $this->Search_teams_model->teamSearch($id);
    echo json_encode($result);
    die();
  }

  public function teams()
  {
    $result = $this->Search_teams_model->getAllTeams();
    echo json_encode($result);
    die();
  }

  public function sendEmail()
  {
    $id = $this->input->post('id');
    $from = $this->input->post('from');
    $subject = $this->input->post('subject');
    $message = $this->input->post('message');
    $email = $this->Search_teams_model->teamSearch($id)[0]['email'];
    $response = ["status" => 0];

    //TODO: Send email
    if (true) {
      $response["status"] = 100;
    }

    echo json_encode($response);
    die();
  }
}
