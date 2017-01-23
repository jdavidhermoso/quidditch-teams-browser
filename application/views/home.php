<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Backbone.js Library</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo CSSPATH; ?>main.css">
  <link rel="stylesheet" href="<?php echo VENDORSPATH; ?>materialize/dist/css/materialize.css">
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
</header>
<div class="qtb-pages-container">
  <div id="qtb-home-map"></div>
  <div class="qtb-page qtb-active-page row" id="home">
    <div class="qtb-search-form-container col s12 m8 l8 offset-m2 offset-l2">
      <form class="qtb-search-form" id="search_form">
        <label class="qtb-search-label">
          Busca un equipo
        </label>
        <div class="qtb-search-input-container">
          <input type="text" class="qtb-search-input" id="search_input" placeholder="Nombre, Província, Ciudad... " autofocus />
          <div class="qtb-search-icon-container" id="search_button">
            <i class="material-icons">search</i>
          </div>
        </div>
      </form>
      <div class="qtb-search-input-results-list-container">
        <ul class="qtb-search-input-results-list" id="search_form_results_list">
        </ul>
      </div>
    </div>
  </div>
</div>
<script id="searchResultsListTemplate" type="text/template">
  <li class="qtb-search-input-result">
    <% src = logo ? logo : 'dist/images/badges/defaultbadge.png' %>
    <img src="<%= src %>" class="qtb-search-input-result-logo" alt="<%= name %>" title="<%= name %>" />
    <span class="qtb-search-input-result-team-name"><%= name %>, <%= township %>, <%= province %> </span>
  </li>
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFSyLDFSZpSIYjnqwKxFwoRxl6U9SVs5k"></script>
<script src="<?php echo VENDORSPATH; ?>jquery/dist/jquery.min.js"></script>
<script src="<?php echo VENDORSPATH; ?>underscore/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
<script src="<?php echo VENDORSPATH; ?>materialize/dist/js/materialize.js"></script>
<!-- <script src="<?php echo JSPATH; ?>router/router.js"></script> -->
<script src="<?php echo JSPATH; ?>models/searchFormResultList.model.js"></script>
<script src="<?php echo JSPATH; ?>collections/searchFormResultsList.collection.js"></script>
<script src="<?php echo JSPATH; ?>views/sidebar.view.js"></script>
<script src="<?php echo JSPATH; ?>views/searchForm.view.js"></script>
<script src="<?php echo JSPATH; ?>app.js"></script>
</body>
</html>
