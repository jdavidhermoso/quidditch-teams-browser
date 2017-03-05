var app = app || {};
app.ManageTeamView = Backbone.View.extend({
  el: '#manage_team',
  selectTemplate: _.template($('#selectTemplate').html()),
  cropLogoTemplate: _.template($('#cropperModalTemplate').html()),
  logoPrevisualizeTemplate: _.template($('#manageTeamPrevisualizeTemplate').html()),
  events: {
    'change #manage_team_province': 'getTownships',
    'change #manage_team_logo': 'openCropper',
    'click #cropper_zoom_plus': 'zoom_plus_cropper',
    'click #cropper_zoom_less': 'zoom_less_cropper',
    'click #cropper_rotate_right': 'rotate_right',
    'click #cropper_rotate_left': 'rotate_left',
    'click #manage_team_submit': 'submitTeam'
  },
  teamLogo: '',
  cropper: {},
  ui: {
    'provincesSelect': '#manage_team_province',
    'townshipsSelect': '#manage_team_township',
    'teamLogoSelector': '#manage_team_logo',
    'teamLogoPathSelector': '#manage_team_logo_path',
    'cropLogoModal': '#manage_team_cropper_modal',
    'cropLogoAcceptBtn': '#manage_team_crop_logo_accept_btn',
    'cropLogoImage': '#manage_team_crop_modal_image',
    'teamLogoPrevisualizeContainer': '#manage_team_logo_previsualize_container',
    'submitButton': '#manage_team_submit',
    'manage_team_name': '#manage_team_name',
    'manage_team_email': '#manage_team_email'
  },
  initialize: function () {
    var view = this;
    this.$el.on('click', this.ui.cropLogoAcceptBtn, function () {
      view.renderPrevisualizeImage(view.cropper.getCroppedCanvas().toDataURL());
      $(view.ui.cropLogoModal).modal('close');
    });

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


  render: function (team) {
  },

  setSaveTeamUrl: function () {
    app.manageTeamModel.url = app.teamsCollection.urls.saveTeamURL;
  },

  renderSelectOption: function (province) {
    return this.selectTemplate(province);
  },

  renderLogoCropperModal: function (image) {
    var view = this;
    view.$el.append(this.cropLogoTemplate({image: image}));
    $(this.ui.cropLogoModal).modal({
      complete: function () {
        $(view.ui.cropLogoModal).remove();
        if (!view.teamLogo && !$(view.ui.teamLogoSelector)[0].files[0]) {
          view.teamLogo = $(view.ui.teamLogoSelector)[0].files[0];
        }
      }
    });
    $(this.ui.cropLogoModal).modal('open');
    $(this.ui.cropLogoModal).addClass('qtb-manage-team-logo-cropper-modal');
  },

  renderProvincesSelector: function (provinces) {
    var view = this;
    $(view.ui.provincesSelect).empty();

    for (var i = 0, z = provinces.length; i < z; i++) {
      $(view.ui.provincesSelect).append(view.renderSelectOption(provinces[i]));
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
    var view = this,
      province_id = $(view.ui.provincesSelect).find(':selected').val(),

      getProvincesRequest = $.ajax({
        type: 'get',
        url: 'index.php/search/getTownships',
        data: {
          province_id: province_id
        }
      });

    getProvincesRequest.then(function (response) {
      var townships = JSON.parse(response);
      $(view.ui.townshipsSelect).empty();

      for (var i = 0, z = townships.length; i < z; i++) {
        $(view.ui.townshipsSelect).append(view.renderSelectOption(townships[i]));
      }

      $(view.ui.townshipsSelect).val($(view.ui.townshipsSelect).find('option:first').val());

    }, function () {
      Materialize.toast('¡El correo no ha podido ser enviado!', 3000);
    });
  },

  setTeamURL: function () {
    this.model.url = app.teamsCollection.urls.saveTeamURL;
  },

  openCropper: function (e) {
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
      if (data.file.size > 1000000) {
        data.view.maxFileSizeAlert();
        return;
      }

      data.view.renderPrevisualizeImage(data.reader.result);

      return {image: data.reader.result, view: data.view};
    }).then(function (data) {
      data.view.renderLogoCropperModal(data.image, data.view);
      return data.view;
    }).then(function (view) {
      view.cropper = new Cropper($(view.ui.cropLogoImage)[0], {
        dragMode: 'move',
        aspectRatio: 1 / 1,
        cropBoxResizable: false
      });
    });
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

    if (!app.mainView.validateForm()) {
      Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
      return;
    }

    var formData = {},
      name = $(this.ui.manage_team_name).val(),
      email = $(this.ui.manage_team_email).val(),
      province = $(this.ui.provincesSelect).find(':selected').val(),
      township = $(this.ui.townshipsSelect).find(':selected').val();

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
      },
      error: function (model, response) {
        console.log(model);
      }
    });
  }

  /* if (!app.mainView.validateForm()) {
   Materialize.toast('¡Por favor, rellena correctamente el formulario de contacto!', 3000);
   return;
   } */


  //TODO: Send email to team, if its filled!!!

});
