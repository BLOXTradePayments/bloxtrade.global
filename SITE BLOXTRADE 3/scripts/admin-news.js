import { supabase } from './supabase-config.js';

// --- Navigation Tab Toggling ---
const navDashboard = document.getElementById('nav-dashboard');
const navNewArticle = document.getElementById('nav-new-article');
const navPublishedArticles = document.getElementById('nav-published-articles');

const viewDashboard = document.getElementById('view-dashboard');
const viewNewArticle = document.getElementById('view-new-article');
const viewPublishedArticles = document.getElementById('view-published-articles');
const pageTitle = document.getElementById('admin-page-title');

function switchTab(activeNav, activeView, titleText) {
  // Remove active classes
  [navDashboard, navNewArticle, navPublishedArticles].forEach(nav => {
    if (nav) nav.classList.remove('active');
  });
  [viewDashboard, viewNewArticle, viewPublishedArticles].forEach(view => {
    if (view) view.classList.remove('active');
  });

  // Add active classes
  if (activeNav) activeNav.classList.add('active');
  if (activeView) activeView.classList.add('active');
  if (pageTitle) pageTitle.innerText = titleText;

  // Load appropriate data
  if (activeNav === navDashboard) {
    loadDashboardStats();
  } else if (activeNav === navPublishedArticles) {
    loadPublishedArticles();
  }
}

if (navDashboard) navDashboard.addEventListener('click', () => switchTab(navDashboard, viewDashboard, 'Dashboard'));
if (navNewArticle) navNewArticle.addEventListener('click', () => switchTab(navNewArticle, viewNewArticle, 'Publicar Novo Artigo'));
if (navPublishedArticles) navPublishedArticles.addEventListener('click', () => switchTab(navPublishedArticles, viewPublishedArticles, 'Artigos Publicados'));


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


// --- Dashboard Stats Logic ---
async function loadDashboardStats() {
  const statTotal = document.getElementById('stat-total-articles');
  const statLatest = document.getElementById('stat-latest-date');

  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (statTotal) statTotal.innerText = articles.length;

    if (statLatest) {
      if (articles.length > 0 && articles[0].created_at) {
        const date = new Date(articles[0].created_at);
        statLatest.innerText = date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      } else {
        statLatest.innerText = 'Nenhum artigo';
      }
    }
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
  }
}


// --- Published Articles List & Delete Logic ---
const articlesListTbody = document.getElementById('published-articles-list');

async function loadPublishedArticles() {
  if (!articlesListTbody) return;
  
  articlesListTbody.innerHTML = `
    <tr>
      <td colspan="6" style="padding: 3rem; text-align: center; color: #888;">Carregando artigos...</td>
    </tr>
  `;

  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, category, author, created_at, image_url')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (articles.length === 0) {
      articlesListTbody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 3rem; text-align: center; color: #888;">Nenhum artigo publicado.</td>
        </tr>
      `;
      return;
    }

    articlesListTbody.innerHTML = '';
    articles.forEach(article => {
      const titlePt = article.title.pt || article.title.en || 'Sem título';
      const date = new Date(article.created_at);
      const dateFormatted = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="padding: 1rem;"><img src="${article.image_url}" class="table-thumbnail" alt="Thumb"></td>
        <td style="padding: 1rem; font-weight: 600; color: var(--color-bg-dark);">${titlePt}</td>
        <td style="padding: 1rem;"><span style="background: rgba(97, 177, 47, 0.1); color: var(--color-accent-hover); padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${article.category}</span></td>
        <td style="padding: 1rem; color: #666; font-size: 14px;">${article.author || 'Equipe BLOXtrade'}</td>
        <td style="padding: 1rem; color: #888; font-size: 14px;">${dateFormatted}</td>
        <td style="padding: 1rem; text-align: right;">
          <button class="btn-delete" data-id="${article.id}">Excluir</button>
        </td>
      `;

      // Attach Delete Listener
      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', async () => {
        const confirmDelete = confirm(`Tem certeza que deseja excluir o artigo "${titlePt}"?`);
        if (!confirmDelete) return;

        try {
          deleteBtn.innerText = 'Excluindo...';
          deleteBtn.disabled = true;

          // Attempt to delete row from database
          const { error: deleteError } = await supabase
            .from('articles')
            .delete()
            .eq('id', article.id);

          if (deleteError) throw deleteError;

          // Also try to delete image from storage if we can extract the filename
          try {
            const urlParts = article.image_url.split('/public/articles_images/');
            if (urlParts.length > 1) {
              const fileToDelete = urlParts[1];
              await supabase.storage
                .from('articles_images')
                .remove([fileToDelete]);
              console.log('Imagem removida do storage:', fileToDelete);
            }
          } catch (storageErr) {
            console.warn('Erro ao remover imagem do storage (não-fatal):', storageErr);
          }

          alert('Artigo excluído com sucesso!');
          loadPublishedArticles(); // reload
        } catch (err) {
          console.error('Erro ao excluir artigo:', err);
          alert('Erro ao excluir artigo: ' + err.message);
          deleteBtn.innerText = 'Excluir';
          deleteBtn.disabled = false;
        }
      });

      articlesListTbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Erro ao carregar lista de artigos:', err);
    articlesListTbody.innerHTML = `
      <tr>
        <td colspan="6" style="padding: 3rem; text-align: center; color: red;">Erro ao carregar artigos: ${err.message}</td>
      </tr>
    `;
  }
}


// Initialize stats on load if we are on dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (viewDashboard && viewDashboard.classList.contains('active')) {
    loadDashboardStats();
  }
});
