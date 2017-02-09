var app = app || {};

app.QuidditchTeamsBrowserRouter = Backbone.Router.extend({
  routes: {
    "" : "defaultRoute",
    "teams" : "getTeamsGallery",
    "teams/:id" : "getTeamProfile"
  },
  navigateToHome: function() {
    app.router.navigate('/');
  },
  defaultRoute: function() {
    app.mainView.showPage('home');
  },
  getTeamsGallery: function() {
    console.log('gallery');
  },
  getTeamProfile: function(id) {
    app.teamProfile = new app.TeamProfileView(id);
    app.mainView.showPage('team_profile');
  }
});
