<?php

class Search_teams_model extends CI_Model
{
  public function shortSearch($search_strings = array())
  {
    $where = "";
    $teamsGroup = array();
    $teamArr = array();
    foreach ($search_strings as $i=>$str)
    {
      if (strlen($str) > 3 && $str != "quidditch" && $str != "team") {
        $where .= " team.name LIKE '%".$str."%'";
        $where .= " OR p.name LIKE '%".$str."%'";
        $where .= " OR t.name LIKE '%".$str."%'";
      }
      if ($i < (count($search_strings)-1) ) {
        $where .= " OR";
      }
    }
    $query = "SELECT team.id, team.name, team.logo, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE ".$where." AND active = 1 ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 3";
    $teamsQuery = $this->db->query($query);
    foreach ($teamsQuery->result() as $team)
    {
      $teamArr['id'] = $team->id;
      $teamArr['name'] = $team->name;
      //$teamArr['logo'] = $team->logo;
      $teamArr['province'] = $team->province;
      $teamArr['township'] = $team->town;
      array_push($teamsGroup,$teamArr);
      unset($teamArr);
    }
    return $teamsGroup;
  }

  public function teamSearch($id = 0)
  {
    $teamsGroup = array();
    $teamArr = array();
    $query = "SELECT team.id, team.name, team.logo, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE team.id = ".$id." AND active = 1 ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 1";
    $teamsQuery = $this->db->query($query);
    foreach ($teamsQuery->result() as $team)
    {
      $teamArr['id'] = $team->id;
      $teamArr['name'] = $team->name;
      //$teamArr['logo'] = $team->logo;
      $teamArr['province'] = $team->province;
      $teamArr['township'] = $team->town;
      array_push($teamsGroup,$teamArr);
      unset($teamArr);
    }
    return $teamsGroup;
  }

  public function getAllTeams()
  {
    $teamsGroup = array();
    $teamArr = array();
    $query = "SELECT team.id, team.name, team.logo, p.name as province, t.name as town FROM qtb_teams team LEFT JOIN townships t ON t.id = team.township LEFT JOIN provinces p ON p.id = t.province WHERE active = 1 ORDER BY team.name ASC, p.name ASC, t.name ASC LIMIT 1";
    $teamsQuery = $this->db->query($query);
    foreach ($teamsQuery->result() as $team)
    {
      $teamArr['id'] = $team->id;
      $teamArr['name'] = $team->name;
      //$teamArr['logo'] = $team->logo;
      $teamArr['province'] = $team->province;
      $teamArr['township'] = $team->town;
      array_push($teamsGroup,$teamArr);
      unset($teamArr);
    }
    return $teamsGroup;
  }
}
?>
