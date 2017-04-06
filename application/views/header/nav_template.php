<script id="navTemplate" type="text/template">


  <a href="#" class="brand-logo center">
    <img src="dist/images/logo.png" class="responsive-img" alt="Buscador de equipos españoles de quidditch"
         title="Buscador de equipos españoles de quidditch">
  </a>
  <span id="sidebar_open_btn" data-activates="sidebar_nav" class="qtb-side-nav-open-btn button-collapse">
      <i class="material-icons valign">menu</i>
    </span>
  <ul class="left hide-on-med-and-down">
    <li class="hide-on-med-and-down">
      <a href="#">
        <%= app.lang.search_team %>
      </a>
    </li>
    <li class="hide-on-med-and-down">
      <a href="#/map">
        <%= app.lang.map %>
      </a>
    </li>
  </ul>
  <div class="qtb-side-nav side-nav" id="sidebar_nav">
    <a href="#" class="qtb-side-nav-close-btn">
      <i class="material-icons">close</i>
    </a>
    <ul>
      <li class="hide-on-med-and-up">
        <a href="#/">
          <%= app.lang.search_team %>
        </a>
      </li>
      <li class="hide-on-med-and-up">
        <a href="#/map">
          <%= app.lang.map %>
        </a>
      </li>
      <li>
        <a href="#/add">
          <%= app.lang.add_team %>
        </a>
      </li>
      <!-- <li>
        <a href="#/teams/">
          Todos los equipos
        </a>
      </li> -->
      <!-- <li>
        <a href="#/about">
          Acerca
        </a>
      </li> -->
    </ul>

    <ul class="qtb-lang-list">
      <li>
        <a href="#" class="qtb-lang-link" data-lang="spanish">
          <img src="dist/images/lang/spanish.png" class="qtb-lang-flag" alt="<%= app.lang.spanish %>"
               title="<%= app.lang.spanish %>"/>
          <span> <%= app.lang.spanish %> </span>
        </a>
      </li>

      <li>
        <a href="#" class="qtb-lang-link" data-lang="catala">
          <img src="dist/images/lang/catala.png" class="qtb-lang-flag" alt="<%= app.lang.catala %>"
               title="<%= app.lang.catala %>"/>
          <span> <%= app.lang.catala %> </span>
        </a>
      </li>

      <li>
        <a href="#" class="qtb-lang-link" data-lang="english">
          <img src="dist/images/lang/english.png" class="qtb-lang-flag" alt="<%= app.lang.english %>"
               title="<%= app.lang.english %>"/>
          <span> <%= app.lang.english %> </span>
        </a>
      </li>
      <li>
        <a href="#" class="qtb-lang-link" data-lang="euskera">
          <img src="dist/images/lang/euskera.png" class="qtb-lang-flag" alt="<%= app.lang.euskera %>"
               title="<%= app.lang.euskera %>"/>
          <span> <%= app.lang.euskera %> </span>
        </a>
      </li>
      <li>
        <a href="#" class="qtb-lang-link" data-lang="euskera">
          <img src="dist/images/lang/galego.png" class="qtb-lang-flag" alt="<%= app.lang.galego %>"
               title="<%= app.lang.galego %>"/>
          <span> <%= app.lang.galego %> </span>
        </a>
      </li>
      <!-- <li>
        <a href="#/teams/">
          Todos los equipos
        </a>
      </li> -->
      <!-- <li>
        <a href="#/about">
          Acerca
        </a>
      </li> -->
    </ul>
  </div>

</script>

