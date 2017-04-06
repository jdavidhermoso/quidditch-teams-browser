var app = app || {};

$(function () {
  getLanguageCookie().then(function(json) {
    app.lang = json;
    app.teamsCollection = new app.TeamsCollection();
    app.mainView = new app.MainView();
    app.sidebarView = new app.SideBarView();
    app.searchFormView = new app.SearchFormView();
    app.router = new app.QuidditchTeamsBrowserRouter();
    Backbone.history.start();
  });


  function getLanguageCookie() {
    var value = '; ' + document.cookie,
      parts = value.split('; qtb_lang='),
      lang = '';
    if (parts.length == 2) {
      lang = parts.pop().split(";").shift();

      return $.getJSON('dist/lang/' + lang + '.json');
    }
  }
});
