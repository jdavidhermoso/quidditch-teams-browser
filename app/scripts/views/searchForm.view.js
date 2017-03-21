var app = app || {};
app.SearchFormView = Backbone.View.extend({
  el: '#home',
  searchResultsListTpl: _.template( $( '#searchResultsListTemplate' ).html() ),
  events: {
    'input #search_input': 'performShortSearch',
    'click #search_button': 'performSearch',
    'click .qtb-search-input-result' : 'selectTeamProfile'
  },
  ui: {
    'search_input': '#search_input',
    'results_list': '#search_form_results_list',
    'search_button': '#search_button'
  },

  initialize: function() {
    var view = this;
    app.mainView.toggleSpinner(false);
  },
  render: function() {
  },

  renderSearchResultItem: function(teamModel) {
    this.$(this.ui.results_list).append(this.searchResultsListTpl(teamModel.attributes));
  },

  showResultsList: function() {
    this.$(this.ui.results_list).removeClass();
  },

  voidResultsList: function() {
    this.$(this.ui.results_list).empty();
    app.teamsCollection.reset();
  },

  emptySearchInput: function() {
    this.$(this.ui.search_input).val('');
  },

  performShortSearch: function() {
    var searchString = $(this.ui.search_input).val().split(' ').join('+'),
      view = this;

    if (searchString.length < 4) {
      if (this.currentFetch) {
        this.currentFetch.abort();
      }

      view.voidResultsList();
      return;
    }

    app.mainView.toggleSpinner(true);

    this.setShortSearchURL();
    this.currentFetch = app.teamsCollection.fetch({
      reset: true,
      data: {
        'str': searchString
      },
      success: function() {
        view.$(view.ui.results_list).empty();
        app.mainView.toggleSpinner(false);
        app.teamsCollection.each(function (team) {
          view.renderSearchResultItem(team);
        }, this);
      },
      error: function() {
        view.$(view.ui.results_list).empty();
        app.mainView.toggleSpinner(false);
      }
    });
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
        view.$(view.ui.results_list).empty();
        app.teamsCollection.each(function (team) {
          view.renderSearchResultItem(team);
        }, this);
      },
      error: function() {
        Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },

  selectTeamProfile: function(e) {
    var teamId = $(e.currentTarget).data('id');
    this.emptySearchInput();
    this.voidResultsList();

    app.router.navigate('/teams/'+teamId, {trigger: true});
  },
  setShortSearchURL: function() {
    app.teamsCollection.url = app.teamsCollection.urls.shortSearchURL;
  }
});
