<script id="searchResultsListTemplate" type="text/template">
  <li class="qtb-search-input-result" data-id="<%= id %>">
    <% src = logo ? logo : 'dist/images/badges/defaultbadge.png' %>
    <img src="<%= src %>" class="qtb-search-input-result-logo" alt="<%= name %>" title="<%= name %>"/>
    <span class="qtb-search-input-result-team-name"><%= name %>, <%= township %>, <%= province %> </span>
  </li>
</script>
