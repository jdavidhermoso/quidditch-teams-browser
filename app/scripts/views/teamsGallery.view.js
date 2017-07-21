var app = app || {};
app.TeamsGallery = Backbone.View.extend({
  el: '#teams_gallery',
  events: {},
  ui: {},
  initialize: function () {
    var view = this;
    this.setTeamsGalleryURL();
    app.teamsCollection.fetch({
      reset: true,
      success: function () {
        view.render();
      },
      error: function () {
      }
    });
  },

  setTeamsGalleryURL: function () {
    app.teamsCollection.url = app.teamsCollection.urls.teamsGalleryURL;
  },
  render: function () {
    this.$el.empty();
    app.teamsCollection.each(function (team) {
      this.renderTeamProfile(team);
    }, this);
    app.mainView.toggleSpinner(false);
  },

  renderTeamProfile: function (team) {
    var teamProfileView = new app.TeamProfileView(team.toJSON());

    this.$el.append(teamProfileView.renderTeamCard(team));
  }
});
