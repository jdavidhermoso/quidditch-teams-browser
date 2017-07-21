var app = app || {};
app.TeamProfileView = Backbone.View.extend({
  tagName: 'div',
  className: '',
  template: _.template($('#teamProfileTemplate').html()),
  cardTemplate: _.template($('#teamCardTemplate').html()),
  teamNotFoundTemplate: _.template($('#teamNotFoundTemplate').html()),
  events: {
    'click #contact_team': 'sendEmail',
    'click #edit_team': 'editTeam'
  },
  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home'
    },
    'contact_form': '#contact_form',
    'from_email': '#contact_from_email',
    'edit_team': '#edit_team',
    'contact_subject': '#contact_subject',
    'contact_message': '#contact_message',

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

        view.renderTeams(app.teamsCollection);

        app.mainView.showPage(app.mainView.ui.pages.team_profile);
      },
      error: function () {
        //Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },

  render: function (team) {
    var teamData = _.extend(team.toJSON(), {formatedEmail: this.renderEmailAddress(team.toJSON().email)});
    return this.$el.html(this.template(teamData));
  },

  renderTeamCard: function(team) {
    var teamData = team.toJSON();
    return this.$el.html(this.cardTemplate(teamData));
  },

  renderTeams: function (teams) {
    teams.each(function (team) {
      $(app.mainView.ui.pages.team_profile).html(this.render(team));
    }, this);
    app.mainView.toggleSpinner(false);
  },

  renderTeamNotFound: function () {
    $(app.mainView.ui.pages.team_profile).html(this.$el.html(this.teamNotFoundTemplate()));
  },

  setTeamUrl: function () {
    app.teamsCollection.url = app.teamsCollection.urls.teamURL;
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
  sendEmail: function (e) {
    e.preventDefault();
    var view = this;

    if (!app.mainView.validateForm()) {
      Materialize.toast(app.lang.form_wrong, 3000);
      return;
    }

    var sendEmailRequest = $.ajax({
      type: 'POST',
      url: 'index.php/search/sendEmail',
      data: {
        id: 4,
        from: this.$(this.ui.from_email).val(),
        subject: this.$(this.ui.contact_subject).val(),
        message: this.$(this.ui.contact_message).val()
      }
    });

    sendEmailRequest.then(function (response) {
      var status = JSON.parse(response);

      if (status.status && status.status > 0) {
        Materialize.toast('¡Correo enviado correctamente!', 3000);
        $(view.ui.contact_form)[0].reset();
      }

    }, function () {
      Materialize.toast('¡El correo no ha podido ser enviado!', 3000);
    });
  },

  editTeam: function () {
    var id = app.teamsCollection.models[0].get('id');
    app.router.navigateToManageTeam(id);
  }
});
