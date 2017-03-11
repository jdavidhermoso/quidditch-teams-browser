<?php

class Search_teams_model extends CI_Model
{
  public function shortSearch($str = array())
  {

    if ($str != "") {
      $query = "SELECT team.id, team.name, team.logo, team.email, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE team.name LIKE '%" . $str . "%'  OR p.name LIKE '%" . $str . "%' OR t.name LIKE '%" . $str . "%' ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 3";
      $teamsQuery = $this->db->query($query);
      return $teamsQuery->result();
    }
  }

  public function teamSearch($id = 0)
  {
    $query = "SELECT team.id, team.name, team.logo, team.email, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE team.id = " . $id . " AND active = 1 ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 1";

    return $this->db->query($query)->result();
  }

  public function getAllTeams()
  {
    $teamsGroup = array();
    $teamArr = array();
    $query = "SELECT team.id, team.name, team.logo, team.email, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE active = 1 ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 1";
    $teamsQuery = $this->db->query($query);
    foreach ($teamsQuery->result() as $team) {
      $teamArr['id'] = $team->id;
      $teamArr['name'] = $team->name;
      $teamArr['logo'] = $team->logo;
      $teamArr['email'] = $team->email;
      $teamArr['province'] = $team->province;
      $teamArr['township'] = $team->town;
      array_push($teamsGroup, $teamArr);
      unset($teamArr);
    }
    return $teamsGroup;
  }

  public function getAllProvinces()
  {
    $query = "SELECT id, name FROM provinces ORDER BY name asc";
    $provQuery = $this->db->query($query)->result();

    return $provQuery;
  }

  public function getTownships($province_id)
  {
    $query = "SELECT id, name FROM townships WHERE province =  " . $province_id . " ORDER BY name asc";
    $townsQuery = $this->db->query($query)->result();

    return $townsQuery;
  }


  public function addTeam($name = '', $email = '', $township = 0, $logo = '')
  {
    $registerDate = date('Ymd');
    return $this->db->query("INSERT INTO qtb_teams (name, email, township, logo, registerdate, active) VALUES ('$name', '$email', '$township', '$logo', '$registerDate', 1)");
  }

}

?>
