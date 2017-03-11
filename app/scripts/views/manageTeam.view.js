var app = app || {};
app.ManageTeamView = Backbone.View.extend({
  el: '#manage_team',
  selectTemplate: _.template(this.$('#selectTemplate').html()),
  cupsWonTemplate: _.template(this.$('#singleCupWonInputTemplate').html()),
  logoPrevisualizeTemplate: _.template(this.$('#manageTeamPrevisualizeTemplate').html()),
  events: {
    'change #manage_team_province': 'getTownships',
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
    'cupsWonContainer': '#cups_won_container'
  },
  initialize: function () {
    app.mainView.showPage(app.mainView.ui.pages.manage_team);
    this.setDefaultProvincesTownshipsSelectors();
    this.renderCupsWonInput();
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

  setDefaultProvincesTownshipsSelectors: function () {
    var view = this;
    this.getProvinces().then(function (provinces) {
      return JSON.parse(provinces);
    }).catch(function () {
      Materialize.toast('¡Ha habido un error!', 3000);
    }).then(function (provinces) {
      view.renderProvincesSelector(provinces);
    }).then(function () {
      view.getTownships();
    }).catch(function () {
      Materialize.toast('¡Ha habido un error!', 3000);
    });
  },

  setSaveTeamUrl: function () {
    app.manageTeamModel.url = app.teamsCollection.urls.saveTeamURL;
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

  renderProvincesSelector: function (provinces) {
    this.$(this.ui.provincesSelect).empty();

    for (var i = 0, z = provinces.length; i < z; i++) {
      this.$(this.ui.provincesSelect).append(this.renderSelectOption(provinces[i]));
    }
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

  getTownships: function () {
      var province_id = this.$(this.ui.provincesSelect).find(':selected').val(),
        view = this,

      getProvincesRequest = $.ajax({
        type: 'get',
        url: 'index.php/search/getTownships',
        data: {
          province_id: province_id
        }
      });

    getProvincesRequest.then(function (response) {
      var townships = JSON.parse(response);
      view.$(view.ui.townshipsSelect).empty();

      for (var i = 0, z = townships.length; i < z; i++) {
        view.$(view.ui.townshipsSelect).append(view.renderSelectOption(townships[i]));
      }

      view.$(view.ui.townshipsSelect).val(view.$(view.ui.townshipsSelect).find('option:first').val());

    }, function () {
      Materialize.toast('¡El correo no ha podido ser enviado!', 3000);
    });
  },

  setCropper: function (e) {
    var view = this,
      file = e.target.files[0],
      imageLoaded = new Promise(function (resolve, reject) {
        var reader;
        if (file) {
          reader = new FileReader();
          reader.onloadend = function () {
            resolve({reader: reader, file: file, view: view});
          };

          reader.readAsDataURL(file);
        }
      });

    imageLoaded.then(function (data) {
      if (data.file.size > 3000000) {
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
    Materialize.toast('Selected file is too big. Max. upload file is 3 MB', 3000);
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

    if (!app.mainView.validateForm()) {
      Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
      return;
    }

    var formData = {},
      name = this.$(this.ui.manage_team_name).val(),
      email = this.$(this.ui.manage_team_email).val(),
      province = this.$(this.ui.provincesSelect).find(':selected').val(),
      township = this.$(this.ui.townshipsSelect).find(':selected').val();

    if (this.teamLogo) {
      formData['logo'] = this.teamLogo;
    }

    formData['name'] = name;
    formData['email'] = email;
    formData['province'] = province;
    formData['township'] = township;

    this.model.set(formData);

    this.setSaveTeamUrl();

    this.model.save(formData, {
      success: function (model, response) {
        view.resetManageTeamForm();
        Materialize.toast('¡Equipo guardado correctamente!', 3000);
      },
      error: function (model, response) {
        Materialize.toast('¡Ha habido un error!', 3000);
      }
    });
  },

  saveCrop: function () {
    this.renderPrevisualizeImage(this.cropper.getCroppedCanvas().toDataURL());
    this.toggleCropControls(false);
  },

  resetManageTeamForm: function () {
    this.$(this.ui.manageTeamFrom)[0].reset();

    this.setDefaultProvincesTownshipsSelectors();

    this.resetLogoInput();
  },

  resetLogoInput: function () {
    this.$(this.ui.teamLogoPrevisualizeContainer).empty();
    this.toggleCropControls(false);
  },

  discardCrop: function () {
    this.resetLogoInput();
  },

  renderCupsWonCounter: function() {

  }

  /* if (!app.mainView.validateForm()) {
   Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
   return;
   } */


  //TODO: Send email to team, if its filled!!!

});
