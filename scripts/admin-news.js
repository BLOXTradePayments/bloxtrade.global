import { supabase } from './supabase-config.js';

// --- Image Upload Handling ---
const imageUploadBox = document.getElementById('image-upload-box');
const imageInput = document.getElementById('cover-image-input');
const imagePreview = document.getElementById('cover-image-preview');
const imagePlaceholder = document.getElementById('image-upload-placeholder');
let selectedFile = null;

if (imageUploadBox) {
  imageUploadBox.addEventListener('click', () => {
    imageInput.click();
  });
}

if (imageInput) {
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        imagePlaceholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });
}

// --- Publish Article Handling ---
const btnPublish = document.getElementById('btn-publish');

if (btnPublish) {
  btnPublish.addEventListener('click', async () => {
    const titlePt = document.getElementById('title-pt').value.trim();
    const titleEn = document.getElementById('title-en').value.trim();
    const category = document.getElementById('category').value;
    const author = document.getElementById('author').value.trim();
    const contentPt = document.getElementById('content-pt').value.trim();
    const contentEn = document.getElementById('content-en').value.trim();

    // Basic Validation
    if (!titlePt || !category || category === "Selecione uma categoria..." || !contentPt) {
      alert('Por favor, preencha pelo menos o título em PT, a categoria e o conteúdo em PT.');
      return;
    }

    if (!selectedFile) {
      alert('Por favor, selecione uma imagem de capa.');
      return;
    }

    try {
      btnPublish.innerText = 'Publicando...';
      btnPublish.disabled = true;

      // 1. Upload Image to Supabase Storage
      const fileName = Date.now() + '_' + selectedFile.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('articles_images')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('articles_images')
        .getPublicUrl(fileName);

      // 3. Save Data to Supabase Database
      const { data: docData, error: insertError } = await supabase
        .from('articles')
        .insert([
          {
            title: {
              pt: titlePt,
              en: titleEn
            },
            category: category,
            author: author,
            content: {
              pt: contentPt,
              en: contentEn
            },
            image_url: publicUrl
          }
        ])
        .select();

      if (insertError) throw insertError;

      console.log("Document written with ID: ", docData[0].id);
      alert('Artigo salvo com sucesso no Supabase!');

      // Reset form
      document.getElementById('title-pt').value = '';
      document.getElementById('title-en').value = '';
      document.getElementById('category').selectedIndex = 0;
      document.getElementById('content-pt').value = '';
      document.getElementById('content-en').value = '';
      imagePreview.style.display = 'none';
      imagePlaceholder.style.display = 'block';
      imagePreview.src = '';
      selectedFile = null;
      imageInput.value = '';

    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Erro ao salvar artigo: ' + e.message);
    } finally {
      btnPublish.innerText = 'Publicar Artigo';
      btnPublish.disabled = false;
    }
  });
}
