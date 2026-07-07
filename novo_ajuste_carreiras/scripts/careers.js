// FormSubmit integration for static page email submissions

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("careers-form");
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("resume");
  const dropzoneText = document.getElementById("dropzone-text");
  const fileErrorDiv = document.getElementById("file-error");
  const submitBtn = document.getElementById("submit-btn");
  const submitBtnText = document.getElementById("submit-btn-text");
  const successOverlay = document.getElementById("success-overlay");
  const successClose = document.getElementById("success-close");

  let selectedFile = null;

  // --- Translation Helpers for Careers JS ---
  function getTranslation(key) {
    const activeLang = document.documentElement.lang || "pt";
    // Check if translations are defined globally by i18n.js
    const translations = (window.translationsData && window.translationsData[activeLang]) || {};
    
    // Fallback translation mappings
    const fallbacks = {
      pt: {
        careers_error_pdf_type: "Erro: O arquivo selecionado nÃ£o Ã© um PDF. Por favor, envie apenas arquivos em formato PDF.",
        careers_error_pdf_size: "Erro: O arquivo Ã© muito grande. O limite mÃ¡ximo permitido Ã© de 5MB.",
        careers_error_submit: "Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente mais tarde.",
        careers_error_file_select: "Por favor, selecione seu currÃ­culo em formato PDF antes de enviar.",
        careers_dropzone_selected: "CurrÃ­culo selecionado:",
        careers_dropzone_text: "Arraste e solte o currÃ­culo em PDF aqui ou clique para selecionar",
        careers_submit_loading: "Enviando...",
        careers_submit_btn: "Enviar candidatura"
      },
      en: {
        careers_error_pdf_type: "Error: The selected file is not a PDF. Please upload PDF files only.",
        careers_error_pdf_size: "Error: The file is too large. The maximum allowed limit is 5MB.",
        careers_error_submit: "An error occurred while submitting your application. Please try again later.",
        careers_error_file_select: "Please select your PDF resume before submitting.",
        careers_dropzone_selected: "Selected resume:",
        careers_dropzone_text: "Drag and drop your PDF resume here or click to select",
        careers_submit_loading: "Submitting...",
        careers_submit_btn: "Submit application"
      }
    };
    
    return translations[key] || fallbacks[activeLang][key] || key;
  }

  // --- File Dropzone Interactions ---
  // Trigger file selection click
  dropzone.addEventListener("click", () => {
    fileInput.click();
  });

  // Drag and drop events
  ["dragenter", "dragover"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    }, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
    }, false);
  });

  // Handle dropped files
  dropzone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
  });

  // Handle file select inputs
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleFile(file);
  });

  function handleFile(file) {
    if (!file) return;

    fileErrorDiv.style.display = "none";
    fileErrorDiv.textContent = "";

    // Validation 1: Must be PDF
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      showFileError(getTranslation("careers_error_pdf_type"));
      resetFile();
      return;
    }

    // Validation 2: Max Size 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showFileError(getTranslation("careers_error_pdf_size"));
      resetFile();
      return;
    }

    selectedFile = file;
    updateDropzoneUI(file);
  }

  function showFileError(message) {
    fileErrorDiv.textContent = message;
    fileErrorDiv.style.display = "block";
  }

  function resetFile() {
    selectedFile = null;
    fileInput.value = "";
    
    dropzone.innerHTML = `
      <svg class="dropzone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span id="dropzone-text" class="dropzone-text">${getTranslation("careers_dropzone_text")}</span>
    `;
  }

  function updateDropzoneUI(file) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    dropzone.innerHTML = `
      <div class="dropzone-file-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent);">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <strong>${getTranslation("careers_dropzone_selected")}</strong> ${file.name} (${fileSizeMB} MB)
      </div>
      <button type="button" id="remove-file-btn" class="dropzone-remove-btn" title="Remover">&times;</button>
    `;

    // Add remove file event handler
    const removeBtn = document.getElementById("remove-file-btn");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetFile();
    });
  }

  // --- Form Submission Integration with FormSubmit ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      showFileError(getTranslation("careers_error_file_select"));
      return;
    }

    // Set UI to loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = getTranslation("careers_submit_loading");

    try {
      // 1. Gather values and build FormData
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const city = document.getElementById("city").value;
      const area = document.getElementById("area").value;
      const level = document.getElementById("level").value;
      const source = document.getElementById("source").value;
      const linkedin = document.getElementById("linkedin").value;
      const portfolio = document.getElementById("portfolio").value;

      const formData = new FormData();
      formData.append("Nome / Name", name);
      formData.append("E-mail / Email", email);
      formData.append("Telefone / Phone", phone);
      formData.append("Cidade-Estado / City-State", city);
      formData.append("Área / Area", area);
      formData.append("Nível / Level", level);
      formData.append("Como nos conheceu / Source", source);
      formData.append("LinkedIn", linkedin || "Não informado / Not provided");
      formData.append("Portfólio / Portfolio", portfolio || "Não informado / Not provided");
      formData.append("attachment", selectedFile); // Attach the resume PDF file

      // FormSubmit config parameters
      formData.append("_captcha", "false");
      formData.append("_subject", `Nova Candidatura: ${name} (${area} - ${level})`);

      // 2. Submit to FormSubmit via AJAX
      const response = await fetch("https://formsubmit.co/ajax/relacionamento@bloxtrade.com.br", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("FormSubmit response was not ok");
      }

      // 3. Show success popup
      successOverlay.classList.add("active");
      form.reset();
      resetFile();

    } catch (err) {
      console.error("Submission error:", err);
      alert(getTranslation("careers_error_submit"));
    } finally {
      // Restore submit button state
      submitBtn.disabled = false;
      submitBtnText.textContent = getTranslation("careers_submit_btn");
    }
  });

  // --- Success Modal actions ---
  successClose.addEventListener("click", () => {
    successOverlay.classList.remove("active");
  });

  // Synchronize dropzone text when language switcher is clicked
  const langBtns = document.querySelectorAll("[data-lang-toggle]");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Briefly delay to let page update HTML lang attribute
      setTimeout(() => {
        if (!selectedFile) {
          resetFile();
        } else {
          updateDropzoneUI(selectedFile);
        }
      }, 50);
    });
  });
});


