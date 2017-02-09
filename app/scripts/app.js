var app = app || {};
$(function () {
  app.teamsCollection = new app.TeamsCollection();
  app.mainView = new app.MainView();
  app.sidebarView = new app.SideBarView();
  app.searchFormView = new app.SearchFormView();
  app.router = new app.QuidditchTeamsBrowserRouter();
  Backbone.history.start();
});
