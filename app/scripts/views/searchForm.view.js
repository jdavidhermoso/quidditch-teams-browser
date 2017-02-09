var app = app || {};
app.SearchFormView = Backbone.View.extend({
  el: '#home',
  searchResultsListTpl: _.template( $( '#searchResultsListTemplate' ).html() ),
  events: {
    'input #search_input': 'performSearch',
    'click .qtb-search-input-result' : 'selectTeamProfile'
  },
  ui: {
    'search_input': '#search_input',
    'results_list': '#search_form_results_list'
  },

  initialize: function() {

  },
  render: function() {
  },

  renderSearchResultItem: function(teamModel) {
    this.$el.find(this.ui.results_list).append(this.searchResultsListTpl(teamModel.attributes));
  },

  showResultsList: function() {
    this.$el.find(this.ui.results_list).removeClass();
  },

  voidResultsList: function() {
    this.$el.find(this.ui.results_list).empty();
    app.teamsCollection.reset();
  },

  emptySearchInput: function() {
    this.$el.find(this.ui.search_input).val('');
  },

  performSearch: function() {
    var searchString = $(this.ui.search_input).val().split(' ').join('+'),
      view = this;

    if (searchString.length < 4) {
      view.voidResultsList();
      return;
    }

    this.setShortSearchURL();
    app.teamsCollection.fetch({
      reset: true,
      data: {
        'str': searchString
      },
      success: function() {
        view.$el.find(view.ui.results_list).empty();
        app.teamsCollection.each(function (team) {
          view.renderSearchResultItem(team);
        }, this);
      },
      error: function() {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },
  selectTeamProfile: function() {
    //TODO: Navigate to team profile.
    this.emptySearchInput();
    this.voidResultsList();
  },
  setShortSearchURL: function() {
    app.teamsCollection.url = app.teamsCollection.urls.shortSearchURL;
  }
});
