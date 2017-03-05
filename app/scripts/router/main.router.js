var app = app || {};

app.QuidditchTeamsBrowserRouter = Backbone.Router.extend({
  routes: {
    "(/)" : "defaultRoute",
    "teams(/)" : "getTeamsGallery",
    "teams/:id(/)" : "getTeamProfile",
    "add(/)" : "manageTeamForm",
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

    if (app.teamProfile) {
      app.teamProfile.remove();
    }

    app.teamProfile = new app.TeamProfileView(id);
    app.mainView.showPage('team_profile');
  },
  manageTeamForm: function() {
    if (app.manageTeamModel) {
      app.manageTeamModel.remove();
    }

    if (app.manageTeam) {
      app.manageTeam.remove();
    }

    app.manageTeamModel = new app.Team();
    app.manageTeam = new app.ManageTeamView({
      model: app.manageTeamModel
    });
    app.mainView.showPage('manage_team');
  },
  notFound: function() {
    this.navigateToHome();
  }
});
