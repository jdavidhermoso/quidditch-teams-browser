var app = app || {};
app.HomeMapView = Backbone.View.extend({
  markers: [],
  markerCluster: {},
  currentInfoWindow: {},
  infoWindowTpl: _.template($('#map_infoWindow').html()),
  map: {},
  mapOptions: {
    center: {
      //Madrid
      lat: 40.415363, lng: -3.707398
    },
    zoom: 6
  },
  el: '#qtb_home_map',
  events: {},
  ui: {
    'search_input': '#search_input',
    'results_list': '#search_form_results_list',
    'last_teams_list': '#last_teams_list',
    'search_button': '#search_button'
  },

  initialize: function () {
    var view = this;
    this.map = new google.maps.Map($(this.el)[0], this.mapOptions);

    google.maps.event.addListenerOnce(this.map, 'tilesloaded', function() {});


    this.setMapTeamsURL();
    app.teamsCollection.fetch({
      reset: true,
      success: function () {
        view.$(view.ui.last_teams_list).empty();
        app.mainView.toggleSpinner(false);
        app.teamsCollection.each(function (team) {
          view.renderMapTeams(team);
        }, this);

        var options = {
          imagePath: 'dist/images/markers'
        };

        //view.markerCluster = new MarkerClusterer(view.map, view.markers, options);
      },
      error: function () {
        view.$(view.ui.last_teams_list).empty();
      }
    });
  },
  setMapTeamsURL: function () {
    app.teamsCollection.url = app.teamsCollection.urls.mapTeamsUrl;
  },
  addMarker: function (teamData) {
    var view = this,
      marker = new google.maps.Marker({
        position: {lat: parseFloat(teamData.get('lat')), lng: parseFloat(teamData.get('lng'))},
        icon: this.pinSymbol("rgba(150, 1, 1, 0.8)"),
        map: this.map
      });

    this.markers.push(marker);

    marker.addListener('click', function () {
      view.renderInfoWindow(teamData).open(view.map, marker);
    });
  },
  pinSymbol: function (color) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: '#000',
      strokeWeight: 1,
      scale: 1
    };
  },

  renderMapTeams: function (team) {

    this.addMarker(team, this.map);
  },

  renderInfoWindow: function (team) {
    if (!_.isEmpty(this.currentInfoWindow)) {
      this.currentInfoWindow.close();
    }

    this.currentInfoWindow = new google.maps.InfoWindow({
      content: this.infoWindowTpl(team.toJSON())
    });

    return this.currentInfoWindow;
  }
});
