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
const cepForm = document.getElementById("formulario-cep");
const cepInput = document.getElementById("cep");
const cepButton = document.getElementById("consultar-cep");
const cepFeedback = document.getElementById("cep-feedback");
const addressResult = document.getElementById("resultado-cep");
const resultStreet = document.getElementById("resultado-logradouro");
const resultDistrict = document.getElementById("resultado-bairro");
const resultCity = document.getElementById("resultado-cidade");
const resultCep = document.getElementById("resultado-numero-cep");
const historyList = document.getElementById("historico-cep");
const emptyHistory = document.getElementById("historico-vazio");
const clearHistoryButton = document.getElementById("limpar-historico");

const persistentStore = window.localStorage;
const SAVED_DATA_KEYS = {
  preferences: "raizesUrbanasPreferencesV1",
  cepHistory: "raizesUrbanasCepHistoryV1"
};
const MAX_HISTORY_ITEMS = 5;

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

function readSavedData(key, fallbackValue) {
  try {
    const storedValue = persistentStore.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function writeSavedData(key, value) {
  try {
    persistentStore.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function updatePreferences(changes) {
  const currentPreferences = readSavedData(SAVED_DATA_KEYS.preferences, {});
  writeSavedData(SAVED_DATA_KEYS.preferences, { ...currentPreferences, ...changes });
}

function toggleCustomizeMenu() {
  const isExpanded = customizeToggle.getAttribute("aria-expanded") === "true";

  customizeToggle.setAttribute("aria-expanded", String(!isExpanded));
  customizeMenu.hidden = isExpanded;
}

function closeCustomizeMenu() {
  customizeToggle.setAttribute("aria-expanded", "false");
  customizeMenu.hidden = true;
}

function applyTheme(themeName, persist = true) {
  const validTheme = themeContent[themeName] ? themeName : "verde";
  const selectedTheme = themeContent[validTheme];

  document.body.dataset.theme = validTheme;
  statusText.textContent = selectedTheme.message;
  statusText.style.color = selectedTheme.color;

  themeButtons.forEach((button) => {
    const isCurrentTheme = button.dataset.theme === validTheme;
    button.classList.toggle("is-active", isCurrentTheme);
    button.setAttribute("aria-pressed", String(isCurrentTheme));
  });

  if (persist) {
    updatePreferences({ theme: validTheme });
  }
}

function updateTextSize(persist = true) {
  const numericSize = Math.min(22, Math.max(16, Number(textSizeInput.value) || 16));
  const size = `${numericSize}px`;

  textSizeInput.value = String(numericSize);
  document.documentElement.style.setProperty("--base-font-size", size);
  textSizeOutput.textContent = size;

  if (persist) {
    updatePreferences({ textSize: numericSize });
  }
}

function updateCommunityFocus(persist = true) {
  const validFocus = focusContent[focusSelect.value] ? focusSelect.value : "plantio";
  const selectedFocus = focusContent[validFocus];

  focusSelect.value = validFocus;
  focusResult.textContent = selectedFocus.result;
  eventDate.textContent = selectedFocus.date;
  eventDescription.textContent = selectedFocus.description;

  if (persist) {
    updatePreferences({ communityFocus: validFocus });
  }
}

function restorePreferences() {
  const preferences = readSavedData(SAVED_DATA_KEYS.preferences, {});

  textSizeInput.value = String(preferences.textSize || 16);
  focusSelect.value = preferences.communityFocus || "plantio";
  applyTheme(preferences.theme || "verde", false);
  updateTextSize(false);
  updateCommunityFocus(false);
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

  formFeedback.textContent = `Inscrição recebida, ${firstName}. Em breve enviaremos as próximas atividades.`;
  formFeedback.classList.add("is-success");
  form.reset();
  requiredFields.forEach((field) => clearFieldState(field));
}

function onlyCepDigits(value) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function formatCep(value) {
  const digits = onlyCepDigits(value);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

function normalizeHistoryEntry(entry) {
  if (!entry || !/^\d{8}$/.test(onlyCepDigits(entry.cep || ""))) {
    return null;
  }

  return {
    cep: formatCep(entry.cep),
    logradouro: String(entry.logradouro || "Não informado"),
    bairro: String(entry.bairro || "Não informado"),
    localidade: String(entry.localidade || "Não informado"),
    uf: String(entry.uf || ""),
    consultedAt: String(entry.consultedAt || "")
  };
}

const storedCepHistory = readSavedData(SAVED_DATA_KEYS.cepHistory, []);
let cepHistory = (Array.isArray(storedCepHistory) ? storedCepHistory : [])
  .map(normalizeHistoryEntry)
  .filter(Boolean)
  .slice(0, MAX_HISTORY_ITEMS);

function setCepFeedback(message, type = "error") {
  cepFeedback.textContent = message;
  cepFeedback.classList.toggle("is-success", type === "success");
}

function setCepLoading(isLoading) {
  cepForm.setAttribute("aria-busy", String(isLoading));
  cepButton.disabled = isLoading;
  cepButton.textContent = isLoading ? "Consultando..." : "Consultar";
}

function displayAddress(address) {
  resultStreet.textContent = address.logradouro;
  resultDistrict.textContent = address.bairro;
  resultCity.textContent = address.uf ? `${address.localidade}/${address.uf}` : address.localidade;
  resultCep.textContent = address.cep;
  addressResult.hidden = false;
}

function historyAddressLine(address) {
  const location = address.uf ? `${address.localidade}/${address.uf}` : address.localidade;
  return `${address.logradouro} — ${location}`;
}

function renderCepHistory() {
  historyList.replaceChildren();
  const hasHistory = cepHistory.length > 0;

  emptyHistory.hidden = hasHistory;
  clearHistoryButton.hidden = !hasHistory;

  cepHistory.forEach((address) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    const cepText = document.createElement("strong");
    const addressText = document.createElement("span");

    button.type = "button";
    button.className = "history-item-button";
    button.dataset.cep = onlyCepDigits(address.cep);
    button.setAttribute("aria-label", `Abrir endereço do CEP ${address.cep}`);
    cepText.textContent = address.cep;
    addressText.textContent = historyAddressLine(address);
    button.append(cepText, addressText);
    listItem.append(button);
    historyList.append(listItem);
  });
}

function saveAddressToHistory(address) {
  const normalizedAddress = normalizeHistoryEntry(address);

  cepHistory = [
    normalizedAddress,
    ...cepHistory.filter((item) => onlyCepDigits(item.cep) !== onlyCepDigits(normalizedAddress.cep))
  ].slice(0, MAX_HISTORY_ITEMS);

  writeSavedData(SAVED_DATA_KEYS.cepHistory, cepHistory);
  renderCepHistory();
}

function findAddressInHistory(cep) {
  return cepHistory.find((item) => onlyCepDigits(item.cep) === cep);
}

async function consultCep(event) {
  event.preventDefault();
  const cep = onlyCepDigits(cepInput.value);

  cepInput.value = formatCep(cep);
  cepInput.setAttribute("aria-invalid", String(cep.length !== 8));
  addressResult.hidden = true;

  if (cep.length !== 8) {
    setCepFeedback("Informe um CEP válido com oito números.");
    cepInput.focus();
    return;
  }

  const cachedAddress = findAddressInHistory(cep);
  if (cachedAddress) {
    displayAddress(cachedAddress);
    setCepFeedback("Endereço recuperado do histórico deste navegador.", "success");
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  setCepLoading(true);
  setCepFeedback("Consultando o endereço...", "success");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("HTTP_ERROR");
    }

    const data = await response.json();

    if (data.erro === true || data.erro === "true") {
      throw new Error("CEP_NOT_FOUND");
    }

    const address = normalizeHistoryEntry({
      cep: data.cep || cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      consultedAt: new Date().toISOString()
    });

    displayAddress(address);
    saveAddressToHistory(address);
    setCepFeedback("Consulta concluída e salva no histórico.", "success");
  } catch (error) {
    if (error.message === "CEP_NOT_FOUND") {
      setCepFeedback("Não encontramos esse CEP. Confira os números informados.");
    } else if (error.name === "AbortError") {
      setCepFeedback("A consulta demorou mais que o esperado. Tente novamente.");
    } else {
      setCepFeedback("Não foi possível consultar o endereço agora. Verifique sua conexão e tente novamente.");
    }
  } finally {
    window.clearTimeout(timeoutId);
    setCepLoading(false);
  }
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

customizeToggle.addEventListener("click", toggleCustomizeMenu);
textSizeInput.addEventListener("input", () => updateTextSize());
focusSelect.addEventListener("change", () => updateCommunityFocus());
form.addEventListener("submit", validateForm);
cepForm.addEventListener("submit", consultCep);

cepInput.addEventListener("input", () => {
  cepInput.value = formatCep(cepInput.value);
  cepInput.setAttribute("aria-invalid", "false");
  setCepFeedback("");
});

historyList.addEventListener("click", (event) => {
  const historyButton = event.target.closest(".history-item-button");
  if (!historyButton) {
    return;
  }

  const address = findAddressInHistory(historyButton.dataset.cep);
  if (address) {
    cepInput.value = address.cep;
    displayAddress(address);
    setCepFeedback("Endereço recuperado do histórico deste navegador.", "success");
  }
});

clearHistoryButton.addEventListener("click", () => {
  cepHistory = [];
  try {
    persistentStore.removeItem(SAVED_DATA_KEYS.cepHistory);
  } catch {
    // A interface continua funcional mesmo quando o armazenamento é bloqueado.
  }
  renderCepHistory();
  addressResult.hidden = true;
  setCepFeedback("Histórico de consultas removido.", "success");
});

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

restorePreferences();
renderCepHistory();
