var app = app || {};
app.TeamsCollection = Backbone.Collection.extend({
  urls: {
    shortSearchURL: 'index.php/search/short',
    teamURL: 'index.php/search/team',
    teamsGalleryURL: 'index.php/search/teams',
    saveTeamURL: 'index.php/search/manageTeam',
  },
  model: app.Team
});
