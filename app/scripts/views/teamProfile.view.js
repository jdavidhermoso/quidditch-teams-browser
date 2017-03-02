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
    },
    'contact_form': '#contact_form',
    'from_email': '#contact_from_email',
    'contact_subject': '#contact_subject',
    'contact_message': '#contact_message'

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
          //view.renderTeamNotFound();
          app.router.navigateToHome();
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
    var teamData = _.extend(team.toJSON(), {formatedEmail: this.renderEmailAddress(team.toJSON().email)});
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
  sendEmail: function () {
    var view = this;

    if (!this.validateForm()) {
      Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
      return;
    }

    var sendEmailRequest = $.ajax({
      type: 'POST',
      url: 'index.php/search/sendEmail',
      data: {
        id: 1,
        from: 'aaa@gmail.com',
        subject: 'test',
        message: 'kasdfbnsdkm'
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
  validateForm: function() {
    var validForm = false;

    if (this.validateEmail($(this.ui.from_email).val()) && $(this.ui.contact_subject) && $(this.ui.contact_message)) {
      validForm = true;
    }

    return validForm;
  },

  validateEmail: function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}
});
