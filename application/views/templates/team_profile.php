<script id="teamProfileTemplate" type="text/template">
  <div class="qtb-team-profile-logo-container col s2 m3 l3">
    <% src = logo ? logo : 'dist/images/badges/defaultlogo.jpg' %>
    <img src="<%= src %>" class="qtb-team-profile-logo" alt="<%= name %>" title="<%= name %>" />
  </div>
  <div class="qtb-team-profile-info-container col s10 m9 l9">
    <ul class="qtb-team-profile-info">
      <li class="qtb-team-profile-name">
        <%= name %>
      </li>
      <li>
        <%= township %>
      </li>
      <li class="qtb-team-profile-province">
        <%= province %>
      </li>
    </ul>
  </div>

  <div class="qtb-team-profile-contact-form-container col s12">
    <div class="qtb-disclaimer qtb-team-profile-contact-form-disclaimer">
      <span> ATENCIÓN: </span> No almacenamos ninguna de la información que introduzcas en éste formulario.
    </div>
    <h2 class="qtb-team-profile-contact-title">
      Contactar
    </h2>
    <div class="input-field col s12  col s12 m5 l5">
      <label for="contact_from_email">
        From
      </label>
      <input type="email" id="contact_from_email"  class="" />
    </div>
    <div class="input-field col s12 m6 l6 offset-m1 offset-l1">
      <label for="contact_from_email">
        Asunto
      </label>
      <input type="email" id="contact_subject"  class="" />
    </div>
    <div class="input-field col s12">
      <label for="contact_from_email">
        Mensaje
      </label>
      <textarea id="contact_message" class="qtb-text-area"></textarea>
    </div>
    <div class="qtb-contact-submit-btn-container">
      <button type="submit" class="btn defaul">
        Enviar
      </button>
    </div>
  </div>
</script>
