<div class="col s12 m8 l8 offset-m2 offset-l2 qtb-manage-team-container">
  <form id="manage_team_form">
    <div class="input-field col s12  col s12 m6 l6">
      <label for="manage_team_name">
        Nombre
      </label>
      <input type="text" id="manage_team_name" class="qtb-text-field" maxlength="100" required/>
    </div>
    <div class="input-field col s12  col s12 m6 l6">
      <label for="manage_team_email">
        E-mail
      </label>
      <input type="email" id="manage_team_email" class="qtb-email-field" />
    </div>

    <div class="col s12 m6 l6">
      <label>Província</label>
      <select id="manage_team_province" class="browser-default">
      </select>
    </div>
    <div class="col s12 m6 l6">
      <label>Municipio</label>
      <select id="manage_team_township" class="browser-default">
      </select>
    </div>
    <div class="file-field qtb-logo-selector-wrapper col s10 m6 l6 offset-s1">
      <p class="qtb-manage-team-form-section-title">
        Añadir logo
      </p>
      <div class="qtb-manage-team-logo-previsualize" id="manage_team_logo_previsualize_container"></div>
      <div class="btn qtb-team-logo-btn col s12">
        <span> Logo del equipo </span>
        <input class="" id="manage_team_logo" type="file" accept="image/*" />
        <input class="file-path validate" id="manage_team_logo_path"
               type="text">
      </div>
    </div>

    <div class="col s12 m6 l6">
      <!-- <p class="qtb-manage-team-form-section-title">
        Palmarés
      </p> -->
    </div>

    <div class="col s12 m12 l12">
      <div class="qtb-contact-submit-btn-container right">
        <button type="submit" id="manage_team_submit" class="btn default qtb-contact-btn">
          Enviar
        </button>
      </div>
    </div>
  </form>
</div>

<script id="selectTemplate" type="text/template">
  <option value="<%= id %>"> <%= name %></option>
</script>

<script id="cropperModalTemplate" type="text/template">
  <div id="manage_team_cropper_modal" class="modal qtb-manage-team-crop-logo-modal">
    <div class="modal-content">
      <h4> Editar logo</h4>
      <p>
        Puedes recortar el logo antes de subirlo.
      </p>
      <div class="qtb-manage-team-crop-logo-modal-image-container">
        <img id="manage_team_crop_modal_image" class="qtb-manage-team-crop-logo-modal-image" src="<%= image %>">
      </div>
    </div>
    <div class="modal-footer">
      <div class="qtb-cropper-controls-cotainer col s9">
        <div class="qtb-cropper-zoom-controls-container left">
          <div class="qtb-cropper-controls-btn btn btn-default" id="cropper_zoom_plus">
            <i class="material-icons">add_circle_outline</i>
          </div>

          <div class="qtb-cropper-controls-btn btn btn-default" id="cropper_zoom_less">
            <i class="material-icons">remove_circle_outline</i>
          </div>
        </div>
        <div class="qtb-cropper-zoom-controls-container left">
          <div class="qtb-cropper-controls-btn btn btn-default" id="cropper_rotate_right">
            <i class="material-icons">redo</i>
          </div>
          <div class="qtb-cropper-controls-btn btn btn-default" id="cropper_rotate_left">
            <i class="material-icons">undo</i>
          </div>
        </div>
      </div>
      <div class="qtb-cropper-accept-cotainer col s3">
        <button class="modal-action waves-effect waves-green btn-flat"
                id="manage_team_crop_logo_accept_btn">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</script>

<script id="manageTeamPrevisualizeTemplate" type="text/template">
  <img src="<%= src %>" id="manage_team_logo_previsualize_image" class="qtb-team-logo-previsualize-img" alt="" title="" />
</script>
