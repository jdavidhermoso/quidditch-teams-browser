<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Quidditch Teams Browser</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo CSSPATH; ?>main.css">
  <link rel="stylesheet" href="<?php echo VENDORSPATH; ?>materialize/dist/css/materialize.css">
  <link rel="stylesheet" href="<?php echo VENDORSPATH; ?>cropperjs/dist/cropper.css">
</head>
<body>

<div class="qtb-loading-background qtb-hidden" id="spinner_image">
  <div class="qtb-spinner-container">
    <img src="dist/images/spinner.svg" class="qtb-spinner-image">
  </div>
</div>
<header class="qtb-header" id="header">
  <nav class="qtb-nav">

    <?php require('header/nav_template.php'); ?>


  </nav>
  <!-- <div class="qtb-disclaimer qtb-home-updates-disclaimer">

  </div>  -->
</header>
<div class="qtb-pages-container" id="qtb_pages_container">
  <div class="qtb-page" id="home-map">
    <div id="qtb_home_map" class="qtb-home-map"></div>
  </div>
  <div class="qtb-page row" id="home">
    <div class="qtb-search-form-container col s12 m8 l8 offset-m2 offset-l2">
    </div>
  </div>
  <div class="qtb-page row" id="team_profile"></div>
  <div class="qtb-page row" id="teams_gallery"></div>
  <div class="qtb-page row" id="manage_team">
    <?php
    include('manage_team.php');
    ?>
  </div>
</div>
<?php
include('templates/home_search_team_template.php');
include('templates/team_profile.php');
include('templates/team_card.php');
include('templates/home_search_results_list.php');
include('templates/team_not_found.php');
include('templates/working_disclaimer_template.php');
include('templates/map_infoWindow.php');
?>
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFSyLDFSZpSIYjnqwKxFwoRxl6U9SVs5k"></script> -->
<script src="<?php echo VENDORSPATH; ?>jquery/dist/jquery.min.js"></script>
<script src="<?php echo VENDORSPATH; ?>underscore/underscore-min.js"></script>
<script src="<?php echo VENDORSPATH; ?>backbone/backbone-min.js"></script>
<script src="<?php echo VENDORSPATH; ?>materialize/dist/js/materialize.min.js"></script>
<script src="<?php echo VENDORSPATH; ?>cropperjs/dist/cropper.js"></script>
<script src="<?php echo JSPATH; ?>router/main.router.js"></script>
<script src="<?php echo JSPATH; ?>models/team.model.js"></script>
<script src="<?php echo JSPATH; ?>collections/teams.collection.js"></script>
<script src="<?php echo JSPATH; ?>views/main.view.js"></script>
<script src="<?php echo JSPATH; ?>views/sidebar.view.js"></script>
<script src="<?php echo JSPATH; ?>views/searchForm.view.js"></script>
<script src="<?php echo JSPATH; ?>views/homeMap.view.js"></script>
<script src="<?php echo JSPATH; ?>views/teamsGallery.view.js"></script>
<script src="<?php echo JSPATH; ?>views/teamProfile.view.js"></script>
<script src="<?php echo JSPATH; ?>views/manageTeam.view.js"></script>
<script src="<?php echo JSPATH; ?>app.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMyk7Kkv41K5wp4p81zephzAbHrF-nnF4&libraries=places" async
        defer></script>
</body>
</html>
