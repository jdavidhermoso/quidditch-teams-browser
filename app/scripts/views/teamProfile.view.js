var app = app || {};
app.TeamProfileView = Backbone.View.extend({
  tagName: 'div',
  className: 'qtb-team-profile-container col s12 m8 l8 offset-m2 offset-l2',
  template: _.template($('#teamProfileTemplate').html()),
  teamNotFoundTemplate: _.template($('#teamNotFoundTemplate').html()),
  events: {
    'input #contact_from_email': 'capitalizeEmail',
    'click #contact_team': 'sendEmail'
  },
  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home'
    }
  },
  initialize: function (id) {
    var view = this;
    this.setTeamUrl(id);
    app.teamsCollection.fetch({
      reset: true,
      data: {
        'id': id
      },
      success: function () {
        if (!app.teamsCollection.models.length) {
          view.renderTeamNotFound();
          return;
        }
        app.teamsCollection.each(function (team) {
          view.render(team);
        }, this);
      },
      error: function () {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },

  render: function (team) {
    var teamData = _.extend(team.toJSON(), {formatedEmail: this.renderEmailAddress(team.toJSON().email) });
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.template(teamData)));
  },

  renderTeamNotFound: function () {
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.teamNotFoundTemplate()));
  },

  setTeamUrl: function () {
    app.teamsCollection.url = app.teamsCollection.urls.teamURL;
  },

  capitalizeEmail: function (e) {
    var email = $(e.target).val();
    $(e.target).val(email.toLowerCase());
  },
  renderEmailAddress: function (email) {
    var atCode = '&#64;',
      emailArray = email.split('@'),
      emailName = emailArray[0],
      emailDomain = emailArray[1],
      emailFormatted = '';

    if (email) {
      emailFormatted = emailName + atCode + emailDomain;
    }

    return emailFormatted;
  },
  sendEmail: function() {
    console.log('a');
  }
});
