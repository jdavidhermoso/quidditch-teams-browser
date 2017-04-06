<script id="searchResultsListTemplate" type="text/template">
  <li class="qtb-search-input-result" data-id="<%= id %>">
    <% var logo = logo ? 'dist/images/badges/teams/' + logo : 'dist/images/badges/defaultbadge.png' %>
    <img src="<%= logo %>" class="qtb-search-input-result-logo" alt="<%= name %>" title="<%= name %>"/>
    <span class="qtb-search-input-result-team-name"><%= name %>, <%= township %>, <%= province %> </span>
  </li>
</script>
