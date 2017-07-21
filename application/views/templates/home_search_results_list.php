<script id="searchResultsListTemplate" type="text/template">
  <li class="qtb-search-input-result" data-id="<%= id %>">
    <% var logo = logo ? 'dist/images/badges/teams/logo_' + id + '.jpg' : 'dist/images/badges/defaultlogo.jpg' %>
    <img src="<%= logo %>" class="qtb-search-input-result-logo" alt="<%= name %>" title="<%= name %>"/>
    <span class="qtb-search-input-result-team-name"><%= name %>, <%= township %>, <%= province %> </span>
  </li>
</script>
