<div class="col s12 qtb-manage-team-container"></div>
<script id="manageTeamTemplate" type="text/template">
  <form id="manage_team_form">
    <div class="qtb-manage-team-fields-container">
      <div class="input-field col s12 m6 l6">
        <%
          var name_active = '';
          if (name) {
            name_active = 'active';
          }
        %>
        <label for="manage_team_name" class="<%= name_active %>" >
          Nombre
        </label>
        <input type="text" id="manage_team_name" class="qtb-text-field" maxlength="100" value="<%= name %>" required/>
      </div>
      <div class="input-field col s12 m6 l6">
        <%
          var email_active = '';
          if (email) {
          email_active = 'active';
          }
        %>
        <label for="manage_team_email" class="<%= email_active %>">
          E-mail
        </label>
        <input type="email" id="manage_team_email" class="qtb-email-field" value="<%= email %>"/>
      </div>
      <div class="col s12 m6 l6">
        <label>Província</label>
        <select id="manage_team_province" class="browser-default qtb-select-input">
        </select>
      </div>
      <div class="col s12 m6 l6">
        <label>Municipio</label>
        <select id="manage_team_township" class="browser-default qtb-select-input">
        </select>
      </div>
    </div>

    <div class="qtb-manage-team-fields-container">
      <div class="qtb-logo-selector-wrapper col s12 m12 l12">
        <p class="qtb-manage-team-form-section-title">
          Añadir logo
        </p>
        <div class="qtb-manage-team-logo-previsualize col s12 m10 l10" id="manage_team_logo_previsualize_container">

        </div>
        <div class="qtb-cropper-controls-container col s12 m2 l2">
          <div class="file-field btn qtb-manage-team-select-logo-image-btn col s12">
            <i class="material-icons">camera_enhance</i>
            <input class="" id="manage_team_logo" type="file" accept="image/*"/>
            <input class="file-path validate" id="manage_team_logo_path"
                   type="text">
          </div>
          <div class="qtb-cropper-zoom-controls-container">
            <div class="qtb-cropper-controls-btn qtb-cropper-controls-zoom btn btn-default col s6 disabled"
                 id="cropper_zoom_less">
              <i class="material-icons">remove_circle_outline</i>
            </div>
            <div class="qtb-cropper-controls-btn qtb-cropper-controls-zoom btn btn-default col s6 disabled"
                 id="cropper_zoom_plus">
              <i class="material-icons">add_circle_outline</i>
            </div>
          </div>
          <div class="qtb-cropper-zoom-controls-container">
            <div class="qtb-cropper-controls-btn btn btn-default col s6 disabled" id="cropper_rotate_left">
              <i class="material-icons">undo</i>
            </div>
            <div class="qtb-cropper-controls-btn btn btn-default col s6 disabled" id="cropper_rotate_right">
              <i class="material-icons">redo</i>
            </div>
          </div>

          <div class="qtb-cropper-finish-controls-container">
            <div class="qtb-cropper-controls-btn btn btn-default col s6 disabled" id="cropper_clear">
              <i class="material-icons">clear</i>
            </div>
            <div class="qtb-cropper-controls-btn btn btn-default col s6 disabled" id="cropper_done">
              <i class="material-icons">done</i>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="qtb-cups-won-selector-wrapper col s12 m6 l6">
        <p class="qtb-manage-team-form-section-title">
          Palmarés
        </p>
        <div class="qtb-cups-won-container" id="cups_won_container">


        </div>

      </div> -->
    </div>

    <div class="col s12 m12 l12">
      <div class="qtb-contact-submit-btn-container right">
        <button type="submit" id="manage_team_submit" class="btn default qtb-contact-btn">
          Enviar
        </button>
      </div>
    </div>
  </form>
</script>


<script id="selectTemplate" type="text/template">
  <option value="<%= id %>" > <%= name %></option>
</script>

<script id="manageTeamPrevisualizeTemplate" type="text/template">
  <img src="<%= src %>" id="manage_team_logo_previsualize_image" class="qtb-team-logo-previsualize-img" alt=""
       title=""/>
</script>

<script id="singleCupWonInputTemplate" type="text/template">
  <div class="qtb-cup-won-container">
    <div class="qtb-cup-won cup_won_icon_container" data-id="<%= id %>">
      <i class="material-icons">star_rate</i>
    </div>
    <input type="text" class="qtb-cup-won-year-input" id="cup_won_year_input" placeholder="2016" maxlength="4"/>
  </div>
</script>

<script id="cupCountTemplate" type="text/template">
  <div class="qtb-cups-input-won-counter">
    <span><%= cups %></span>
  </div>
</script>
