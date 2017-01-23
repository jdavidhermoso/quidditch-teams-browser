var app = app || {};
app.SearchFormView = Backbone.View.extend({
  el: '#home',
  searchResultsListTpl: _.template( $( '#searchResultsListTemplate' ).html() ),
  events: {
    'input #search_input': 'performSearch'
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
    var view = this;
    view.$el.find(view.ui.results_list).empty();
    app.searchFormResultsListCollection.reset();
  },

  performSearch: function() {
    var searchString = $(this.ui.search_input).val().split(' ').join('+'),
      view = this;

    if (searchString.length < 4) {
      view.voidResultsList();
      return;
    }

    app.searchFormResultsListCollection.fetch({
      reset: true,
      data: {
        'str': searchString
      },
      success: function() {
        view.$el.find(view.ui.results_list).empty();
        app.searchFormResultsListCollection.each(function (team) {
          view.renderSearchResultItem(team);
        }, this);
      },
      error: function() {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  }
});
