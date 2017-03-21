var app = app || {};
app.ManageTeamView = Backbone.View.extend({
  el: '#manage_team',
  selectTemplate: _.template(this.$('#selectTemplate').html()),
  formTemplate: _.template(this.$('#manageTeamTemplate').html()),
  cupsWonTemplate: _.template(this.$('#singleCupWonInputTemplate').html()),
  logoPrevisualizeTemplate: _.template(this.$('#manageTeamPrevisualizeTemplate').html()),
  defaultProvince: 15,
  defaultTownship: 1,
  events: {
    'change #manage_team_logo': 'setCropper',
    'click #cropper_zoom_plus': 'zoom_plus_cropper',
    'click #cropper_zoom_less': 'zoom_less_cropper',
    'click #cropper_rotate_right': 'rotate_right',
    'click #cropper_rotate_left': 'rotate_left',
    'click #manage_team_submit': 'submitTeam',
    'click #cropper_done': 'saveCrop',
    'click #cropper_clear': 'discardCrop'

  },
  teamLogo: '',
  cropper: {},
  ui: {
    'manageTeamFrom': '#manage_team_form',
    'provincesSelect': '#manage_team_province',
    'townshipsSelect': '#manage_team_township',
    'teamLogoSelector': '#manage_team_logo',
    'teamLogoPathSelector': '#manage_team_logo_path',
    'teamLogoPrevisualizeContainer': '#manage_team_logo_previsualize_container',
    'teamLogoPrevisualize': '#manage_team_logo_previsualize_image',
    'submitButton': '#manage_team_submit',
    'manage_team_name': '#manage_team_name',
    'manage_team_email': '#manage_team_email',
    'cropControls': '.qtb-cropper-controls-btn',
    'cupsWonContainer': '#cups_won_container',
    'container': '.qtb-manage-team-container'
  },
  initialize: function () {
    var view = this;
    //TODO: Refactor to Backbone style
    this.$el.on('change', this.ui.provincesSelect, function (e) {
      view.getTownships($(e.target).find(':selected').val()).then(function (townships) {
        view.renderTownshipsSelector(townships);
      });
    });

    if (this.model.get('id')) {

      this.getTeamData(this.model.get('id'));

    } else {

      this.renderAddForm();

    }

    app.mainView.showPage(app.mainView.ui.pages.manage_team);
  },

  getTeamData: function (teamId) {
    var view = this;
    this.setSyncURL();
    this.model.fetch({
      reset: true,
      data: {
        id: teamId
      },
      success: function () {
        if (!view.model.get('id')) {
          view.renderTeamNotFound();
          return;
        }

        view.renderEditForm();
      },
      error: function () {
        //Materialize.toast('Algo no ha ido bien!', 3000);
      }
    });
  },

  renderAddForm: function () {
    this.$(this.ui.container).html(this.formTemplate(this.model.toJSON()));
    this.setDefaultProvinceAndTownship();
    app.mainView.toggleSpinner(false);
  },

  renderEditForm: function () {
    this.$(this.ui.container).html(this.formTemplate(this.model.toJSON()));
    this.setTeamProvinceAndTownship();
    this.renderPrevisualizeImage(this.model.get('logo'));
    app.mainView.toggleSpinner(false);
  },

  renderCupsWonInput: function () {
    $(this.ui.cupsWonContainer).empty();
    for (var i = 0, z = 5; i < z; i++) {
      $(this.ui.cupsWonContainer).append(this.cupsWonTemplate({
        won: true,
        id: (i + 1)
      }));
    }
  },

  setDefaultProvinceAndTownship: function () {
    var view = this;

    this.getProvinces().then(function (provinces) {
      view.renderProvincesSelector(provinces);
      return view.getTownships(view.defaultProvince);
    }, function () {
      //Todo: Toast error
    }).then(function (townships) {
      view.renderTownshipsSelector(townships);
    }, function () {
      //Todo: Toast error
    });
  },

  renderProvincesSelector: function (provinces) {
    var provinces = JSON.parse(provinces);

    this.$(this.ui.provincesSelect).empty();
    for (var i = 0, z = provinces.length; i < z; i++) {
      this.$(this.ui.provincesSelect).append(this.renderSelectOption(provinces[i]));
    }

    this.$(this.ui.provincesSelect + ' option[value=' + this.model.get('province_id') + ']').attr('selected', 'selected');
  },

  renderTownshipsSelector: function (townships) {
    var townships = JSON.parse(townships);

    this.$(this.ui.townshipsSelect).empty();
    for (var i = 0, z = townships.length; i < z; i++) {
      this.$(this.ui.townshipsSelect).append(this.renderSelectOption(townships[i]));
    }
    this.$(this.ui.townshipsSelect + ' option[value=' + this.model.get('township_id') + ']').attr('selected', 'selected');
  },

  setTeamProvinceAndTownship: function () {
    var view = this;
    this.getProvinces().then(function (provinces) {
      view.renderProvincesSelector(provinces);
      return view.getTownships(view.model.get('province_id'));
    }, function () {
      //Todo: Toast error
    }).then(function (townships) {
      view.renderTownshipsSelector(townships);
    }, function () {
      //Todo: Toast error
    });
  },

  setSyncURL: function () {
    this.model.url = app.teamsCollection.urls.teamURL;
  },

  setSaveTeamUrl: function () {
    this.model.url = app.teamsCollection.urls.saveTeamURL;
  },

  renderSelectOption: function (province) {
    return this.selectTemplate(province);
  },

  renderLogoCropperModal: function (image) {
    var view = this;
    view.append(this.cropLogoTemplate({image: image}));
    view.$(this.ui.cropLogoModal).modal({
      complete: function () {
        view.$(view.ui.cropLogoModal).remove();
        if (!view.teamLogo && !$(view.ui.teamLogoSelector)[0].files[0]) {
          view.teamLogo = $(view.ui.teamLogoSelector)[0].files[0];
        }
      }
    });
    $(this.ui.cropLogoModal).modal('open');
  },

  renderPrevisualizeImage: function (src) {
    this.$(this.ui.teamLogoPrevisualizeContainer).html(this.logoPrevisualizeTemplate({src: src}));
    this.teamLogo = src;
  },

  getProvinces: function () {
    return $.ajax({
      type: 'get',
      url: 'index.php/search/getProvinces'
    });
  },

  getTownships: function (province_id) {
    return $.ajax({
      type: 'get',
      url: 'index.php/search/getTownships',
      data: {
        province_id: province_id
      }
    });
  },

  setCropper: function (e) {
    app.mainView.toggleSpinner(true);
    var view = this,
      file = e.target.files[0],
      imageLoaded = new Promise(function (resolve, reject) {
        var reader;
        if (file) {
          reader = new FileReader();
          reader.onloadend = function () {
            app.mainView.toggleSpinner(false);
            resolve({reader: reader, file: file, view: view});
          };

          reader.readAsDataURL(file);
        }
      });

    imageLoaded.then(function (data) {
      if (data.file.size > 1000000) {
        data.view.maxFileSizeAlert();
        return;
      }

      data.view.renderPrevisualizeImage(data.reader.result);

      data.view.toggleCropControls(true);


      data.view.cropper = new Cropper(data.view.$(data.view.ui.teamLogoPrevisualize)[0], {
        dragMode: 'move',
        aspectRatio: 1,
        cropBoxResizable: true
      });

      return {image: data.reader.result, view: data.view};
    });
  },

  toggleCropControls: function (stateToSet) {
    this.$(this.ui.cropControls).toggleClass('disabled', !stateToSet);
  },


  maxFileSizeAlert: function () {
    Materialize.toast('Selected file is too big. Max. upload file is 1 MB', 3000);
    this.$(this.ui.teamLogoSelector).val('');
    this.$(this.ui.teamLogoPathSelector).val('');
  },

  zoom_plus_cropper: function () {
    this.cropper.zoom(0.10);
  },

  zoom_less_cropper: function () {
    this.cropper.zoom(-0.10);
  },

  rotate_right: function () {
    this.cropper.rotate(10);
  },

  rotate_left: function () {
    this.cropper.rotate(-10);
  },

  submitTeam: function (e) {
    e.preventDefault();
    var view = this;

    app.mainView.toggleSpinner(true);

    if (!app.mainView.validateForm()) {
      app.mainView.toggleSpinner(false);
      Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
      return;
    }

    var formData = {},
      name = this.$(this.ui.manage_team_name).val(),
      email = this.$(this.ui.manage_team_email).val(),
      province_id = this.$(this.ui.provincesSelect).find(':selected').val(),
      township_id = this.$(this.ui.townshipsSelect).find(':selected').val();

    if (this.teamLogo) {
      formData['logo'] = this.teamLogo;
    }

    formData['name'] = name;
    formData['email'] = email;
    formData['province_id'] = province_id;
    formData['township_id'] = township_id;

    this.model.set(formData);

    this.setSaveTeamUrl();

    this.model.save(formData, {
      success: function () {
        app.router.navigateToTeamProfile(view.model.get('id'));

        app.mainView.toggleSpinner(false);

        Materialize.toast('¡Equipo guardado correctamente!', 3000);
      },
      error: function () {
        Materialize.toast('¡Error guardando equipo!', 3000);
      }
    });
  },

  saveCrop: function () {
    app.mainView.toggleSpinner(true);
    this.renderPrevisualizeImage(this.cropper.getCroppedCanvas().toDataURL());
    this.toggleCropControls(false);
    app.mainView.toggleSpinner(false);
  },

  resetManageTeamForm: function () {
    this.$(this.ui.manageTeamFrom)[0].reset();

    //this.setDefaultProvincesTownshipsSelectors();

    this.resetLogoInput();
  },

  resetLogoInput: function () {
    this.$(this.ui.teamLogoPrevisualizeContainer).empty();
    this.toggleCropControls(false);
  },

  discardCrop: function () {
    this.resetLogoInput();
  },

  renderCupsWonCounter: function () {

  }

  /* if (!app.mainView.validateForm()) {
   Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
   return;
   } */


  //TODO: Send email to team, if its filled!!!

});
