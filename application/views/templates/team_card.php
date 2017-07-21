<script id="teamCardTemplate" type="text/template">
  <div class="qtb-card-profile-container col s12 m4 l2">
    <div class="qtb-card-profile-inner">
      <div class="qtb-card-profile-header-image-container"></div>
      <% var logo = logo ? 'dist/images/badges/teams/' + logo : 'dist/images/badges/defaultlogo.jpg' %>
      <div class="qtb-card-profile-logo-container" style="background-image: url(<%= logo %>)"></div>
      <div class="qtb-card-profile-info">
        <span class="qtb-card-profile-team-name">
          <%= name %>
        </span>

        <span class="qtb-card-profile-team-city">
          <i class="material-icons">location_on</i> <%= township %>
        </span>
      </div>

      <div class="qtb-card-profile-link waves-effect waves-light btn">
        <a href="#/teams/<%= id %>">
          <%= app.lang.view_profile %>
        </a>
      </div>
    </div>
  </div>
</script>
