const themeButtons = document.querySelectorAll(".theme-button");
const customizeToggle = document.getElementById("personalizacao-toggle");
const customizeMenu = document.getElementById("personalizacao-menu");
const statusText = document.getElementById("interacao-status");
const textSizeInput = document.getElementById("tamanho-texto");
const textSizeOutput = document.getElementById("tamanho-texto-valor");
const focusSelect = document.getElementById("foco-comunitario");
const focusResult = document.getElementById("foco-resultado");
const eventDate = document.getElementById("evento-data");
const eventDescription = document.getElementById("evento-descricao");
const form = document.getElementById("formulario-inscricao");
const formFeedback = document.getElementById("form-feedback");

const themeContent = {
  verde: {
    color: "#1f6b45",
    message: "Tema verde ativo: a página destaca o cultivo e a participação comunitária."
  },
  sol: {
    color: "#9a4b21",
    message: "Tema solar ativo: a página ganhou tons mais quentes para destacar acolhimento."
  },
  noite: {
    color: "#f2bf3d",
    message: "Tema noturno ativo: a página usa maior contraste para leitura em ambientes escuros."
  }
};

const focusContent = {
  plantio: {
    result: "Área em destaque: oficinas de plantio.",
    date: "Sábado, 11 de julho",
    description: "Oficina de plantio, preparo do solo e escolha de mudas para novos canteiros."
  },
  compostagem: {
    result: "Área em destaque: compostagem doméstica.",
    date: "Sábado, 18 de julho",
    description: "Roda prática sobre reaproveitamento de resíduos orgânicos e produção de adubo."
  },
  mutirao: {
    result: "Área em destaque: mutirão mensal.",
    date: "Sábado, 25 de julho",
    description: "Encontro coletivo para limpeza, organização e manutenção dos canteiros comunitários."
  }
};

function toggleCustomizeMenu() {
  const isExpanded = customizeToggle.getAttribute("aria-expanded") === "true";

  customizeToggle.setAttribute("aria-expanded", String(!isExpanded));
  customizeMenu.hidden = isExpanded;
}

function closeCustomizeMenu() {
  customizeToggle.setAttribute("aria-expanded", "false");
  customizeMenu.hidden = true;
}

function applyTheme(themeName) {
  const selectedTheme = themeContent[themeName];

  document.body.dataset.theme = themeName;
  statusText.textContent = selectedTheme.message;
  statusText.style.color = selectedTheme.color;

  themeButtons.forEach((button) => {
    const isCurrentTheme = button.dataset.theme === themeName;
    button.classList.toggle("is-active", isCurrentTheme);
    button.setAttribute("aria-pressed", String(isCurrentTheme));
  });
}

function updateTextSize() {
  const size = `${textSizeInput.value}px`;

  document.documentElement.style.setProperty("--base-font-size", size);
  textSizeOutput.textContent = size;
}

function updateCommunityFocus() {
  const selectedFocus = focusContent[focusSelect.value];

  focusResult.textContent = selectedFocus.result;
  eventDate.textContent = selectedFocus.date;
  eventDescription.textContent = selectedFocus.description;
}

function setFieldState(field, feedbackElement, message) {
  const hasError = message.length > 0;

  field.classList.toggle("is-invalid", hasError);
  field.setAttribute("aria-invalid", String(hasError));
  feedbackElement.textContent = message;
}

function clearFieldState(field) {
  const feedbackElement = document.getElementById(`${field.id}-feedback`);

  field.classList.remove("is-invalid");
  field.setAttribute("aria-invalid", "false");
  feedbackElement.textContent = "";
}

function validateField(field) {
  const feedbackElement = document.getElementById(`${field.id}-feedback`);
  const value = field.value.trim();

  if (field.id === "nome") {
    const message = value.length < 3 ? "Informe um nome com pelo menos 3 caracteres." : "";
    setFieldState(field, feedbackElement, message);
    return message === "";
  }

  if (field.id === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const message = emailPattern.test(value) ? "" : "Informe um e-mail válido.";
    setFieldState(field, feedbackElement, message);
    return message === "";
  }

  if (field.id === "interesse") {
    const message = value === "" ? "Selecione uma área de interesse." : "";
    setFieldState(field, feedbackElement, message);
    return message === "";
  }

  if (field.id === "autorizacao") {
    const message = field.checked ? "" : "A autorização é necessária para concluir a inscrição.";
    setFieldState(field, feedbackElement, message);
    return message === "";
  }

  return true;
}

function validateForm(event) {
  event.preventDefault();

  const requiredFields = [
    document.getElementById("nome"),
    document.getElementById("email"),
    document.getElementById("interesse"),
    document.getElementById("autorizacao")
  ];
  const validationResults = requiredFields.map((field) => validateField(field));
  const isValid = validationResults.every(Boolean);

  formFeedback.classList.remove("is-success");

  if (!isValid) {
    formFeedback.textContent = "Revise os campos destacados antes de enviar a inscrição.";
    return;
  }

  const firstName = document.getElementById("nome").value.trim().split(" ")[0];

  formFeedback.textContent = `Inscrição recebida, ${firstName}. Em breve enviaremos novidades do projeto.`;
  formFeedback.classList.add("is-success");
  form.reset();
  requiredFields.forEach((field) => clearFieldState(field));
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

customizeToggle.addEventListener("click", toggleCustomizeMenu);
textSizeInput.addEventListener("input", updateTextSize);
focusSelect.addEventListener("change", updateCommunityFocus);
form.addEventListener("submit", validateForm);

document.addEventListener("click", (event) => {
  const clickedInsideMenu = customizeMenu.contains(event.target);
  const clickedToggle = customizeToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeCustomizeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCustomizeMenu();
  }
});

form.addEventListener("input", (event) => {
  if (event.target.matches("#nome, #email")) {
    validateField(event.target);
    formFeedback.textContent = "";
  }
});

form.addEventListener("change", (event) => {
  if (event.target.matches("#interesse, #autorizacao")) {
    validateField(event.target);
    formFeedback.textContent = "";
  }
});

applyTheme("verde");
updateTextSize();
updateCommunityFocus();
