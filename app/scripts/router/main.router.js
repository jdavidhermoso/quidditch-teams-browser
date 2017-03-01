var app = app || {};

app.QuidditchTeamsBrowserRouter = Backbone.Router.extend({
  routes: {
    "(/)" : "defaultRoute",
    "teams(/)" : "getTeamsGallery",
    "teams/:id(/)" : "getTeamProfile",
    ":whatever": "notFound"
  },
  navigateToHome: function() {
    app.router.navigate('/', true);
  },
  defaultRoute: function() {
    app.mainView.showPage('home');
  },
  getTeamsGallery: function() {
    this.navigateToHome();
  },
  getTeamProfile: function(id) {
    if (isNaN(id)) {
      this.navigateToHome();
      return;
    }

    app.teamProfile = new app.TeamProfileView(id);
    app.mainView.showPage('team_profile');
  },

  notFound: function() {
    this.navigateToHome();
  }
});
