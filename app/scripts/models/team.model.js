var app = app || {};
app.Team = Backbone.Model.extend({
  defaults: {
    logo: '',
    name: '',
    province: '',
    township: '',
    provinceId: '',
    townshipId: '',
    email: '',
    since: ''
  }
});

