var app = app || {};

app.QuidditchTeamsBrowserRouter = Backbone.Router.extend({
  routes: {
    "(/)": "getHomePage",
    "map(/)": "getMap",
    "teams(/)": "getTeamsGallery",
    "teams/:id(/)": "getTeamProfile",
    "add(/)": "manageTeamForm",
    //"editTeam/:id(/)": "manageTeamForm",
    ":whatever": "notFound"
  },
  navigateToHome: function () {
    app.mainView.toggleSpinner(true);
    app.router.navigate('/', true);
  },
  navigateToManageTeam: function (id) {
    app.router.navigate('editTeam/' + id, true);
  },
  navigateToTeamProfile: function (id) {
    app.router.navigate('teams/' + id, true);
  },
  getHomePage: function () {
    app.mainView.hideAllPages();
    app.mainView.showPage(app.mainView.ui.pages.home);
  },
  getTeamsGallery: function () {
    app.mainView.hideAllPages();
    app.mainView.showPage(app.mainView.ui.pages.teams_gallery);
    var teamsGallery = new app.TeamsGallery();
  },
  getTeamProfile: function (id) {
    app.mainView.toggleSpinner(true);
    app.mainView.hideAllPages();
    if (isNaN(id)) {
      this.navigateToHome();
      return;
    }

    if (app.teamProfile) {
      app.teamProfile.undelegateEvents();
    }
    app.teamProfile = new app.TeamProfileView(id);
  },
  manageTeamForm: function (id) {
    app.mainView.toggleSpinner(true);
    app.mainView.hideAllPages();
    var teamModel = new app.Team();
    teamModel.set('id', id);

    if (app.manageTeam) {
      app.manageTeam.undelegateEvents();
    }

    $('.qtb-manage-team-container').empty();

    app.manageTeam = new app.ManageTeamView({
      model: teamModel
    });
  },
  notFound: function () {
    this.navigateToHome();
  },
  getCurrentRoute: function () {
    var route = Backbone.history.getFragment();
    return (route.substr(0, route.indexOf('/')) == '') ? 'home' : route.substr(0, route.indexOf('/'));
  },

  getMap: function() {
    app.mainView.hideAllPages();
    app.mainView.showPage(app.mainView.ui.pages.home_map);
    app.homeMapView = new app.HomeMapView();


  }
});
