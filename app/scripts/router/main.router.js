var app = app || {};

app.QuidditchTeamsBrowserRouter = Backbone.Router.extend({
  routes: {
    "(/)": "getHomePage",
    "teams(/)": "getTeamsGallery",
    "teams/:id(/)": "getTeamProfile",
    "add(/)": "manageTeamForm",
    ":whatever": "notFound"
  },
  navigateToHome: function () {
    app.router.navigate('/', true);
  },
  getHomePage: function () {
    app.mainView.hideAllPages();
    app.mainView.showPage(app.mainView.ui.pages.home);
  },
  getTeamsGallery: function () {
    this.navigateToHome();
  },
  getTeamProfile: function (id) {
    app.mainView.hideAllPages();
    if (isNaN(id)) {
      this.navigateToHome();
      return;
    }

    app.teamProfile = new app.TeamProfileView(id);
  },
  manageTeamForm: function () {
    app.mainView.hideAllPages();
    app.manageTeamModel = new app.Team();
    app.manageTeam = new app.ManageTeamView({
      model: app.manageTeamModel
    });
  },
  notFound: function () {
    this.navigateToHome();
  },
  getCurrentRoute: function() {
    var route = Backbone.history.getFragment();
    return (route.substr(0, route.indexOf('/')) == '') ? 'home' : route.substr(0, route.indexOf('/'));
  }
});
