import { supabase } from './supabase-config.js';

// --- Navigation Tab Toggling ---
const navDashboard = document.getElementById('nav-dashboard');
const navNewArticle = document.getElementById('nav-new-article');
const navPublishedArticles = document.getElementById('nav-published-articles');
const navCandidates = document.getElementById('nav-candidates');

const viewDashboard = document.getElementById('view-dashboard');
const viewNewArticle = document.getElementById('view-new-article');
const viewPublishedArticles = document.getElementById('view-published-articles');
const viewCandidates = document.getElementById('view-candidates');
const pageTitle = document.getElementById('admin-page-title');

function switchTab(activeNav, activeView, titleText) {
  // Remove active classes
  [navDashboard, navNewArticle, navPublishedArticles, navCandidates].forEach(nav => {
    if (nav) nav.classList.remove('active');
  });
  [viewDashboard, viewNewArticle, viewPublishedArticles, viewCandidates].forEach(view => {
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
  } else if (activeNav === navCandidates) {
    loadCandidates();
  }
}

if (navDashboard) navDashboard.addEventListener('click', () => switchTab(navDashboard, viewDashboard, 'Dashboard'));
if (navNewArticle) navNewArticle.addEventListener('click', () => switchTab(navNewArticle, viewNewArticle, 'Publicar Novo Artigo'));
if (navPublishedArticles) navPublishedArticles.addEventListener('click', () => switchTab(navPublishedArticles, viewPublishedArticles, 'Artigos Publicados'));
if (navCandidates) navCandidates.addEventListener('click', () => switchTab(navCandidates, viewCandidates, 'Candidatos Recebidos'));


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

// --- CANDIDATE APPLICATIONS MANAGEMENT ---
const candidatesListTbody = document.getElementById('candidates-list');

async function loadCandidates() {
  if (!candidatesListTbody) return;

  candidatesListTbody.innerHTML = `
    <tr>
      <td colspan="6" style="padding: 3rem; text-align: center; color: #888;">Carregando candidaturas...</td>
    </tr>
  `;

  try {
    const { data: candidates, error } = await supabase
      .from('careers_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!candidates || candidates.length === 0) {
      candidatesListTbody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 3rem; text-align: center; color: #888;">Nenhuma candidatura recebida até o momento.</td>
        </tr>
      `;
      return;
    }

    candidatesListTbody.innerHTML = '';

    candidates.forEach(candidate => {
      const tr = document.createElement('tr');
      
      const date = new Date(candidate.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Contact info
      const contactInfo = `
        <div style="font-size: 0.875rem;">
          <div style="font-weight: 600; color: #333;">${candidate.email}</div>
          <div style="color: #555; margin-top: 0.1rem;">${candidate.phone}</div>
          <div style="color: #777; font-size: 0.75rem; margin-top: 0.1rem; font-style: italic;">${candidate.city_state}</div>
        </div>
      `;

      // Social URLs
      let linkedinBtn = '';
      if (candidate.linkedin_url) {
        linkedinBtn = `<a href="${candidate.linkedin_url}" target="_blank" rel="noopener noreferrer" style="color: #0077b5; font-weight: 500; font-size: 0.8125rem; display: block; margin-top: 0.25rem;">LinkedIn &rarr;</a>`;
      }
      let portfolioBtn = '';
      if (candidate.portfolio_url) {
        portfolioBtn = `<a href="${candidate.portfolio_url}" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent-hover); font-weight: 500; font-size: 0.8125rem; display: block; margin-top: 0.25rem;">Portfólio &rarr;</a>`;
      }

      tr.innerHTML = `
        <td><span style="font-size: 0.875rem; color: #555;">${date}</span></td>
        <td>
          <div style="font-weight: 600; color: #1B2417; font-size: 0.95rem;">${candidate.name}</div>
          ${linkedinBtn}
          ${portfolioBtn}
        </td>
        <td>${contactInfo}</td>
        <td>
          <span style="background: rgba(129, 205, 78, 0.1); color: var(--color-accent-hover); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; display: inline-block;">
            ${candidate.area}
          </span>
          <div style="font-size: 0.8125rem; color: #555; margin-top: 0.25rem;">${candidate.level}</div>
        </td>
        <td><span style="font-size: 0.875rem; color: #555;">${candidate.source}</span></td>
        <td style="text-align: right; white-space: nowrap;">
          <button class="btn-view-cv" data-resume="${candidate.resume_url}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 0.25rem;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Ver CV
          </button>
          <button class="btn-delete" data-id="${candidate.id}" data-resume="${candidate.resume_url}">Excluir</button>
        </td>
      `;

      // Bind View CV click (generates signed URL)
      const viewCvBtn = tr.querySelector('.btn-view-cv');
      viewCvBtn.addEventListener('click', async () => {
        const resumePath = viewCvBtn.getAttribute('data-resume');
        viewCvBtn.disabled = true;
        try {
          const { data, error } = await supabase.storage
            .from('resumes')
            .createSignedUrl(resumePath, 60); // 60 seconds expiry

          if (error) throw error;
          window.open(data.signedUrl, '_blank');
        } catch (err) {
          console.error('Erro ao gerar link do CV:', err);
          alert('Erro ao carregar currículo: ' + err.message);
        } finally {
          viewCvBtn.disabled = false;
        }
      });

      // Bind Delete click
      const deleteBtn = tr.querySelector('.btn-delete');
      deleteBtn.addEventListener('click', async () => {
        const id = deleteBtn.getAttribute('data-id');
        const resumePath = deleteBtn.getAttribute('data-resume');

        if (!confirm('Tem certeza de que deseja excluir esta candidatura? Esta ação não pode ser desfeita.')) {
          return;
        }

        deleteBtn.innerText = 'Excluindo...';
        deleteBtn.disabled = true;

        try {
          // 1. Delete from database
          const { error: dbError } = await supabase
            .from('careers_applications')
            .delete()
            .eq('id', id);

          if (dbError) throw dbError;

          // 2. Delete file from storage
          try {
            await supabase.storage
              .from('resumes')
              .remove([resumePath]);
            console.log('Currículo excluído do storage:', resumePath);
          } catch (storageErr) {
            console.warn('Erro ao remover currículo do storage (não-fatal):', storageErr);
          }

          alert('Candidatura excluída com sucesso!');
          loadCandidates(); // reload
        } catch (err) {
          console.error('Erro ao excluir candidatura:', err);
          alert('Erro ao excluir candidatura: ' + err.message);
          deleteBtn.innerText = 'Excluir';
          deleteBtn.disabled = false;
        }
      });

      candidatesListTbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Erro ao carregar candidatos:', err);
    candidatesListTbody.innerHTML = `
      <tr>
        <td colspan="6" style="padding: 3rem; text-align: center; color: red;">Erro ao carregar candidatos: ${err.message}</td>
      </tr>
    `;
  }
}
