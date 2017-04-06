<script id="map_infoWindow" type="text/template">
  <div class="qtb-infowindow-container">
    <div class="qtb-infowindow-team-logo-container">
      <% var logo = logo ? 'dist/images/badges/teams/' + logo : 'dist/images/badges/defaultlogo.jpg' %>
      <img src="<%= logo %>" class="qtb-infowindow-team-logo" alt="<%= name %>" title="<%= name %>"/>

    </div>
    <p class="qtb-infowindow-team-name">
      <%= name %>
    </p>

    <p class="qtb-infowindow-team-location">
      <span class="qtb-infowindow-team-location-township">
        <%= province %>
      </span>
      <span class="qtb-infowindow-team-location-province">
        <%= township %>
      </span>
    </p>

    <p>
      <a href="#teams/<%= id %>">
        Ver perfil del equipo
      </a>
    </p>
  </div>
</script>
