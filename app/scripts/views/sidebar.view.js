var app = app || {};
app.SideBarView = Backbone.View.extend({
  el: '#header',
  events: {
    'click .qtb-side-nav-close-btn': 'closeSidebar'
  },
  ui: {
    'sidebar_open_btn': '#sidebar_open_btn'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    $(this.ui.sidebar_open_btn).sideNav({
      closeOnClick: true,
      draggable: true
    });
  },

  closeSidebar: function(e) {
    e.preventDefault();
    $(this.ui.sidebar_open_btn).sideNav('hide');
  }
});
