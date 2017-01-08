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
  <header>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <?php require('header/desktop_nav.php'); ?>
        <?php require('header/mobile_nav.php'); ?>
      </div>
    </nav>

  </header>
  <script src="<?php echo VENDORSPATH; ?>jquery/dist/jquery.min.js"></script>
  <script src="<?php echo VENDORSPATH; ?>underscore/underscore-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
  <script src="<?php echo VENDORSPATH; ?>materialize/dist/js/materialize.js"></script>
  <script src="<?php echo JSPATH; ?>router/router.js"></script>
  <script src="<?php echo JSPATH; ?>app.js"></script>
  <script>
    $(function() {
      $(".button-collapse").sideNav();
    });
  </script>
</body>
</html>
