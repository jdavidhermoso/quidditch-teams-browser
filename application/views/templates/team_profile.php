<script id="teamProfileTemplate" type="text/template">
  <div class="qtb-team-profile-logo-container col s4 m3 l3">
    <% var logo = logo ? 'dist/images/badges/teams/' + logo : 'dist/images/badges/defaultlogo.jpg' %>
    <img src="<%= logo %>" class="qtb-team-profile-logo" alt="<%= name %>" title="<%= name %>"/>
  </div>
  <div class="qtb-team-profile-info-container col s8 m9 l9">
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
      <li>
        <% if (formatedEmail) { %>
        <a href="mailto:<%=formatedEmail%>">
          <%= app.lang.send_email %>
        </a>
        <% } %>
      </li>
    </ul>
  </div>
  <!-- <div class="qtb-team-profile-controls-container col s12 m12 l12">
    <div class="qtb-team-profile-controls-btn btn btn-default col s3 right" id="edit_team">
      <%= app.lang.edit %>
    </div>
  </div> -->

  <!-- <% if (formatedEmail) { %> -->
 <!-- <div class="qtb-team-profile-contact-form-container col s12">
    <form id="contact_form">
      <div class="qtb-disclaimer qtb-team-profile-contact-form-disclaimer">
        <span> ATENCIÓN: </span> No almacenamos ninguna de la información que introduzcas en éste formulario.
      </div>
      <h2 class="qtb-team-profile-contact-title">
        Contactar por e-mail
      </h2>
      <div class="input-field col s12  col s12 m5 l5">
        <label for="contact_from_email">
          From
        </label>
        <input type="email" id="contact_from_email" class="qtb-email-field" required/>
      </div>
      <div class="input-field col s12 m6 l6 offset-m1 offset-l1">
        <label for="contact_subject">
          Asunto
        </label>
        <input type="text" id="contact_subject" maxlength="50" class="qtb-text-field" required/>
      </div>
      <div class="input-field col s12">
        <label for="contact_message">
          Mensaje
        </label>
        <textarea id="contact_message" class="qtb-text-area" maxlength="1500" required></textarea>
      </div>
      <div class="qtb-contact-submit-btn-container right">
        <button type="submit" id="contact_team" class="btn default qtb-contact-btn">
          Enviar
        </button>
      </div>
    </form>
  </div>

  <% } %> -->
</script>
