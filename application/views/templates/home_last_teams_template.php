<script id="lastTeamsTemplate" type="text/template">
  <li class="qtb-home-last-team" data-id="<%= id %>">
    <% var logo = logo ? 'dist/images/badges/teams/' + logo : 'dist/images/badges/defaultbadge.png' %>
    <span>
      <img src="<%= logo %>" class="qtb-home-last-team-logo" alt="<%= name %>" title="<%= name %>"/>
    </span>
    <span class="qtb-home-last-team-name">
      <a href="#teams/<%= id %>">
        <%= name %>, <%= township %>, <%= province %>
      </a>
    </span>
  </li>
</script>
