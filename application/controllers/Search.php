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
    $str = explode("+", $this->input->get('str'));
    $forbidden_words = array('quidditch', 'team', '', ' ', 'equipo');
    $str = array_diff($str, $forbidden_words);
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

  public function getProvinces()
  {
    $result = $this->Search_teams_model->getAllProvinces();
    echo json_encode($result);
    die();
  }

  public function getTownships()
  {
    $province_id = $this->input->get('province_id');
    $result = $this->Search_teams_model->getTownships($province_id);
    echo json_encode($result);
    die();
  }

  public function manageTeam()
  {
    switch ($this->getRequestType()) {
      case 'get':
        break;
      case 'post':
        $this->addNewTeam();
        break;
      case 'put':
        break;
      case 'delete':
        break;
    }

  }

  private function addNewTeam()
  {
    $post_params = $this->get_post();
    $name = $post_params['name'];
    $email = $post_params['email'];
    $logo = $post_params['logo'];
    $township = $post_params['township'];

    $this->Search_teams_model->addTeam($name, $email, $township, $logo);

    $response = array('status' => 'OK');

    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json', 'utf-8')
      ->set_output(json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
      ->_display();
    exit;

  }

  private function getRequestType()
  {
    return strtolower($this->input->server('REQUEST_METHOD'));
  }

  private function get_post()
  {
    $rest_json = file_get_contents("php://input");
    return json_decode($rest_json, true);
  }

}
