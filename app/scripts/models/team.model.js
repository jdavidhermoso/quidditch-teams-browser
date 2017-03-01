var app = app || {};
app.Team = Backbone.Model.extend({
  defaults: {
    id: 0,
    logo: '',
    name: '',
    province: '',
    township: '',
    email: '',
    since: ''
  }
});

