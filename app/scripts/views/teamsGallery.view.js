var app = app || {};
app.TeamsGallery = Backbone.View.extend({
  el: '#teams_gallery',
  events: {
  },
  ui: {},
  initialize: function() {
    this.listenTo(app.teamsCollection, 'reset', this.render);
    this.setTeamsGalleryURL();
    app.teamsCollection.fetch({
      reset: true
    });

    this.render();
  },

  setTeamsGalleryURL: function() {
    app.teamsCollection.url = app.teamsCollection.urls.teamsGalleryURL;
  },
  render: function() {
    this.$el.empty();
    app.teamsCollection.each(function (team) {
      this.renderTeamProfile(team);
    }, this);
  },

  renderTeamProfile: function(team) {
    var teamProfileView = new app.TeamProfileView(team.toJSON());
    this.$el.append(teamProfileView.render(t));
  }
});
