<?php

class Get_geo_data_model extends CI_Model
{
  public function getAllProvinces()
  {
    $query = "SELECT id, name FROM provinces ORDER BY name asc";
    $provQuery = $this->db->query($query);

    return $provQuery;
  }
}
?>
