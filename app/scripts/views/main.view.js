var app = app || {};
app.MainView = Backbone.View.extend({
  el: '#qtb_pages_container',
  events: {
    'input input[type=email]': 'capitalizeEmail'
  },

  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home',
      'team_profile': '#team_profile'
    }
  },
  initialize: function () {
    $('input[type=email]').on('input', function() {
      alert();
    });
  },
  render: function () {
  },
  showPage: function (page_id) {
    this.hideAllPages();
    $(this.ui.pages[page_id]).addClass(this.ui.pages.active);
  },
  hideAllPages: function () {
    $(this.ui.pages.all).removeClass(this.ui.pages.active);
  },
  hidePage: function (page_id) {
  },
  getActivePage: function() {
    return $('.' + this.ui.pages.active);
  },

  validateEmails: function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    emailFields = this.getActivePage().find('input[type=email]'),
      validEmail = true;

    _.some(emailFields, function(input) {
      if (!re.test($(input).val())) {
        validEmail = false;
      }
    });
    return validEmail;
  },
  validateRequiredFields: function() {
    var requiredFields = this.getActivePage().find('[required]'),
        someVoidRequiredField = false;
    _.some(requiredFields, function(input) {
      someVoidRequiredField = !$(input).val();
    });

    return !someVoidRequiredField;
  },
  validateForm: function() {
    return app.mainView.validateEmails() && app.mainView.validateRequiredFields();
  },
  capitalizeEmail: function (e) {
    var email = $(e.target).val();
    $(e.target).val(email.toLowerCase());
  }
});
