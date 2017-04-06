var app = app || {};
app.MainView = Backbone.View.extend({
  el: '#qtb_pages_container',
  workingDisclaimerTemplate: _.template(this.$('#workingDisclaimerTemplate').html()),
  homeTitleLastTeamsTemplate: _.template(this.$('#homeTitleLastTeamsTemplate').html()),
  navTemplate: _.template(this.$('#navTemplate').html()),
  events: {
    'input input[type=email]': 'capitalizeEmail',
  },

  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home',
      'home_map': '#home-map',
      'team_profile': '#team_profile',
      'manage_team': '#manage_team'
    },
    'spinner': '#spinner_image'
  },
  initialize: function () {
    var view = this;
    //$(".qtb-home-updates-disclaimer").html(this.workingDisclaimerTemplate());
    $(".qtb-last-teams-title").html(this.homeTitleLastTeamsTemplate());
    $(".qtb-nav").html(this.navTemplate());
    $('.qtb-lang-link').on('click', function (e) {
      e.stopPropagation();
      view.changeLang($(e.currentTarget).data('lang'));
    });
  },
  render: function () {
  },
  showPage: function (page_id) {
    $(page_id).addClass(this.ui.pages.active);
    this.trigger('navigate', {
      'from:': '',
      'to': page_id
    });
  },
  hideAllPages: function () {
    $(this.ui.pages.all).removeClass(this.ui.pages.active);
  },
  hidePage: function (page_id) {
  },
  getActivePage: function () {
    return $('.' + this.ui.pages.active);
  },

  validateEmails: function () {
    var re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailFields = this.getActivePage().find('input[type=email]'),
      validEmail = true;

    _.some(emailFields, function (input) {
      if (!re.test($(input).val()) && $(input).val()) {
        validEmail = false;
      }
    });
    return validEmail;
  },
  validateRequiredFields: function () {
    var requiredFields = this.getActivePage().find('[required]'),
      someVoidRequiredField = false;
    _.some(requiredFields, function (input) {
      someVoidRequiredField = !$(input).val();
    });

    return !someVoidRequiredField;
  },
  validateForm: function () {
    return app.mainView.validateEmails() && app.mainView.validateRequiredFields();
  },
  capitalizeEmail: function (e) {
    var email = $(e.target).val();
    $(e.target).val(email.toLowerCase());
  },
  toggleSpinner: function (showOrNot) {
    showOrNot ? $(this.ui.spinner).removeClass('qtb-hidden') : $(this.ui.spinner).addClass('qtb-hidden');
  },

  setCookie: function (lang) {
    var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = 'qtb_lang=' + lang + ';' + expires + ';';
  },

  changeLang: function (lang) {
    this.setCookie(lang);
    location.reload();
    /*return $.ajax({
     type: 'POST',
     data: {
     lang: lang
     },
     url: 'index.php/home/setLanguage',
     crossDomain: true,
     xhrFields: {
     withCredentials: true
     }
     }); */
  }
})
;
