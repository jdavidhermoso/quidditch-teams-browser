var app = app || {};
getLanguageCookie().then(function (json) {
  /*return $.ajax({
    type: 'get',
    url: 'index.php/search/reduceImagesSize',
    success: function(data) {
      console.log(data);
    }
  });*/

  app.lang = json;
  app.mainView = new app.MainView();
  app.router = new app.QuidditchTeamsBrowserRouter();
  app.sidebarView = new app.SideBarView();

  app.teamsCollection = new app.TeamsCollection();
  app.searchFormView = new app.SearchFormView();



  Backbone.history.start();
});

function getLanguageCookie() {
  var value = '; ' + document.cookie,
    parts = value.split('; qtb_lang='),
    lang = '';
  if (parts.length == 2) {
    lang = parts.pop().split(";").shift();

    return $.getJSON('dist/lang/' + lang + '.json');
  }
}
