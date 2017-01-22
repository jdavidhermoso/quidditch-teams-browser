var app = app || {};
app.SearchFormResultsList = Backbone.Collection.extend({
  model: app.SearchFormReslutListItem,
  url: 'index.php/search/short'
});
