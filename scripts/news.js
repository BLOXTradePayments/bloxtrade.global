import { supabase } from './supabase-config.js';

const newsGrid = document.getElementById('news-grid-container');
let cachedArticles = null;

function renderArticles(articles) {
  try {
    if (!newsGrid) return;
    newsGrid.innerHTML = ''; // Clear existing content

    if (!articles || articles.length === 0) {
      newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 4rem;">Nenhum artigo publicado ainda.</p>';
      return;
    }

  // Determine current language from localStorage or default to 'pt'
  let currentLang = 'pt';
  try {
    currentLang = localStorage.getItem('bloxtrade_lang') || 'pt';
  } catch (e) {
    console.warn("localStorage is not available, defaulting to 'pt'", e);
  }

  articles.forEach((article) => {
    // Select title and content based on language, falling back to en then pt then es only if the current language is missing
    const title = article.title[currentLang] || article.title['en'] || article.title['pt'] || article.title['es'] || '';
    const content = article.content[currentLang] || article.content['en'] || article.content['pt'] || article.content['es'] || '';
    
    // Create a short excerpt (approx 100 characters)
    const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;
    
    // Format date
    let dateString = '';
    if (article.created_at) {
      const date = new Date(article.created_at);
      dateString = date.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : (currentLang === 'es' ? 'es-ES' : 'en-US'), {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    // Card HTML
    const card = document.createElement('a');
    card.href = `artigo.html?id=${article.id}`;
    card.className = 'news-card reveal-scale';
    
    card.innerHTML = `
      <div class="news-badge">${article.category || 'News'}</div>
      <div class="news-img-wrapper">
        <img src="${article.image_url || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'}" alt="${title}">
      </div>
      <div class="news-content">
        <div class="news-date">${dateString}</div>
        <h3 class="news-title">${title}</h3>
        <p class="news-excerpt">${excerpt}</p>
        <div class="news-read-more">${currentLang === 'pt' ? 'Ler mais &rarr;' : (currentLang === 'es' ? 'Leer más &rarr;' : 'Read more &rarr;')}</div>
      </div>
    `;
    
    // Ensure visibility even if the global reveal script fails
    try {
      card.classList.add('in-view');
    } catch (e) {
      /* ignore */
    }
    newsGrid.appendChild(card);
  });
  } catch (e) {
    console.error('renderArticles error:', e);
    if (newsGrid) {
      newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red; padding: 4rem;">Erro ao renderizar publicações.</p>';
    }
  }
}

function setFeaturedArticle(article) {
  if (!article) return;
  try {
    const link = document.getElementById('featured-link');
    const img = document.getElementById('featured-img');
    const dateEl = document.getElementById('featured-date');
    const titleEl = document.getElementById('featured-title');
    const readEl = document.getElementById('featured-read');

    if (link) link.href = `artigo.html?id=${article.id}`;
    if (img) img.src = article.image_url || img.src;
    if (dateEl && article.created_at) {
      const d = new Date(article.created_at);
      dateEl.textContent = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    if (titleEl) {
      const title = article.title && (article.title.pt || article.title.en || article.title.es) || '';
      titleEl.textContent = title;
    }
    if (readEl) readEl.textContent = 'Ler Artigo Completo →';
    // ensure visible
    try { link && link.classList.add('in-view'); } catch(e){}
  } catch (e) {
    console.warn('Error setting featured article:', e);
  }
}

async function loadNews() {
  if (!newsGrid) return;

  try {
    console.debug('loadNews: fetching articles from Supabase');
    if (!supabase) {
      throw new Error("Cliente Supabase não inicializado.");
    }

    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    cachedArticles = articles;
    // Populate featured area with the newest article if available
    try {
      if (articles && articles.length > 0) {
        setFeaturedArticle(articles[0]);
      }
    } catch (e) {
      console.warn('setFeaturedArticle failed:', e);
    }

    try {
      renderArticles(articles);
    } catch (e) {
      console.error('renderArticles crashed after fetch:', e);
      // Fallback: attempt a minimal render to ensure user sees something
      if (newsGrid) {
        newsGrid.innerHTML = articles && articles.length ? '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 4rem;">Publicações carregadas (falha no render detalhado).</p>' : '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 4rem;">Nenhum artigo publicado ainda.</p>';
      }
    }

  } catch (error) {
    console.error("Error fetching articles:", error);
    newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red; padding: 4rem;">Erro ao carregar publicações.</p>';
  }
}

// Listen to language changes from i18n switcher
document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Wait a brief moment to allow i18n.js to update the localStorage
    setTimeout(() => {
      if (cachedArticles) {
        renderArticles(cachedArticles);
      }
    }, 50);
  });
});

// Load news when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadNews();
  });
} else {
  loadNews();
}

