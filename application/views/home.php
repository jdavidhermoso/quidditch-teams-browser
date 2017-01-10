<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Backbone.js Library</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo CSSPATH; ?>main.css">
  <link rel="stylesheet" href="<?php echo VENDORSPATH; ?>materialize/dist/css/materialize.css">
</head>
<body>
<header class="qtb-header">
  <nav class="qtb-nav">
    <div class="qtb-nav-links-wrapper">
      <a href="#!" class="brand-logo center">
        <img src="dist/images/logo.png" class="responsive-img" alt="Buscador de equipos españoles de quidditch"
             title="Buscador de equipos españoles de quidditch">
      </a>
      <a href="#" data-activates="qtb-side-nav" class="qtb-nav-collapse-btn button-collapse">
        <i class="material-icons valign">menu</i>
      </a>
      <?php require('header/nav_template.php'); ?>
    </div>
  </nav>
</header>
<div class="qtb-pages-container">
  <div id="qtb-home-map"></div>
  <div class="qtb-page qtb-active-page row" id="home">
    <div class="qtb-search-form-container col s12 m8 l8 offset-m2 offset-l2">
      <form>
        <label class="qtb-search-label">
          Busca un equipo
        </label>
        <div class="qtb-search-input-container">
          <input type="text" class="qtb-search-input" placeholder="Buscar equipo..."/>
        </div>
        <div class="qtb-search-btn-container">
          <button class="qtb-search-btn btn waves-effect waves-light" type="submit" name="action">
            Buscar
          </button>
        </div>
      </form>
    </div>

  </div>
</div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFSyLDFSZpSIYjnqwKxFwoRxl6U9SVs5k"></script>
<script src="<?php echo VENDORSPATH; ?>jquery/dist/jquery.min.js"></script>
<script src="<?php echo VENDORSPATH; ?>underscore/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
<script src="<?php echo VENDORSPATH; ?>materialize/dist/js/materialize.js"></script>
<script src="<?php echo JSPATH; ?>router/router.js"></script>
<script src="<?php echo JSPATH; ?>app.js"></script>
<script>
  $(function () {
    $(".button-collapse").sideNav();
  });
</script>
</body>
</html>
