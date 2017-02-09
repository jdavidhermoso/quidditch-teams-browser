var app = app || {};
app.MainView = Backbone.View.extend({
  el: '#qtb_pages_container',
  events: {
  },
  ui: {
    pages: {
      'active': 'qtb-active-page',
      'all': '.qtb-page',
      'home': '#home',
      'team_profile': '#team_profile'
    }
  },
  initialize: function() {},
  render: function() {},
  showPage: function(page_id) {
    this.hideAllPages();
    $(this.ui.pages[page_id]).addClass(this.ui.pages.active);
  },
  hideAllPages: function() {
    $(this.ui.pages.all).removeClass(this.ui.pages.active);
  },
  hidePage: function(page_id) {}
});
