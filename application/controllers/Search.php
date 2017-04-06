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

  public function lastTeams()
  {
    $result = $this->Search_teams_model->getLastTeams();
    echo json_encode($result);
    die();

  }

  public function short()
  {
    $result = [];
    $str = explode("+", $this->input->get('str'));
    $forbidden_words = array('quidditch', 'team', '', ' ', 'equipo');
    $str = array_diff($str, $forbidden_words);
    $str = implode(" ", $str);
    $result = $this->Search_teams_model->shortSearch($str);
    echo json_encode($result);
    die();
  }

  public function team()
  {
    $id = $this->input->get('id');
    $result = $this->Search_teams_model->teamSearch($id);
    echo json_encode($result[0]);
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

    $subject = $this->input->post('subject');
    //$message = $this->input->post('message');
    $fromEmail = $this->input->post('from');
    $fromName = explode("@", $fromEmail)[0];

    $teamId = $this->input->post('id');
    $teamName = $this->Search_teams_model->teamSearch($teamId)[0]->name;
    $teamEmail = $this->Search_teams_model->teamSearch($teamId)[0]->email;
    $teamEmail = 'juandaamallorca@gmail.com';

    $message = '<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Transactional Email</title>
    <style type="text/css">
    /* -------------------------------------
        INLINED WITH https://putsmail.com/inliner
    ------------------------------------- */
    /* -------------------------------------
        RESPONSIVE AND MOBILE FRIENDLY STYLES
    ------------------------------------- */
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important; }
      table[class=body] p,
      table[class=body] ul,
      table[class=body] ol,
      table[class=body] td,
      table[class=body] span,
      table[class=body] a {
        font-size: 16px !important; }
      table[class=body] .wrapper,
      table[class=body] .article {
        padding: 10px !important; }
      table[class=body] .content {
        padding: 0 !important; }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important; }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important; }
      table[class=body] .btn table {
        width: 100% !important; }
      table[class=body] .btn a {
        width: 100% !important; }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important; }}
    /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
    @media all {
      .ExternalClass {
        width: 100%; }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%; }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important; }
      .btn-primary table td:hover {
        background-color: #34495e !important; }
      .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important; } }
    </style>
  </head>
  <body class="" style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;">
      <tr>
        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
        <td class="container" style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;">
          <div class="content" style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;">
            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">This is preheader text. Some clients will show this text as a preview.</span>
            <table class="main" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;">
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
                    <tr>
                      <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">
                        <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Hola ' . $teamName . ',</p>
                        <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">' . $fromName . ' you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:#3498db;"> 
                                       
                                       </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p>
                        <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Good luck! Hope it works.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- START FOOTER -->
            <div class="footer" style="clear:both;padding-top:10px;text-align:center;width:100%;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
                <tr>
                  <td class="content-block" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;">
                    <span class="apple-link" style="color:#999999;font-size:12px;text-align:center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                    <br>
                     Don\'t like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;">
                    Powered by <a href="http://htmlemail.io" style="color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;">HTMLemail</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->
            <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>';


    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: ' . $fromName . ' <jj@gmail.com>' . "\r\n";

    mail($teamEmail, $subject, $message, $headers);
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
        $post_params = $this->get_post();

        if ($post_params['id']) {
          $this->editTeam();
        }
        break;
      case 'delete':
        break;
    }

  }

  private function editTeam()
  {
    $post_params = $this->get_post();

    $id = $post_params['id'];
    $name = $post_params['name'];
    $email = $post_params['email'];
    $logo = $post_params['logo'];
    $township = $post_params['township_id'];
    $lat = $post_params['lat'];
    $lng = $post_params['lng'];
    $src = '';

    if ($logo) {
      $src = $this->savelogo2file($id, $logo);
    }

    $this->Search_teams_model->editTeam($id, $name, $email, $township, $src, $lat, $lng);

    $response = array('status' => 'OK');

    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json', 'utf-8')
      ->set_output(json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
      ->_display();
    exit;

  }

  private function getLogoSrc($id = 0) {
    return "logo_".$id.".png";
  }

  private function savelogo2file($id, $logo) {
    $path = "/dist/images/badges/teams/".$this->getLogoSrc($id);
    list($type, $logo) = explode(';', $logo);
    list(, $logo)      = explode(',', $logo);
    $data = base64_decode($logo);
    $fp = fopen($_SERVER['DOCUMENT_ROOT'] . $path,"wb");
    fwrite($fp,$data);
    fclose($fp);

    return $this->getLogoSrc($id);
  }

  private function addNewTeam()
  {
    $post_params = $this->get_post();

    $name = $post_params['name'];
    $email = $post_params['email'];
    $logo = $post_params['logo'];
    $src = '';

    $township = $post_params['township_id'];
    $lat = $post_params['lat'];
    $lng = $post_params['lng'];

    $id = $this->Search_teams_model->addTeam($name, $email, $township, $logo, $lat, $lng);

    if ($logo) {
      $src = $this->savelogo2file($id, $logo);
    }

    $id = $this->Search_teams_model->editTeamLogo($id, $src);

    $response = array('id' => $id);

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


  public function getMapTeams()
  {
    $result = $this->Search_teams_model->getMapTeams();
    echo json_encode($result);
    die();
  }

  public function setLang()
  {
    $lang = $this->input->post('lang');
    set_cookie('qtb_lang', $lang);
  }
}
