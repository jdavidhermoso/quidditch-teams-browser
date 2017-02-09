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
    this.setTeamUrl(id);
    app.teamsCollection.fetch({
      reset: true,
      data: {
        'id': id
      },
      success: function() {
        app.teamsCollection.each(function (team) {
          render();
        }, this);
      },
      error: function() {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },
  render: function() {
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.template({ id: 32 })));
  },
  setTeamUrl: function() {
    app.teamsCollection.url = app.teamsCollection.urls.teamURL;
  }
});
