var app = app || {};
app.TeamProfileView = Backbone.View.extend({
  tagName: 'div',
  className: 'qtb-team-profile-container col s12 m8 l8 offset-m2 offset-l2',
  template: _.template( $( '#teamProfileTemplate' ).html()),
  teamNotFoundTemplate: _.template( $( '#teamNotFoundTemplate' ).html()),
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
          view.renderTeamNotFound();
          return;
        }
        app.teamsCollection.each(function (team) {
          view.render(team);
        }, this);
      },
      error: function() {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },

  render: function(team) {
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.template(team.toJSON())));
  },

  renderTeamNotFound: function() {
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.teamNotFoundTemplate()));
  },

  setTeamUrl: function() {
    app.teamsCollection.url = app.teamsCollection.urls.teamURL;
  }
});
