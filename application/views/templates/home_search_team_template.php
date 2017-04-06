<script id="homeSearchTeamTemplate" type="text/template">
  <form class="qtb-search-form" id="search_form">
    <label class="qtb-search-label">
      <%= app.lang.search_team %>
    </label>
    <div class="qtb-search-input-container">
      <!--<div class="qtb-search-aside-icon-container qtb-search-spinner-container">
        <i class="material-icons qtb-spinner-icon qtb-hidden" id="search_spinner_container">loop</i>
      </div> -->
      <input type="text" class="qtb-search-input" id="search_input" placeholder="<%= app.lang.name %>, <%= app.lang.province %>, <%= app.lang.township %>"
             autofocus/>
      <!-- <div class="qtb-search-aside-icon-container qtb-search-icon-container" id="search_button">
        <i class="material-icons">search</i>
      </div> -->
    </div>
  </form>
  <div class="qtb-search-input-results-list-container">
    <ul class="qtb-search-input-results-list" id="search_form_results_list">
    </ul>
  </div>
</script>
