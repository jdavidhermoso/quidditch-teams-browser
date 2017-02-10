var app = app || {};
app.TeamProfileView = Backbone.View.extend({
  tagName: 'div',
  template: _.template( $( '#teamProfileTemplate' ).html()),
  events: {
  },
  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home'
    }
  },
  initialize: function(id) {
    var view = this;
    this.setTeamUrl(id);
    app.teamsCollection.fetch({
      reset: true,
      data: {
        'id': id
      },
      success: function() {
        if (!app.teamsCollection.models.length) {
          app.router.navigateToHome();
          return;
        }
        app.teamsCollection.each(function (team) {
          view.render(team);
        }, this);
      },
      error: function() {
        console.log(app.teamsCollection);
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },
  render: function(team) {
    console.log(team);
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.template(team.toJSON())));
  },
  setTeamUrl: function() {
    app.teamsCollection.url = app.teamsCollection.urls.teamURL;
  }
});
