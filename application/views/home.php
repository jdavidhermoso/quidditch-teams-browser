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
<header class="qtb-header" id="header">
  <nav class="qtb-nav">
    <a href="#" class="brand-logo center">
      <img src="dist/images/logo.png" class="responsive-img" alt="Buscador de equipos españoles de quidditch"
           title="Buscador de equipos españoles de quidditch">
    </a>
    <span id="sidebar_open_btn" data-activates="sidebar_nav" class="qtb-side-nav-open-btn button-collapse">
      <i class="material-icons valign">menu</i>
    </span>
    <?php require('header/nav_template.php'); ?>
  </nav>
  <div class="qtb-disclaimer qtb-home-updates-disclaimer">
    <span>
      ATENCIÓN: Estamos trabajando para mejorar la aplicación.
    </span>
  </div>
</header>
<div class="qtb-pages-container" id="qtb_pages_container">
  <div id="qtb-home-map"></div>
  <div class="qtb-page row" id="home">
    <div class="qtb-search-form-container col s12 m8 l8 offset-m2 offset-l2">
      <form class="qtb-search-form" id="search_form">
        <label class="qtb-search-label">
          Busca un equipo
        </label>
        <div class="qtb-search-input-container">
          <!--<div class="qtb-search-aside-icon-container qtb-search-spinner-container">
            <i class="material-icons qtb-spinner-icon qtb-hidden" id="search_spinner_container">loop</i>
          </div> -->
          <input type="text" class="qtb-search-input" id="search_input" placeholder="Nombre, Província, Ciudad... "
                 autofocus/>
          <!-- <div class="qtb-search-aside-icon-container qtb-search-icon-container" id="search_button">
            <i class="material-icons">search</i>
          </div> -->
        </div>
      </form>
      <div class="qtb-search-input-results-list-container">
        <ul class="qtb-search-input-results-list" id="search_form_results_list">
        </ul>
      </div>
    </div>
  </div>
  <div class="qtb-page row" id="team_profile"></div>
  <div class="qtb-page row" id="teams_gallery"></div>
  <div class="qtb-page row" id="manage_team">
    <?php
      include ('manage_team.php');
    ?>
  </div>
</div>

<?php
  include ('templates/team_profile.php');
  include ('templates/home_search_results_list.php');
  include ('templates/team_not_found.php');
?>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFSyLDFSZpSIYjnqwKxFwoRxl6U9SVs5k"></script>
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
<script src="<?php echo JSPATH; ?>views/teamsGallery.view.js"></script>
<script src="<?php echo JSPATH; ?>views/teamProfile.view.js"></script>
<script src="<?php echo JSPATH; ?>views/manageTeam.view.js"></script>
<script src="<?php echo JSPATH; ?>app.js"></script>
</body>
</html>
